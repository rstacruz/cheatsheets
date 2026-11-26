---
title: Zellij
subtitle: Terminal workspace with panes
category: Shell
updated: 2026-11-21
last_verified_with: "zellij 0.46.0."
tier: t2
fragments:
  - "C-p"
  - "C-t"
  - "C-o d"
  - "C-q"
  - "zellij -s work"
  - "zellij a work"
  - "zellij ls -s"
  - "C-n"
  - "C-h"
  - "M-f"
  - "C-p d"
  - "C-s s"
  - "C-p s"
  - "zellij run --"
  - "zellij action"
  - "--stacked"
keywords:
  - zellij
  - terminal multiplexer
  - panes
  - tabs
  - layouts
  - sessions
intro: |
  Zellij is a terminal workspace with panes, tabs, and sessions that keep running after you disconnect.
links:
  - title: Documentation
    url: https://zellij.dev/documentation/
  - title: Keybindings
    url: https://zellij.dev/documentation/keybindings
  - title: Configuration
    url: https://zellij.dev/documentation/configuration
  - title: Layouts
    url: https://zellij.dev/documentation/layouts
---

## Getting started

### Start a session
<!-- {: .-prime} -->

```bash
zellij                      # Start a new session
zellij -s work              # Name it
zellij -l compact           # Load a layout
zellij -s work -l compact   # Both
```
<!-- {: data-highlight="-s work; -l compact"} -->

`-s` names the session; `-l` loads a built-in or saved layout.

See: [Documentation](https://zellij.dev/documentation/)

### Attach, list, and kill

```bash
zellij ls                    # List sessions
zellij ls -s                 # Names only
zellij list-sessions -s      # Long form
zellij a                     # Attach to last session
zellij a work                # Attach by name
zellij attach -c work        # Create if missing
zellij k work                # Kill a session
```
<!-- {: data-highlight="zellij ls; zellij a; zellij k"} -->

`ls` aliases `list-sessions`; `a` aliases `attach`.

See: [Documentation](https://zellij.dev/documentation/)

### Mode keys

| Keys | Mode |
| --- | --- |
| `C-p` | Pane mode |
| `C-t` | Tab mode |
| `C-s` | Scroll mode |
| `C-o` | Session mode |
| `C-n` | Resize mode |
| `C-h` | Move mode |
| `C-b` | Tmux mode |

<!-- {: .-shortcuts} -->

C- is Ctrl; M- is Alt.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Quit and detach

| Keys | Action |
| --- | --- |
| `C-q` | Quit |
| `C-o d` | Detach; the session keeps running |
| `C-g` | Lock or unlock |
| `Enter`, `Esc` | Back to Normal mode |

<!-- {: .-shortcuts} -->

`C-q` ends the session; `C-o d` leaves it running for `zellij a`.

[tmux cheatsheet](./tmux)
<!-- {: .-crosslink} -->

See: [Keybindings](https://zellij.dev/documentation/keybindings)

## Panes

### Pane mode

| Keys | Action |
| --- | --- |
| `C-p n` | New pane |
| `C-p d` | New pane below |
| `C-p r` | New pane right |
| `C-p a` | Floating pane |
| `C-p s` | Stack a pane |
| `C-p p` | Switch focus |
| `C-p ;` | Previous focus |

<!-- {: .-shortcuts} -->

Most pane actions return to Normal mode when they finish.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Move and resize

| Keys | Action |
| --- | --- |
| `C-p h` | Focus left |
| `C-p j` | Focus down |
| `C-p k` | Focus up |
| `C-p l` | Focus right |
| --- |
| `M-h` | Focus left or previous tab |
| `M-l` | Focus right or next tab |
| `M-=` | Grow |
| `M--` | Shrink |
| `C-n h` | Grow the left edge |
| `C-n H` | Shrink the left edge |

<!-- {: .-shortcuts} -->

`C-n` opens Resize mode; `j/k/l` grow the other edges.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Fullscreen and floating

| Keys | Action |
| --- | --- |
| `C-p f` | Fullscreen the focused pane |
| `C-p Shift-f` | Fullscreen without the UI bars |
| `C-p z` | Toggle pane frames |
| `C-p Shift-z` | Toggle bars |
| --- |
| `C-p w` | Toggle floating panes |
| `C-p e` | Float or embed the pane |
| `M-f` | Toggle floating panes |
| `C-p i` | Pin the pane |

<!-- {: .-shortcuts} -->

`M-f` toggles every floating pane except in Locked mode.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Close, rename, and stack

| Keys | Action |
| --- | --- |
| `C-p x` | Close the pane |
| `C-p c` | Rename the pane |
| `C-p s` | Stack a new pane |
| `C-p Shift-s` | Change stack title direction |
| `M-p` | Toggle the pane group |
| `M-Shift-p` | Toggle group marking |

<!-- {: .-shortcuts} -->

See: [Keybindings](https://zellij.dev/documentation/keybindings)

## Tabs

### Tab mode

| Keys | Action |
| --- | --- |
| `C-t n` | New tab |
| `C-t x` | Close tab |
| `C-t r` | Rename tab |
| `C-t h/l` | Previous / next tab |
| `C-t 1-9` | Jump to tab |
| `C-t Tab` | Last tab |
| `C-t s` | Sync input to every pane |

<!-- {: .-shortcuts} -->

`C-t` opens Tab mode; most tab actions return to Normal mode.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Break and swap

| Keys | Action |
| --- | --- |
| `C-t b` | Break pane into a tab |
| `C-t [` | Break pane left |
| `C-t ]` | Break pane right |
| `C-t Space` | Next swap layout |
| `C-t Shift-Space` | Previous swap layout |
| `M-i` | Move tab left |
| `M-o` | Move tab right |

<!-- {: .-shortcuts} -->

Break a pane into a tab, or cycle the tab's swap layout.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

## Scrolling and search
<!-- {: .-three-column} -->

### Scroll mode

| Keys | Action |
| --- | --- |
| `C-s` | Scroll mode |
| `j` / `Down` | Scroll down |
| `k` / `Up` | Scroll up |
| `C-f` / `PageDown` | Page down |
| `C-b` / `PageUp` | Page up |
| --- |
| `d` | Half page down |
| `u` | Half page up |
| `[` | Previous prompt |
| `]` | Next prompt |
| `C-c` | Scroll to bottom |

`C-s` enters and leaves Scroll mode; `Esc` also returns.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Search and copy

| Keys | Action |
| --- | --- |
| `C-s s` | Search forward |
| `n` | Next match |
| `p` | Previous match |
| `c` | Case sensitivity |
| --- |
| `w` | Wrap |
| `o` | Whole word |
| `C-s e` | Edit scrollback |
| `C-s c` | Copy last command output |

`c`, `w`, and `o` toggle search options.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Mouse wheel

| Input | Action |
| --- | --- |
| `ScrollUp` / `ScrollDown` | Scroll three lines |
| `Alt ScrollUp` | Previous prompt |
| `Alt ScrollDown` | Next prompt |
| `Ctrl ScrollUp` | Grow |
| `Ctrl ScrollDown` | Shrink |

Hold Shift to temporarily disable mouse handling.

See: [Compatibility](https://zellij.dev/documentation/compatibility.html)

## Layouts
<!-- {: .-three-column} -->

### Built-in layouts

#### default

```text
layout {
    pane size=1 borderless=true {
        plugin location="tab-bar"
    }
    pane
    pane size=1 borderless=true {
        plugin location="status-bar"
    }
}
```
<!-- {: data-highlight="tab-bar; status-bar"} -->

#### compact

```text
layout {
    pane
    pane size=1 borderless=true {
        plugin location="compact-bar"
    }
}
```
<!-- {: data-highlight="compact-bar"} -->

No built-in `stacked` layout in 0.46.0; use `C-p s` or `zellij run --stacked`.

See: [Layouts](https://zellij.dev/documentation/layouts)

### Custom layout

```text
layout {
    pane split_direction="vertical" {
        pane
        pane
    }
    pane size=1 borderless=true {
        plugin location="compact-bar"
    }
}
```
<!-- {: data-highlight="split_direction"} -->

Save under `layout_dir` or pass the path with `--layout`.

See: [Layouts](https://zellij.dev/documentation/layouts)

### Use layouts

```bash
zellij -l compact
zellij -s work -l ~/layouts/dev.kdl
zellij --layout-string 'layout { pane; }'
zellij -n compact     # New session
zellij action dump-layout
```
<!-- {: data-highlight="--layout-string; -n compact; action dump-layout"} -->

`-l` can add a tab when called inside a session.

See: [Layouts](https://zellij.dev/documentation/layouts)

## Sessions
<!-- {: .-three-column} -->

### Session keys

| Keys | Action |
| --- | --- |
| `C-o d` | Detach |
| `C-o r` | Rename session |
| `C-o Tab` | Switch session |
| `C-o Left` | Previous session |
| `C-o Right` | Next session |
| `C-o n` | Next pane needing attention |
| `C-o w` | Session manager |

<!-- {: .-shortcuts} -->

Detaching keeps programs running; reattach with `zellij a`.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Session commands

```bash
zellij a -c work       # Attach or create
zellij a -c -b work    # Create detached
zellij w work          # Watch read-only
```
<!-- {: data-highlight="-c work; -b work; zellij w"} -->

See: [Documentation](https://zellij.dev/documentation/)

### Run a command in a pane

```bash
zellij run -- <cmd>
zellij run -d down -- make
zellij run -f -- htop
zellij run -c -- sleep 5
zellij run -n build -- cargo build
zellij run --stacked -- tail -f log
```
<!-- {: data-highlight="-d down; --stacked"} -->

`run` returns a pane ID; `-d` takes `down`, `right`, `left`, or `up`.

See: [Documentation](https://zellij.dev/documentation/)

### Script actions

```bash
zellij action <subcommand>
zellij ac send-keys "Ctrl a"
zellij ac write-chars "echo hi"
zellij action focus-next-pane
zellij action go-to-tab 2
zellij action new-tab --layout compact
zellij action list-panes
zellij action dump-screen
```
<!-- {: data-highlight="zellij ac; zellij action"} -->

`ac` aliases `action`; these commands target the active session.

See: [GitHub repository](https://github.com/zellij-org/zellij)

## Configuration

### Config file

```bash
zellij setup --check
zellij setup --dump-config
zellij setup --dump-keybinds default
zellij setup --dump-layout default
```
<!-- {: data-highlight="zellij setup --check; --dump-config"} -->

Config lives in `~/.config/zellij/config.kdl`; `setup --check` prints its paths.

See: [Configuration](https://zellij.dev/documentation/configuration)

### Keybinds preset

```text
keybinds preset="default" primary="Ctrl" secondary="Alt" {
    normal {
        bind "Alt y" { NewTab; }
    }
}
```
<!-- {: data-highlight="preset"} -->

Bindings layer on the preset; add `clear-defaults=true` to replace it.

See: [Configuration](https://zellij.dev/documentation/configuration)

### Theme and layout defaults

```text
theme_dark "nightfox"
theme_light "dayfox"
default_layout "compact"
layout_dir "/path/to/my/layout_dir"
mouse_mode false
```
<!-- {: data-highlight="theme_dark; theme_light; default_layout"} -->

Use `theme` to pin one theme; `theme_dark` and `theme_light` follow the host palette.

See: [Configuration](https://zellij.dev/documentation/configuration)

### CLI options

| Flag | Description |
| --- | --- |
| `-s, --session <NAME>` | Name a new session |
| `-l, --layout <LAYOUT>` | Start with a layout |
| `-c, --config <FILE>` | Use another config file |
| `--max-panes <N>` | Cap visible panes |
| `-d, --debug` | Emit debug output |

Flags come from `zellij --help`; subcommands have their own `--help`.

See: [Documentation](https://zellij.dev/documentation/)
