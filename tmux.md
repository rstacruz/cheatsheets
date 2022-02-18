---
title: tmux
category: CLI
---

### Commands

    $ tmux
      -u        # UTF8 mode
      -S ~/.tmux.socket

#### Sessions

    $ tmux new
    $ tmux new -s session_name

    $ tmux attach # Default session
    $ tmux attach -t session_name

    $ tmux switch -t session_name

    $ tmux ls     # List sessions

    $ tmux detach

#### Windows

    $ tmux new-window

### Help

    C-b ?

### Scrolling

    C-b [       # Enter scroll mode then press up and down

### Copy/paste

    C-b [       # 1. Enter scroll mode first.
    Space       # 2. Start selecting and move around.
    Enter       # 3. Press enter to copy.
    C-b ]       # Paste

### Panes

    C-b %       # vert
    C-b "       # horiz
    C-b hkjl    # navigation
    C-b HJKL    # resize
    C-b o       # next window
    C-b q       # show pane numbers
    C-b x       # close pane

    C-b { or }  # move windows around

### Windows

    C-b c       # New window
    C-b 1       # Go to window 1
    C-b n       # Go to next window
    C-b p       # Go to previous window
    C-b w       # List all window

### Detach/attach

    C-b d       # Detach
    C-b ( )     # Switch through sessions
    $ tmux attach

### Niceties

    C-b t    # Time

## Status formats

```
setw -g window-status-format `#[fg=8,bg=default]#I`
```

See `message-command-style` in the man page.

### Attribute/colors

| `#[fg=1]` | standard color |
| `#[fg=yellow]` | yellow |
| `#[bold]` | bold |
| `#[fg=colour240]` | 256 color |
| `#[fg=default]` | default |
| `#[fg=1,bg=2]` | combinations |
| `#[default]` | reset |

### Colors

 * `black` `red` `green` `yellow` `blue` `magenta` `cyan` `white`
 * `brightred` (and so on)
 * `colour0` ... `colour255`
 * `#333` (rgb hex)

### Attributes

 * `bold` `underscore` `blink` `noreverse` `hidden` `dim` `italics`

### Variables

| `#(date)` | shell command |
| `#I` | window index |
| `#S` | session name |
| `#W` | window name |
| `#F` | window flags |
| `#H` | Hostname |
| `#h` | Hostname, short |
| `#D` | pane id |
| `#P` | pane index |
| `#T` | pane title |

## Options

    set -g status-justify [left|centre|right]
    set -g status-left '...'

    setw -g window-status-style
    setw -g window-status-activity-style
    setw -g window-status-bell-style
    setw -g window-status-content-style
    setw -g window-status-current-style
    setw -g window-status-last-style

    setw -g window-status-format
    setw -g window-status-current-format

    setw -g window-status-separator
