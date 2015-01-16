---
title: vim
layout: default
---

Command line
------------

    <C-r><C-w>         # insert current word into the command line
    <C-r>"             # paste from " register

Text objects
------------

    vip           # Select paragraph
    vipipipip     # Select more

    ap            # a paragraph
    ip            # inner paragraph

    ap, ip        # Paragraph
    aw, iw        # Word
    as, is        # Sentence

    ab            # A block [(
    aB            # A block in [{
    at            # A XML tag block
    a[ ( { <      # A [], (), or {} block
    a' " `        # A quoted string

    [( [{ [<      # previous ( or { or <
    ])            # next

    [m            # previous method start
    [M            # previous method end

Example:

    yip           # Yank inner paragraph
    yap           # Yank paragraph (including newline)

Folds
-----

    zo      # Open
    zO      # Open, recursive
    zc      # Close
    zC      # Close, recursive
    za      # Toggle
    zA      # Toggle, recursive

    zv      # Open folds for this line

    zM      # Close all
    zR      # Open all

    zm      # Fold more (foldlevel += 1)
    zr      # Fold less (foldlevel -= 1)

    zx      # Update

Jumping
-------

    ^O      # Go back to previous location
    ^I      # Go forward

Misc
----

    .       # repeat last command
    ]p      # paste under the current indentation level

    zz      # Center this line

Counters
--------

    ^A      # increment number
    ^X      # decrement

Windows
-------

    z{height}<Cr>       # Resize pane to {height} lines tall

Tags
----

    ^]      # Jump to definition
    g]      # See all definitions
    C-t     # Go back to last tag
    ^O ^I   # Back/forward

    :tselect Classname  # Find definitions of Classname
    :tjump Classname    # Find definitions of Classname (auto-select 1st)
    :tag Classname      # Jump to first definition of Classname

Marks
-----

    `^      # Last position of cursor in insert mode
    `.      # Last change
    ``      # Last jump

### Calculator

    (Insert mode) <C-r>=128/2
