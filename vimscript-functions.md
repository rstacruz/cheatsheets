---
title: Vimscript functions
category: Vim
---

## Dictionaries and lists

### Dictionaries

```vim
let colors = {
  \ "apple": "red",
  \ "banana": "yellow"
}

echo colors["a"]
echo get(colors, "apple")   " suppress error

remove(colors, "apple")

" :help E715
if has_key(dict, 'foo')
if empty(dict)
keys(dict)
len(dict)

max(dict)
min(dict)

count(dict, 'x')
string(dict)

map(dict, '<>> " . v:val')
extend(s:fruits, { ... })
```

```vim
for key in keys(mydict)
  echo key . ': ' . mydict(key)
endfor
```

### Lists

```vim
let mylist = [1, two, 3, "four"]

let first = mylist[0]
let last  = mylist[-1]

" Suppresses errors
let second = get(mylist, 1)
let second = get(mylist, 1, "NONE")
```

Functions
---------

### Buffer

    line('.')             " current line number
    col('.')
    col('$')

    getline('.')          " current line as a string
    getline(1)            " get line 1
    getline(1, 5)         " get lines 1-5
    search('^$')          " next blank line, returns line number
    search('^$','n')      " but don't move cursor

    getcurpos()           " [bufnum, lnum, col, off, curswant]
    getpos('.')           " [bufnum, lnum, col, off]

    nextnonblank(1)       " next non-blank line after line1
    prevnonblank()

### Marks

    getpos("'a")          " position of a mark
    setpos("'a",...)

    getpos("'<")          " position of selection start

### Cursor

    cursor(line,col)      " moves cursor
    cursor(line,col,off,curswant)

    getcurpos()           " returns [bufnum,line,col,off,curswant]

### Expand

    expand('<cword>')      " word under cursor
    expand('%')            " current file

    " <cword>  current word on cursor
    " :p    full path
    " :h    head
    " :p:h  dirname   (/Users/rsc/project)
    " :t    tail      (file.txt)
    " :r    root      (file)
    " :e    extension (.txt)
    " see :h cmdline-special

### Files

    fnameescape('string')
    fnamemodify('main.c', ':p:h')
    fnamemodify(fname, ':e')   " current file extension - see expand()
    filereadable(fname)
    getfsize('file.txt')
    getcwd()

    globpath(&rtp, "plugin/commentary.vim")

### Math

    fmod(9, 2)  " modulus
    abs(-0.5)
    sqrt(9)

    trunc(1.84)
    floor(1.84)
    ceil(1.84)
    float2nr(3.14)

### Casting

    str2float('0.2')
    str2nr('240')
    str2nr('ff', '16')

    string(0.3)

### Type checking

    type(var) == type(0)
    type(var) == type("")
    type(var) == type(function("tr"))
    type(var) == type([])
    type(var) == type({})
    type(var) == type(0.0)

### Date/time

    strftime('%c')
    strftime('%c',getftime('file.c'))

### Strings

    if a =~ '\s*'
    substitute(str, '.', 'x', 'g')
    strpart("abcdef", 3, 2)    " == "de" (substring)
    strpart("abcdef", 3)       " == "def"
    stridx("abcdef", "e")      " == 4
    strridx()                  " reverse

    matchstr('testing','test')  " == 'test' (or '')
    match('testing','test')     " == 0
    matchend('testing','test')  " == 4
    match('testing','\ctest')   " ignore case

    split(str, '\zs')           " split into characters

    strlen(str)
    strchars()                  " accounts for composing chars
    strwidth()                  " accounts for ambig characters
    strdisplaywidth()           " accounts for tab stops

    toupper(str)
    tolower(str)
    tr('foo', '_-', '  ')

### Syntax

    synstack(line('.'),col('.'))   " returns many
    synID(line('.'),col('.'),1)    " only one

    synIDattr(id,"bg")
    synIDattr(id,"name")
    synIDtrans()

    " syntax stack
    map(synstack(line('.'), col('.')), 'synIDattr(v:val, "name")')

### Shell

    system('ls '.shellescape(expand('%:h')))

### Registers

    getreg('*')
    getregtype('*')     " v(char), V(line) <ctrl-v>(block)

Comparisons
-----------

    if name ==# 'John'     " case-sensitive
    if name ==? 'John'     " case-insensitive
    if name == 'John'      " depends on :set ignorecase
    " also: is#, is?, >=#, >=?, and so on

    if "hello" =~ '.*'
    if "hello" !~ '.*'

Executing
---------

### Running commands

    normal 'ddahello'
    exe 'normal ^C'  " with expansions
    wincmd J
