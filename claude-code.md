---
title: Claude Code
category: Agents
tags: [Featured]
updated: 2026-11-11
tier: t1
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Permission modes
  - Keyboard shortcuts
intro: |
  [Claude Code](https://code.claude.com/docs/en/overview) is Anthropic's AI coding assistant for the terminal. This reference covers the most commonly used commands, flags, and settings.
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
npm install -g @anthropic-ai/claude-code        # npm, Node 22+
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

<!-- {: .-shortcuts} -->

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

<!-- {: .-shortcuts} -->

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Flags

| Flag                      | Description                       |
| ------------------------- | --------------------------------- |
| `-c, --continue`          | Continue most recent conversation |
| `-r, --resume`            | Resume a session by ID or name    |
| ------------------------- | --------------------------------- |
| `--model sonnet`          | Choose the model                  |
| `--effort high`           | Set reasoning effort              |
| `--fallback-model sonnet` | Fall back when overloaded         |
| ------------------------- | --------------------------------- |
| `--permission-mode plan`  | Start in a permission mode        |
| `--add-dir ../lib`        | Add extra working directories     |
| `--verbose`               | Show full turn-by-turn output     |

<!-- {: .-shortcuts} -->

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Other flags

| Flag                             | Description                       |
| -------------------------------- | --------------------------------- |
| `--debug`                        | Enable debug mode                 |
| `--settings file.json`           | Load settings for this session    |
| `--ide`                          | Auto-connect to your IDE          |
| `-w, --worktree`                 | Start in an isolated git worktree |
| `--dangerously-skip-permissions` | Skip all permission prompts       |
| `--safe-mode`                    | Start with customizations off     |

<!-- {: .-shortcuts} -->

See: [CLI reference](https://code.claude.com/docs/en/cli-reference)

### Headless mode

| Flag                   | Description                      |
| ---------------------- | -------------------------------- |
| `-p, --print`          | Print the response and exit      |
| `--output-format json` | `text`, `json`, or `stream-json` |
| `--json-schema schema` | Constrain output to a schema     |
| `--max-turns 3`        | Limit agentic turns              |
| `--max-budget-usd 5`   | Stop the run at a spend cap      |
| `--bare`               | Skip hooks, plugins, and memory  |

<!-- {: .-shortcuts} -->

See: [Headless mode](https://code.claude.com/docs/en/headless)

## Slash commands

<!-- {: .-two-column} -->

### Session

#### Conversation

| Command    | Description                  |
| ---------- | ---------------------------- |
| `/help`    | Show available commands      |
| `/clear`   | Start a new conversation     |
| `/compact` | Summarize to free up context |
| `/context` | Show context window usage    |

<!-- {: .-shortcuts} -->

#### Planning

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `/plan`             | Enter plan mode              |
| `/goal <condition>` | Keep working until it is met |
| `/btw <question>`   | Ask a side question          |

<!-- {: .-shortcuts} -->

#### History

| Command   | Description                     |
| --------- | ------------------------------- |
| `/resume` | Resume a previous conversation  |
| `/rewind` | Restore code and conversation   |
| `/branch` | Branch the conversation here    |
| `/export` | Export the conversation as text |

<!-- {: .-shortcuts} -->

#### Usage

| Command   | Description                      |
| --------- | -------------------------------- |
| `/status` | Show version, model, and account |
| `/usage`  | Show cost and plan limits        |

<!-- {: .-shortcuts} -->

See: [Commands](https://code.claude.com/docs/en/commands)

### Setup

#### Settings

| Command   | Description                  |
| --------- | ---------------------------- |
| `/config` | Open settings or set a value |
| `/model`  | Switch the AI model          |
| `/effort` | Set reasoning effort         |
| `/memory` | Edit memory files            |

<!-- {: .-shortcuts} -->

#### Project

| Command        | Description                  |
| -------------- | ---------------------------- |
| `/init`        | Generate a starter CLAUDE.md |
| `/permissions` | Allow, ask, and deny rules   |
| `/mcp`         | Manage MCP connections       |
| `/hooks`       | View hook configurations     |
| `/doctor`      | Run a setup checkup          |

<!-- {: .-shortcuts} -->

#### Account

| Command   | Description             |
| --------- | ----------------------- |
| `/login`  | Sign in to your account |
| `/logout` | Sign out                |
| `/exit`   | Exit the CLI (`/quit`)  |

<!-- {: .-shortcuts} -->

See: [Commands](https://code.claude.com/docs/en/commands)

## Review and background work

<!-- {: .-two-column} -->

### Review

#### Changes

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `/diff`            | Review working-tree changes      |
| `/code-review`     | Review the diff, a PR, or a path |
| `/security-review` | Scan changes for vulnerabilities |

<!-- {: .-shortcuts} -->

`/review` is an alias of `/code-review`, which takes an effort level, `--fix`, and a PR number.

See: [Review locally with /code-review](https://code.claude.com/docs/en/code-review-local)

### Background work

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `/background`     | Detach this session as a background agent |
| `/fork`           | Copy it into a new background session    |
| `/subtask <task>` | Run a task in a forked subagent          |
| `/tasks`          | View and manage background work          |

<!-- {: .-shortcuts} -->

See: [Agent view](https://code.claude.com/docs/en/agent-view)

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
| `Ctrl+T` | Toggle Claude's task list    |

<!-- {: .-shortcuts} -->

On macOS, use `Option` instead of `Alt`; some chords need Option mapped to Meta.

See: [Interactive mode](https://code.claude.com/docs/en/interactive-mode)

### Input modes

| Input | Effect                          |
| ----- | ------------------------------- |
| `/`   | Slash commands and skills       |
| `!`   | Run a shell command directly    |
| `@`   | Mention a file path             |
| `:`   | Insert an emoji by shortcode    |
| `?`   | Show the shortcut help panel    |

<!-- {: .-shortcuts} -->

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

<!-- {: .-shortcuts} -->

Settings files can also set env vars under an `env` key. See: [Environment variables](https://code.claude.com/docs/en/env-vars)

### Memory

```bash
CLAUDE.md             # project instructions, committed
CLAUDE.local.md       # personal notes, not committed
.claude/rules/*.md    # topic rules, optionally path-scoped
~/.claude/CLAUDE.md   # instructions for all your projects
```

`/init` generates a project CLAUDE.md; `/memory` edits memory files and auto memory. Import files with `@path/to/file.md`. See: [Memory](https://code.claude.com/docs/en/memory)

### Permission modes

| Mode                | What runs without asking                |
| ------------------- | --------------------------------------- |
| `default`           | Reads only (labeled Manual)             |
| `acceptEdits`       | Reads, file edits, filesystem commands  |
| `plan`              | Reads, until you approve a plan         |
| `auto`              | Everything, with safety checks          |
| `dontAsk`           | Pre-approved tools only; rest denied    |
| `bypassPermissions` | Everything                              |

<!-- {: .-shortcuts} -->

`auto` is the built-in starting mode; `Shift+Tab` cycles modes in a session. A classifier can still block actions, and explicit ask rules still prompt. See: [Permission modes](https://code.claude.com/docs/en/permission-modes)

## Common workflows

<!-- {: .-two-column} -->

### Reviewing code

```bash
git diff | claude -p "review this diff for bugs"
claude -p "check src/ for security issues"
```

In a session, `/code-review` reviews the diff, `/code-review 1234` a pull request, and `/security-review` scans for vulnerabilities.

See: [Review locally with /code-review](https://code.claude.com/docs/en/code-review-local)

### Scripting

```bash
# One-shot JSON output for scripts
claude -p "list the failing tests" --output-format json

# Pipe logs in
cat build.log | claude -p "explain this failure"
```

<!-- {: data-line="2,5"} -->

`--bare` skips hooks, plugins, and auto-discovered config so scripted calls start faster. It ignores OAuth credentials, so set `ANTHROPIC_API_KEY`.

See: [Headless mode](https://code.claude.com/docs/en/headless)

### Background and parallel work

```bash
claude --bg "migrate the auth tests"  # detach immediately
claude agents                         # monitor and dispatch
```

Inside a session, `/background` detaches it and `/batch` fans work out across worktrees.

See: [Agent view](https://code.claude.com/docs/en/agent-view)

## Also see

<!-- {: .-one-column} -->

- [CLI reference](https://code.claude.com/docs/en/cli-reference) _(code.claude.com)_
- [Commands](https://code.claude.com/docs/en/commands) _(code.claude.com)_
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) _(code.claude.com)_
- [Permission modes](https://code.claude.com/docs/en/permission-modes) _(code.claude.com)_
- [Changelog](https://code.claude.com/docs/en/changelog) _(code.claude.com)_
