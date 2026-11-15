---
title: Codex
category: Agents
updated: 2026-11-11
tier: t2
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Sandbox
  - Approvals
intro: |
  [Codex](https://learn.chatgpt.com/docs/codex/cli) is OpenAI's coding agent for the terminal. This reference covers the most commonly used commands, flags, and settings.
links:
  - title: Codex CLI documentation
    url: https://learn.chatgpt.com/docs/codex/cli
  - title: GitHub repository
    url: https://github.com/openai/codex
---

## Getting started

### Install

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh   # macOS/Linux
npm install -g @openai/codex                           # npm
brew install --cask codex                              # macOS
irm https://chatgpt.com/codex/install.ps1 | iex        # Windows
```

See: [Getting started](https://learn.chatgpt.com/docs/codex/cli#getting-started)

### Sign in

```bash
codex                 # first run opens a browser login
codex login           # sign in again
codex login status    # show the current account
```

Codex works with a ChatGPT plan or an API key. For scripts, pipe a key in: `printenv OPENAI_API_KEY | codex login --with-api-key`. See: [Authentication](https://learn.chatgpt.com/docs/auth)

### Sessions

```bash
codex                      # start the interactive TUI
codex "explain this repo"  # start with a prompt
codex resume --last        # reopen the latest chat
codex fork --last          # branch the latest chat
```

`codex resume` scopes `--last` to the current directory; add `--all` to search every session. See: [CLI reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

## CLI reference

### Commands

#### Sessions

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `codex`                  | Start the interactive TUI          |
| `codex resume`           | Reopen a saved chat                |
| `codex fork`             | Branch a saved chat into a new one |
| `codex agents`           | Browse and switch sessions         |
| ---                      | ---                                |
| `codex archive <chat>`   | Hide a chat from the picker        |
| `codex unarchive <chat>` | Restore an archived chat           |
| `codex delete <chat>`    | Delete a chat and its transcript   |
| `codex queue`            | Queue a message for a session      |

<!-- {: .-shortcuts} -->

#### Setup

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `codex login`          | Sign in with ChatGPT         |
| `codex logout`         | Remove stored credentials    |
| `codex update`         | Update to the latest version |
| `codex doctor`         | Diagnose install and config  |
| ---                    | ---                          |
| `codex completion zsh` | Generate shell completions   |
| `codex features list`  | List feature flags           |
| `codex mcp`            | Manage MCP servers           |
| `codex plugin`         | Install and remove plugins   |

<!-- {: .-shortcuts} -->

#### Automation

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `codex exec "task"`  | Run non-interactively            |
| `codex review`       | Review changes non-interactively |
| `codex cloud`        | Browse and run cloud chats       |
| `codex apply <task>` | Apply a cloud diff locally       |

<!-- {: .-shortcuts} -->

See: [Developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

### Flags

| Flag                              | Description                   |
| --------------------------------- | ----------------------------- |
| `-m, --model <model>`             | Choose the model              |
| `-p, --profile <name>`            | Layer a profile over config   |
| ---                               | ---                           |
| `-s, --sandbox <mode>`            | Set the sandbox policy        |
| `-a, --ask-for-approval <policy>` | `on-request` or `never`; no `untrusted` |
| `-C, --cd <dir>`                  | Set the working directory     |
| `--add-dir <dir>`                 | Grant another writable folder |
| `--worktree`                      | Run in a managed git worktree |
| ---                               | ---                           |
| `--search`                        | Enable live web search        |
| `-i, --image <file>`              | Attach images to the prompt   |
| `-c key=value`                    | Override any config value     |

<!-- {: .-shortcuts} -->

See: [Developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

### Other flags

| Flag                                         | Description                    |
| -------------------------------------------- | ------------------------------ |
| `--oss`                                      | Use a local open-source model  |
| `--local-provider <provider>`                | Local backend for `--oss`: lmstudio or ollama |
| `--approve-for-me`                           | Auto-review approvals; replaces `--full-auto` |
| `--no-alt-screen`                            | Keep output in terminal scrollback |
| ---                                          | ---                            |
| `--enable <feature>`                         | Enable optional features       |
| `--disable <feature>`                        | Turn an optional feature off   |
| `--no-daemon`                                | Skip the shared background server |
| `--strict-config`                            | Reject unknown config keys     |
| `--dangerously-bypass-approvals-and-sandbox` | Skip approvals and sandboxing  |

<!-- {: .-shortcuts} -->

See: [Developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

### Sandbox and approvals

<!-- {: .-prime} -->

| Mode                 | Effect                          |
| -------------------- | ------------------------------- |
| `read-only`          | Read files; no edits or network |
| `workspace-write`    | Edit the workspace; network off |
| `danger-full-access` | No sandbox at all               |

<!-- {: .-shortcuts} -->

```bash
codex -s workspace-write -a on-request  # Auto
codex -s read-only -a never             # read-only, no prompts
```

Auto is the default preset: edits in the workspace, approval to leave it, network off until `sandbox_workspace_write.network_access = true`.

See: [Approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)

### Non-interactive mode

```bash
codex exec "summarize this repo"        # final message to stdout
git diff | codex exec "review this"     # pipe context in
codex exec --json "list failing tests"  # JSONL events
codex exec --ephemeral "triage issues"  # write no session files
codex exec resume --last "fix them"     # continue the last run
```

`codex exec` runs read-only by default; add `--sandbox workspace-write` to allow edits. `-o file` writes the final message to a file. See: [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)

### Code review

```bash
codex review --uncommitted   # staged, unstaged, and untracked
codex review --base main     # changes against a base branch
codex review --commit <sha>  # a single commit
```

Pass exactly one target, or give custom instructions as a prompt. `--title` only works with `--commit`. See: [Code review](https://learn.chatgpt.com/docs/code-review)

## Slash commands

### Session

#### Chat

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `/new`           | Start a fresh chat                 |
| `/clear`         | Clear the terminal and start fresh |
| `/resume`        | Reopen a saved chat                |
| `/fork`          | Branch the current chat            |
| `/side`          | Start an ephemeral side chat       |
| `/compact`       | Summarize to free up context       |
| `/rename <name>` | Rename the current chat            |

<!-- {: .-shortcuts} -->

#### Control

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `/plan`             | Switch to plan mode          |
| `/goal <objective>` | Set a persistent task goal   |
| `/permissions`      | Change what Codex may do     |
| `/approve`          | Retry an auto-denied action  |
| `/model`            | Choose the active model      |
| `/fast`             | Toggle the Fast service tier |

<!-- {: .-shortcuts} -->

#### Inspect

| Command   | Description                    |
| --------- | ------------------------------ |
| `/diff`   | Show the Git diff              |
| `/review` | Review the working tree        |
| `/status` | Show model, policy, and tokens |
| `/usage`  | Show account token usage       |
| `/copy`   | Copy the latest response       |
| `/export` | Export the chat as Markdown    |

<!-- {: .-shortcuts} -->

See: [Slash commands](https://learn.chatgpt.com/docs/developer-commands#built-in-slash-commands)

### Terminals and workspace

| Command       | Description                        |
| ------------- | ---------------------------------- |
| `/ps`         | Show background terminals          |
| `/stop`       | Stop all background terminals      |
| `/cd <path>`  | Move the session to a directory    |
| `/worktree`   | Continue in a managed git worktree |
| `/recap`      | Summarize the chat, keep context   |
| `/raw`        | Toggle raw scrollback              |

<!-- {: .-shortcuts} -->

See: [Slash commands](https://learn.chatgpt.com/docs/developer-commands#built-in-slash-commands)

### Setup

#### Config

| Command         | Description                    |
| --------------- | ------------------------------ |
| `/init`         | Generate an AGENTS.md scaffold |
| `/skills`       | Browse and apply skills        |
| `/plugins`      | Browse installed plugins       |
| `/memories`     | Configure memory use           |
| `/mcp`          | List configured MCP tools      |
| `/hooks`        | Manage lifecycle hooks         |
| `/experimental` | Toggle experimental features   |

<!-- {: .-shortcuts} -->

#### Interface

| Command       | Description                    |
| ------------- | ------------------------------ |
| `/theme`      | Choose a syntax theme          |
| `/tui`        | Choose the terminal mode       |
| `/statusline` | Configure footer items         |
| `/title`      | Configure window title items   |
| `/vim`        | Toggle Vim composer mode       |
| `/keymap`     | Remap TUI shortcuts            |

<!-- {: .-shortcuts} -->

#### Account

| Command     | Description                        |
| ----------- | ---------------------------------- |
| `/import`   | Import Claude Code or Cursor setup |
| `/feedback` | Send logs to the maintainers       |
| `/logout`   | Sign out                           |
| `/quit`     | Exit the CLI (also `/exit`)        |

<!-- {: .-shortcuts} -->

See: [Slash commands](https://learn.chatgpt.com/docs/developer-commands#built-in-slash-commands)

## Interactive mode

### Keyboard shortcuts

#### Session

| Shortcut    | Description                        |
| ----------- | ---------------------------------- |
| `Ctrl+C`    | Close the session                  |
| `Ctrl+R`    | Search prompt history              |
| ---         | ---                                |
| `Ctrl+O`    | Copy the latest response           |
| `Ctrl+L`    | Clear the terminal view            |
| `Ctrl+G`    | Edit the prompt in `$VISUAL`/`$EDITOR` |
| ---         | ---                                |
| `Esc` `Esc` | Edit the previous message and fork |
| `Alt+R`     | Toggle raw scrollback              |
| `Up` `Down` | Restore draft history              |

<!-- {: .-shortcuts} -->

#### While running

| Shortcut | Description                         |
| -------- | ----------------------------------- |
| `Enter`  | Inject instructions into the turn   |
| `Tab`    | Queue a follow-up for the next turn |

<!-- {: .-shortcuts} -->

See: [Interactive shortcuts](https://learn.chatgpt.com/docs/developer-commands#interactive-shortcuts)

### Input modes

| Input | Effect                       |
| ----- | ---------------------------- |
| `/`   | Slash commands               |
| `@`   | Search files and add paths   |
| `!`   | Run a shell command directly |

<!-- {: .-shortcuts} -->

Paste an image into the composer. See: [Image inputs](https://learn.chatgpt.com/docs/image-inputs)

## Configuration

### Config file

```bash
~/.codex/config.toml            # user settings
.codex/config.toml              # project settings (trusted projects)
$CODEX_HOME/<name>.config.toml  # profile, selected with --profile
/etc/codex/config.toml          # system defaults (Unix)
```

```toml
model = "gpt-6.1-sol"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
model_reasoning_effort = "medium"
web_search = "cached"
```

Project files merge from the repo root down to the current directory; CLI flags and `-c key=value` overrides win. See: [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)

### Environment variables

| Variable               | Purpose                              |
| ---------------------- | ------------------------------------ |
| `CODEX_HOME`           | State directory (default `~/.codex`) |
| `CODEX_SQLITE_HOME`    | Where SQLite-backed state lives      |
| `CODEX_API_KEY`        | API key for non-interactive runs     |
| `CODEX_ACCESS_TOKEN`   | Access token for trusted automation  |
| `CODEX_CA_CERTIFICATE` | PEM CA bundle for corporate TLS      |
| `RUST_LOG`             | Log verbosity for debugging          |

<!-- {: .-shortcuts} -->

See: [Environment variables](https://learn.chatgpt.com/docs/config-file/environment-variables)

### AGENTS.md

```md
AGENTS.md            # project instructions, committed
~/.codex/AGENTS.md   # global defaults for every repo
```

Each directory contributes one file — `AGENTS.override.md` if present, else `AGENTS.md` — concatenated from the repo root down, up to 32 KiB by default (`project_doc_max_bytes`). See: [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

## Common workflows

### Scripting and CI

```bash
# Machine-readable events for scripts
codex exec --json "list the failing tests" | jq

# Capture the final message in a file
codex exec -o summary.md "summarize this repo"

# Use an API key inline in CI
CODEX_API_KEY=$KEY codex exec "triage open bugs"
```

<!-- {: data-line="2,5,8"} -->

See: [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)

### Reviewing code

```bash
codex review --uncommitted
codex review --base main
git diff | codex exec "review this diff for bugs"
```

Inside a session, `/review` reviews the working tree and `/diff` shows the changes.

See: [Code review](https://learn.chatgpt.com/docs/code-review?surface=cli)

### Cloud tasks

```bash
codex cloud list                # recent cloud chats
codex cloud exec --env <id> "fix the flaky test"
codex apply <task-id>           # apply the diff locally
```

`codex cloud exec` needs `--env`; add `--attempts 2` for best-of-N. See: [Codex Cloud](https://learn.chatgpt.com/docs/cloud)

## MCP servers

### Adding servers

```bash
codex mcp add my-server -- npx my-mcp-server        # stdio
codex mcp add remote --url https://example.com/mcp  # HTTP
codex mcp list
```

Add `--env KEY=VALUE` for stdio servers, or `--bearer-token-env-var VAR` for HTTP.

See: [MCP](https://learn.chatgpt.com/docs/extend/mcp#add-an-mcp-server)

### Authentication

```bash
codex mcp login my-server             # OAuth, opens a browser
codex mcp login my-server --scopes read,write
codex mcp logout my-server
```

OAuth works with streamable HTTP servers that support it. Stored credentials live in the store set by `mcp_oauth_credentials_store` (auto, file, or keyring). See: [MCP](https://learn.chatgpt.com/docs/extend/mcp)

## Also see

<!-- {: .-one-column} -->

- [CLI reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli) _(learn.chatgpt.com)_
- [Configuration](https://learn.chatgpt.com/docs/config-file/config-basic) _(learn.chatgpt.com)_
- [Approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) _(learn.chatgpt.com)_
- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) _(learn.chatgpt.com)_
- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) _(learn.chatgpt.com)_
- [Best practices](https://learn.chatgpt.com/guides/best-practices) _(learn.chatgpt.com)_
