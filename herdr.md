---
title: Herdr
category: AI
updated: 2026-10-06
keywords:
  - terminal workspace manager
  - AI coding agents
  - terminal multiplexer
  - workspaces
  - panes
intro: |
  [Herdr](https://herdr.dev) is a terminal workspace manager for AI coding
  agents. This reference covers the core concepts, command groups, and
  keyboard.
---

## Getting started

### Introduction
{: .-intro}

[Herdr](https://herdr.dev) is a terminal workspace manager for AI coding
agents: persistent sessions of workspaces, tabs, and panes, with agent
detection built in.

- [Herdr documentation](https://herdr.dev/docs/) _(herdr.dev)_
- [GitHub repository](https://github.com/herdrdev/herdr) _(github.com)_
- [Herdr concepts](https://herdr.dev/docs/concepts/) _(herdr.dev)_

### Install

```bash
curl -fsSL https://herdr.dev/install.sh | sh    # Linux/macOS
irm https://herdr.dev/install.ps1 | iex         # Windows (PowerShell)
brew install herdr                              # Homebrew
mise use -g herdr                               # mise
nix profile install github:herdrdev/herdr/v0.9.3  # Nix
```

On Windows, run the PowerShell line via
`powershell -ExecutionPolicy Bypass -c`. `herdr update` handles direct
installs; brew, mise, and Nix installs update through their package manager.

### Concepts

```
session
└── w1            workspace   project container (one repo or task)
    ├── w1:t1     tab         layout: agents, logs, server, review
    │   ├── w1:p1 pane        a real terminal; can host an agent
    │   └── w1:p2 pane
    └── w1:t2     tab
```
{: .-box-chars}

A pane is a real terminal, preserved across client detach. An agent is a
process Herdr recognizes inside a pane. A session is a persistent server
namespace; `herdr` attaches to the default session. Public IDs are opaque
handles: `w1`, `w1:t1`, `w1:p1`.

```bash
herdr session list                 # persistent server namespaces
herdr workspace list               # w1, w2, ...
herdr tab list --workspace w1      # w1:t1, w1:t2, ...
herdr pane list --workspace w1     # w1:p1, w1:p2, ...
herdr pane current --current       # the calling pane's ID
```

### Quick start

```bash
herdr                             # launch, or reattach to the session
herdr pane split --current --direction right --cwd "$PWD"
herdr agent start reviewer --kind codex --pane <pane-id>
herdr agent prompt reviewer "Review the current diff." --wait
herdr agent read reviewer --source recent-unwrapped --lines 120
```

Creation commands return the new IDs as JSON; read
`.result.pane.pane_id`, `.result.workspace.workspace_id`, or
`.result.tab.tab_id` from the response. Press `prefix+q` to detach; panes
and agents keep running.

## Command map

### Commands

| Group                   | Purpose                                |
| ----------------------- | -------------------------------------- |
| `herdr workspace`       | Create, focus, rename, close workspaces |
| `herdr tab`             | Manage tabs inside a workspace         |
| `herdr pane`            | Split, run, read, move, close panes    |
| `herdr agent`           | Start, prompt, wait on, read agents    |
| `herdr worktree`        | Create and open git worktrees          |
| ---                     | ---                                    |
| `herdr session`         | Named sessions: list, attach, stop     |
| `herdr integration`     | Install agent integrations             |
| `herdr plugin`          | Install and manage workflow plugins    |
| `herdr machine`         | Saved SSH machines                     |
| `herdr api`             | Socket API snapshot and schema         |
| `herdr notification`    | Show a notification                    |
| ---                     | ---                                    |
| `herdr server`          | Stop or reload the running server      |
| `herdr status`          | Show client and server state           |
| `herdr update`          | Update a direct install                |
| `herdr channel`         | Choose the stable or preview channel   |
| `herdr config`          | Validate or reset `config.toml`        |
| `herdr completion`      | Generate shell completions             |
{: .-shortcuts}

Most commands return JSON on stdout; read IDs and state from the response,
never from sidebar order. Server errors are JSON on stderr with exit status
1; CLI syntax errors exit with status 2.

### Keyboard

```text
prefix+c        new tab
prefix+v        split right
prefix+minus    split down
prefix+h/j/k/l  move between panes
prefix+q        detach; everything keeps running
```

The prefix is `ctrl+b` by default; `prefix+?` lists every active binding.

[Herdr keys cheatsheet](./herdr-keys)
{: .-crosslink}

### Agents

```bash
herdr agent list
herdr agent start reviewer --kind codex --pane w1:p2
herdr agent prompt reviewer "Review the current diff." --wait
herdr agent wait reviewer --until blocked
herdr agent read reviewer --source recent-unwrapped --lines 120
```

[Herdr agents cheatsheet](./herdr-agents)
{: .-crosslink}

## Also see

- [tmux](./tmux)
- [screen](./screen)
- [Claude Code](./claude-code)
- [Codex](./codex)
{: .-also-see}
