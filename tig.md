---
title: Tig
category: Git
---

### Installing

    $ brew install tig --HEAD
    $ apt-get install tig

### Invocation

    tig

    tig status

    tig blame FILE
    tig master        # Show a branch
    tig test..master  # Show difference between two bracnhes
    tig FILE          # Show history of file
    tig v0.0.3:README # Show contents of file in a specific revision

### All views

    ^N    # Next on parent view
    ^P    # Previous on parent view

### `m` - Main view

    D     # Toggle between date display modes
    A     # Toggle between author display modes
    C     # Cherry pick a commit

### `S` - Stage view

    u     # Stage/unstage file or chunk
    !     # Revert file or chunk
    C     # Commit
    M     # Merge
    1     # Stage line
    []    # Increase/decrease the diff context

### `H` - Branch view

    i     # Change sort header
