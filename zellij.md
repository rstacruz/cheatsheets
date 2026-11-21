---
title: Zellij
subtitle: Terminal workspace with panes
category: Shell
updated: 2026-11-21
tier: t1
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
  - 'NewPane "Down"'
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
  Zellij is a terminal workspace with panes, tabs, and sessions that survive disconnects.

  Mode keys drive panes, tabs, scrolling, and sessions: `C-p`, `C-t`, `C-s`, `C-o`.
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

`ls` aliases `list-sessions`; `a` aliases `attach`.

See: [Documentation](https://zellij.dev/documentation/)

### Mode keys

| Keys | Mode | KDL action |
| --- | --- | --- |
| `C-p` | Pane | `SwitchToMode "Pane"` |
| `C-t` | Tab | `SwitchToMode "Tab"` |
| `C-s` | Scroll | `SwitchToMode "Scroll"` |
| `C-o` | Session | `SwitchToMode "Session"` |
| `C-n` | Resize | `SwitchToMode "Resize"` |
| `C-h` | Move | `SwitchToMode "Move"` |
| `C-b` | Tmux | `SwitchToMode "Tmux"` |

<!-- {: .-shortcuts} -->

C- is Ctrl; M- is Alt.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Quit and detach

```text
C-q            Quit
C-o d          Detach
C-g            Lock and unlock
Enter, Esc     Back to Normal mode
```

`C-q` ends the session; `C-o d` leaves it running for `zellij a`.

[tmux cheatsheet](./tmux)
<!-- {: .-crosslink} -->

See: [Keybindings](https://zellij.dev/documentation/keybindings)

## Panes

### Pane mode

| Keys | Action | KDL action |
| --- | --- | --- |
| `C-p n` | New pane | `NewPane` |
| `C-p d` | New pane below | `NewPane "Down"` |
| `C-p r` | New pane right | `NewPane "Right"` |
| `C-p a` | Floating pane | `NewFloatingPane` |
| `C-p s` | Stack a pane | `NewPane "stacked"` |
| `C-p p` | Switch focus | `SwitchFocus` |
| `C-p ;` | Previous focus | `FocusLastPane` |

<!-- {: .-shortcuts} -->

Most pane actions return to Normal mode when they finish.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Move and resize

```text
C-p h        MoveFocus "Left"
C-p j        MoveFocus "Down"
C-p k        MoveFocus "Up"
C-p l        MoveFocus "Right"
M-h          MoveFocusOrTab "Left"
M-l          MoveFocusOrTab "Right"
M-=          Resize "Increase"
M--          Resize "Decrease"
C-n h        Resize "Increase Left"
C-n H        Resize "Decrease Left"
```

`C-n` opens Resize mode; `h/j/k/l` grow edges and `H/J/K/L` shrink them.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Fullscreen and floating

```text
C-p f        ToggleFocusFullscreen
C-p Shift-f  ToggleFocusNoUiFullscreen
C-p z        TogglePaneFrames
C-p Shift-z  ToggleBars
C-p w        ToggleFloatingPanes
C-p e        TogglePaneEmbedOrFloating
M-f          ToggleFloatingPanes
C-p i        TogglePanePinned
```

`M-f` toggles every floating pane in the tab from any mode except Locked mode.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Close, rename, and stack

```text
C-p x        CloseFocus
C-p c        PaneNameInput 0
C-p s        NewPane "stacked"
C-p Shift-s  ToggleStackListOrientation
M-p          TogglePaneInGroup
M-Shift-p    ToggleGroupMarking
```

See: [Keybindings](https://zellij.dev/documentation/keybindings)

## Tabs

### Tab mode

| Keys | Action | KDL action |
| --- | --- | --- |
| `C-t n` | New tab | `NewTab` |
| `C-t x` | Close tab | `CloseTab` |
| `C-t r` | Rename tab | `TabNameInput` |
| `C-t h/l` | Previous / next tab | `GoToPreviousTab`, `GoToNextTab` |
| `C-t 1-9` | Jump to tab | `GoToTab` |
| `C-t Tab` | Last tab | `ToggleTab` |
| `C-t s` | Sync input | `ToggleActiveSyncTab` |

<!-- {: .-shortcuts} -->

`C-t` opens Tab mode; most tab actions return to Normal mode.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Break and swap

```text
C-t b            BreakPane
C-t [            BreakPaneLeft
C-t ]            BreakPaneRight
C-t Space        NextSwapLayout
C-t Shift-Space  PreviousSwapLayout
M-i              MoveTab "Left"
M-o              MoveTab "Right"
```

Break a pane into a tab, or cycle the tab's swap layout.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

## Scrolling and search

### Scroll mode

```text
C-s             SwitchToMode "Scroll"
j / Down        ScrollDown
k / Up          ScrollUp
C-f / PageDown  PageScrollDown
C-b / PageUp    PageScrollUp
d / u           HalfPageScrollDown, HalfPageScrollUp
[ / ]           ScrollToPreviousPrompt, ScrollToNextPrompt
C-c             ScrollToBottom
```

`C-s` enters and leaves Scroll mode; `Esc` also returns.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Search and copy

```text
C-s s         SwitchToMode "EnterSearch"
n             Search "down"
p             Search "up"
c             SearchToggleOption "CaseSensitivity"
w             SearchToggleOption "Wrap"
o             SearchToggleOption "WholeWord"
C-s e         EditScrollback
C-s c         CopyLastCommandOutput
```

`c`, `w`, and `o` toggle case sensitivity, wrap, and whole-word matching.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Mouse wheel

```text
ScrollUp / ScrollDown           Scroll 3
Alt ScrollUp / Alt ScrollDown   ScrollToPrompt "previous", "next"
Ctrl ScrollUp / Ctrl ScrollDown ResizeScroll "increase", "decrease"
```

Hold Shift to temporarily disable mouse handling.

See: [Compatibility](https://zellij.dev/documentation/compatibility.html)

## Layouts

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

#### compact

```text
layout {
    pane
    pane size=1 borderless=true {
        plugin location="compact-bar"
    }
}
```

No built-in `stacked` layout in 0.46.0; use `NewPane "stacked"` or `zellij run --stacked`.

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

Save under `layout_dir` or pass the path with `--layout`.

See: [Layouts](https://zellij.dev/documentation/layouts)

### Use layouts

```bash
zellij -l compact
zellij -s work -l ~/layouts/dev.kdl
zellij --layout-string 'layout { pane; }'
zellij -n compact            # Always start a new session
zellij action dump-layout
```

`-l` can add a tab when called inside a session.

See: [Layouts](https://zellij.dev/documentation/layouts)

## Sessions

### Session keys

```text
C-o d         Detach
C-o r         SwitchToMode "RenameSession"
C-o Tab       ToggleSession
C-o Left      GoToPreviousSession
C-o Right     GoToNextSession
C-o n         GoToNextAttention
C-o w         LaunchOrFocusPlugin "session-manager"
```

Detaching keeps programs running; reattach with `zellij a`.

See: [Keybindings](https://zellij.dev/documentation/keybindings)

### Session commands

```bash
zellij a -c work             # Attach or create
zellij a -c -b work          # Create detached
zellij w work                # Watch read-only
```

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
