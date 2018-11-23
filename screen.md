---
title: screen
---

#### Control key
    ^                                # [Control] key
    [^A]                             # [Control] + [a]
    [a]                              # [a]
    [A]                              # [Shi­ft] + [a]
    [^A] [A]                         # [Control] + [a] then [Shi­ft] + [a]
    [^A] [A]                         # Different from [^A­][­a]

### Enter / Quit
    $ screen -S foo                 # Create a screen named "foo"
    $ screen -x foo                 # Attach to an existing screen named "foo"
    [^A] [d] or [^A] [^D]           # Detach current screen
    exit or [^D] (in screen shell)  # Exit the shell starting the screen thus exit the screen
    
#### Window (screen tabs)
    [^A] [c]                        # Create a new window
    exit or [^D] (in screen shell)  # Exit the current shell created by the window, thus exit the window
    [^A] [0]                        # Go to window 0
    [^A] [3]                        # Go to window 3
    [^A] [n]                        # Go to next window
    [^A] [p]                        # Go to previous window

#### Split screen
    [^A] [S]                        # Split screen horizontally
    [^A] [|]                        # Split screen vertically
    [^A] [^I] or [^A] [Tab]         # Change splitted part
    [^A] [Q]                        # Remove all splitted parts
#### Misc
    [^A] [A]                        # Rename current window
    [^A] [k]                        # Kill current window
    [^A] [^A]                       # Switch to last used window
    [^A] [a]                        # Send [^A] to current screen
    
