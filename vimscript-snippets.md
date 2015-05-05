---
title: Vimscript snippets
---

### Bind function to key and command

    command! YoFunctionHere call s:YoFunctionHere()
    nnoremap <silent> x :call <SID>FunctionHere()<CR>
    function! s:FunctionHere()
    endfunction

### Stuff

    expand('<cword>') " word under cursor

    filereadable(fname)
    fnamemodify(fname, ':e')   " current file extension - see expand()

    expand("%") " current file
