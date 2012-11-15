title: vim
----

Command line
------------

    <C-r><C-w>         # insert current word into the command line
    <C-r>"             # paste from " register

Motions
-------

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

Misc
----

    .       # repeat last command
    ]p      # paste under the current indentation level

    C-o     # Go back to previous location (C-i forward)
    C-t     # Go back to last tag

    zz      # Center this line

    `.      # Go to last edit
    ``      # Go to last jump

Windows
-------

    z{height}<Cr>       # Resize pane to {height} lines tall

Tags
----

      ^]      # Jump to definition
      g]      # See all definitions
      ^O ^I   # Back/forward

      :tselect Classname  # Find definitions of Classname
      :tjump Classname    # Find definitions of Classname (auto-select 1st)
      :tag Classname      # Jump to first definition of Classname
