---
title: Codex
category: AI
updated: 2026-10-03
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Sandbox
  - Approvals
intro: |
  [Codex](https://learn.chatgpt.com/docs/codex/cli) is OpenAI's coding agent for the terminal. This reference covers sessions, commands, flags, and configuration.
---

## Getting started
{: .-two-column}

### Introduction
{: .-intro}

[Codex](https://learn.chatgpt.com/docs/codex/cli) is OpenAI's coding agent for the terminal. This reference covers the most commonly used commands, flags, and settings.

- [Codex CLI documentation](https://learn.chatgpt.com/docs/codex/cli) _(learn.chatgpt.com)_
- [GitHub repository](https://github.com/openai/codex) _(github.com)_

### Install

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh   # macOS/Linux
npm install -g @openai/codex                           # npm
brew install --cask codex                              # macOS
```

On Windows, run `irm https://chatgpt.com/codex/install.ps1 | iex` in PowerShell. See: [Getting started](https://learn.chatgpt.com/docs/codex/cli#getting-started)

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
{: .-two-column}

### Commands

#### Sessions

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `codex`                | Start the interactive TUI          |
| `codex resume`         | Reopen a saved chat                |
| `codex fork`           | Branch a saved chat into a new one |
| `codex archive <chat>` | Hide a chat from the picker        |
| `codex delete <chat>`  | Delete a chat and its transcript   |
{: .-shortcuts}

#### Setup

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `codex login`          | Sign in with ChatGPT         |
| `codex logout`         | Remove stored credentials    |
| `codex update`         | Update to the latest version |
| `codex doctor`         | Diagnose install and config  |
| `codex completion zsh` | Generate shell completions   |
| `codex mcp`            | Manage MCP servers           |
| `codex plugin`         | Install and remove plugins   |
{: .-shortcuts}

#### Automation

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `codex exec "task"`  | Run non-interactively            |
| `codex review`       | Review changes non-interactively |
| `codex cloud`        | Browse and run cloud chats       |
| `codex apply <task>` | Apply a cloud diff locally       |
{: .-shortcuts}

### Flags

| Flag                          | Description                   |
| ----------------------------- | ----------------------------- |
| `-m, --model <model>`         | Choose the model              |
| `-p, --profile <name>`        | Layer a profile over config   |
| `-s, --sandbox <mode>`        | Set the sandbox policy        |
| `-a, --ask-for-approval <policy>` | Control approval prompts      |
| `-C, --cd <dir>`              | Set the working directory     |
| `--add-dir <dir>`             | Grant another writable folder |
| `--search`                    | Enable live web search        |
| `-i, --image <file>`          | Attach images to the prompt   |
| `-c key=value`                | Override any config value     |
{: .-shortcuts}

#### Other flags

| Flag                                         | Description                    |
| -------------------------------------------- | ------------------------------ |
| `--oss`                                      | Use a local open-source model  |
| `--no-alt-screen`                            | Keep output in terminal scrollback |
| `--enable <feature>`                         | Enable optional features       |
| `--dangerously-bypass-approvals-and-sandbox` | Skip approvals and sandboxing  |
{: .-shortcuts}

### Sandbox and approvals
{: .-prime}

| Mode                 | Effect                          |
| -------------------- | ------------------------------- |
| `read-only`          | Read files; no edits or network |
| `workspace-write`    | Edit the workspace; network off |
| `danger-full-access` | No sandbox at all               |
{: .-shortcuts}

```bash
codex --sandbox workspace-write --ask-for-approval on-request  # Auto
codex --sandbox read-only --ask-for-approval never             # read-only
```

Auto — the Git-repo default — edits in the workspace and asks before going outside it. Network stays off until `sandbox_workspace_write.network_access = true`. See: [Approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)

### Non-interactive mode

```bash
codex exec "summarize this repo"        # final message to stdout
git diff | codex exec "review this"     # pipe context in
codex exec --json "list failing tests"  # JSONL events
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
{: .-two-column}

### Session

#### Chat

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `/new`           | Start a fresh chat                 |
| `/clear`         | Clear the terminal and start fresh |
| `/resume`        | Reopen a saved chat                |
| `/fork`          | Branch the current chat            |
| `/compact`       | Summarize to free up context       |
| `/rename <name>` | Rename the current chat            |
{: .-shortcuts}

#### Control

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `/plan`             | Switch to plan mode          |
| `/goal <objective>` | Set a persistent task goal   |
| `/permissions`      | Change what Codex may do     |
| `/approve`          | Retry an auto-denied action  |
| `/model`            | Choose the active model      |
| `/fast`             | Toggle the Fast service tier |
{: .-shortcuts}

#### Inspect

| Command   | Description                    |
| --------- | ------------------------------ |
| `/diff`   | Show the Git diff              |
| `/review` | Review the working tree        |
| `/status` | Show model, policy, and tokens |
| `/usage`  | Show account token usage       |
| `/copy`   | Copy the latest response       |
{: .-shortcuts}

### Setup

#### Config

| Command    | Description                    |
| ---------- | ------------------------------ |
| `/init`    | Generate an AGENTS.md scaffold |
| `/skills`  | Browse and apply skills        |
| `/plugins` | Browse installed plugins       |
| `/mcp`     | List configured MCP tools      |
| `/hooks`   | Manage lifecycle hooks         |
{: .-shortcuts}

#### Interface

| Command       | Description                    |
| ------------- | ------------------------------ |
| `/theme`      | Choose a syntax theme          |
| `/statusline` | Configure footer items         |
| `/vim`        | Toggle Vim composer mode       |
| `/keymap`     | Remap TUI shortcuts            |
{: .-shortcuts}

#### Account

| Command     | Description                        |
| ----------- | ---------------------------------- |
| `/import`   | Import Claude Code or Cursor setup |
| `/feedback` | Send logs to the maintainers       |
| `/logout`   | Sign out                           |
| `/quit`     | Exit the CLI (also `/exit`)        |
{: .-shortcuts}

## Interactive mode
{: .-two-column}

### Keyboard shortcuts

#### Session

| Shortcut    | Description                        |
| ----------- | ---------------------------------- |
| `Ctrl+C`    | Close the session                  |
| `Ctrl+R`    | Search prompt history              |
| `Ctrl+O`    | Copy the latest response           |
| `Ctrl+L`    | Clear the terminal view            |
| `Ctrl+G`    | Edit the prompt in `$VISUAL`/`$EDITOR` |
| `Esc` `Esc` | Edit the previous message and fork |
| `Alt+R`     | Toggle raw scrollback              |
| `Up` `Down` | Restore draft history              |
{: .-shortcuts}

#### While running

| Shortcut | Description                         |
| -------- | ----------------------------------- |
| `Enter`  | Inject instructions into the turn   |
| `Tab`    | Queue a follow-up for the next turn |
{: .-shortcuts}

### Input modes

| Input | Effect                       |
| ----- | ---------------------------- |
| `/`   | Slash commands               |
| `@`   | Search files and add paths   |
| `!`   | Run a shell command directly |
{: .-shortcuts}

Paste an image into the composer. See: [Image inputs](https://learn.chatgpt.com/docs/image-inputs)

## Configuration
{: .-two-column}

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
```

Project files merge from the repo root down to the current directory; CLI flags and `-c key=value` overrides win. See: [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)

### Environment variables

| Variable               | Purpose                              |
| ---------------------- | ------------------------------------ |
| `CODEX_HOME`           | State directory (default `~/.codex`) |
| `CODEX_API_KEY`        | API key for non-interactive runs     |
| `CODEX_ACCESS_TOKEN`   | Access token for trusted automation  |
| `CODEX_CA_CERTIFICATE` | PEM CA bundle for corporate TLS      |
| `RUST_LOG`             | Log verbosity for debugging          |
{: .-shortcuts}

### AGENTS.md

```md
AGENTS.md            # project instructions, committed
~/.codex/AGENTS.md   # global defaults for every repo
```

Codex loads `AGENTS.override.md` first when present, then merges `AGENTS.md` files from the repo root down to the current directory. See: [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

## Common workflows
{: .-two-column}

### Scripting and CI

```bash
# Machine-readable events for scripts
codex exec --json "list the failing tests" | jq

# Capture the final message in a file
codex exec -o summary.md "summarize this repo"

# Use an API key inline in CI
CODEX_API_KEY=$KEY codex exec "triage open bugs"
```
{: data-line="2,5,8"}

### Reviewing code

```bash
codex review --uncommitted
codex review --base main
git diff | codex exec "review this diff for bugs"
```

Inside a session, `/review` reviews the working tree and `/diff` shows the changes.

### Cloud tasks

```bash
codex cloud list                # recent cloud chats
codex cloud exec --env <id> "fix the flaky test"
codex apply <task-id>           # apply the diff locally
```

`codex cloud exec` needs `--env`; add `--attempts 2` for best-of-N. See: [Codex Cloud](https://learn.chatgpt.com/docs/cloud)

## MCP servers
{: .-two-column}

### Adding servers

```bash
codex mcp add my-server -- npx my-mcp-server        # stdio
codex mcp add remote --url https://example.com/mcp  # HTTP
codex mcp list
```

Add `--env KEY=VALUE` for stdio servers, or `--bearer-token-env-var VAR` for HTTP.

### Authentication

```bash
codex mcp login my-server             # OAuth, opens a browser
codex mcp login my-server --scopes read:docs
codex mcp logout my-server
```

OAuth works with streamable HTTP servers that support it. Stored credentials live in the store set by `mcp_oauth_credentials_store` (auto, file, or keyring). See: [MCP](https://learn.chatgpt.com/docs/extend/mcp)

## Also see
{: .-one-column}

- [CLI reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli) _(learn.chatgpt.com)_
- [Configuration](https://learn.chatgpt.com/docs/config-file/config-basic) _(learn.chatgpt.com)_
- [Approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) _(learn.chatgpt.com)_
- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) _(learn.chatgpt.com)_
- [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) _(learn.chatgpt.com)_
- [Best practices](https://learn.chatgpt.com/guides/best-practices) _(learn.chatgpt.com)_
