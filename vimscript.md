---
title: Vim scripting
subtitle: Scripting language for Vim
category: Vim
intro: |
  Vimscript is Vim's built-in language for variables, functions, loops, and custom commands. This sheet is a quick reference to [Vim's scripting documentation](https://vimhelp.org/usr_41.txt.html).
links:
  - title: Vim scripting guide
    url: https://vimhelp.org/usr_41.txt.html
  - title: Vim evaluation and functions
    url: https://vimhelp.org/eval.txt.html
prism_languages: [vim]
tier: t3
last_verified_with: "Vim 9.2."
updated: 2026-11-26
weight: -10
---

## Getting started

### Start hacking

```vim
let name = "John"
echo "Hello, " . name
```
<!-- {: data-highlight="let name"} -->

You can either put this in a script (`script.vim`) and run it (`:source script.vim`), or type the commands individually in normal mode as `:let` and `:echo`.

See: [`:help :source`](https://vimhelp.org/repeat.txt.html#%3Asource)

### Learn by example

```vim
function! SuperTab()
  let l:part = strpart(getline('.'),col('.')-2,1)
  if (l:part =~ '^\W\?$')
      return "\<Tab>"
  else
      return "\<C-n>"
  endif
endfunction

imap <Tab> <C-R>=SuperTab()<CR>
```
<!-- {: data-highlight="SuperTab"} -->

Another example uses functions, variables, and mappings.

See: [`:help usr_41.txt`](https://vimhelp.org/usr_41.txt.html#usr_41.txt)

## Variables

### Defining

```vim
let var = "hello"
```
<!-- {: data-highlight="let var"} -->

See: [`:help :let`](https://vimhelp.org/eval.txt.html#%3Alet)

### Variable prefixes

```vim
let g:ack_options = '-s -H'    " g: global
let s:ack_program = 'ack'      " s: local (to script)
let l:foo = 'bar'              " l: local (to function)
```
<!-- {: data-highlight="g:; s:; l:"} -->

The `s:` prefix is also available in function names.

See: [`:help local-variables`](https://vimhelp.org/userfunc.txt.html#local-variables)

### Other prefixes

```vim
let w:foo = 'bar'      " w: window
let b:state = 'on'     " b: buffer
let t:state = 'off'    " t: tab
echo v:var             " v: vim special
let @/ = ''            " @  register (clears search)
echo $PATH             " $  env
```
<!-- {: data-highlight="w:; b:; t:"} -->

See: [`:help internal-variables`](https://vimhelp.org/eval.txt.html#internal-variables)

### Vim options

```vim
echo 'tabstop is ' . &tabstop
if &insertmode
echo &g:option
echo &l:option
```
<!-- {: data-highlight="&tabstop"} -->

Prefix Vim options with `&`

See: [`:help expr-option`](https://vimhelp.org/eval.txt.html#expr-option)

### Operators

```vim
a + b             " numbers only!
'hello ' . name   " concat

let var -= 2
let var += 5
let var .= 'string'   " concat
```
<!-- {: data-highlight=".="} -->

See: [`:help expr6`](https://vimhelp.org/eval.txt.html#expr6), [`:help expr-.`](https://vimhelp.org/eval.txt.html#expr-.), [`:help :let+=`](https://vimhelp.org/eval.txt.html#%3Alet%2B%3D)

## Strings

### Strings

```vim
let str = "String"
let str = "String with \n newline"

let literal = 'literal, no \ escaping'
let literal = 'that''s enough'  " double '' => '

echo "result = " . re   " concatenation
```
<!-- {: data-highlight="let literal"} -->

Quoted strings interpret backslash escapes; literal strings do not.

See: [`:help expr-quote`](https://vimhelp.org/eval.txt.html#expr-quote), [`:help literal-string`](https://vimhelp.org/eval.txt.html#literal-string)

### String functions

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
<!-- {: data-highlight="strchars"} -->

See: [`:help functions`](https://vimhelp.org/eval.txt.html#functions)

## Functions

### Functions

```vim
" prefix with s: for local script-only functions
function! s:Initialize(cmd, args)
  " a: prefix for arguments
  echo "Command: " . a:cmd

  return 1
endfunction
```
<!-- {: data-highlight="function!"} -->

See: [`:help user-functions`](https://vimhelp.org/eval.txt.html#user-functions)

### Overwriting

```vim
function f1()
  echo "f1"
endfunction

function! f1()
  echo "f1 overridden"
endfunction
```

Add `!` after `function` to overwrite an existing function.

See: [`:help E122`](https://vimhelp.org/userfunc.txt.html#E122)

### Namespacing

```vim
function! myplugin#hello()
```
<!-- {: data-highlight="myplugin#hello"} -->

See: [`:help autoload-functions`](https://vimhelp.org/userfunc.txt.html#autoload-functions)

### Calling functions

```vim
call s:Initialize()
call s:Initialize("hello")
```

See: [`:help :call`](https://vimhelp.org/userfunc.txt.html#%3Acall)

### Consuming return values

```vim
echo "Result: " . s:Initialize()
```

See: [`:help expr-function`](https://vimhelp.org/eval.txt.html#expr-function)

### Abortable

```vim
function! myfunction() abort
endfunction
```
<!-- {: data-highlight="abort"} -->

Aborts when an error occurs.

See: [`:help :func-abort`](https://vimhelp.org/userfunc.txt.html#%3Afunc-abort)

### Var arguments

```vim
function! infect(...)
  echo a:0    "=> 2
  echo a:1    "=> jake
  echo a:2    "=> bella

  for s in a:000  " a list
    echon ' ' . s
  endfor
endfunction

infect('jake', 'bella')
```
<!-- {: data-highlight="a:000"} -->

Use `a:0`, `a:1`, and `a:000` for variable arguments.

See: [`:help function-argument`](https://vimhelp.org/userfunc.txt.html#function-argument)

## Loops

### For loops

```vim
for s in list
  echo s
  continue  " jump to start of loop
  break     " breaks out of a loop
endfor
```
<!-- {: data-highlight="for s in list"} -->

See: [`:help :for`](https://vimhelp.org/eval.txt.html#%3Afor)

### While loops

```vim
while x < 5
endwhile
```
<!-- {: data-highlight="while x < 5"} -->

See: [`:help :while`](https://vimhelp.org/eval.txt.html#%3Awhile)

## Custom commands

### Custom commands

```vim
command! Save :set fo=want tw=80 nowrap
```
<!-- {: data-highlight="command!"} -->

Custom commands start with uppercase letters. The `!` redefines a command if it already exists.

See: [`:help :command`](https://vimhelp.org/map.txt.html#%3Acommand)

### Commands calling functions

#### Command

```vim
command! Save call <SID>foo()
```

#### Function

```vim
function! s:foo()
  ...
endfunction
```

See: [`:help <SID>`](https://vimhelp.org/map.txt.html#%3CSID%3E)

### Commands with arguments

```vim
command! -nargs=? Save call script#foo(<args>)
```
<!-- {: data-highlight="-nargs"} -->

#### Arguments

| Argument | Description |
| --- | --- |
| `-nargs=0` | 0 arguments, default |
| `-nargs=1` | 1 argument, includes spaces |
| `-nargs=?` | 0 or 1 argument |
| `-nargs=*` | 0+ arguments, space separated |
| `-nargs=+` | 1+ arguments, space separated |
<!-- {: .-headers} -->

See: [`:help :command-nargs`](https://vimhelp.org/map.txt.html#%3Acommand-nargs)

## Flow

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

See: [`:help :if`](https://vimhelp.org/eval.txt.html#%3Aif)

### Truthiness

```vim
if 1 | echo "true"  | endif
if 0 | echo "false" | endif
if 1       "=> 1 (true)
if 0       "=> 0 (false)
if "1"     "=> 1 (true)
if "456"   "=> 1 (true)
if "xfz"   "=> 0 (false)
```
<!-- {: data-highlight="if 1"} -->

No booleans. `0` is false, `1` is true.

See: [`:help :if`](https://vimhelp.org/eval.txt.html#%3Aif)

### Operators

```vim
if 3 > 2
if a && b
if (a && b) || (c && d)
if !c
```

See: [`:help expression-syntax`](https://vimhelp.org/eval.txt.html#expression-syntax)

### Strings

```vim
if name ==# 'John'     " case-sensitive
if name ==? 'John'     " case-insensitive
if name == 'John'      " depends on :set ignorecase

" also: is#, is?, >=#, >=?, and so on
```

See: [`:help expr-==`](https://vimhelp.org/eval.txt.html#expr-%3D%3D)

### Identity operators

```vim
a is b
a isnot b
```
<!-- {: data-highlight="isnot"} -->

Checks if it's the same instance object.

See: [`:help expr-is`](https://vimhelp.org/eval.txt.html#expr-is)

### Regexp matches

```vim
"hello" =~ 'xx*'
"hello" !~ 'xx*'
"hello" =~ '\v<\d+>'
```

`\v` enables "extended" regex mode which allows word boundary (`<>`), `+`, and more.

See: [`:help expr-=~`](https://vimhelp.org/eval.txt.html#expr-%3D~)

### Single line

```vim
if empty(a:path) | return [] | endif
a ? b : c
```

Use `|` to join lines together.

See: [`:help :bar`](https://vimhelp.org/cmdline.txt.html#%3Abar)

### Boolean logic

```vim
if g:use_dispatch && s:has_dispatch
  ···
endif
```

See: [`:help expr-&&`](https://vimhelp.org/eval.txt.html#expr-%26%26)

## Lists

### Lists

```vim
let mylist = [1, two, 3, "four"]

let first = mylist[0]
let last  = mylist[-1]

" Suppresses errors
let second = get(mylist, 1)
let second = get(mylist, 1, "NONE")
```
<!-- {: data-highlight="mylist[-1]"} -->

See: [`:help list`](https://vimhelp.org/eval.txt.html#list)

### Functions

```vim
len(mylist)
empty(mylist)

sort(list)
let sortedlist = sort(copy(list))

split('hello there world', ' ')
```
<!-- {: data-highlight="copy(list)"} -->

See: [`:help list-functions`](https://vimhelp.org/usr_41.txt.html#list-functions)

### Concatenation

```vim
let longlist = mylist + [5, 6]
let mylist += [7, 8]
```
<!-- {: data-highlight="+="} -->

See: [`:help list-concatenation`](https://vimhelp.org/eval.txt.html#list-concatenation)

### Sublists

```vim
let shortlist = mylist[2:-1]
let shortlist = mylist[2:]     " same

let shortlist = mylist[2:2]    " one item
```
<!-- {: data-highlight="[2:]"} -->

See: [`:help sublist`](https://vimhelp.org/eval.txt.html#sublist)

### Push

```vim
let alist = [1, 2, 3]
let alist = add(alist, 4)
```
<!-- {: data-highlight="add(alist, 4)"} -->

See: [`:help add()`](https://vimhelp.org/builtin.txt.html#add%28%29)

### Map

```vim
call map(files, "bufname(v:val)")  " use v:val for value
call filter(files, 'v:val != ""')
```
<!-- {: data-highlight="v:val"} -->

See: [`:help map()`](https://vimhelp.org/builtin.txt.html#map%28%29), [`:help filter()`](https://vimhelp.org/builtin.txt.html#filter%28%29)

## Dictionaries

### Dictionaries

```vim
let colors = {
  \ "apple": "red",
  \ "banana": "yellow"
}

echo colors["a"]
echo get(colors, "apple")   " suppress error
```
<!-- {: data-highlight="get(colors"} -->

See: [`:help dict`](https://vimhelp.org/eval.txt.html#dict)

### Using dictionaries

```vim
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
```
<!-- {: data-highlight="has_key"} -->

See: [`:help dict-functions`](https://vimhelp.org/usr_41.txt.html#dict-functions)

### Iteration

```vim
for key in keys(mydict)
  echo key . ': ' . mydict[key]
endfor
```

See: [`:help :for`](https://vimhelp.org/eval.txt.html#%3Afor)

### Prefixes

```vim
keys(s:)
```

Prefixes (`s:`, `g:`, `l:`, etc) are actually dictionaries.

See: [`:help variable-scope`](https://vimhelp.org/eval.txt.html#variable-scope)

### Extending

```vim
" Extending with more
call extend(s:fruits, { ... })
```

See: [`:help extend()`](https://vimhelp.org/builtin.txt.html#extend%28%29)

## Numbers

### Casting

```vim
str2float("2.3")
str2nr("3")
float2nr("3.14")
```
<!-- {: data-highlight="str2float"} -->

See: [`:help str2nr()`](https://vimhelp.org/builtin.txt.html#str2nr%28%29), [`:help float2nr()`](https://vimhelp.org/builtin.txt.html#float2nr%28%29)

### Numbers

```vim
let int = 1000
let int = 0xff
let int = 0755   " octal
```
<!-- {: data-highlight="0xff"} -->

See: [`:help Number`](https://vimhelp.org/eval.txt.html#Number)

### Floats

```vim
let fl = 100.1
let fl = 5.4e4
```
<!-- {: data-highlight="5.4e4"} -->

See: [`:help Float`](https://vimhelp.org/eval.txt.html#Float)

### Arithmetic

```vim
3 / 2     "=> 1, integer division
3 / 2.0   "=> 1.5
3 * 2.0   "=> 6.0
```

See: [`:help expr-star`](https://vimhelp.org/eval.txt.html#expr-star), [`:help expr-/`](https://vimhelp.org/eval.txt.html#expr-%2F)

### Math functions

```vim
sqrt(100)
floor(3.5)
ceil(3.3)
abs(-3.4)

sin() cos() tan()
sinh() cosh() tanh()
asin() acos() atan()
```

See: [`:help sqrt()`](https://vimhelp.org/builtin.txt.html#sqrt%28%29)

## Vim-isms

### Execute a command

```vim
execute "vsplit"
execute "e " . fnameescape(filename)
```
<!-- {: data-highlight="fnameescape"} -->

Runs an ex command you typically run with `:`.

See: [`:help :execute`](https://vimhelp.org/eval.txt.html#%3Aexecute)

### Running keystrokes

```vim
normal G
normal! G   " skips key mappings

execute "normal! gg/foo\<cr>dd"
```

Use `:normal` to execute keystrokes as if typing in normal mode. Combine with `:execute` for special keystrokes.

See: [`:help :normal`](https://vimhelp.org/various.txt.html#%3Anormal)

### Getting filenames

```vim
echo expand("%")      " path/file.txt
echo expand("%:t")    " file.txt
echo expand("%:p:h")  " /home/you/path/file.txt
echo expand("%:r")    " path/file
echo expand("%:e")    " txt
```

See: [`:help expand()`](https://vimhelp.org/builtin.txt.html#expand%28%29)

### Silencing

```vim
silent g/Aap/p
```

Suppresses output.

See: [`:help :silent`](https://vimhelp.org/various.txt.html#%3Asilent)

### Echo

```vim
echoerr 'oh it failed'
echomsg 'hello there'
echo 'hello'

echohl WarningMsg | echomsg "=> " . a:msg | echohl None
```

See: [`:help :echo`](https://vimhelp.org/eval.txt.html#%3Aecho)

### Settings

```vim
set number
set nonumber
set number!     " toggle
set numberwidth=5
set guioptions+=e
```

See: [`:help :set`](https://vimhelp.org/options.txt.html#%3Aset)

### Prompts

```vim
let result = confirm("Sure?")
execute "confirm q"
```

See: [`:help :confirm`](https://vimhelp.org/editing.txt.html#%3Aconfirm)

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

See: [`:help exists()`](https://vimhelp.org/builtin.txt.html#exists%28%29), [`:help has()`](https://vimhelp.org/builtin.txt.html#has%28%29)

## Mapping

### Mapping commands

```vim
nmap
vmap
imap
xmap
nnoremap
vnoremap
inoremap
xnoremap
...
```
<!-- {: data-highlight="nnoremap"} -->

See: [`:help map-modes`](https://vimhelp.org/map.txt.html#map-modes)

### Explanation

```text
[nvixso](nore)map
 │       └ don't recurse
 │
 └ normal, visual, insert,
   eX mode, select, operator-pending
```
<!-- {: .-box-chars} -->

See: [`:help mapping`](https://vimhelp.org/map.txt.html#mapping)

### Arguments

| Argument | Description |
| --- | --- |
| `<buffer>` | only in current buffer |
| `<silent>` | no echo |
| `<nowait>` | |
<!-- {: .-headers} -->

See: [`:help :map`](https://vimhelp.org/map.txt.html#%3Amap)

## Syntax

### Highlights

```vim
hi Comment
  term=bold,underline
  gui=bold
  ctermfg=4
  guifg=#80a0ff
```
<!-- {: data-highlight="ctermfg=4"} -->

See: [`:help :highlight`](https://vimhelp.org/syntax.txt.html#%3Ahighlight)

### Filetype detection

```vim
augroup filetypedetect
  au! BufNewFile,BufRead *.json setf javascript
augroup END

au Filetype markdown setlocal spell
```

See: [`:help ftdetect`](https://vimhelp.org/filetype.txt.html#ftdetect)

### Conceal

```vim
set conceallevel=2
syn match newLine "<br>" conceal cchar=}
hi newLine guifg=green
```

See: [`:help conceal`](https://vimhelp.org/syntax.txt.html#conceal)

### Region conceal

```vim
syn region inBold concealends matchgroup=bTag start="<b>" end="</b>"
hi inBold gui=bold
hi bTag guifg=blue
```

See: [`:help syn-region`](https://vimhelp.org/syntax.txt.html#%3Asyn-region)

### Syntax

```vim
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

See: [`:help syn-match`](https://vimhelp.org/syntax.txt.html#%3Asyn-match)

### Include guards

```vim
if exists('g:loaded_myplugin')
  finish
endif

" ...

let g:loaded_myplugin = 1
```
<!-- {: data-highlight="g:loaded_myplugin"} -->

See: [`:help write-plugin`](https://vimhelp.org/usr_51.txt.html#write-plugin)
