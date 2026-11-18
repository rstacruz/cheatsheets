---
title: tmux
subtitle: Terminal multiplexer
category: Shell
updated: 2026-11-18
tier: t1
fragments:
  - "C-b"
  - "tmux new -s work"
  - "tmux a -t work"
  - "C-b %"
  - 'C-b "'
  - "C-b c"
  - "C-b ["
  - "C-b z"
  - "C-b d"
  - "C-b w"
  - "C-b ,"
  - "C-b ?"
  - "set -g mouse on"
  - "new-session -d"
  - "send-keys"
  - "capture-pane"
  - "kill-session"
  - "C-b {"
intro: |
  tmux is a terminal multiplexer: sessions keep running after you
  disconnect, and one terminal splits into windows and panes.

  This sheet covers the default `C-b` prefix and the commands for scripting.
links:
  - title: tmux manual
    url: https://man.openbsd.org/tmux
  - title: tmux wiki
    url: https://github.com/tmux/tmux/wiki
  - title: tmux options
    url: https://man.openbsd.org/tmux#OPTIONS
---

## Sessions

### Start and attach

```bash
tmux                      # Start an unnamed session
tmux new -s work          # Start a session named work
tmux ls                   # List sessions
tmux a                    # Attach to the most recent session
tmux a -t work            # Attach to a named session
```

`tmux a` is short for `attach-session`; `tmux new` is `new-session`.

See: [new-session](https://man.openbsd.org/tmux#new-session)

### Detach and switch

```
C-b d               # Detach; the session keeps running
C-b s               # Choose another session
C-b (  C-b )        # Previous / next session
C-b $               # Rename the current session
```

Detaching leaves every program running; `tmux a` returns to it.

See: [attach-session](https://man.openbsd.org/tmux#attach-session)

### Kill

```bash
tmux kill-session -t work       # Kill one session
tmux kill-session -a -t work    # Kill all except work
tmux kill-server                # Kill every session and the server
```

`C-b :kill-session` kills the session you are in.

See: [kill-session](https://man.openbsd.org/tmux#kill-session)

## Prefix

### Everyday chords

| Chord | Action |
| --- | --- |
| `C-b ?` | List all key bindings |
| `C-b :` | Open the command prompt |
| `C-b d` | Detach from the session |
| --- | --- |
| `C-b [` | Enter copy mode |
| `C-b ]` | Paste the top buffer |
| `C-b w` | Pick a window |
| `C-b s` | Pick a session |
| `C-b q` | Show pane numbers |
| `C-b z` | Zoom the current pane |
| `C-b t` | Show a clock |

<!-- {: .-shortcuts} -->

`C-b` is the default prefix; every chord on this page starts with it.

See: [Key bindings](https://man.openbsd.org/tmux#KEY_BINDINGS)

### Command prompt

```
C-b :new-window
C-b :split-window -h
C-b :rename-session work
C-b :set -g mouse on
```

The prompt accepts any tmux command, including settings. Tab completes
command names.

See: [Commands](https://man.openbsd.org/tmux#COMMANDS)

## Windows

### Create and switch

```
C-b c               # New window
C-b 1               # Jump to window 1 (through 9)
C-b n  C-b p        # Next / previous window
C-b l               # Last active window
C-b w               # Choose a window from a list
C-b f               # Find by name or visible text
```

The status bar lists windows; `*` marks the active one.

See: [Windows and panes](https://man.openbsd.org/tmux#WINDOWS_AND_PANES)

### Rename and close

```
C-b ,               # Rename the window
C-b &               # Kill the window (asks first)
C-b .               # Move it to another index
```

Closing the last pane in a window closes the window.

See: [kill-window](https://man.openbsd.org/tmux#kill-window)

## Panes

### Split

```
C-b %               # Split left and right
C-b "               # Split top and bottom
C-b :split-window -h -l 30   # Split 30 columns wide
```

Each split runs its own shell, inside the same window.

See: [split-window](https://man.openbsd.org/tmux#split-window)

### Navigate and resize

```
C-b ← ↑ ↓ →         # Move to the pane in that direction
C-b o               # Next pane
C-b q               # Show pane numbers; press one to jump
C-b C-← C-→         # Resize by one cell
C-b M-← M-→         # Resize by five cells
C-b z               # Zoom the pane to fill the window
C-b Space           # Cycle through the preset layouts
```

With `set -g mouse on`, click a pane to focus it.

See: [select-pane](https://man.openbsd.org/tmux#select-pane)

### Close and rearrange

```
C-b x               # Kill the pane (asks first)
C-b !               # Break the pane into its own window
C-b {  C-b }        # Swap with the previous / next pane
C-b C-o             # Rotate the panes
```

`C-b z` is the fastest way to give one pane the whole terminal.

See: [break-pane](https://man.openbsd.org/tmux#break-pane)

## Copy mode

### Select and copy

```
C-b [               # Enter copy mode
C-Space             # Start selection (emacs keys)
M-w                 # Copy the selection and exit
C-b ]               # Paste it
```

`set -g mode-keys vi` switches to `Space` to select and `Enter` to copy.

See: [copy-mode](https://man.openbsd.org/tmux#copy-mode)

### Search and scroll

```
C-b [               # Enter copy mode
C-s                 # Search forward
C-r                 # Search backward
n  N                # Next / previous match
Escape              # Exit copy mode
```

Scrolling with the wheel works in copy mode when mouse support is on.
`set -g mode-keys vi` swaps in `/`, `?`, and `q`.

See: [copy-mode](https://man.openbsd.org/tmux#copy-mode)

## Config

### Settings

```bash
set -g mouse on
set -g base-index 1
setw -g pane-base-index 1
set -g history-limit 50000
set -g renumber-windows on
set -sg escape-time 10
```

tmux reads `~/.tmux.conf` when the server starts, not on every attach.

See: [Options](https://man.openbsd.org/tmux#OPTIONS)

### Reload

#### From a key

```bash
bind r source-file ~/.tmux.conf \; display "Reloaded"
```

#### From the shell

```bash
tmux source-file ~/.tmux.conf
```

The first line adds `C-b r`; the second reloads on demand.

See: [source-file](https://man.openbsd.org/tmux#source-file)

### Change the prefix

```bash
set -g prefix C-a
unbind C-b
bind C-a send-prefix
```

Keep the `send-prefix` line so an application can still receive a literal
`C-a`.

See: [bind-key](https://man.openbsd.org/tmux#bind-key)

## Scripting

### Detached sessions

```bash
tmux new-session -d -s work
tmux new -d -s build 'npm run build'
tmux has-session -t work 2>/dev/null || tmux new -d -s work
```

`-d` starts in the background; the last line creates the session if missing.

See: [new-session](https://man.openbsd.org/tmux#new-session)

### send-keys

```bash
tmux send-keys -t work:0 'git pull' C-m
tmux send-keys -t work:0.1 'ls -l' Enter
```

`C-m` is Enter. A target is `session:window.pane`.

See: [send-keys](https://man.openbsd.org/tmux#send-keys)

### Reading output

```bash
tmux capture-pane -p -t work:0
tmux capture-pane -p -S -100 -t work:0   # Last 100 lines
```

`capture-pane` prints the visible screen; `-S` reaches into the scrollback.

See: [capture-pane](https://man.openbsd.org/tmux#capture-pane)

## Remote and nested

### SSH

```bash
ssh host -t tmux a -t work
ssh host -t 'tmux new -A -s main'
```

`-t` forces a TTY; `new -A` attaches to the session or creates it.

See: [tmux wiki](https://github.com/tmux/tmux/wiki)

### Nested sessions

```
C-b C-b             # Send C-b through to the inner tmux
C-b : send-prefix   # The same, as a command
```

Sessions belong to a server; `tmux -L inner` starts a second server on its
own socket. `$TMUX` is set inside a session.

See: [ENVIRONMENT](https://man.openbsd.org/tmux#ENVIRONMENT)

## Status bar

### Format strings

| Format | Shows |
| --- | --- |
| `#S` | Session name |
| `#I` | Window index |
| `#W` | Window name |
| `#F` | Window flags |
| `#P` | Pane index |
| --- | --- |
| `#T` | Pane title |
| `#H` | Hostname |
| `#(cmd)` | Output of a shell command |
| `#{?condition,a,b}` | Conditional |

<!-- {: .-shortcuts} -->

`status-left` and `status-right` take the same strings as
`window-status-format`.

See: [Formats](https://man.openbsd.org/tmux#FORMATS)

### Styles

```
#[fg=yellow,bold]
#[fg=colour240]
#[bg=default]
#[default]
```

Colours are names, `colour0` to `colour255`, or `#rrggbb`. `#[default]`
resets.

See: [Styles](https://man.openbsd.org/tmux#STYLES)
