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

## Keyboard

### Learn these first

| Shortcut | Action |
| --- | --- |
| `prefix+c` | New tab |
| `prefix+v` / `prefix+minus` | Split right / down |
| `prefix+h/j/k/l` | Move between panes |
| `prefix+w` | Workspace navigation |
| `prefix+q` | Detach; everything keeps running |
{: .-shortcuts}

The prefix is `ctrl+b` by default; `prefix+?` lists every active binding.

[Herdr keys cheatsheet](./herdr-keys)
{: .-crosslink}

## Getting started

### Introduction
{: .-intro}

[Herdr](https://herdr.dev) is a terminal workspace manager for AI coding
agents: persistent sessions of workspaces, tabs, and panes, with agent
detection built in.

- [Herdr documentation](https://herdr.dev/docs/) _(herdr.dev)_
- [GitHub repository](https://github.com/herdrdev/herdr) _(github.com)_
- [Herdr concepts](https://herdr.dev/docs/concepts/) _(herdr.dev)_

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
herdr
```

Launch or reattach to the default session.

```bash
claude
```

Run an agent in the focused pane; Herdr detects it automatically. Use the
prefix keys to split a pane (`prefix+v`), open a tab (`prefix+c`), and
detach (`prefix+q`) — panes and agents keep running.

## Command map

### Layout

#### Workspaces and tabs

| Command | Purpose |
| --- | --- |
| `herdr workspace` | Create, focus, rename, close workspaces |
| `herdr tab` | Manage tabs inside a workspace |
{: .-shortcuts}

#### Panes and worktrees

| Command | Purpose |
| --- | --- |
| `herdr pane` | Split, run, read, move, close panes |
| `herdr worktree` | Create and open git worktrees |
{: .-shortcuts}

### Agents

| Command | Purpose |
| --- | --- |
| `herdr agent` | Start, prompt, wait on, read agents |
| `herdr integration` | Install agent integrations |
| `herdr plugin` | Install and manage workflow plugins |
{: .-shortcuts}

[Herdr agents cheatsheet](./herdr-agents)
{: .-crosslink}

### Sessions and server

#### Sessions and machines

| Command | Purpose |
| --- | --- |
| `herdr session` | Named sessions: list, attach, stop |
| `herdr machine` | Saved SSH machines |
{: .-shortcuts}

#### Server

| Command | Purpose |
| --- | --- |
| `herdr server` | Stop or reload the running server |
| `herdr status` | Show client and server state |
{: .-shortcuts}

### Utilities

| Command | Purpose |
| --- | --- |
| `herdr api` | Socket API snapshot and schema |
| `herdr notification` | Show a notification |
| `herdr update` | Update a direct install |
| `herdr channel` | Choose the stable or preview channel |
| `herdr config` | Validate or reset `config.toml` |
| `herdr completion` | Generate shell completions |
{: .-shortcuts}

## Also see

- [tmux](./tmux)
- [screen](./screen)
- [Claude Code](./claude-code)
- [Codex](./codex)
{: .-also-see}
