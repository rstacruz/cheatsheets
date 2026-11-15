---
title: Herdr keys
category: Agents
updated: 2026-11-05
tier: t2
keywords:
  - keyboard shortcuts
  - keybindings
  - prefix mode
  - copy mode
  - terminal multiplexer
intro: |
  [Herdr](https://herdr.dev) is mouse-native; keyboard control is optional.
  This reference covers the prefix, default bindings, navigate and copy
  modes, and custom keybindings.
links:
  - title: Keyboard
    url: https://herdr.dev/tui/docs/keyboard/
  - title: Configuration
    url: https://herdr.dev/tui/docs/configuration/
---

## Keyboard

<!-- {: .-three-column} -->

### Prefix

```toml
[keys]
prefix = "ctrl+a"   # or "f12"
```

Herdr reserves one key instead of dozens. Press it (default `ctrl+b`),
release, then press an action key: `prefix+c` is `ctrl+b`, then `c`.
`prefix+?` lists every active binding; `/` filters that list.

[Herdr cheatsheet](./herdr)

<!-- {: .-crosslink} -->

### Learn these first

| Shortcut | Action |
| --- | --- |
| `prefix+c` | New tab |
| `prefix+v` / `prefix+minus` | Split right / down |
| `prefix+h/j/k/l` | Move between panes |
| `prefix+w` | Workspace navigation |
| `prefix+q` | Detach; everything keeps running |

<!-- {: .-shortcuts} -->

See: [Learn these five first](https://herdr.dev/tui/docs/keyboard/#learn-these-five-first)

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

<!-- {: .-shortcuts} -->

See: [The rest, by task](https://herdr.dev/tui/docs/keyboard/#the-rest-by-task)

### Tabs

| Shortcut | Action |
| --- | --- |
| `prefix+c` | New tab |
| `prefix+n` / `prefix+p` | Next / previous tab |
| `prefix+1..9` | Switch to tab 1–9 |
| `prefix+shift+t` | Rename tab |
| `prefix+shift+x` | Close tab |

<!-- {: .-shortcuts} -->

See: [The rest, by task](https://herdr.dev/tui/docs/keyboard/#the-rest-by-task)

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

<!-- {: .-shortcuts} -->

See: [The rest, by task](https://herdr.dev/tui/docs/keyboard/#the-rest-by-task)

### Other

| Shortcut | Action |
| --- | --- |
| `prefix+?` | Keybinding help |
| `prefix+s` | Settings |
| `prefix+shift+r` | Reload config |
| `prefix+o` | Open the notification target |

<!-- {: .-shortcuts} -->

[Herdr agents cheatsheet](./herdr-agents)

<!-- {: .-crosslink} -->

## Navigate mode

### Activate

| Shortcut | Action |
| --- | --- |
| `prefix+w` | Open the navigation surface |

<!-- {: .-shortcuts} -->

Press `prefix+w` before pressing the keys in the next sections.

See: [Modes](https://herdr.dev/tui/docs/concepts/#modes)

### Movement

| Key | Action |
| --- | --- |
| `up` / `down` | Move the workspace selection |
| `h` / `j` / `k` / `l` | Focus pane left / down / up / right |
| `left` / `right` | Always focus the pane left / right |

<!-- {: .-shortcuts} -->

See: [Keybindings](https://herdr.dev/tui/docs/configuration/#keybindings)

### Actions

| Key | Action |
| --- | --- |
| `tab` / `shift+tab` | Cycle panes |
| `1..9` | Switch workspace |
| `enter` | Open the selected workspace |
| `esc`, `ctrl+[` | Leave navigate mode |

<!-- {: .-shortcuts} -->

Its keys win while it is open, independent of `focus_pane_*`. `esc`,
`enter`, `tab`/`shift+tab`, `left`/`right`, and `1..9` stay reserved;
`navigate_*` config fields take other plain keys.

See: [Keybindings](https://herdr.dev/tui/docs/configuration/#keybindings)

## Copy mode

### Activate

| Shortcut | Action |
| --- | --- |
| `prefix+[` | Enter copy mode for the focused pane |

<!-- {: .-shortcuts} -->

The pane keeps running while copy mode is open.

See: [Copy mode](https://herdr.dev/tui/docs/keyboard/#copy-mode)

### Movement

| Key | Action |
| --- | --- |
| `h/j/k/l` | Move the cursor |
| `g` / `G` | Jump to the top / bottom of history |
| `w` / `b` / `e` | Next word / previous word / word end |
| `W` / `B` / `E` | The same, for big words |
| `{` / `}` | Previous / next paragraph |
| --- | --- |
| `PageUp` / `PageDown` | Page up / down |
| `ctrl+b` / `ctrl+f` | Page up / down |
| `ctrl+u` / `ctrl+d` | Half page up / down |

<!-- {: .-shortcuts} -->

With the default prefix, `ctrl+b` enters prefix mode instead of paging up.

See: [Copy mode](https://herdr.dev/tui/docs/keyboard/#copy-mode)

### Search

| Key | Action |
| --- | --- |
| `/` / `?` | Search forward / backward |
| `n` / `N` | Repeat search / reverse direction |

<!-- {: .-shortcuts} -->

Search is case-insensitive unless the query has an uppercase letter.

See: [Copy mode](https://herdr.dev/tui/docs/keyboard/#copy-mode)

### Selection

| Key | Action |
| --- | --- |
| `v` / `Space` | Select characters (`V` selects lines) |
| `y` / `Enter` | Copy the selection and exit |
| `q` / `Esc` | Leave copy mode |

<!-- {: .-shortcuts} -->

`Esc` clears an active selection or search before leaving.

See: [Copy mode](https://herdr.dev/tui/docs/keyboard/#copy-mode)

## Editing text fields

### Movement

| Key | Action |
| --- | --- |
| `left` / `right`, `ctrl+b` / `ctrl+f` | Move one character |
| `home` / `end`, `ctrl+a` / `ctrl+e` | Move to start/end |
| `alt+b` / `alt+f` | Move by word |

<!-- {: .-shortcuts} -->

See: [Editing text fields](https://herdr.dev/tui/docs/keyboard/#editing-text-fields)

### Delete

| Key | Action |
| --- | --- |
| `Backspace`, `ctrl+h` | Delete prev char |
| `Delete`, `ctrl+d` | Delete next char |

<!-- {: .-shortcuts} -->

See: [Editing text fields](https://herdr.dev/tui/docs/keyboard/#editing-text-fields)

### Cut and paste

| Key | Action |
| --- | --- |
| `ctrl+u` / `ctrl+k` | Cut to start/end |
| `ctrl+w`, `alt+Backspace`, `ctrl+Backspace` | Cut previous word |
| `alt+d` | Cut next word |
| `ctrl+y` | Insert last cut |

<!-- {: .-shortcuts} -->

These keys apply to Herdr-owned fields (dialogs, filters, copy-mode
search), not the shell or agent in a pane. Cut text stays in the field;
`Alt` shortcuts need a terminal that reports Alt/Meta.

See: [Editing text fields](https://herdr.dev/tui/docs/keyboard/#editing-text-fields)

## Custom bindings

### Binding syntax

```toml
[keys]
prefix = "ctrl+a"                        # or ["ctrl+space", "f12"]
next_tab = ["prefix+n", "ctrl+alt+]"]    # no prefix needed
new_tab = ["prefix+c", "ctrl+alt+c"]
split_vertical = ["prefix+v", "ctrl+alt+d"]
split_horizontal = ["prefix+minus", "ctrl+alt+shift+d"]
zoom = ["prefix+z", "ctrl+alt+z"]
```

Every binding is configurable, including the prefix; an action can carry
several shortcuts. Direct chords skip the prefix, and `ctrl+alt` is the
safest family to look at.

See: [Keybindings](https://herdr.dev/tui/docs/configuration/#keybindings)
