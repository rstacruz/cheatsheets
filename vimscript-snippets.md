---
title: Vimscript snippets
subtitle: Common code recipes
category: Hidden
# Recipes duplicated by /vimscript and /vimscript-functions.
tags: [Archived]
archived: |
  These recipes are covered in more depth by [Vim scripting](/vimscript) and
  [Vimscript functions](/vimscript-functions).
intro: |
  Recipes for Vimscript functions, mappings, autoload files, and
  version or feature checks.
links:
  - title: Vimscript user functions
    url: https://vimhelp.org/userfunc.txt.html
  - title: Vim script
    url: https://vimhelp.org/usr_41.txt.html
  - title: Key mapping
    url: https://vimhelp.org/map.txt.html
---

## Functions

### Bind a key and a command

#### Define

```vim
function! s:FunctionHere() abort
  echom "called"
endfunction
```

#### Bind

```vim
command! YoFunctionHere call s:FunctionHere()
nnoremap <silent> x :call <SID>FunctionHere()<CR>
```

`<SID>` maps to the script that defined the mapping, and a `:command` body keeps its defining script's `s:` scope.

See: [:command](https://vimhelp.org/map.txt.html#%3Acommand)

### Insert a function result

```vim
inoremap <expr> <F2> strftime("%Y-%m-%d")
```

`<expr>` evaluates the right-hand side and inserts the result, so it replaces the older `<C-R>=` form.

See: [:map-<expr>](https://vimhelp.org/map.txt.html#%3Amap-%3Cexpr%3E)

## Autoload

### The autoload file

```vim
" autoload/hello.vim
if exists("g:loaded_hello")
  finish
endif
let g:loaded_hello = 1

function! hello#greet(name) abort
  return "Hello, " . a:name
endfunction
```

See: [Autoload](https://vimhelp.org/userfunc.txt.html#autoload)

### Call it

```vim
" no :source needed, the call loads the file
echo hello#greet("world")
```

The first call sources the file from `&runtimepath`; the guard skips the body if it is sourced again.

See: [Autoload](https://vimhelp.org/userfunc.txt.html#autoload)

## Compatibility

### Version check

```vim
if v:version < 900
  echom "requires Vim 9.0 or later"
endif
```

See: [v:version](https://vimhelp.org/eval.txt.html#v%3Aversion)

### Feature check

```vim
if has("nvim")
  echom "Neovim"
elseif has("patch-9.2.0")
  echom "Vim 9.2 or later"
endif
```

`has("patch-9.2.0")` is false on Neovim, so check `has("nvim")` first.

See: [has()](https://vimhelp.org/builtin.txt.html#has%28%29)

### Check a plugin

```vim
if !empty(globpath(&rtp, "plugin/commentary.vim"))
  echom "commentary is installed"
endif
```

See: [globpath()](https://vimhelp.org/builtin.txt.html#globpath%28%29)
