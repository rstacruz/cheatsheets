---
title: Claude Code
seo_title: Claude Code cheatsheet — commands, flags, hooks
description: "Claude Code commands: flags, hooks, MCP and settings. CLI and configuration reference."
subtitle: AI coding agent
logo: { src: /assets/logos/claude.svg }
category: Agents
tags: [Featured]
updated: 2026-11-28
last_verified_with: "Claude Code 2.1.330."
tier: t1
fragments:
  - "claude"
  - "claude -p"
  - "claude -c"
  - "claude --bg"
  - "--model sonnet"
  - "--effort high"
  - "--worktree"
  - "claude mcp"
  - "/compact"
  - "/code-review"
  - "claude doctor"
  - "claude update"
  - "/permissions"
  - "--max-turns"
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Permission modes
  - Keyboard shortcuts
intro: |
  [Claude Code](https://code.claude.com/docs/en/overview) is Anthropic's AI coding assistant for the terminal. This reference covers CLI commands, flags, interactive mode, configuration, and workflows.
links:
  - title: Claude Code documentation
    url: https://code.claude.com/docs/en/overview
  - title: GitHub repository
    url: https://github.com/anthropics/claude-code
---

## Getting started

<!-- {: .-two-column} -->

### Install

```bash
curl -fsSL https://claude.ai/install.sh | bash  # native
brew install --cask claude-code                 # Homebrew
npm install -g @anthropic-ai/claude-code@latest # npm, Node 22+
claude install stable                           # stable channel
```

On Windows: `irm https://claude.ai/install.ps1 | iex` in PowerShell, or `winget install Anthropic.ClaudeCode`.

See: [Setup](https://code.claude.com/docs/en/setup)

### Sign in

```bash
claude                       # first run opens a browser
claude auth login            # sign in again
claude auth login --console  # bill to a Console account
claude auth status           # JSON status; --text for plain
```
<!-- {: data-highlight="claude auth login"} -->

See: [Authentication](https://code.claude.com/docs/en/authentication)

### Sessions

```bash
claude                        # start interactive session
claude "explain this repo"    # start with a prompt
claude -p "summarize README"  # print mode: answer and exit
git diff | claude -p "review this diff"
```

Use `claude -c` to continue the last conversation, or `claude -r "auth-refactor"` to resume one by name. See: [Quickstart](https://code.claude.com/docs/en/quickstart)

## CLI reference

<!-- {: .-two-column} -->

### Commands

#### Sessions

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `claude`              | Start interactive session         |
| `claude "query"`      | Start with an initial prompt      |
| `claude -p "query"`   | Print response and exit           |
| `claude -c`           | Continue most recent conversation |
| `claude -r <session>` | Resume a session by ID or name    |
| `claude --bg "task"`  | Start a background agent          |

#### Setup

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `claude update`      | Update to latest version       |
| `claude install`     | Install or pin a version       |
| `claude doctor`      | Check install and settings     |
| `claude import`      | Import another agent's setup   |
| -------------------- | ------------------------------ |
| `claude mcp`         | Configure MCP servers          |
| `claude plugin`      | Install and manage plugins     |
| `claude auth status` | Show authentication status     |
| `claude setup-token` | Generate a token for CI        |

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Flags

| Flag                      | Description                       |
| ------------------------- | --------------------------------- |
| `-c, --continue`          | Continue most recent conversation |
| `-r, --resume`            | Resume a session by ID or name    |
| `--agent my-agent`        | Use a named subagent              |
| `--allowedTools "Read"`   | Pre-approve listed tools          |
| ------------------------- | --------------------------------- |
| `--model sonnet`          | Choose the model                  |
| `--effort high`           | Set reasoning effort              |
| `--fallback-model sonnet` | Fall back when overloaded         |
| ------------------------- | --------------------------------- |
| `--permission-mode plan`  | Start in a permission mode        |
| `--add-dir ../lib`        | Add extra working directories     |
| `--verbose`               | Show full turn-by-turn output     |

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Other flags

| Flag                             | Description                       |
| -------------------------------- | --------------------------------- |
| `--debug`                        | Enable debug mode                 |
| `--settings file.json`           | Load settings for this session    |
| `--ide`                          | Auto-connect to your IDE          |
| `-w, --worktree`                 | Start in an isolated git worktree |
| --- | --- |
| `--dangerously-skip-permissions` | Skip all permission prompts       |
| `--safe-mode`                    | Start with customizations off     |
| `--tools "Bash,Edit,Read"`       | Restrict built-in tools           |
| `--mcp-config mcp.json`          | Load MCP servers for a session    |

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Headless mode

| Flag                         | Description                      |
| ---------------------------- | -------------------------------- |
| `-p, --print`                | Print the response and exit      |
| `--output-format json`       | `text`, `json`, or `stream-json` |
| `--json-schema schema`       | Constrain output to a schema     |
| `--max-turns 3`              | Limit agentic turns              |
| --- | --- |
| `--max-budget-usd 5`         | Stop the run at a spend cap      |
| `--bare`                     | Skip hooks, plugins, and memory  |
| `--input-format stream-json` | Stream input events              |
| `--permission-prompts none`  | Deny unattended prompts          |

See: [Headless mode](https://code.claude.com/docs/en/headless)

## Slash commands

<!-- {: .-two-column} -->

### Everyday commands

| Command        | Description                  |
| -------------- | ---------------------------- |
| `/help`        | Show available commands      |
| `/clear`       | Start a new conversation     |
| `/compact`     | Summarize to free up context |
| `/context`     | Show context window usage    |
| -------------- | ---------------------------- |
| `/plan`        | Enter plan mode              |
| `/model`       | Switch the AI model          |
| `/permissions` | Allow, ask, and deny rules   |
| `/status`      | Show version, model, account |
| `/resume`      | Reopen an earlier conversation |
| `/tasks`       | Show background work           |

See: [Commands](https://code.claude.com/docs/en/commands)

### Project commands

| Command        | Description                  |
| -------------- | ---------------------------- |
| `/init`        | Generate a starter CLAUDE.md |
| `/memory`      | Edit memory files            |
| `/mcp`         | Manage MCP connections       |
| `/hooks`       | View hook configurations     |
| --- | --- |
| `/doctor`      | Run a setup checkup          |
| `/diff`        | Review working-tree changes  |
| `/code-review` | Review the diff or a PR      |
| `/config`      | Open the settings interface    |

See: [Commands](https://code.claude.com/docs/en/commands)

[Claude Code commands cheatsheet](./claude-code-commands)
<!-- {: .-crosslink} -->

## Interactive mode

<!-- {: .-two-column} -->

### Keyboard shortcuts

#### Session

| Shortcut        | Description                                |
| --------------- | ------------------------------------------ |
| `Ctrl+C`        | Interrupt, clear input, or exit            |
| `Ctrl+D`        | Exit Claude Code                           |
| `Esc`           | Interrupt Claude, or close dialogs         |
| `Esc` `Esc`     | Clear the draft, or rewind                 |
| `Ctrl+B`        | Background running tasks                   |
| `Ctrl+X Ctrl+K` | Stop all background subagents; press twice |

<!-- {: .-shortcuts} -->

#### Prompt

| Shortcut    | Description                       |
| ----------- | --------------------------------- |
| `Shift+Tab` | Cycle permission modes            |
| `Alt+P`     | Switch model                      |
| `Alt+T`     | Toggle extended thinking          |
| `Alt+O`     | Toggle fast mode                  |
| `Ctrl+V`    | Paste an image from the clipboard |
| `Ctrl+G`    | Edit the prompt in `$EDITOR`      |
| `Ctrl+S`    | Stash or restore the prompt       |

<!-- {: .-shortcuts} -->

#### Display

| Shortcut | Description                  |
| -------- | ---------------------------- |
| `Ctrl+L` | Redraw the screen            |
| `Ctrl+R` | Search prompt history        |
| `Ctrl+O` | Toggle the transcript viewer |
| `Ctrl+T` | Toggle task checklist        |

<!-- {: .-shortcuts} -->

On macOS, use `Option` instead of `Alt`; `Option+P` and editing chords need Option mapped to Meta.

See: [Interactive mode](https://code.claude.com/docs/en/interactive-mode)

### Input modes

| Input | Effect                          |
| ----- | ------------------------------- |
| `/`   | Slash commands and skills       |
| `!`   | Run a shell command directly    |
| `@`   | Mention a file path             |
| `:`   | Insert an emoji by shortcode    |
| `?`   | Show the shortcut help panel    |

For a newline, `\` + `Enter` or `Ctrl+J` works anywhere; `Shift+Enter` needs `/terminal-setup` in some terminals.

See: [Interactive mode](https://code.claude.com/docs/en/interactive-mode)

## Configuration

<!-- {: .-two-column} -->

### Settings files

```bash
~/.claude/settings.json                # user settings
.claude/settings.json                  # project settings, committed
.claude/settings.local.json            # personal project settings
/etc/claude-code/managed-settings.json # managed policy (Linux)
```

Run `/config` to edit settings, or pass `--settings file.json` for one session. See: [Settings](https://code.claude.com/docs/en/settings)

### Settings keys

| Key | Purpose |
| --- | --- |
| `model` | Default model |
| `permissions.defaultMode` | Starting permission mode |
| `permissions.allow` | Tools that run without asking |
| `permissions.deny` | Tools that are always blocked |
| --- | --- |
| `env` | Environment variables for sessions |
| `hooks` | Commands at lifecycle events |
| `enabledPlugins` | Plugins to activate |
| `autoMemoryEnabled` | Toggle auto memory |

See: [Settings reference](https://code.claude.com/docs/en/settings-reference)

### Hooks

| Hook | Fires when |
| --- | --- |
| `PreToolUse` | Before a tool call |
| `PostToolUse` | After a tool call |
| `SessionStart` | A session starts |
| `Stop` | Claude finishes a reply |
| --- | --- |
| `UserPromptSubmit` | A prompt is submitted |
| `PostToolUseFailure` | A tool call fails |
| `PreCompact` | Before context compaction |
| `SessionEnd` | A session ends |
<!-- {: .-headers} -->

Hooks run commands or prompts at lifecycle events. Set them under a `hooks` key in settings; `/hooks` lists the loaded ones. See: [Hooks](https://code.claude.com/docs/en/hooks)

[Claude Code hooks cheatsheet](./claude-code-hooks)
<!-- {: .-crosslink} -->

### Environment variables

| Variable                          | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `ANTHROPIC_API_KEY`               | API key used instead of a subscription |
| `ANTHROPIC_MODEL`                 | Default model name                     |
| `ANTHROPIC_BASE_URL`              | Route requests through a gateway       |
| `API_TIMEOUT_MS`                  | API timeout (default 600000)           |
| `BASH_DEFAULT_TIMEOUT_MS`         | Bash tool timeout (default 120000)     |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Turn auto memory off                   |
| `DISABLE_AUTOUPDATER`             | Turn background updates off            |

Settings files can also set env vars under an `env` key. See: [Environment variables](https://code.claude.com/docs/en/env-vars)

### Memory

```bash
CLAUDE.md             # project instructions, committed
CLAUDE.local.md       # personal notes, not committed
.claude/rules/*.md    # topic rules, optionally path-scoped
~/.claude/CLAUDE.md   # instructions for all your projects
~/.claude/projects/<project>/memory/MEMORY.md
```

`/init` generates a project CLAUDE.md; `/memory` edits memory files. Auto memory lives at `~/.claude/projects/<project>/memory/MEMORY.md`. Import files with `@path/to/file.md`. See: [Memory](https://code.claude.com/docs/en/memory)

### Permission modes

| Mode                | What runs without asking                |
| ------------------- | --------------------------------------- |
| `default`           | Reads only (labeled Manual)             |
| `acceptEdits`       | Reads, file edits, filesystem commands  |
| `plan`              | Reads, approved commands until approval |
| `auto`              | Everything, with safety checks          |
| `dontAsk`           | Pre-approved tools only; rest denied    |
| `bypassPermissions` | Everything                              |

`auto` is the built-in starting mode in terminal and VS Code sessions on v2.1.283+; `-p` runs start in `default`. `Shift+Tab` cycles modes; a classifier can still block actions, and explicit ask rules still prompt. See: [Permission modes](https://code.claude.com/docs/en/permission-modes)

## Common workflows

<!-- {: .-two-column} -->

### Reviewing code

```bash
git diff | claude -p "review this diff for bugs"
claude -p "check src/ for security issues"
```

In a session, `/code-review` reviews the diff, `/code-review 1234` a pull request, and `/security-review` scans for vulnerabilities. Add `--fix` to apply the findings.

See: [Review locally with /code-review](https://code.claude.com/docs/en/code-review-local)

### Scripting

```bash
# One-shot JSON output for scripts
claude -p "list the failing tests" --output-format json
```
<!-- {: data-highlight="--output-format json"} -->

```bash
# Pipe logs in
cat build.log | claude -p "explain this failure"
```
<!-- {: data-highlight="-p"} -->

`--bare` skips hooks, plugins, and auto-discovered config so scripted calls start faster. It ignores OAuth credentials, so set `ANTHROPIC_API_KEY`.

See: [Headless mode](https://code.claude.com/docs/en/headless)

### Background and parallel work

```bash
claude --bg "migrate the auth tests"  # detach immediately
claude agents                         # monitor and dispatch
claude attach <id>                    # attach in this terminal
```
<!-- {: data-highlight="--bg"} -->

Inside a session, `/background` detaches it and `/batch` fans work out across worktrees.

See: [Agent view](https://code.claude.com/docs/en/agent-view)

## Also see

<!-- {: .-one-column} -->

- [Claude Code commands cheatsheet](./claude-code-commands)
- [Claude Code hooks cheatsheet](./claude-code-hooks)
- [Claude Code headless tasks cheatsheet](./claude-code-headless-tasks)
- [CLI reference](https://code.claude.com/docs/en/cli-reference) _(code.claude.com)_
- [Commands](https://code.claude.com/docs/en/commands) _(code.claude.com)_
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) _(code.claude.com)_
- [Permission modes](https://code.claude.com/docs/en/permission-modes) _(code.claude.com)_
- [Changelog](https://code.claude.com/docs/en/changelog) _(code.claude.com)_
