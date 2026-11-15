---
title: Cursor CLI
subtitle: Cursor terminal agent
category: Agents
updated: 2026-11-15
tier: t2
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Sandbox
  - Approvals
intro: |
  [Cursor CLI](https://cursor.com/docs/cli) is Cursor's coding agent for the terminal, installed as `agent`. This reference covers the TUI, print mode, and `cli-config.json`.
links:
  - title: Cursor CLI documentation
    url: https://cursor.com/docs/cli
  - title: Cursor CLI changelog
    url: https://cursor.com/docs/cli/changelog
---

## Getting started

### Install

#### macOS, Linux, and WSL

```bash
curl https://cursor.com/install -fsS | bash  # macOS, Linux, WSL
agent --version                              # verify the install
agent update                                 # upgrade in place
```

#### Windows

```powershell
irm 'https://cursor.com/install?win32=true' | iex  # Windows
```

On macOS, Linux, and WSL the installer symlinks `agent` into `~/.local/bin`; add it to `PATH` if it is missing.

See: [Installation](https://cursor.com/docs/cli/installation)

### Sign in

```bash
agent           # first run opens a browser login
agent login     # sign in again
agent status    # show account and endpoint
agent logout    # clear stored credentials
```

For scripts, export `CURSOR_API_KEY` or pass `--api-key`. `NO_OPEN_BROWSER=1 agent login` prints the URL instead of opening it.

See: [Authentication](https://cursor.com/docs/cli/reference/authentication)

### Sessions

```bash
agent                     # start the interactive TUI
agent "explain this repo" # start with a prompt
agent ls                  # list recent chats, resume one
agent resume              # resume the latest chat
agent --continue          # alias for --resume=-1
agent --resume <chat-id>  # resume a specific chat
```

`agent create-chat` makes an empty chat and prints its ID; pass it to `--resume`.

See: [Parameters](https://cursor.com/docs/cli/reference/parameters)

## CLI reference

### Commands

#### Chats

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `agent [prompt]`    | Start the interactive agent        |
| `agent ls`          | Pick a previous chat to resume     |
| `agent resume`      | Resume the latest chat             |
| `agent create-chat` | Create an empty chat, print its ID |

<!-- {: .-shortcuts} -->

#### Setup

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `agent login`         | Sign in with a browser            |
| `agent logout`        | Clear stored credentials          |
| `agent status`        | Show auth status (`whoami`)       |
| `agent about`         | Version, system, and account info |
| `agent models`        | List models for this account      |
| `agent update`        | Update to the latest build        |
| `agent generate-rule` | Generate a `.cursor/rules` file   |

<!-- {: .-shortcuts} -->

#### Integrations

| Command                           | Description                         |
| --------------------------------- | ----------------------------------- |
| `agent mcp`                       | Manage MCP servers                  |
| `agent sandbox`                   | Configure the sandbox, or run in it |
| `agent acp`                       | Run as an ACP server over stdio     |
| `agent worker`                    | Run a private Cloud Agent worker    |
| `agent install-shell-integration` | Add shell integration to `~/.zshrc` |

<!-- {: .-shortcuts} -->

See: [Parameters](https://cursor.com/docs/cli/reference/parameters)

### Flags

| Flag                      | Description                       |
| ------------------------- | --------------------------------- |
| `-p, --print`             | Run non-interactively             |
| `--output-format <fmt>`   | `text`, `json`, or `stream-json`  |
| `--stream-partial-output` | Stream text deltas                |
| `--model <model>`         | Choose the model                  |
| `--list-models`           | List available models             |
| ------------------------- | --------------------------------- |
| `--mode <mode>`           | `plan` or `ask`                   |
| `--plan`                  | Start in Plan mode                |
| `--resume [chatId]`       | Resume a chat                     |
| `--continue`              | Resume the previous chat          |
| ------------------------- | --------------------------------- |
| `-f, --force`             | Run what is not explicitly denied |
| `--sandbox <mode>`        | `enabled` or `disabled`           |
| `--workspace <path>`      | Workspace directory to use        |
| `-w, --worktree [name]`   | Run in a new Git worktree         |

<!-- {: .-shortcuts} -->

See: [Parameters](https://cursor.com/docs/cli/reference/parameters)

### Other flags

| Flag                    | Description                           |
| ----------------------- | ------------------------------------- |
| `--api-key <key>`       | API key instead of a stored login     |
| `-H, --header <header>` | Add a request header, repeatable      |
| `--approve-mcps`        | Approve every MCP server              |
| `--trust`               | Trust the workspace without prompting |
| `--worktree-base <ref>` | Base ref for the new worktree         |
| `--skip-worktree-setup` | Skip `.cursor/worktrees.json` setup   |
| `--plugin-dir <path>`   | Load a local plugin directory         |
| ----------------------- | ------------------------------------- |
| `--yolo`                | Alias for `--force`                   |
| `-v, --version`         | Print the version                     |
| `-h, --help`            | Show help for a command               |

<!-- {: .-shortcuts} -->

See: [Parameters](https://cursor.com/docs/cli/reference/parameters)

### Print mode

```bash
agent -p "find and fix performance issues"
agent -p --model gpt-5 "review this diff for bugs"
agent -p --output-format json "list the TODOs" | jq .result
agent -p --force "upgrade the test runner"
```

Print mode follows session approval rules but cannot ask: allowlisted edits run, the rest is rejected.

Add `--force` to run what it would reject; outside-workspace writes stay blocked.

See: [Using headless CLI](https://cursor.com/docs/cli/headless)

### Output formats

```bash
agent -p --output-format json "explain src/auth.ts"
agent -p --output-format stream-json "fix the tests"
```

#### Formats

| Format        | Output                                    |
| ------------- | ----------------------------------------- |
| `text`        | Only the final message (default)          |
| `json`        | One object with `result` and `session_id` |
| `stream-json` | Newline-delimited events                  |

`stream-json` emits `system`, `user`, `assistant`, `tool_call`, and `result` events.

Add `--stream-partial-output` for text deltas; skip assistant events carrying `model_call_id`.

See: [Output format](https://cursor.com/docs/cli/reference/output-format)

## Slash commands

### Chat

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `/new`           | Start a fresh chat              |
| `/resume`        | Pick a recent chat to resume    |
| `/fork`          | Fork the current chat           |
| `/rename <name>` | Rename the chat                 |
| `/rewind`        | Jump back to an earlier message |
| `/summarize`     | Summarize to free up context    |

<!-- {: .-shortcuts} -->

`/new` also answers to `/clear`, `/new-chat`, and `/newchat`; `/summarize` to `/compress`.

See: [Slash commands](https://cursor.com/docs/cli/reference/slash-commands)

### Control

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `/plan [prompt]`    | Switch to Plan mode           |
| `/ask`              | Toggle Ask mode               |
| `/debug [prompt]`   | Toggle Debug mode             |
| `/goal [objective]` | Set a durable objective       |
| ------------------- | ----------------------------- |
| `/model [filter]`   | Choose a model                |
| `/max-mode`         | Toggle Max Mode               |
| `/run-everything`   | Toggle Run Everything         |
| ------------------- | ----------------------------- |
| `/sandbox`          | Configure sandbox and network |
| `/config`           | Edit CLI settings             |
| `/vim`              | Toggle Vim keys               |

<!-- {: .-shortcuts} -->

`/auto-run` aliases `/run-everything`. `/goal` keeps the objective across idle runs.

See: [Slash commands](https://cursor.com/docs/cli/reference/slash-commands)

### Inspect

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `/mcp`                  | Manage servers, list their tools |
| `/plugin`               | Manage plugins and marketplaces  |
| `/logs`                 | Show the debug log path          |
| `/copy`                 | Copy a previous message          |
| `/copy-request-id`      | Copy the last request ID         |
| `/copy-conversation-id` | Copy the conversation ID         |
| `/help [command]`       | Show help                        |

<!-- {: .-shortcuts} -->

See: [Slash commands](https://cursor.com/docs/cli/reference/slash-commands)

### Interface

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `/setup-terminal`    | Fix newline keybindings      |
| `/line-numbers`      | Toggle line numbers          |
| `/show-thinking`     | Toggle thinking blocks       |
| `/status-indicators` | Toggle terminal title status |
| `/open`              | Open the repo root in Cursor |

<!-- {: .-shortcuts} -->

See: [Slash commands](https://cursor.com/docs/cli/reference/slash-commands)

### Account

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `/about`              | Version, system, and account info |
| `/feedback <message>` | Send feedback to the team         |
| `/logout`             | Sign out                          |
| `/quit`               | Exit (also `/exit`)               |

<!-- {: .-shortcuts} -->

See: [Slash commands](https://cursor.com/docs/cli/reference/slash-commands)

## Interactive mode

### Modes

| Mode  | How to enter                   |
| ----- | ------------------------------ |
| Agent | Default                        |
| Plan  | `Shift+Tab`, `/plan`, `--plan` |
| Ask   | `/ask`, `--mode=ask`           |

Plan mode designs before editing and asks clarifying questions; Ask mode reads without changing files.

See: [Modes](https://cursor.com/docs/cli/using#modes)

### Keyboard shortcuts

| Shortcut      | Action                                 |
| ------------- | -------------------------------------- |
| `Shift+Tab`   | Rotate Agent, Plan, Ask                |
| `Shift+Enter` | Newline (iTerm2, Ghostty, Kitty, Warp) |
| `Ctrl+J`      | Newline in any terminal                |
| `\+Enter`     | Newline in any terminal                |
| ------------- | -------------------------------------- |
| `Ctrl+R`      | Review the turn's changes              |
| `ArrowUp`     | Recall earlier messages                |
| `Ctrl+O`      | Expand truncated output                |
| `Enter`       | Steer a running turn                   |
| `Esc`         | Leave shell mode                       |
| `Ctrl+D`      | Exit (press twice)                     |

<!-- {: .-shortcuts} -->

`Shift+Enter` needs a terminal that reports the modifier; tmux and SSH sessions fall back to `Ctrl+J`. `/setup-terminal` configures Option+Enter.

See: [Terminal setup](https://cursor.com/docs/cli/reference/terminal-setup)

### Input modes

| Input | Effect                           |
| ----- | -------------------------------- |
| `@`   | Attach files and folders         |
| `/`   | Run a slash command              |
| `&`   | Hand the prompt to a Cloud Agent |

<!-- {: .-shortcuts} -->

Pick a skill from `/` and press `Enter` to attach it once, or `Option+Enter` to keep it as a custom mode.

See: [Using Agent in CLI](https://cursor.com/docs/cli/using)

### Shell mode

```bash
/shell                        # enter shell mode
cd packages/web && npm test   # chain cd, it does not persist
```

Commands run in your login shell for up to 30 seconds. Servers and interactive prompts are not supported; `Ctrl+O` expands output and `Esc` exits.

See: [Shell mode](https://cursor.com/docs/cli/shell-mode)

### Reviewing changes

| Key      | Action                     |
| -------- | -------------------------- |
| `Ctrl+R` | Open the review            |
| `i`      | Add follow-up instructions |
| `←` `→`  | Switch files               |
| `↑` `↓`  | Scroll                     |

<!-- {: .-shortcuts} -->

See: [Using Agent in CLI](https://cursor.com/docs/cli/using#review)

## Model selection

### Choosing a model

```bash
agent --list-models               # what this account can use
agent models                      # same, as a subcommand
/model                            # picker; Tab edits parameters
/model auto                       # let Cursor route
agent --model gpt-5 "fix tests"   # pin one for a run
```

Fresh installs start on Auto. Team restrictions shrink the list; a blocked `--model` exits with a restriction message.

See: [Configuration](https://cursor.com/docs/cli/reference/configuration#models)

### Shortcuts

| Command     | Effect                     |
| ----------- | -------------------------- |
| `/opus`     | Jump to the Claude family  |
| `/composer` | Jump to Composer           |
| `/fast`     | Toggle Fast when supported |
| `/max-mode` | Toggle Max Mode            |

<!-- {: .-shortcuts} -->

Each family shortcut remembers your last pick. Turn them off under Model slash commands in `/config`.

See: [Changelog](https://cursor.com/docs/cli/changelog)

## Approvals and sandbox

### Run modes

| Mode           | Runs without asking                  |
| -------------- | ------------------------------------ |
| `allowlist`    | Allowlisted calls, sandboxed shell   |
| `auto-review`  | Allowlisted calls, then a classifier |
| `unrestricted` | Every tool call                      |

<!-- {: .-shortcuts} -->

Auto-review sandboxes shell commands and sends the rest to a classifier. Set the mode with `approvalMode` or `/run-everything`; `--force` (or `--yolo`) runs everything `permissions.deny` and team policy allow.

See: [Run modes](https://cursor.com/docs/agent/security/run-modes)

### Permission tokens

| Token                       | Controls                  |
| --------------------------- | ------------------------- |
| `Shell(git)`                | Any `git` subcommand      |
| `Shell(curl:*)`             | `curl` with any arguments |
| `Read(src/**/*.ts)`         | Files matching a glob     |
| `Write(package.json)`       | Writes to a path or glob  |
| `WebFetch(docs.github.com)` | Fetches from a domain     |
| `Mcp(datadog:*)`            | Tools on an MCP server    |

`Shell` matches the first word of a command, `Read` and `Write` take globs, `WebFetch` takes a domain, and `Mcp` takes `server:tool`.

See: [Permissions](https://cursor.com/docs/cli/reference/permissions)

### Allow and deny

```json
{
  "permissions": {
    "allow": ["Shell(git)", "Read(src/**/*.ts)"],
    "deny": ["Shell(rm)", "Read(.env*)"]
  }
}
```

Deny rules win over allow rules, and relative paths are scoped to the workspace. Approval prompts add entries with `Tab`.

See: [Permissions](https://cursor.com/docs/cli/reference/permissions)

### Sandbox

```bash
agent --sandbox disabled        # use allowlist mode instead
agent sandbox enable            # keep it on for every run
agent sandbox run ls --network  # one command, network allowed
```

`/sandbox` sets the mode and network access; settings persist. The sandbox allows workspace writes and limits network to `sandbox.json` plus Cursor defaults.

See: [Sandboxing](https://cursor.com/docs/agent/security/run-modes#sandboxing)

### Sandbox limits

`.git/hooks` and other protected paths stay off limits. On Linux, Landlock (kernel 6.2+) and unprivileged user namespaces are required; without them the CLI asks for approval.

See: [Sandboxing](https://cursor.com/docs/agent/security/run-modes#sandboxing)

## Configuration

### Config files

#### Paths

```bash
~/.cursor/cli-config.json           # global, every project
.cursor/cli.json                    # project, permissions only
$CURSOR_CONFIG_DIR/cli-config.json  # custom directory
```

#### Example

```json
{
  "version": 1,
  "editor": { "vimMode": false },
  "permissions": { "allow": ["Shell(git)"], "deny": ["Shell(rm)"] }
}
```

`version`, `editor.vimMode`, and `permissions.allow`/`deny` are required. The CLI repairs missing fields and backs up broken files as `.bad`. Project files set only permissions.

See: [Configuration](https://cursor.com/docs/cli/reference/configuration)

### Rules and AGENTS.md

#### Files

```bash
.cursor/rules/*.mdc   # project rules; .md is ignored
AGENTS.md             # root instructions, committed
CLAUDE.md             # also read at the root
```

#### Frontmatter

```md
---
description: Component conventions for the web app
globs: src/components/**/*.tsx
alwaysApply: false
---
```

`alwaysApply` runs a rule every session, `globs` scopes it to matching files, and `description` lets the agent pull it in. Without either, only `@`-mention loads it.

See: [Rules](https://cursor.com/docs/rules)

### MCP servers

```bash
agent mcp list
agent mcp list-tools datadog
agent mcp login datadog
agent mcp disable datadog
```

Servers live in `.cursor/mcp.json` or `~/.cursor/mcp.json`. `--approve-mcps` skips the approval prompt, and ACP sessions ignore team-level servers.

See: [MCP](https://cursor.com/docs/mcp)

### Worktrees

```bash
agent -w "upgrade the test runner"
agent -w auth-fix "fix the flaky auth test"
agent --workspace ~/src/app -w "fix the tests"
```

Worktrees live under `~/.cursor/worktrees/<repo>/<name>`. `--worktree-base` picks the base ref; `.cursor/worktrees.json` setup runs once the workspace is trusted.

See: [Worktrees](https://cursor.com/docs/configuration/worktrees)

### Environment variables

| Variable              | Purpose                         |
| --------------------- | ------------------------------- |
| `CURSOR_API_KEY`      | API key for scripts and CI      |
| `CURSOR_AUTH_TOKEN`   | Token for ACP clients           |
| `CURSOR_CONFIG_DIR`   | Move `cli-config.json`          |
| `XDG_CONFIG_HOME`     | Linux config root               |
| --------------------- | ------------------------------- |
| `NO_OPEN_BROWSER`     | Print the login URL instead     |
| `HTTP_PROXY`          | Proxy for agent traffic         |
| `HTTPS_PROXY`         | Proxy for TLS traffic           |
| `NODE_EXTRA_CA_CERTS` | Trust a TLS-inspecting proxy CA |
| `COLORFGBG`           | Force the dark or light theme   |

<!-- {: .-shortcuts} -->

`CURSOR_CONFIG_DIR` wins over `XDG_CONFIG_HOME`. Set `COLORFGBG="15;0"` for a dark theme or `"0;15"` for a light one.

See: [Configuration](https://cursor.com/docs/cli/reference/configuration)

## Common workflows

### Scripting and CI

```bash
agent -p "review this diff for bugs"
agent -p --force "fix the failing tests"
agent -p --output-format json "list the TODOs" | jq .result
```

A failed run exits non-zero and writes the error to stderr; `json` emits no object in that case, so check the exit code before parsing.

See: [Headless CLI](https://cursor.com/docs/cli/headless)

### GitHub Actions

```yaml
- name: Install Cursor CLI
  run: |
    curl https://cursor.com/install -fsS | bash
    echo "$HOME/.local/bin" >> $GITHUB_PATH

- name: Run the agent
  env:
    CURSOR_API_KEY: ${{ secrets.CURSOR_API_KEY }}
  run: agent -p --force "fix the failing tests"
```

Store the key with `gh secret set CURSOR_API_KEY`. For CI, encode restrictions in `permissions.allow`/`deny` instead of relying on prompts.

See: [GitHub Actions](https://cursor.com/docs/cli/github-actions)

### Cloud handoff

```text
& refactor the auth module and add tests
```

Prefix a message with `&` to hand it to a Cloud Agent; pick it up later at [cursor.com/agents](https://cursor.com/agents).

See: [Cloud Agent](https://cursor.com/docs/cloud-agent)

## Also see

<!-- {: .-one-column} -->

- [CLI overview](https://cursor.com/docs/cli) _(cursor.com)_
- [Parameters](https://cursor.com/docs/cli/reference/parameters) _(cursor.com)_
- [Slash commands](https://cursor.com/docs/cli/reference/slash-commands) _(cursor.com)_
- [Permissions](https://cursor.com/docs/cli/reference/permissions) _(cursor.com)_
- [Configuration](https://cursor.com/docs/cli/reference/configuration) _(cursor.com)_
- [Run modes](https://cursor.com/docs/agent/security/run-modes) _(cursor.com)_
- [Rules](https://cursor.com/docs/rules) _(cursor.com)_
- [Changelog](https://cursor.com/docs/cli/changelog) _(cursor.com)_

[Codex cheatsheet](./codex)
<!-- {: .-crosslink} -->

[OpenCode cheatsheet](./opencode)
<!-- {: .-crosslink} -->
