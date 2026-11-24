---
title: Vimscript functions
subtitle: Built-in function reference
category: Vim
last_verified_with: "Vim 9.2."
updated: 2026-11-24
tier: t3
intro: |
  Reference for Vim's built-in functions: collections, buffers, files,
  strings, numbers, types, shell, and evaluation.
links:
  - title: Vim built-in functions
    url: https://vimhelp.org/builtin.txt.html
  - title: Vim script
    url: https://vimhelp.org/usr_41.txt.html
  - title: Expression evaluation
    url: https://vimhelp.org/eval.txt.html
---

## Collections

### Dictionaries

#### Define

```vim
let colors = {
  \ "apple": "red",
  \ "banana": "yellow"
  \ }
```

#### Read and update

```vim
echo colors["apple"]
echo get(colors, "kiwi", "none")
let colors["pear"] = "green"
call remove(colors, "apple")
```

#### Check

```vim
echo has_key(colors, "pear")
echo len(colors)
echo empty(colors)
```

#### As lists

```vim
echo keys(colors)
echo values(colors)
echo string(colors)
```

#### Iterate

```vim
for [name, color] in items(colors)
  echo name . ": " . color
endfor
```

`map()` and `filter()` take an expression string, so `v:val` expands per item: `map(colors, '"<" . v:val . ">"')`.

See: [Dictionary functions](https://vimhelp.org/usr_41.txt.html#dict-functions)

### Lists

```vim
let mylist = [1, "two", 3, "four"]

echo mylist[0]
echo mylist[-1]
echo get(mylist, 9, "NONE")
call add(mylist, "five")
echo len(mylist)
echo join(mylist, ", ")
```

Negative indexes count from the end; `get()` returns the default instead of raising `E684`.

See: [List functions](https://vimhelp.org/usr_41.txt.html#list-functions)

## Buffers and positions
<!-- {: .-three-column} -->

### Buffer

#### Position

```vim
echo line(".")
echo col(".")
echo col("$")
```

#### Lines

```vim
echo getline(".")
echo getline(1, 5)
call setline(2, "new")
```

#### Blank lines

```vim
echo search("^$", "n")
echo nextnonblank(1)
echo prevnonblank(10)
```

See: [Buffer functions](https://vimhelp.org/usr_41.txt.html#buffer-functions)

### Marks

#### Marks

```vim
echo getpos("'a")
call setpos("'a", [0, 12, 1, 0])
```

#### Visual selection

```vim
echo getpos("'<")
echo getpos("'>")
```

See: [Mark functions](https://vimhelp.org/usr_41.txt.html#mark-functions)

### Cursor

```vim
call cursor(10, 5)
call cursor(10, 5, 1)
echo getcurpos()
```

`getcurpos()` returns `[bufnum, lnum, col, off, curswant]`; `cursor()` takes a line, a column, and an optional offset.

See: [Cursor functions](https://vimhelp.org/usr_41.txt.html#cursor-functions)

## Paths and files

### Expand

#### File

```vim
echo expand("%")
echo expand("%:p")
echo expand("%:p:h")
```

#### Name and extension

```vim
echo expand("%:t")
echo expand("%:r")
echo expand("%:e")
```

#### Word under cursor

```vim
echo expand("<cword>")
```

These take the same modifiers as `:help filename-modifiers`.

See: [Filename modifiers](https://vimhelp.org/cmdline.txt.html#filename-modifiers)

### Files

#### File info

```vim
echo filereadable("file.txt")
echo getfsize("file.txt")
echo getcwd()
```

#### Path helpers

```vim
echo fnamemodify("main.c", ":p:h")
echo fnameescape("a file.txt")
echo globpath(&rtp, "plugin/foo.vim")
```

`getfsize()` is `-1` for a missing file, and `globpath()` is empty when nothing matches.

See: [File functions](https://vimhelp.org/usr_41.txt.html#file-functions)

## Text and syntax
<!-- {: .-three-column} -->

### Strings

#### Match and replace

```vim
echo "hi" =~ "^h"
echo substitute("a-b", "-", "_", "g")
echo matchstr("testing", "test")
echo matchend("testing", "test")
```

#### Slices and positions

```vim
echo strpart("abcdef", 3, 2)
echo stridx("abcdef", "e")
echo strridx("a.b.c", ".")
echo split("abc", '\zs')
```

#### Lengths

```vim
echo strlen("héllo")
echo strchars("héllo")
echo strdisplaywidth("\t")
```

Slicing and indexing count bytes; `strcharpart()` and `strchars()` count characters.

See: [String functions](https://vimhelp.org/usr_41.txt.html#string-functions)

### Registers

```vim
echo getreg('"')
echo getreg("*")
echo getregtype('"')
call setreg("a", "text")
```

`getregtype()` returns `v` for charwise, `V` for linewise, and `"\<C-v>"` for blockwise.

See: [Register functions](https://vimhelp.org/usr_41.txt.html#register-functions)

### Syntax

#### Identify

```vim
let id = synID(line("."), col("."), 1)
echo synIDattr(id, "name")
echo synIDattr(synIDtrans(id), "fg")
```

#### Stack

```vim
let ids = synstack(line("."), col("."))
echo map(ids, 'synIDattr(v:val, "name")')
```

See: [Syntax functions](https://vimhelp.org/usr_41.txt.html#syntax-functions)

## Numbers and types
<!-- {: .-three-column} -->

### Math

```vim
echo fmod(9, 2)
echo abs(-0.5)
echo sqrt(9)
echo trunc(1.84)
echo floor(1.84)
echo ceil(1.84)
echo round(1.5)
echo float2nr(3.14)
echo max([3, 1, 2])
```

`fmod()`, `sqrt()`, and `trunc()` return Floats; `float2nr()` cuts down to an Integer.

See: [fmod()](https://vimhelp.org/builtin.txt.html#fmod%28%29)

### Casting

```vim
echo str2nr("240")
echo str2nr("ff", 16)
echo str2float("0.2")
echo string(0.3)
echo printf("%.2f", 3.14159)
```

`str2nr()` takes an optional base; `string()` quotes a value as Vimscript source.

See: [str2nr()](https://vimhelp.org/builtin.txt.html#str2nr%28%29)

### Type checking

```vim
echo type([]) == v:t_list
echo type({}) == v:t_dict
echo type("") == v:t_string
echo type(0) == v:t_number
echo type(0.0) == v:t_float
echo type(v:true) == v:t_bool
```

`v:t_*` holds the number `type()` returns, so the comparisons read as names.

See: [type()](https://vimhelp.org/builtin.txt.html#type%28%29)

## Shell and time

### Shell

```vim
echo system("ls " . shellescape(expand("%:h")))
echo systemlist("git status --porcelain")
call system("git commit -m " . shellescape(msg))
```

`system()` returns the output as one string, and `systemlist()` as a list of lines.

See: [System functions](https://vimhelp.org/usr_41.txt.html#system-functions)

### Date/time

```vim
echo strftime("%Y-%m-%d %H:%M")
echo strftime("%c", getftime("file.c"))
echo localtime()
```

`getftime()` is the file's modification time; `localtime()` is the current time as a Number.

See: [Date functions](https://vimhelp.org/usr_41.txt.html#date-functions)

## Evaluation

### Compare

```vim
echo "John" ==# "john"
echo "John" ==? "john"
echo "hello" =~# "^h"
echo "hello" !~ "bye"
```

`==` follows `'ignorecase'`; a trailing `#` or `?` forces case-sensitive or case-insensitive.

See: [expr-==](https://vimhelp.org/eval.txt.html#expr-%3D%3D)

### Commands

```vim
execute "normal! dd"
execute "normal! gg=G"
wincmd J
```

`normal!` ignores user mappings, and `execute` expands the string first.

See: [:normal](https://vimhelp.org/various.txt.html#%3Anormal)
