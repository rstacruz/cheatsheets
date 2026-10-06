---
title: Herdr keys
category: AI
updated: 2026-10-06
keywords:
  - keyboard shortcuts
  - keybindings
  - prefix mode
  - copy mode
  - terminal multiplexer
intro: |
  [Herdr](https://herdr.dev) drives its terminal workspace from the
  keyboard through a prefix key. This reference covers the default
  bindings, navigate and copy modes, and custom keybindings.
---

## Keyboard

### Introduction
{: .-intro}

[Herdr](https://herdr.dev) is mouse-native; keyboard control is optional.
This reference covers the prefix, default bindings, navigate and copy
modes, and custom keybindings.

- [Keyboard](https://herdr.dev/docs/keyboard/) _(herdr.dev)_
- [Configuration](https://herdr.dev/docs/configuration/) _(herdr.dev)_

### Prefix

```toml
[keys]
prefix = "ctrl+a"              # or ["ctrl+space", "ctrl+s"]
```

Herdr reserves one key instead of dozens. Press it (default `ctrl+b`),
release, then press an action key: `prefix+c` is `ctrl+b`, then `c`.
`prefix+?` lists every active binding; `/` filters that list.

[Herdr cheatsheet](./herdr)
{: .-crosslink}

### Learn these first

| Shortcut | Action |
| --- | --- |
| `prefix+c` | New tab |
| `prefix+v` / `prefix+minus` | Split right / down |
| `prefix+h/j/k/l` | Move between panes |
| `prefix+w` | Workspace navigation |
| `prefix+q` | Detach; everything keeps running |
{: .-shortcuts}

## Default bindings

### Panes

| Shortcut | Action |
| --- | --- |
| `prefix+v` | Split pane right |
| `prefix+minus` | Split pane down |
| `prefix+h/j/k/l` | Focus pane left/down/up/right |
| `prefix+tab` / `prefix+shift+tab` | Cycle panes |
| --- | --- |
| `prefix+z` | Zoom the focused pane |
| `prefix+shift+h/j/k/l` | Swap panes |
| `prefix+x` | Close pane |
| `prefix+r` | Enter resize mode |
| --- | --- |
| `prefix+shift+p` | Rename pane |
| `prefix+e` | Edit scrollback in `$EDITOR` |
| `prefix+[` | Enter copy mode |
{: .-shortcuts}

### Tabs

| Shortcut | Action |
| --- | --- |
| `prefix+c` | New tab |
| `prefix+n` / `prefix+p` | Next / previous tab |
| `prefix+1..9` | Switch to tab 1–9 |
| `prefix+shift+t` | Rename tab |
| `prefix+shift+x` | Close tab |
{: .-shortcuts}

### Workspaces and session

| Shortcut | Action |
| --- | --- |
| `prefix+shift+n` | New workspace |
| `prefix+w` | Navigate workspaces |
| `prefix+g` | Goto picker (session navigator) |
| `prefix+b` | Toggle sidebar |
| --- | --- |
| `prefix+shift+w` | Rename workspace |
| `prefix+shift+d` | Close workspace |
| `prefix+shift+g` | New git worktree |
| `prefix+q` | Detach; server and agents keep running |
{: .-shortcuts}

### Other

| Shortcut | Action |
| --- | --- |
| `prefix+?` | Keybinding help |
| `prefix+s` | Settings |
| `prefix+shift+r` | Reload config |
| `prefix+o` | Open the notification target |
{: .-shortcuts}

Unset by default: `previous_workspace`, `next_workspace`, `previous_agent`,
`next_agent`, `focus_agent`, `switch_workspace`, `last_pane`, `clear_pane`,
`open_worktree`, `remove_worktree`, `move_tab_previous`, `move_tab_next`,
and `resize_pane_*`.

[Herdr agents cheatsheet](./herdr-agents)
{: .-crosslink}

## Navigate mode

### Movement

| Key | Action |
| --- | --- |
| `up` / `down` | Move the workspace selection |
| `h` / `j` / `k` / `l` | Focus pane left / down / up / right |
| `left` / `right` | Always focus the pane left / right |
{: .-shortcuts}

### Actions

| Key | Action |
| --- | --- |
| `tab` / `shift+tab` | Cycle panes |
| `1..9` | Switch workspace |
| `enter` | Open the selected workspace |
| `esc` | Leave navigate mode |
{: .-shortcuts}

`prefix+w` opens the navigation surface; its keys win while it is open,
independent of `focus_pane_*`. `esc`, `enter`, `tab`/`shift+tab`,
`left`/`right`, and `1..9` stay reserved; `navigate_*` config fields take
other plain keys.

## Copy mode

### Movement

| Key | Action |
| --- | --- |
| `h/j/k/l` | Move the cursor |
| `w` / `b` / `e` | Next word / previous word / word end |
| `W` / `B` / `E` | The same, for big words |
| `{` / `}` | Previous / next paragraph |
| `PageUp` / `PageDown` | Page up / down |
| `ctrl+b` / `ctrl+f` | Page up / down |
| `ctrl+u` / `ctrl+d` | Half page up / down |
{: .-shortcuts}

### Search

| Key | Action |
| --- | --- |
| `/` / `?` | Search forward / backward |
| `n` / `N` | Repeat search / reverse direction |
{: .-shortcuts}

### Selection

| Key | Action |
| --- | --- |
| `v` / `Space` | Select characters (`V` selects lines) |
| `y` / `Enter` | Copy the selection and exit |
| `q` / `Esc` | Leave copy mode |
{: .-shortcuts}

`prefix+[` enters copy mode for the focused pane; the pane keeps running.
Search is case-insensitive unless the query has an uppercase letter. With
the default prefix, `ctrl+b` enters prefix mode instead of paging up.

## Editing text fields

### Movement

| Key | Action |
| --- | --- |
| `left` / `right`, `ctrl+b` / `ctrl+f` | Move one character |
| `home` / `end`, `ctrl+a` / `ctrl+e` | Move to start/end |
| `alt+b` / `alt+f` | Move by word |
{: .-shortcuts}

### Delete

| Key | Action |
| --- | --- |
| `Backspace`, `ctrl+h` | Delete prev char |
| `Delete`, `ctrl+d` | Delete next char |
{: .-shortcuts}

### Cut and paste

| Key | Action |
| --- | --- |
| `ctrl+u` / `ctrl+k` | Cut to start/end |
| `ctrl+w`, `alt+Backspace`, `ctrl+Backspace` | Cut previous word |
| `alt+d` | Cut next word |
| `ctrl+y` | Insert last cut |
{: .-shortcuts}

These keys apply to Herdr-owned fields (dialogs, filters, copy-mode
search), not the shell or agent in a pane. Cut text stays in the field;
`Alt` shortcuts need a terminal that reports Alt/Meta.

## Custom bindings

### Binding syntax

```toml
[keys]
prefix = "ctrl+a"                        # or ["ctrl+space", "ctrl+s"]
next_tab = ["prefix+n", "ctrl+alt+]"]    # no prefix needed
new_tab = ["prefix+c", "ctrl+alt+c"]
split_vertical = ["prefix+v", "ctrl+alt+d"]
split_horizontal = ["prefix+minus", "ctrl+alt+shift+d"]
zoom = ["prefix+z", "ctrl+alt+z"]
```

Every binding is configurable, including the prefix; an action can carry
several shortcuts. Direct chords skip the prefix, and `ctrl+alt` is the
safest family to look at.
