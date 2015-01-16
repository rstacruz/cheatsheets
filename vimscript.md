---
title: vimscript
layout: default
---

Mapping
-------

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

Stuff
-----

    let var = "hello"
    echo "var = " . var

Functions
---------

    has("feature")  " :h feature-list
    executable("python")
    globpath(&rtp, "syntax/c.vim")

    if getchar() == "\<LeftMouse>"
    endif

    exe "vsplit"

Syntax
------

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
