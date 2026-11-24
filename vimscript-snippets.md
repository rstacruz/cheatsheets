---
title: Vimscript snippets
subtitle: Common code recipes
category: Vim
last_verified_with: "Vim 9.2."
updated: 2026-11-24
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

### Insert a function result

```vim
inoremap <expr> <F2> strftime("%Y-%m-%d")
```

`<expr>` evaluates the right-hand side and inserts the result, so it replaces the older `<C-R>=` form.

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

### Call it

```vim
" no :source needed, the call loads the file
echo hello#greet("world")
```

The first call sources the file from `&runtimepath`; the guard skips the body if it is sourced again.

## Compatibility

### Version check

```vim
if v:version < 900
  echom "requires Vim 9.0 or later"
endif
```

### Feature check

```vim
if has("nvim")
  echom "Neovim"
elseif has("patch-9.2.0")
  echom "Vim 9.2 or later"
endif
```

`has("patch-9.2.0")` is false on Neovim, so check `has("nvim")` first.

### Check a plugin

```vim
if !empty(globpath(&rtp, "plugin/commentary.vim"))
  echom "commentary is installed"
endif
```
