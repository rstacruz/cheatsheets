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

Misc
----

    .       # repeat last command
    ]p      # paste under the current indentation level

    C-o     # Go back to previous location
    C-i     # Go forward
    C-t     # Go back to last tag

    zz      # Center this line

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

Marks
-----

    `^      # Last position of cursor in insert mode
    `.      # Last change
    ``      # Last jump

### Calculator

    (Insert mode) <C-r>=128/2

### Highlights

    hi Comment
      term=bold,underline
      gui=bold
      ctermfg=4
      guifg=#80a0ff

### Filetype detection

    augroup filetypedetect
      au! BufNewFile,BufRead *.json setf javascript
    augroup END

    au Filetype markdown setlocal spell

### Conceal

    set conceallevel=2
    syn match newLine "<br>" conceal cchar=}
    hi newLine guifg=green

### Region conceal

    syn region inBold concealends matchgroup=bTag start="<b>" end="</b>"
    hi inBold gui=bold
    hi bTag guifg=blue

### Syntax

    syn match :name ":regex" :flags

    syn region Comment  start="/\*"  end="\*/"
    syn region String   start=+"+    end=+"+	 skip=+\\"+

    syn cluster :name contains=:n1,:n2,:n3...

    flags:
      keepend
      oneline
      nextgroup=
      contains=
      contained

    hi def link markdownH1 htmlH1

### Mapping

    nnoremap
    vmap
    ...

Components:

    [nvixso](nore)map
     ^       ^
     |       don't recurse
     |
     normal, visual, insert, eX mode, select, operator-pending

Arguments:

- `<buffer>` - only in current buffer
- `<silent>` - no echo
- `<nowait>`

