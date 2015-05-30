---
title: Vimscript snippets
---

## Functions

### Inspecting the buffer

    line('.')      " current line number
    col('.')

    getline('.')   " current line as a string
    getline(1)
    getline(1, 0)
    search("^$")   " next blank line

    getcurpos()   " [bufnum, lnum, col, off, curswant]
    getpos('.')   " [bufnum, lnum, col, off]

    expand('<cword>') " word under cursor
    expand('%') " current file

    " syntax stack
    map(synstack(line('.'), col('.')), 'synIDattr(v:val, "name")')

### Files

    fnameescape("string")
    fnamemodify("main.c", ":p:h")
    filereadable(fname)
    fnamemodify(fname, ':e')   " current file extension - see expand()
    getfsize('file.txt')
    getcwd()

### Math

    fmod(9, 2)  " modulus
    floor(1.84)
    ceil(1.84)
    abs(-0.5)

### Strings

    if a =~ '\s*'

## Binding

### Bind function to key and command

    command! YoFunctionHere call s:YoFunctionHere()
    nnoremap <silent> x :call <SID>FunctionHere()<CR>
    function! s:FunctionHere()
    endfunction

## Executing

### Execute normal keystrokes

### Running commands

    normal 'ddahello'
    exe 'normal ^C'  " with expansions
    wincmd J

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

