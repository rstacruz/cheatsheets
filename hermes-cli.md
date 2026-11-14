---
title: Hermes CLI
category: Agents
tier: t2
updated: 2026-11-11
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Gateway
  - Sessions
intro: |
  [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) is Nous Research's AI agent for the terminal. This reference covers the most commonly used commands, flags, and settings.
links:
  - title: Hermes documentation
    url: https://hermes-agent.nousresearch.com/docs/
  - title: GitHub repository
    url: https://github.com/nousresearch/hermes-agent
---

## Getting started

<!-- {: .-two-column} -->

### Install

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

On Windows, run `iex (irm https://hermes-agent.nousresearch.com/install.ps1)` in PowerShell. macOS and Windows also ship a desktop package; `hermes desktop` builds it from a CLI install.

See: [Installation](https://hermes-agent.nousresearch.com/docs/getting-started/installation)

### Setup

```bash
hermes setup --portal   # Portal login, provider, Tool Gateway
hermes setup            # full reconfiguration wizard
hermes setup model      # one section at a time
```

Sections are `model`, `tts`, `terminal`, `gateway`, `tools`, and `agent`. Returning users get the wizard with current values as defaults.

See: [`hermes setup`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-setup)

### First chat and resume

```bash
hermes                                     # interactive session
hermes chat -q "Summarize the latest PRs"  # seeds the first turn
hermes chat --oneshot -q "Summarize this repo"
hermes -c                                  # continue the last session
hermes --resume latest --in ./my-project
```

On a real TTY, `-q` submits the prompt literally and stays interactive. `--oneshot` answers and exits.

See: [Running the CLI](https://hermes-agent.nousresearch.com/docs/user-guide/cli#running-the-cli)

## CLI reference

<!-- {: .-two-column} -->

### Chat

| Option                    | Description                          |
| ------------------------- | ------------------------------------ |
| `-q, --query "..."`       | Seed the session with a prompt       |
| `--query-file PATH`       | Read the query from a file or stdin  |
| `--oneshot`               | Answer the query and exit            |
| ------------------------- | ------------------------------------ |
| `-m, --model <model>`     | Override the model for this run      |
| `--provider <name>`       | Force a provider                     |
| `-t, --toolsets <csv>`    | Enable a set of toolsets             |
| ------------------------- | ------------------------------------ |
| `-Q, --quiet`             | Suppress banner and tool previews    |
| `--format stream-json`    | Emit JSONL events for a `-q` run     |
| `--image <path>`          | Attach a local image to one query    |
| ------------------------- | ------------------------------------ |
| `--worktree`              | Start in an isolated git worktree    |
| `--safe-mode`             | Disable all customizations           |

<!-- {: .-shortcuts} -->

`--tui` opens the newer TUI; `--cli` forces the classic prompt_toolkit REPL.

See: [`hermes chat`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-chat)

### One-shot and scripting

```bash
hermes -z "What's the capital of France?"  # → Paris.
answer=$(hermes -z "summarize this" < notes.txt)
hermes -z "review this diff" --usage-file usage.json
```

`-z` prints only the final answer. Use `chat --oneshot -q` when tool output should reach stdout too.

| Code  | `-z`                     | `chat -q`              |
| ----- | ------------------------ | ---------------------- |
| `0`   | Turn completed           | Turn completed         |
| `1`   | Completed with no text   | Failed or never ran    |
| `2`   | Failed or usage error    | —                      |
| `130` | Interrupted              | Interrupted            |

<!-- {: .-shortcuts} -->

See: [Scripted one-shot](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes--z-prompt--scripted-one-shot)

### Models

```bash
hermes model   # provider wizard: keys, OAuth, endpoints
/model         # switch configured providers and models
hermes chat --model anthropic/claude-sonnet-4
```

`hermes model` adds providers; `/model` can only switch the ones already set up. Override per run with `--model` or `--provider`.

See: [`hermes model`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-model)

### Credentials

```bash
hermes auth                             # interactive wizard
hermes auth add openrouter --api-key sk-or-v1-xxx
hermes auth add anthropic --type oauth  # browser login
hermes auth list                        # show credential pools
hermes auth reset openrouter            # clear cooldowns
```

Subcommands: `add`, `list`, `remove`, `reset`, `priority`, `refresh`, `status`, and `logout`.

See: [`hermes auth`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-auth)

### Gateway

| Subcommand    | Description                                  |
| ------------- | -------------------------------------------- |
| `run`         | Run the gateway in the foreground            |
| `ensure`      | Start or discover the runtime; prints JSON   |
| `start`       | Start the installed systemd/launchd service  |
| `stop`        | Stop the service or foreground process       |
| `restart`     | Restart the service                          |
| ------------- | -------------------------------------------- |
| `status`      | Show service status                          |
| `list`        | List profiles and whether their gateway runs |
| `install`     | Install a systemd or launchd service         |
| `uninstall`   | Remove the installed service                 |
| `setup`       | Set up messaging platforms interactively     |

<!-- {: .-shortcuts} -->

On WSL, prefer `gateway run` inside tmux; systemd support is unreliable there.

```bash
tmux new -s hermes 'hermes gateway run'
```

See: [`hermes gateway`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-gateway)

### Sessions

| Subcommand        | Description                               |
| ----------------- | ----------------------------------------- |
| `list`            | List recent sessions                      |
| `browse`          | Pick, search, and resume a session        |
| `export <out>`    | Export sessions to JSONL                  |
| `delete <id>`     | Delete one session                        |
| ----------------- | ----------------------------------------- |
| `prune`           | Delete sessions matching filters          |
| `archive`         | Soft-hide sessions matching filters       |
| `rename <id> <title>` | Set or change a session title           |
| `stats`           | Show session-store statistics             |
| `optimize`        | Merge FTS5 segments and VACUUM            |

<!-- {: .-shortcuts} -->

`prune` defaults to sessions older than 90 days; run it with `--dry-run` first.

```bash
hermes sessions prune --dry-run
hermes sessions export sessions.jsonl
```

See: [`hermes sessions`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-sessions)

## Slash commands

<!-- {: .-two-column} -->

### Session control

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `/new [name]`       | Start a fresh session                    |
| `/clear`            | Clear the screen and start fresh         |
| `/resume [name]`    | Reopen a named session                   |
| `/sessions`         | Browse and switch sessions               |
| `/compress [focus]` | Summarize to free up context             |
| ------------------- | ---------------------------------------- |
| `/undo`             | Drop the last exchange                   |
| `/rewind [N]`       | Edit an earlier prompt, or fork before it |
| `/branch [name]`    | Copy the session to a new branch         |
| `/save <format>`    | Export as JSON, Markdown, or HTML        |

<!-- {: .-shortcuts} -->

See: [Session commands](https://hermes-agent.nousresearch.com/docs/reference/slash-commands#session)

### Model, context, and status

| Command    | Description                          |
| ---------- | ------------------------------------ |
| `/model`   | Pick a model or provider             |
| `/context` | Show the context-window breakdown    |
| `/status`  | Show session details and a recap     |
| `/usage`   | Show tokens, cost, and account limits |
| `/config`  | Show the current configuration       |

<!-- {: .-shortcuts} -->

See: [CLI slash commands](https://hermes-agent.nousresearch.com/docs/reference/slash-commands#interactive-cli-slash-commands)

### Prompts and automation

| Command                              | Description                          |
| ------------------------------------ | ------------------------------------ |
| `/queue <prompt>`                     | Queue a prompt for the next turn     |
| `/steer <prompt>`                     | Nudge the agent after the next tool call |
| `/bg <prompt>`                        | Run the prompt in a background session |
| `/btw <question>`                     | Ask a side question about the chat   |
| `/goal <text>`                        | Set a goal that spans turns          |
| `/loop [interval] <prompt>`           | Re-run a prompt on a schedule        |
| `/heartbeat every <interval> <prompt>` | Repeat a prompt while the session is idle |

<!-- {: .-shortcuts} -->

See: [Session commands](https://hermes-agent.nousresearch.com/docs/reference/slash-commands#session)

### Tools and skills

| Command        | Description                            |
| -------------- | -------------------------------------- |
| `/tools`       | List, enable, or disable tools         |
| `/toolsets`    | List available toolsets                |
| `/skills`      | Search, install, and manage skills     |
| `/memory`      | Review pending memory writes           |
| `/reload-mcp`  | Reload MCP servers and their tools     |

<!-- {: .-shortcuts} -->

See: [Tools and skills](https://hermes-agent.nousresearch.com/docs/reference/slash-commands#tools--skills)

### Quick commands

```yaml
quick_commands:
  status:
    type: exec
    command: systemctl status hermes-agent
  deploy:
    type: exec
    command: scripts/deploy.sh
  inbox:
    type: alias
    target: /gmail unread
```

`exec` runs a shell command; `alias` points at another slash command.

See: [Quick commands](https://hermes-agent.nousresearch.com/docs/reference/slash-commands#quick-commands)

## Interactive mode

<!-- {: .-two-column} -->

### Keyboard

| Shortcut                  | Action                            |
| ------------------------- | --------------------------------- |
| `Enter`                   | Send the message                  |
| `Alt+Enter` / `Ctrl+J`    | Insert a newline                  |
| `Ctrl+G`                  | Edit the prompt in `$EDITOR`      |
| ------------------------- | --------------------------------- |
| `Ctrl+S`                  | Stash the draft; press again to restore |
| `Ctrl+C`                  | Clear the draft, then interrupt   |
| `Ctrl+T` / `F6`           | Open the live work monitor        |
| ------------------------- | --------------------------------- |
| `Tab`                     | Autocomplete; queue while busy    |
| `Ctrl+D`                  | Exit; a running turn keeps going  |

<!-- {: .-shortcuts} -->

See: [Keybindings](https://hermes-agent.nousresearch.com/docs/user-guide/cli#keybindings)

### Shell mode and multiline input

```text
> !git status
> !pytest -x tests/hermes_cli
```

`!` runs on your own machine and skips the model. A pasted block shows a one-line preview.

See: [Shell mode](https://hermes-agent.nousresearch.com/docs/user-guide/cli#-shell-mode)

## Configuration

<!-- {: .-two-column} -->

### Config

```bash
hermes config get model.default
hermes config set model.default claude-sonnet-4
hermes config check
hermes config migrate
```

Dotted keys edit `config.yaml`; `UPPER_SNAKE` names are written to `.env`. `hermes config path` and `env-path` print each file.

See: [`hermes config`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-config)

### Profiles

```bash
hermes profile list
hermes profile create work --clone
hermes profile use work
hermes -p work chat -q "Hello from work"
```

Each profile has its own config, sessions, skills, and home. `-p` overrides the sticky default for one command.

See: [`hermes profile`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-profile)

### Environment

| Setting                    | Effect                              |
| -------------------------- | ----------------------------------- |
| `HERMES_HOME`              | Select the user data directory      |
| `HERMES_TUI=1`             | Launch the TUI; same as `--tui`     |
| `HERMES_INFERENCE_MODEL`   | Model override for `-z` runs        |
| -------------------------- | ----------------------------------- |
| `--ignore-user-config`     | Skip `config.yaml`; `.env` still loads |
| `--ignore-rules`           | Skip AGENTS.md, memory, and skills  |
| `--safe-mode`              | Disable all customizations          |

<!-- {: .-shortcuts} -->

See: [Configuration](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)

## Common workflows

<!-- {: .-two-column} -->

### Scripting and CI

```bash
hermes -z "summarize the failing test" --usage-file usage.json
hermes chat -q "review this diff" --format stream-json
hermes chat --safe-mode --model gpt-4.1 -q "Config bug?"
```

<!-- {: data-line="2"} -->

`stream-json` emits one JSON event per line. `--safe-mode` ignores your setup, so a broken config cannot block the run.

See: [Scripted one-shot](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes--z-prompt--scripted-one-shot)

### Parallel agents

```bash
hermes -w                     # session in a worktree
hermes -w -z "Fix issue #123" # one-shot in a worktree
/worktree new my-experiment   # mid-session worktree
```

Exiting an interactive session asks whether to keep or archive a dirty tree. One-shot runs keep it for the stale sweep; `hermes worktree restore` brings an archive back.

See: [Git worktrees](https://hermes-agent.nousresearch.com/docs/user-guide/git-worktrees)

### Messaging

```bash
hermes gateway setup
hermes send --to telegram "deploy finished"
echo "RAM 92%" | hermes send --to telegram:-1001234567890
```

`/handoff telegram` moves a live session into a chat thread; `hermes send` posts without an agent turn.

See: [`hermes send`](https://hermes-agent.nousresearch.com/docs/reference/cli-commands#hermes-send)

## Also see

<!-- {: .-one-column} -->

- [Claude Code](./claude-code)
- [Codex](./codex)
- [Herdr](./herdr)
