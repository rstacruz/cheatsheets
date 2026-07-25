---
title: Herdr
category: CLI
updated: 2026-07-25
keywords:
  - terminal multiplexer
  - coding agents
  - panes
  - workspaces
  - pi
---

## Getting started
{: .-three-column}

### Start or reattach

```sh
herdr
herdr --session project-name
```

Starts a session or reattaches to a persistent one.

### Inspect status

```sh
herdr status
herdr session list
herdr pane list
herdr agent list
```

### Stop a session

```sh
herdr server stop
```

Stopping a server ends its panes and agents.

## Panes and tabs
{: .-three-column}

### Split a pane

```sh
herdr pane split --current --direction right
herdr pane split --current --direction down
```

### Create a tab

```sh
herdr tab create --label tests
```

### Run and inspect

```sh
herdr pane run w1:p2 'pnpm test'
herdr pane read w1:p2 --source recent-unwrapped --lines 80
herdr pane wait-output w1:p2 --match 'ready' --timeout 60000
```

Use `wait-output` for ordinary commands and dev servers.

## Agents
{: .-three-column}

### Start an agent

```sh
herdr agent start reviewer --kind pi --pane w1:p2
herdr agent start reviewer --kind codex --pane w1:p2
```

The target pane must be at an interactive shell prompt.

### Prompt and wait

```sh
herdr agent prompt reviewer 'Review the current diff.' --wait --until done --timeout 120000
herdr agent read reviewer --source recent-unwrapped --lines 120
herdr agent wait reviewer --until done --timeout 120000
```

Use agent waits only for recognized coding agents.

### Pi integration

```sh
herdr integration install pi
herdr integration status
```

The integration reports Pi states: `working`, `blocked`, and `idle`.

## Keyboard
{: .-three-column}

### Prefix and help

```text
C-b ?       Show active bindings
C-b q       Detach; keep agents running
```

The default prefix is `C-b` (Ctrl-b).

### Panes

```text
C-b v       Split right
C-b -       Split down
C-b h/j/k/l Move left/down/up/right
C-b z       Zoom focused pane
C-b x       Close focused pane
C-b r       Resize mode
C-b [       Copy mode
```

### Tabs and workspaces

```text
C-b c       New tab
C-b n/p     Next/previous tab
C-b 1..9    Jump to tab
C-b w       Workspace navigation
C-b N       New workspace
C-b g       Goto picker
C-b b       Toggle sidebar
```

## Configuration

```toml
# ~/.config/herdr/config.toml
[keys]
prefix = "ctrl+a"
```

```sh
herdr server reload-config
herdr --default-config
```

See: [Herdr documentation](https://herdr.dev/docs/) _(herdr.dev)_
