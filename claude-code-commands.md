---
title: Claude Code commands
subtitle: CLI flags and slash commands
category: Agents
updated: 2026-11-18
tier: t2
fragments:
  - "claude -p"
  - "claude -c"
  - "claude -r"
  - "claude --bg"
  - "claude mcp add"
  - "claude plugin"
  - "claude update"
  - "--model sonnet"
  - "--effort high"
  - "--add-dir"
  - "--output-format"
  - "--max-turns"
  - "--json-schema"
  - "/compact"
  - "/code-review"
  - "/permissions"
  - "/resume"
  - "/rewind"
  - "/init"
  - "/memory"
keywords:
  - CLI
  - Slash commands
  - Flags
  - Headless mode
  - Permissions
intro: |
  [Claude Code](https://code.claude.com/docs/en/cli-reference) is Anthropic's AI coding agent for the terminal. This sheet lists its CLI subcommands, launch flags, and slash commands.
links:
  - title: CLI reference
    url: https://code.claude.com/docs/en/cli-reference
  - title: Commands
    url: https://code.claude.com/docs/en/commands
  - title: Headless mode
    url: https://code.claude.com/docs/en/headless
---

## CLI commands

<!-- {: .-two-column} -->

### Sessions

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `claude`             | Start an interactive session      |
| `claude "query"`     | Start with an initial prompt      |
| `claude -p "query"`  | Print the answer and exit         |
| `cat f \| claude -p` | Process piped input               |
| `claude -c`          | Continue the last conversation    |
| `claude -c -p "q"`   | Continue in print mode            |
| -------------------- | --------------------------------- |
| `claude -r <session>`| Resume by ID or name              |
| `claude -n <name>`   | Name the session                  |
| `claude --from-pr 12`| Open a session linked to a PR     |

#### Background

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `claude --bg "task"`  | Start a background agent        |
| `claude agents`       | Open agent view                 |
| `claude attach <id>`  | Attach in this terminal         |
| `claude logs <id>`    | Print recent output             |
| `claude stop <id>`    | Stop the session                |
| `claude respawn <id>` | Restart, conversation intact    |
| --------------------- | ------------------------------- |
| `claude rm <id>`      | Remove it from the list         |
| `claude daemon status`| Show the supervisor's state     |

See: [CLI reference](https://code.claude.com/docs/en/cli-reference) and [Agent view](https://code.claude.com/docs/en/agent-view)

### Setup

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `claude update`          | Update to the latest version       |
| `claude install stable`  | Install or pin a build             |
| `claude doctor`          | Print install diagnostics          |
| `claude import codex`    | Import another agent's setup       |
| `claude purge --dry-run` | Preview deleting local state       |
| ---                      | ---                                |
| `claude ultrareview 12`  | Review a PR without a session      |
| `claude gateway`         | Run the Claude apps gateway        |
| `claude remote-control`  | Serve Remote Control sessions      |
| `claude self-hosted-runner` | Register a self-hosted runner   |
| `claude auto-mode defaults` | Print the auto-mode rules       |
| `claude --version`       | Print the version                  |

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Auth

| Command                     | Description                |
| --------------------------- | -------------------------- |
| `claude auth login`         | Sign in to Anthropic       |
| `claude auth login --console` | Bill through Console     |
| `claude auth status`        | JSON status; `--text` reads it |
| `claude auth logout`        | Sign out                   |
| `claude setup-token`        | Print a long-lived CI token|

See: [Authentication](https://code.claude.com/docs/en/authentication)

### MCP

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

#### Subcommands

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `claude mcp add`       | Add a stdio, HTTP, or SSE server |
| `claude mcp add-json`  | Add one from a JSON object     |
| `claude mcp list`      | List servers and their health  |
| `claude mcp get <name>`| Show one server                |
| `claude mcp remove`    | Delete a server                |
| `claude mcp login`     | Run a server's OAuth flow      |
| `claude mcp logout`    | Clear stored credentials       |

Scope a server with `-s user`, `project`, or `local`. See: [MCP](https://code.claude.com/docs/en/mcp)

### Plugins

```bash
claude plugin install code-review@claude-plugins-official
```

#### Subcommands

| Command                         | Description                |
| ------------------------------- | -------------------------- |
| `claude plugin init <name>`     | Scaffold a new plugin      |
| `claude plugin install <plugin>`| Install from a marketplace |
| `claude plugin uninstall`       | Remove an installed plugin |
| `claude plugin enable`          | Turn a plugin back on      |
| `claude plugin disable`         | Turn it off                |
| ------------------------------- | -------------------------- |
| `claude plugin update`          | Update to the latest version |
| `claude plugin list`            | List installed plugins     |
| `claude plugin validate`        | Check a plugin directory   |
| `claude plugin marketplace add` | Add a marketplace source   |
| `claude plugin marketplace list`| List marketplaces          |

`claude plugins` works as an alias. See: [Plugin commands](https://code.claude.com/docs/en/plugins/cli-reference)

## Flags

<!-- {: .-two-column} -->

### Session

| Flag                   | Description                          |
| ---------------------- | ------------------------------------ |
| `-c, --continue`       | Load the latest conversation         |
| `-r, --resume <id>`    | Resume by ID, name, or picker        |
| `--fork-session`       | New session ID when resuming         |
| `-n, --name <name>`    | Name the session                     |
| ---------------------- | ------------------------------------ |
| `--from-pr <pr>`       | Pick a session linked to a PR        |
| `-w, --worktree [name]`| Start in an isolated git worktree    |
| `--tmux`               | Open the worktree in tmux            |
| `--bg, --background`   | Start as a background agent          |
| `--ide`                | Connect to an IDE on startup         |
| `--chrome`             | Enable Chrome integration            |
| `--desktop`            | Continue in the Desktop app          |
| `--remote-control`     | Enable Remote Control (`--rc`)       |

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Model and effort

| Flag                    | Description                     |
| ----------------------- | ------------------------------- |
| `--model sonnet`        | Pick the model                  |
| `--effort high`         | `low` through `max`             |
| `--fallback-model haiku`| Fall back when overloaded       |
| `--advisor opus`        | Enable the advisor tool         |
| `--agent <name>`        | Start with a subagent           |
| `--agents '<json>'`     | Define subagents inline         |
| `--autocompact 500k`    | Set the auto-compact window     |

See: [Model configuration](https://code.claude.com/docs/en/model-config)

### Permissions

| Flag                              | Description                     |
| --------------------------------- | ------------------------------- |
| `--permission-mode plan`          | Start in a permission mode      |
| `--dangerously-skip-permissions`  | Skip every prompt               |
| `--allow-dangerously-skip-permissions` | Add bypass to the cycle    |
| `--allowedTools "Bash(git *)"`    | Tools that never prompt         |
| `--disallowedTools "Edit"`        | Deny rules                      |
| `--tools "Bash,Read"`             | Restrict available tools        |
| --------------------------------- | ------------------------------- |
| `--permission-prompts none`       | Deny prompts in print mode      |
| `--permission-prompt-tool <mcp>`  | Hand prompts to an MCP tool     |
| `--safe-mode`                     | Load with customizations off    |
| `--bare`                          | Skip hooks, plugins, memory     |
| `--restricted`                    | Confine tools to the workdir    |

See: [Permission modes](https://code.claude.com/docs/en/permission-modes)

### Directories and config

| Flag                        | Description                  |
| --------------------------- | ---------------------------- |
| `--add-dir ../lib`          | Add a working directory      |
| `--settings file.json`      | Load settings for one session|
| `--setting-sources user`    | Choose settings sources      |
| `--mcp-config mcp.json`     | Load MCP servers from JSON   |
| `--strict-mcp-config`       | Ignore servers outside the flag |
| --------------------------- | ---------------------------- |
| `--plugin-dir ./plugin`     | Load a plugin for this session |
| `--plugin-url <url>`        | Fetch a plugin from a URL    |
| `--system-prompt <text>`    | Replace the system prompt    |
| `--append-system-prompt`    | Append to the default prompt |
| `--disable-slash-commands`  | Turn skills and commands off |
| `--ax-screen-reader`        | Plain screen-reader output   |

See: [Settings](https://code.claude.com/docs/en/settings)

### Debug

| Flag                     | Description                    |
| ------------------------ | ------------------------------ |
| `--debug`                | Enable debug mode              |
| `--debug='mcp,startup'`  | Filter debug categories        |
| `--debug-file <path>`    | Write logs to a file           |
| `--verbose`              | Show every turn                |
| `-v, --version`          | Print the version              |
| ------------------------ | ------------------------------ |
| `--init`                 | Run Setup hooks before the prompt |
| `--init-only`            | Run Setup hooks and exit       |
| `--maintenance`          | Run maintenance hooks          |

See: [Troubleshooting](https://code.claude.com/docs/en/troubleshooting)

## Headless mode

<!-- {: .-two-column} -->

### Print mode

#### One-shot

```bash
claude -p "list the failing tests"
```

#### Piped input

```bash
git diff | claude -p "review this diff"
```

Use `-p` anywhere a script needs an answer and an exit code. See: [Headless mode](https://code.claude.com/docs/en/headless)

### Output flags

| Flag                        | Description                     |
| --------------------------- | ------------------------------- |
| `--output-format json`      | `text`, `json`, or `stream-json` |
| `--input-format stream-json`| Read streamed input             |
| `--json-schema '<json>'`    | Constrain output to a schema    |
| `--include-partial-messages`| Stream partial events           |
| --------------------------- | ------------------------------- |
| `--include-hook-events`     | Add hook lifecycle events       |
| `--forward-subagent-text`   | Emit subagent messages          |
| `--replay-user-messages`    | Echo input messages back        |
| `--prompt-suggestions`      | Emit the next-prompt guess      |

Streaming output needs `--verbose` alongside `--output-format stream-json`. See: [Structured output](https://code.claude.com/docs/en/headless)

### Limits

```bash
claude -p "fix lint" --max-turns 3 --max-budget-usd 2
```

#### Flags

| Flag                        | Description                     |
| --------------------------- | ------------------------------- |
| `--max-turns 3`             | Limit agentic turns             |
| `--max-budget-usd 5`        | Stop at a spend cap             |
| `--no-session-persistence`  | Don't save the session to disk  |
| `--exclude-dynamic-system-prompt-sections` | Cache the prompt across users |

See: [Headless mode](https://code.claude.com/docs/en/headless)

## Slash commands

<!-- {: .-two-column} -->

### Conversation

| Command    | Description                     |
| ---------- | ------------------------------- |
| `/help`    | Show commands and shortcuts     |
| `/clear`   | Start with empty context        |
| `/compact` | Summarize to free context       |
| `/context` | Show context-window usage       |
| `/copy`    | Copy the last response          |
| `/btw`     | Ask a side question             |
| ---------- | ------------------------------- |
| `/recap`   | Summarize the session           |
| `/rename`  | Rename the session              |
| `/color`   | Set the prompt bar color        |
| `/exit`    | Exit the CLI (`/quit`)          |
| `/stop`    | Stop the attached session       |

See: [Commands](https://code.claude.com/docs/en/commands)

### Planning

| Command   | Description                        |
| --------- | ---------------------------------- |
| `/plan`   | Enter plan mode                    |
| `/goal`   | Work until a condition is met      |
| `/branch` | Branch the conversation here       |

Plan mode writes a plan before it edits. See: [Permission modes](https://code.claude.com/docs/en/permission-modes)

### History

| Command   | Description                     |
| --------- | ------------------------------- |
| `/resume` | Resume a previous conversation  |
| `/rewind` | Restore code and conversation   |
| `/export` | Export the conversation as text |

`/resume` opens the picker; pass an ID or name to skip it. See: [Checkpointing](https://code.claude.com/docs/en/checkpointing)

## Review and background

<!-- {: .-two-column} -->

### Review

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `/diff`            | Review working-tree changes       |
| `/code-review`     | Review the diff, a PR, or a path  |
| `/review`          | Alias of `/code-review`           |
| `/security-review` | Scan changes for vulnerabilities  |
| `/simplify`        | Apply cleanup findings            |
| `/ultrareview`     | Deep multi-agent cloud review     |
| `/autofix-pr`      | Watch a PR and push fixes         |

`/code-review` also takes an effort level and `--fix`. See: [Review locally with /code-review](https://code.claude.com/docs/en/code-review-local)

### Background work

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `/background`     | Detach this session as an agent    |
| `/fork`           | Copy it into a background session  |
| `/subtask <task>` | Run a task in a forked subagent    |
| `/tasks`          | Show background work               |
| ---               | ---                                |
| `/batch`          | Fan work across worktrees          |
| `/loop`           | Repeat a prompt on a schedule      |
| `/schedule`       | Manage cloud scheduled tasks       |
| `/workflows`      | Watch running workflows            |

See: [Agent view](https://code.claude.com/docs/en/agent-view)

## Settings and usage

<!-- {: .-two-column} -->

### Usage

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `/status`              | Show version, model, account    |
| `/usage`               | Show cost and plan limits       |
| `/cost`                | Alias of `/usage`               |
| `/stats`               | Alias of `/usage`, stats tab    |
| `/insights`            | Analyze your recent sessions    |
| ---------------------- | ------------------------------- |
| `/release-notes`       | Browse the changelog            |
| `/rate-limit-options`  | Options when a limit hits       |
| `/usage-credits`       | Configure usage credits         |
| `/upgrade`             | Upgrade your plan               |
| `/passes`              | Share a free week               |

See: [Costs](https://code.claude.com/docs/en/costs)

### Settings

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `/config`          | Open settings or set a value    |
| `/model`           | Switch the AI model             |
| `/effort`          | Set reasoning effort            |
| `/fast`            | Toggle fast mode                |
| `/advisor`         | Enable the advisor tool         |
| `/autocompact`     | Set the auto-compact window     |
| ------------------ | ------------------------------- |
| `/output-style`    | Switch output styles            |
| `/theme`           | Change the color theme          |
| `/tui`             | Pick the terminal renderer      |
| `/focus`           | Toggle the focus view           |
| `/statusline`      | Configure the status line       |
| `/keybindings`     | Edit keyboard shortcuts         |
| `/terminal-setup`  | Install a Shift+Enter binding   |
| `/scroll-speed`    | Adjust mouse scroll speed       |
| `/voice`           | Toggle voice dictation          |
| `/sandbox`         | Toggle sandbox mode             |

See: [Settings](https://code.claude.com/docs/en/settings)

### Account

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `/login`            | Sign in                        |
| `/logout`           | Sign out                       |
| `/privacy-settings` | View privacy settings          |
| `/feedback`         | Send feedback                  |
| `/bug`              | Report a bug with context      |
| ------------------- | ------------------------------ |
| `/mobile`           | Show the mobile app QR code    |
| `/desktop`          | Continue in the Desktop app    |
| `/teleport`         | Pull a cloud session down      |
| `/remote-env`       | Pick a cloud environment       |
| `/restart`          | Restart and resume the session |

See: [Commands](https://code.claude.com/docs/en/commands)

## Project and integrations

<!-- {: .-two-column} -->

### Project

#### Files and memory

| Command       | Description                     |
| ------------- | ------------------------------- |
| `/init`       | Generate a starter CLAUDE.md    |
| `/memory`     | Edit memory files               |
| `/add-dir`    | Add a working directory         |
| `/cd`         | Move the session directory      |
| `/permissions`| Allow, ask, and deny rules      |
| `/hooks`      | View hook configurations        |

#### Extensions

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `/mcp`           | Manage MCP connections         |
| `/plugin`        | Manage plugins                 |
| `/reload-plugins`| Apply plugin changes           |
| ---------------- | ------------------------------ |
| `/agents`        | Create or manage subagents     |
| `/skills`        | List and filter skills         |
| `/reload-skills` | Rescan skill directories       |
| `/doctor`        | Run a setup checkup            |
| `/debug`         | Diagnose runtime issues        |
| `/import`        | Import another agent's setup   |
| `/ide`           | Manage IDE integrations        |
| `/chrome`        | Configure Chrome integration   |

See: [Memory](https://code.claude.com/docs/en/memory)

### Integrations

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `/install-github-app` | Install the Claude GitHub App   |
| `/install-slack-app`  | Install the Claude Slack app    |
| `/web-setup`          | Connect GitHub for cloud sessions |
| `/remote-control`     | Control from claude.ai          |
| --------------------- | ------------------------------- |
| `/setup-bedrock`      | Configure Amazon Bedrock        |
| `/setup-vertex`       | Configure Google Cloud          |
| `/team-onboarding`    | Generate a team onboarding guide|
| `/list-agents`        | List messageable sessions       |

See: [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)

### Bundled skills

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `/run`                  | Launch and drive your app      |
| `/verify`               | Prove a change works           |
| `/run-skill-generator`  | Teach `/run` your project      |
| `/deep-research`        | Research with cited sources    |
| `/dataviz`              | Design charts and dashboards   |
| `/design`               | Draft UI artboards             |
| ----------------------- | ------------------------------ |
| `/slides`               | Build a presentation           |
| `/claude-api`           | Load Claude API reference      |
| `/claude-in-chrome`     | Drive a task in the browser    |
| `/update-config`        | Apply a settings change        |
| `/fewer-permission-prompts` | Build an allowlist        |
| `/artifacts`            | List and attach artifacts      |

Type `/` to see every skill your install ships. See: [Skills](https://code.claude.com/docs/en/skills)

## Also see

<!-- {: .-one-column} -->

- [Claude Code cheatsheet](./claude-code)
- [CLI reference](https://code.claude.com/docs/en/cli-reference) _(code.claude.com)_
- [Commands](https://code.claude.com/docs/en/commands) _(code.claude.com)_
- [Headless mode](https://code.claude.com/docs/en/headless) _(code.claude.com)_
- [Plugin commands](https://code.claude.com/docs/en/plugins/cli-reference) _(code.claude.com)_
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) _(code.claude.com)_
