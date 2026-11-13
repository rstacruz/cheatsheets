---
title: OpenCode
category: Agents
updated: 2026-11-14
tier: t2
keywords:
  - AI assistant
  - CLI
  - Providers
  - Permissions
  - TUI
intro: |
  [OpenCode](https://opencode.ai/docs/) is an open source coding agent for the terminal. This reference covers sessions, providers, permissions, and configuration.
---

## Getting started

<!-- {: .-two-column} -->

### Introduction

<!-- {: .-intro} -->

[OpenCode](https://opencode.ai/docs/) is Anomaly's open source coding agent, with a terminal, desktop, and web client. This reference covers v2: the TUI, the CLI, and `opencode.jsonc`.

- [OpenCode documentation](https://opencode.ai/docs/) _(opencode.ai)_
- [GitHub repository](https://github.com/anomalyco/opencode) _(github.com)_

### Install

```bash
curl -fsSL https://opencode.ai/v2/install | bash  # macOS, Linux
brew install anomalyco/tap/opencode-v2            # Homebrew
npm install -g @opencode/cli                      # npm
bun install -g --trust @opencode/cli              # bun
```

Windows has standalone zips only; the package managers cover macOS and Linux.

See: [Intro](https://opencode.ai/docs/)

### Connect a provider

```bash
/connect                        # add a provider account
/models                         # pick a model for this session
opencode auth login anthropic   # sign in from the CLI
opencode auth list              # list connected accounts
```

Catalogs come from [models.dev](https://models.dev), so most providers work once you connect an account or export its API key.

See: [Providers](https://opencode.ai/docs/providers)

### Sessions

```bash
opencode                          # start the full-screen TUI
opencode ~/code/project           # work in another project
opencode run "explain this repo"  # one-shot: prints and exits
opencode mini                     # minimal interactive interface
opencode run --continue "go on"   # continue the latest session
```

Sessions live in the shared server's database, so every client sees them. Use `opencode session list --format json` to inspect them.

See: [CLI](https://opencode.ai/docs/cli)

## CLI reference

<!-- {: .-two-column} -->

### Commands

| Command                        | Description                   |
| ------------------------------ | ----------------------------- |
| `opencode run <prompt>`        | Send one prompt, then exit    |
| `opencode mini`                | Start the minimal interface   |
| `opencode session list`        | List saved sessions           |
| `opencode session export <id>` | Export a session as JSON      |
| ---                            | ---                           |
| `opencode auth login <name>`   | Sign in to a provider         |
| `opencode models`              | List available models         |
| `opencode mcp add <name>`      | Add an MCP server             |
| `opencode plugin list`         | List installed plugins        |
| ---                            | ---                           |
| `opencode service set <k> <v>` | Change shared server settings |
| `opencode debug paths`         | Print state and config paths  |

<!-- {: .-shortcuts} -->

See: [Commands](https://opencode.ai/docs/cli/commands)

### Run flags

| Flag                       | Description                          |
| -------------------------- | ------------------------------------ |
| `--model <provider/model>` | Choose the model for this run        |
| `--agent <name>`           | Run as a specific agent              |
| `--session <id>`           | Continue a session by ID             |
| `--continue`               | Continue the latest session          |
| ---                        | ---                                  |
| `--file <path>`            | Attach a file to the prompt          |
| `--format json`            | Emit newline-delimited JSON          |
| `--auto`                   | Auto-approve anything not denied     |
| `--archived`               | Keep the session out of lists        |
| `--standalone`             | Run on a private server              |

<!-- {: .-shortcuts} -->

See: [run](https://opencode.ai/docs/cli/commands#run)

### Shared server

```bash
opencode --standalone                # private server
opencode --server http://localhost:4096
opencode service set disabled true   # stop the shared service
```

One background server per user owns sessions and tools. `--standalone` gives a run its own server, which is what CI needs.

See: [Background service](https://opencode.ai/docs/cli#background-service)

## Slash commands

<!-- {: .-two-column} -->

### Session

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `/new`            | Start a new session                  |
| `/sessions`       | Return to a saved session            |
| `/undo`           | Revert the last message and its work |
| `/redo`           | Restore the reverted work            |
| ---               | ---                                  |
| `/compact`        | Summarize to free up context         |
| `/btw <question>` | Ask a side question                  |
| `/editor`         | Edit the prompt in `$EDITOR`         |
| `/highlights`     | Replay the release notes             |

<!-- {: .-shortcuts} -->

`/btw` answers from the session's context without adding to it. `Esc` interrupts a run; the reverted prompt returns to the composer.

See: [TUI](https://opencode.ai/docs/cli/tui)

### Setup

| Command    | Description                         |
| ---------- | ----------------------------------- |
| `/connect` | Add a provider account              |
| `/models`  | Choose the session model            |
| `/agents`  | Choose the session agent            |
| `/mcps`    | Inspect servers and sign in         |

<!-- {: .-shortcuts} -->

See: [MCP servers](https://opencode.ai/docs/mcp-servers)

### Custom commands

```md
---
description: Review code for correctness
agent: plan
---

Review $ARGUMENTS. Report bugs first.
```

Files in `.opencode/commands/` become `/name`; nesting makes `/team/review`. `$1` and `$2` take positional arguments, and `` !`git diff` `` inserts shell output before the prompt is submitted.

See: [Commands](https://opencode.ai/docs/commands)

## Interactive mode

<!-- {: .-two-column} -->

### Leader keys

| Shortcut     | Action                          |
| ------------ | ------------------------------- |
| `Ctrl+X`     | Leader key for everything below |
| `Ctrl+X` `N` | New session                     |
| `Ctrl+X` `L` | List sessions                   |
| `Ctrl+X` `M` | Choose a model                  |
| `Ctrl+X` `A` | Choose an agent                 |
| ---          | ---                             |
| `Ctrl+X` `E` | Edit the prompt in `$EDITOR`    |
| `Ctrl+X` `U` | Undo the last message           |
| `Ctrl+X` `R` | Redo                            |
| `Ctrl+X` `C` | Compact the session             |

<!-- {: .-shortcuts} -->

See: [TUI](https://opencode.ai/docs/cli/tui)

### Other keys

| Shortcut    | Action                          |
| ----------- | ------------------------------- |
| `Ctrl+P`    | Command palette                 |
| `Ctrl+O`    | Recent sessions and projects    |
| `Shift+Tab` | Cycle agents                    |
| `F2`        | Cycle recent models             |
| `Ctrl+Tab`  | Next session tab                |
| `Ctrl+B`    | Background blocking tools       |
| `Esc`       | Interrupt the session           |

<!-- {: .-shortcuts} -->

See: [Keybinds](https://opencode.ai/docs/cli/keybinds)

### Input modes

| Input | Effect                             |
| ----- | ---------------------------------- |
| `@`   | Attach a file, with an optional range |
| `!`   | Run a shell command in the session |
| `/`   | Run a slash command                |

<!-- {: .-shortcuts} -->

`@src/auth.ts#20-45` attaches a line range. `Enter` steers a running session; `Ctrl+X` then `Enter` queues the prompt for later. For a newline, use `Ctrl+J` or `Shift+Enter`.

See: [TUI](https://opencode.ai/docs/cli/tui)

### Diff viewer

| Key        | Action                                      |
| ---------- | ------------------------------------------- |
| `d`        | Switch source: all, committed, working, last turn |
| `m`        | Mark the file reviewed                      |
| `n` / `p`  | Next or previous file                       |
| `v`        | Toggle split or unified view                |
| `]` / `[`  | Next or previous hunk                       |
| `b`        | Toggle the file tree                        |

<!-- {: .-shortcuts} -->

Open it with `/diff`. The source choice lasts until the TUI exits; set a default with `diffs.source` in `cli.json`.

See: [Keybinds](https://opencode.ai/docs/cli/keybinds#diff-viewer)

### Rebinding

```json
{
  "keybinds": {
    "leader": "ctrl+space",
    "model.list": "<leader>m",
    "app.debug": "none"
  }
}
```

<!-- {: data-line="3"} -->

Bindings live in `~/.config/opencode/cli.json`, keyed by the IDs in the keybind table. `"none"` or `false` disables one, and `leader` rebinds the prefix.

See: [Keybinds](https://opencode.ai/docs/cli/keybinds)

## Configuration

<!-- {: .-two-column} -->

### Config files

```bash
~/.config/opencode/opencode.jsonc  # global, every project
opencode.jsonc                     # project root, committed
.opencode/opencode.jsonc           # project, beats both above
/etc/opencode/opencode.json        # system, highest priority
```

Every `.opencode` config overrides every direct config; the system directory outranks both. TUI settings live in `~/.config/opencode/cli.json`.

See: [Config](https://opencode.ai/docs/config)

### Providers and models

```json
{
  "model": "anthropic/claude-sonnet-5-5",
  "providers": {
    "acme": {
      "env": ["ACME_API_KEY"],
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": { "baseURL": "https://llm.acme/v1" },
      "models": { "qwen3-coder": {} }
    }
  }
}
```

<!-- {: data-line="2,6"} -->

References are `provider/model`, with an optional `#variant` for reasoning effort. `package` reaches any OpenAI-compatible endpoint; catalog providers only need `/connect`.

See: [Providers](https://opencode.ai/docs/providers)

### Agents

| Agent     | Mode       | Purpose                          |
| --------- | ---------- | -------------------------------- |
| `build`   | `primary`  | Default coding agent             |
| `plan`    | `primary`  | Plans without editing files      |
| `general` | `subagent` | Research and multi-step work     |
| `explore` | `subagent` | Search and read, never edit      |

Markdown agents live in `.opencode/agents/` or `~/.config/opencode/agents/`:

```md
---
description: Reviews changes for correctness
mode: subagent
model: anthropic/claude-sonnet-5-5#high
---

Review the current changes.
```

<!-- {: data-line="3"} -->

The body becomes the system prompt. Subagents run in background child sessions and report back when idle.

See: [Agents](https://opencode.ai/docs/agents)

### Permissions

```json
{
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" }
  ]
}
```

<!-- {: data-line="4"} -->

Rules evaluate in order and the last match wins, so exceptions follow the broad rule. Anything unmatched asks. Agents start with everything allowed except `.env` reads.

Actions are `shell`, `edit`, `read`, `subagent`, `skill`, `webfetch`, and `external_directory`. V2 renamed v1's `permission`, `bash`, and `task`.

See: [Permissions](https://opencode.ai/docs/permissions)

### Instructions

```bash
~/.config/opencode/AGENTS.md  # every project
AGENTS.md                     # project, committed
packages/web/AGENTS.md        # loads when that area is read
```

Files combine from the global one down to the workspace; nested files load as the agent explores. V2 reads `AGENTS.md` only, not `CLAUDE.md`.

See: [Instructions](https://opencode.ai/docs/instructions)

### MCP servers

```bash
opencode mcp add context7 --url https://mcp.context7.com/mcp
opencode mcp add files --global -- npx -y @acme/mcp-files
opencode mcp list
```

Remote servers use OAuth by default; run `/mcps` to finish a sign-in. Servers live under `mcp.servers` in the config.

See: [MCP servers](https://opencode.ai/docs/mcp-servers)

## Common workflows

<!-- {: .-two-column} -->

### Reviewing code

```bash
git diff | opencode run "review this diff for bugs"
opencode run --file src/auth.ts "review error handling"
```

In the TUI, `/diff` opens the diff viewer and `m` marks files reviewed. `/undo` reverts a turn and the edits it made.

See: [TUI](https://opencode.ai/docs/cli/tui)

### Scripting and CI

```bash
opencode run --format json "list the TODO comments" | jq
opencode run --archived "review this diff"
ANTHROPIC_API_KEY=$KEY opencode run --standalone "triage bugs"
```

`--standalone` starts a private server, so a CI secret reaches it. An `--archived` session still exists; it just stays out of lists.

See: [run](https://opencode.ai/docs/cli/commands#run)

### Undo and snapshots

```bash
/undo     # stage a rollback of the last message and its edits
/redo     # cancel the staged rollback and restore the work
```

`/undo` puts the prompt back in the composer; submitting it commits the rollback. Snapshots capture filesystem state, so files return too. Turn them off with `"snapshots": false`.

See: [Snapshots](https://opencode.ai/docs/snapshots)

## Also see

<!-- {: .-one-column} -->

- [CLI commands](https://opencode.ai/docs/cli/commands) _(opencode.ai)_
- [Config](https://opencode.ai/docs/config) _(opencode.ai)_
- [Providers](https://opencode.ai/docs/providers) _(opencode.ai)_
- [Agents](https://opencode.ai/docs/agents) _(opencode.ai)_
- [Permissions](https://opencode.ai/docs/permissions) _(opencode.ai)_
- [Migrate from V1](https://opencode.ai/docs/migrate-v1) _(opencode.ai)_
- [Changelog](https://opencode.ai/changelog) _(opencode.ai)_

[Claude Code cheatsheet](./claude-code)
<!-- {: .-crosslink} -->

[Codex cheatsheet](./codex)
<!-- {: .-crosslink} -->
