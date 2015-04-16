---
title: Vim script
---

Variables
---------

```vim
let var = "hello"
```

### Variable prefixes

```vim
let g:ack_options = '-s -H'    " g: global
let s:ack_program = 'ack'      " s: local to script
let l:foo = 'bar'              " l: local to function
let w:foo = 'bar'              " w: window
let b:state = 'on'             " b: buffer
let t:state = 'off'            " t: tab
echo v:var                     " v: vim special

let @/ = ''                    " @  register (this clears last search patterN)
echo $PATH                     " $  env

" they're actually a dictionary
keys(s:)
```

### Vim options
Prefix with `&`

```vim
echo 'tabstop is ' . &tabstop
if &insertmode
echo &g:option
echo &l:option
```

### Operation assignment

```vim
let var -= 2
let var += 5
let var .= 'string'   " concat
```

### Strings

```vim
let str = "String"
let str = "String with \n newline"

let literal = 'literal, no \ escaping'

echo "result = " . re   " concatenation
```

```vim
strlen(str)    " length
strchars(str)  " character length
```

Functions
---------

```vim
" prefix with s: for local script-only functions
function! s:Initialize(cmd, args)
  " a: prefix for arguments
  echo "Command: " . a:cmd

  return true
endfunction
```

### Namespacing

```vim
function! myplugin#hello()
```

### Calling functions

```vim
call s:Initialize()
call s:Initialize("hello")
```

### Consuming arguments

```vim
echo "Result: " . s:Initialize()
```

### Abortable
Aborts when error is detected

```vim
function! myfunction() abort
endfunction
```

### Dynamic arguments

```vim
function! infect(...)
  echo a:0
  echo a:1
endfunction
```

Commands
--------

```vim
command! Save set fo=want tw=80 nowrap
command! Save call s:Foo()
```

Flow
----

### Conditionals

```vim
let char = getchar()
if char == "\<LeftMouse>"
  " ...
elseif char == "\<RightMouse>"
  " ...
else
  " ...
endif
```

### Single line

```vim
if empty(a:path) | return [] | endif
```

### Boolean logic

```vim
if g:use_dispatch && s:has_dispatch
endif
```

Lists
-----

```vim
let mylist = [1, two, 3, "four"]

let first = mylist[0]
let last  = mylist[-1]

" Supresses errors
let second = get(mylist, 1)
let second = get(mylist, 1, "NONE")
```

### Functions

```vim
len(mylist)
empty(mylist)

sort(list)
let sortedlist = sort(copy(list))

split('hello there world', ' ')
```

### Concatenation

```vim
let longlist = mylist + [5, 6]
let mylist += [7, 8]
```

### Sublists

```vim
let shortlist = mylist[2:-1]
let shortlist = mylist[2:]     " same

let shortlist = mylist[2:2]    " one item
```

### Push

```vim
let alist = [1, 2, 3]
let alist = add(alist, 4)
```

### Map

```vim
call map(files, "bufname(v:val)")  " use v:val for value
call filter(files, 'v:val != ""')
```

Dictionaries
------------

```
let colors = {
  \ "apple": "red",
  \ "banana": "yellow"
}

echo colors["a"]
echo get(colors, "apple")   " supress error

remove(colors, "apple")

keys(dict)
len(dict)
```

### Extending

```
" Extending with more
let extend(s:fruits, { ... })
```

Casting
-------

```vim
str2float("2.3")
str2nr("3")
float2nr("3.14")
```

Math
----

```vim
sqrt(100)
floor(3.5)
ceil(3.3)
abs(-3.4)

sin() cos() tan()
sinh() cosh() tanh()
asin() acos() atan()
```

Vim-isms
--------

### Execute a command
Runs an ex command you typically run with `:`

execute "vsplit"
execute "e " . fnameescape(filename)

### Echo

```
echohl WarningMsg | echomsg "=> " . a:msg | echohl None
```

### Propmts

```
let result = confirm("Sure?")
execute "confirm q"
```

### Built-ins

```
has("feature")  " :h feature-list
executable("python")
globpath(&rtp, "syntax/c.vim")

exists("$ENV")
exists(":command")
exists("variable")
exists("+option")
exists("g:...")
```

Mapping
-------

```
nnoremap
vmap
...
```

Components:

```
[nvixso](nore)map
 ^       ^
 |       don't recurse
 |
 normal, visual, insert, eX mode, select, operator-pending
```

Arguments:

- `<buffer>` - only in current buffer
- `<silent>` - no echo
- `<nowait>`

Syntax
------

### Highlights

```
hi Comment
  term=bold,underline
  gui=bold
  ctermfg=4
  guifg=#80a0ff
```

### Filetype detection

```
augroup filetypedetect
  au! BufNewFile,BufRead *.json setf javascript
augroup END

au Filetype markdown setlocal spell
```

### Conceal

```
set conceallevel=2
syn match newLine "<br>" conceal cchar=}
hi newLine guifg=green
```

### Region conceal

```
syn region inBold concealends matchgroup=bTag start="<b>" end="</b>"
hi inBold gui=bold
hi bTag guifg=blue
```

### Syntax

```
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
```

### Include guards

```
if exists('g:loaded_myplugin')
  finish
endif

" ...

let g:loaded_myplugin = 1
```
