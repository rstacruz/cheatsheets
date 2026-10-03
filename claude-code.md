---
title: Claude Code
category: AI
tags: [Featured]
updated: 2026-10-03
keywords:
  - AI assistant
  - CLI
  - Slash commands
  - Permission modes
  - Keyboard shortcuts
intro: |
  [Claude Code](https://code.claude.com/docs) is Anthropic's AI coding assistant for the terminal. This reference covers sessions, commands, flags, and configuration.
---

## Getting started
{: .-two-column}

### Introduction
{: .-intro}

[Claude Code](https://code.claude.com/docs) is Anthropic's AI coding assistant for the terminal. This reference covers the most commonly used commands, flags, and settings.

- [Claude Code documentation](https://code.claude.com/docs) _(code.claude.com)_
- [GitHub repository](https://github.com/anthropics/claude-code) _(github.com)_

### Install

```bash
curl -fsSL https://claude.ai/install.sh | bash  # native install
brew install --cask claude-code                 # Homebrew (macOS, Linux)
npm install -g @anthropic-ai/claude-code        # npm (deprecated)
```

On Windows: `irm https://claude.ai/install.ps1 | iex` in PowerShell, or `winget install Anthropic.ClaudeCode`.

### Sign in

```bash
claude              # first run opens a browser login
claude auth login   # sign in again
claude auth status  # show the current account
```

Claude Code needs a Pro, Max, Team, or Enterprise plan, a Console account, or a cloud provider (Amazon Bedrock, Google Cloud, or Microsoft Foundry). `ANTHROPIC_API_KEY` also works.

### Sessions

```bash
claude                        # start interactive session
claude "explain this repo"    # start with a prompt
claude -p "summarize README"  # print mode: answer and exit
git diff | claude -p "review this diff"
```

Use `claude -c` to continue the last conversation, or `claude -r "auth-refactor"` to resume one by name. See: [Quickstart](https://code.claude.com/docs/en/quickstart)

## CLI reference
{: .-two-column}

### Commands

#### Sessions

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `claude`              | Start interactive session         |
| `claude "query"`      | Start with an initial prompt      |
| `claude -p "query"`   | Print response and exit           |
| `claude -c`           | Continue most recent conversation |
| `claude -r <session>` | Resume a session by ID or name    |
{: .-shortcuts}

#### Setup

| Command              | Description                |
| -------------------- | -------------------------- |
| `claude update`      | Update to latest version   |
| `claude doctor`      | Check install and settings |
| `claude mcp`         | Configure MCP servers      |
| `claude auth status` | Show authentication status |
| `claude setup-token` | Generate a token for CI    |
{: .-shortcuts}

### Flags

| Flag                      | Description                       |
| ------------------------- | --------------------------------- |
| `-p, --print`             | Print response and exit           |
| `-c, --continue`          | Continue most recent conversation |
| `-r, --resume`            | Resume a session by ID or name    |
| ------------------------- | --------------------------------- |
| `--model sonnet`          | Choose the model                  |
| `--effort high`           | Set reasoning effort              |
| ------------------------- | --------------------------------- |
| `--permission-mode plan`  | Start in a permission mode        |
| `--add-dir ../lib`        | Add extra working directories     |
| `--verbose`               | Show full turn-by-turn output     |
{: .-shortcuts}

### Other flags

| Flag                             | Description                       |
| -------------------------------- | --------------------------------- |
| `--debug`                        | Enable debug mode                 |
| `--settings file.json`           | Load settings for this session    |
| `--ide`                          | Auto-connect to your IDE          |
| `-w, --worktree`                 | Start in an isolated git worktree |
| `--dangerously-skip-permissions` | Skip all permission prompts       |
{: .-shortcuts}

## Slash commands
{: .-two-column}

### Session

#### Conversation

| Command    | Description                  |
| ---------- | ---------------------------- |
| `/help`    | Show available commands      |
| `/clear`   | Start a new conversation     |
| `/compact` | Summarize to free up context |
| `/context` | Show context window usage    |
{: .-shortcuts}

#### History

| Command   | Description                     |
| --------- | ------------------------------- |
| `/resume` | Resume a previous conversation  |
| `/rewind` | Restore code and conversation   |
| `/export` | Export the conversation as text |
{: .-shortcuts}

#### Usage

| Command   | Description                      |
| --------- | -------------------------------- |
| `/status` | Show version, model, and account |
| `/usage`  | Show cost and plan limits        |
{: .-shortcuts}

### Setup

#### Settings

| Command   | Description                  |
| --------- | ---------------------------- |
| `/config` | Open settings or set a value |
| `/model`  | Switch the AI model          |
| `/effort` | Set reasoning effort         |
| `/memory` | Edit memory files            |
{: .-shortcuts}

#### Project

| Command        | Description                  |
| -------------- | ---------------------------- |
| `/init`        | Generate a starter CLAUDE.md |
| `/permissions` | Manage permission rules      |
| `/mcp`         | Manage MCP connections       |
| `/doctor`      | Run a setup checkup          |
{: .-shortcuts}

#### Account

| Command   | Description             |
| --------- | ----------------------- |
| `/login`  | Sign in to your account |
| `/logout` | Sign out                |
{: .-shortcuts}

### Review

#### Changes

| Command   | Description                      |
| --------- | -------------------------------- |
| `/diff`   | Review working-tree changes      |
| `/review` | Review changes or a pull request |
{: .-shortcuts}

#### Security

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `/security-review` | Scan changes for vulnerabilities |
{: .-shortcuts}

## Interactive mode
{: .-two-column}

### Keyboard shortcuts

#### Session

| Shortcut    | Description                       |
| ----------- | --------------------------------- |
| `Ctrl+C`    | Interrupt, or clear the input     |
| `Ctrl+D`    | Exit Claude Code                  |
| `Esc`       | Interrupt Claude, or close dialogs |
| `Esc` `Esc` | Clear the draft, or rewind        |
| `Ctrl+B`    | Background running tasks          |
{: .-shortcuts}

#### Prompt

| Shortcut    | Description                       |
| ----------- | --------------------------------- |
| `Shift+Tab` | Cycle permission modes            |
| `Alt+P`     | Switch model                      |
| `Alt+T`     | Toggle extended thinking          |
| `Ctrl+V`    | Paste an image from the clipboard |
{: .-shortcuts}

#### Display

| Shortcut | Description                  |
| -------- | ---------------------------- |
| `Ctrl+L` | Redraw the screen            |
| `Ctrl+R` | Search prompt history        |
| `Ctrl+O` | Toggle the transcript viewer |
{: .-shortcuts}

On macOS, use `Option` instead of `Alt`.

### Input modes

| Input | Effect                          |
| ----- | ------------------------------- |
| `/`   | Slash commands and skills       |
| `!`   | Run a shell command directly    |
| `@`   | Mention a file path             |
| `:`   | Insert an emoji by shortcode    |
| `?`   | Show the shortcut help panel    |
{: .-shortcuts}

For a newline without sending, press `\` + `Enter` or `Ctrl+J` — both work in any terminal. `Shift+Enter` works in many terminals; run `/terminal-setup` if it doesn't.

## Configuration
{: .-two-column}

### Settings files

```bash
~/.claude/settings.json      # user settings
.claude/settings.json        # project settings, committed
.claude/settings.local.json  # personal project settings
```

Run `/config` to edit settings, or pass `--settings file.json` for one session. See: [Settings](https://code.claude.com/docs/en/settings)

### Environment variables

| Variable                       | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `ANTHROPIC_API_KEY`            | API key used instead of a subscription |
| `ANTHROPIC_MODEL`              | Default model name                 |
| `ANTHROPIC_BASE_URL`           | Route requests through a gateway   |
| `API_TIMEOUT_MS`               | API timeout (default 600000)       |
| `BASH_DEFAULT_TIMEOUT_MS`      | Bash tool timeout (default 120000) |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Turn auto memory off            |
| `DISABLE_AUTOUPDATER`          | Turn background updates off        |

Settings files can also set env vars under an `env` key. See: [Environment variables](https://code.claude.com/docs/en/env-vars)

### Memory

```bash
CLAUDE.md             # project instructions, committed
CLAUDE.local.md       # personal project notes, not committed
~/.claude/CLAUDE.md   # instructions for all your projects
```

`/init` generates a project CLAUDE.md; `/memory` edits memory files and auto memory. Import files with `@path/to/file.md`. See: [Memory](https://code.claude.com/docs/en/memory)

## Common workflows
{: .-two-column}

### Reviewing code

```bash
git diff | claude -p "review this diff for bugs"
claude -p "check src/ for security issues"
```

Inside a session, `/review` reviews the current diff and `/security-review` scans it for vulnerabilities.

### Scripting

```bash
# One-shot JSON output for scripts
claude -p "list the failing tests" --output-format json

# Pipe logs in
cat build.log | claude -p "explain this failure"
```
{: data-line="2,5"}

## Also see
{: .-one-column}

- [CLI reference](https://code.claude.com/docs/en/cli-reference) _(code.claude.com)_
- [Commands](https://code.claude.com/docs/en/commands) _(code.claude.com)_
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) _(code.claude.com)_
- [Changelog](https://code.claude.com/docs/en/changelog) _(code.claude.com)_
