title: tmux Terminal Multiplexer
---

### Commands

    $ tmux
      -u        # UTF8 mode
      -S ~/.tmux.socket

    $ tmux attach

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

    C-b v       # vert
    C-b n       # horiz
    C-b hkjl    # navigation
    C-b HJKL    # resize
    C-b o       # next window
    C-b x       # close pane

    C-b { or }  # move windows around

### Windows

    C-b c       # New window
    C-b 1       # Go to window 1

### Detach/attach

    C-b d       # detatch
    C-b ( )     # Switch through sessions
    $ tmux attach

### Niceties

    C-b t    # Time
