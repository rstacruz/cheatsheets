---
title: Vim script
---

Variables
---------

```vim
let var = "hello"
```

### Variable prefixes
The `s:` prefix is also available in function names.

```vim
let g:ack_options = '-s -H'    " g: global
let s:ack_program = 'ack'      " s: local (to script)
let l:foo = 'bar'              " l: local (to function)
```

### Other prefixes

```vim
let w:foo = 'bar'              " w: window
let b:state = 'on'             " b: buffer
let t:state = 'off'            " t: tab
echo v:var                     " v: vim special

let @/ = ''                    " @  register (this clears last search patterN)
echo $PATH                     " $  env
```

### Vim options
Prefix with `&`.

```vim
echo 'tabstop is ' . &tabstop
if &insertmode
echo &g:option
echo &l:option
```

### Operators

```vim
a + b             " numbers only!
'hello ' . name   " concat
```

```vim
let var -= 2
let var += 5
let var .= 'string'   " concat
```

### [Strings](http://learnvimscriptthehardway.stevelosh.com/chapters/26.html)
Also see `:help literal-string` and `:help expr-quote`.

```vim
let str = "String"
let str = "String with \n newline"

let literal = 'literal, no \ escaping'
let literal = 'that''s enough'  # double '' => '

echo "result = " . re   " concatenation
```

### [String functions](learnvimscriptthehardway.stevelosh.com/chapters/27.html)
Also see `:help functions`.

```vim
strlen(str)    " length
len(str)       " same
strchars(str)  " character length

split("one two three")       "=> ['one', 'two', 'three']
split("one.two.three", '.')  "=> ['one', 'two', 'three']

join(['a', 'b'], ',')  "=> 'a,b'

tolower('Hello')
toupper('Hello')
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

### Consuming return values

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

Custom commands
---------------

Custom commands start with uppercase letters. The `!` redefines a command if it already exists.

```vim
command! Save :set fo=want tw=80 nowrap
```

### Commands calling functions

```vim
command! Save call script#foo()
function! script#foo()
  ...
endfunction
```

### Commands with arguments

```vim
command! -nargs=? Save call script#foo(<args>)
```

| What | What |
| ---- | ---- |
| `-nargs=0` | 0 arguments, default |
| `-nargs=1` | 1 argument, includes spaces |
| `-nargs=?` | 0 or 1 argument |
| `-nargs=*` | 0+ arguments, space separated |
| `-nargs=+` | 1+ arguments, space reparated |

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

```vim
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

### Prefixes
Prefixes (`s:`, `g:`, `l:`, etc) are actually dictionaries

```vim
keys(s:)
```

### Extending

```vim
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

### [Execute a command](http://learnvimscriptthehardway.stevelosh.com/chapters/28.html)
Runs an ex command you typically run with `:`. Also see `:help execute`.

```vim
execute "vsplit"
execute "e " . fnameescape(filename)
```

### [Running keystrokes](http://learnvimscriptthehardway.stevelosh.com/chapters/29.html)
Use `:normal` to execute keystrokes as if you're typing them in normal mode. Combine with `:execute` for special keystrokes.

```vim
normal G
normal! G   " skips key mappings

execute "normal! gg/foo\<cr>dd"
```

### Silencing
See `:help silent`

```vim
silent g/Aap/p
```

### Echo

```vim
echohl WarningMsg | echomsg "=> " . a:msg | echohl None
```

### Prompts

```vim
let result = confirm("Sure?")
execute "confirm q"
```

### Built-ins

```vim
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

```vim
nnoremap
vmap
...
```

```vim
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

```vim
if exists('g:loaded_myplugin')
  finish
endif

" ...

let g:loaded_myplugin = 1
```
