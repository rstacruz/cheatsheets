---
title: Vimscript snippets
---

### Bind function to key and command

    command! YoFunctionHere call s:YoFunctionHere()
    nnoremap <silent> x :call <SID>FunctionHere()<CR>
    function! s:FunctionHere()
    endfunction

### Call a function in insert mode

    inoremap X <CR>=script#myfunction()<CR>
    inoremap <F2> <C-R>=MyVimFunc()?'':''<CR>

### Checking plugins

    if globpath(&rtp, "plugin/commentary.vim") != ""

## Autoload

    " autoload/hello.vim
    if exists("g:hello_loaded") | finish | endif
    let g:hello_loaded=1

    function hello#method()
    endfunction

    " calling hello#method() will load only if autoload()

