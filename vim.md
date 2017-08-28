---
title: Vim
category: Vim
layout: 2017/sheet
---

Getting started
---------------
{: .-three-column}

### Exiting
{: .-prime}

| Shortcut       | Description                      |
| ---            | ---                              |
| `:qa`          | Close all files                  |
| `:qa!`         | Close all files, abandon changes |
| ---            | ---                              |
| `:w`           | Save                             |
| `:wq` _/_ `:x` | Save and close file              |
| ---            | ---                              |
| `:q`           | Close file                       |
| `:q!`          | Close file, abandon changes      |
| ---            | ---                              |
| `ZZ`           | Save and quit                    |
| `ZQ`           | Quit without checking changes    |
{: .-shortcuts}

### Navigating

| Shortcut        | Description                        |
| ---             | ---                                |
| `h` `j` `k` `l` | Arrow keys                         |
| `^u` _/_ `^d`   | Page up/page down                  |
| ---             | ---                                |
| `b` _/_ `w`     | Previous/next word                 |
| `e` _/_ `ge`    | Previous/next end of word          |
| ---             | ---                                |
| `0` _(zero)_    | Start of line                      |
| `^`             | Start of line _(after whitespace)_ |
| ---             | ---                                |
| `$`             | End of line                        |
| `gg`            | First line                         |
| `G`             | Last line                          |
| ---             | ---                                |
| `:n`            | Go to line `n`                     |
| `nG`            | Go to line `n`                     |
{: .-shortcuts}

### Entering insert mode

| Shortcut | Description                         |
| ---      | ---                                 |
| `a`      | Append                              |
| `i`      | Insert                              |
| `o`      | Next line                           |
| `O`      | Previous line                       |
| ---      | ---                                 |
| `s`      | Delete char and insert              |
| `S`      | Delete line and insert              |
| `C`      | Delete until end of line and insert |
| ---      | ---                                 |
| `R`      | Replace                             |
{: .-shortcuts}

### Exiting insert mode

| Shortcut | Description |
| --- | --- |
| `Esc` _/_ `^[` | Exit insert mode |
| `^c` | Exit insert mode, and abort current command |
{: .-shortcuts}

### Clipboard

| Shortcut | Description         |
| ---      | ---                 |
| `x`      | Delete character    |
| ---      | ---                 |
| `dd`     | Delete line _(Cut)_ |
| `yy`     | Yank line _(Copy)_  |
| ---      | ---                 |
| `p`      | Paste               |
| `P`      | Paste before        |
{: .-shortcuts}

### Visual mode

| Shortcut    | Description             |
| ---         | ---                     |
| `v`         | Enter visual mode       |
| `V`         | Enter visual line mode  |
| `^v`        | Enter visual block mode |
| ---         | ---                     |
| `d` _/_ `x` | Delete selection        |
| `s`         | Replace selection       |
| `y`         | Yank selection _(Copy)_ |
{: .-shortcuts}

Text objects
------------

### Usage

| Shortcut    | Description                        |
| ---         | ---                                |
| `vip`       | Select paragraph                   |
| `vipipipip` | Select more                        |
| ---         | ---                                |
| `yip`       | Yank inner paragraph               |
| `yap`       | Yank paragraph (including newline) |
| ---         | ---                                |
| `dip`       | Delete inner paragraph             |
{: .-shortcuts}

### Text objects

| Shortcut                  | Description           |
| ---                       | ---                   |
| `ap`                      | a paragraph           |
| `ip`                      | inner paragraph       |
| ---                       | ---                   |
| `ap` `ip`                 | Paragraph             |
| `aw` `iw`                 | Word                  |
| `as` `is`                 | Sentence              |
| ---                       | ---                   |
| `a[` `a(` `a{` `a<`       | A [], (), or {} block |
| `a'` `a"` <code>a`</code> | A quoted string       |
| ---                       | ---                   |
| `ab`                      | A block [(            |
| `aB`                      | A block in [{         |
| `at`                      | A XML tag block       |
{: .-shortcuts}

### Navigation

| Shortcut            | Description                |
| ---                 | ---                        |
| `[(` `[{` `[<`      | previous `(` or `{` or `<` |
| `])`                | next                       |
| ---                 | ---                        |
| `[m`                | previous method start      |
| `[M`                | previous method end        |
{: .-shortcuts}


Misc
----

### Folds

| Shortcut      | Description                  |
| ---           | ---                          |
| `zo` _/_ `zO` | Open                         |
| `zc` _/_ `zC` | Close                        |
| `za` _/_ `zA` | Toggle                       |
| ---           | ---                          |
| `zv`          | Open folds for this line     |
| ---           | ---                          |
| `zM`          | Close all                    |
| `zR`          | Open all                     |
| ---           | ---                          |
| `zm`          | Fold more _(foldlevel += 1)_ |
| `zr`          | Fold less _(foldlevel -= 1)_ |
| ---           | ---                          |
| `zx`          | Update folds                 |
{: .-shortcuts}

Uppercase ones are recursive (eg, `zO` is open recursively).

### Jumping

| Shortcut | Description                  |
| ---      | ---                          |
| `^O`     | Go back to previous location |
| `^I`     | Go forward                   |
| ---      | ---                          |
| `gf`     | go to file in cursor         |
{: .-shortcuts}

### Counters

| `^A` | increment number |
| `^X` | decrement |

### Windows

| `z{height}<Cr>` | Resize pane to `{height}` lines tall |

### Tags

| Shortcut              | Description                                     |
| ---                   | ---                                             |
| `:tag Classname`      | Jump to first definition of Classname           |
| ---                   | ---                                             |
| `^]`                  | Jump to definition                              |
| `g]`                  | See all definitions                             |
| `^t`                  | Go back to last tag                             |
| `^o ^i`               | Back/forward                                    |
| ---                   | ---                                             |
| `:tselect Classname`  | Find definitions of Classname                   |
| `:tjump Classname`    | Find definitions of Classname (auto-select 1st) |
{: .-shortcuts}

### Case

| Shortcut | Description                          |
| ---      | ---                                  |
| `~`      | toggle case (Case => cASE)           |
| `gU`     | uppercase                            |
| `gu`     | lowercase                            |
| ---      | ---                                  |
| `gUU`    | uppercase current line (also `gUgU`) |
| `guu`    | lowercase current line (also `gugu`) |
{: .-shortcuts}

Do these in visual mode.

### Marks

| Shortcut        | Description                            |
| ---             | ---                                    |
| <code>`^</code> | Last position of cursor in insert mode |
| <code>`.</code> | Last change                            |
| <code>``</code> | Last jump                              |
| ---             | ---                                    |
| `ma`            | Mark this cursor position as `a`       |
| `'a`            | Jump to cursor position `a`            |
{: .-shortcuts}

### Misc

| Shortcut | Description                               |
| ---      | ---                                       |
| `.`      | repeat last command                       |
| `]p`     | paste under the current indentation level |
| ---      | ---                                       |
| `zz`     | Center this line                          |
{: .-shortcuts}

### Command line

| Shortcut     | Description                               |
| ---          | ---                                       |
| `<C-r><C-w>` | insert current word into the command line |
| `<C-r>"`     | paste from " register                     |
{: .-shortcuts}

### Text alignment

    :center [width]
    :right [width]
    :left

See `:help formatting`

### Calculator

    <C-r>=128/2

Do this in insert mode.

Also see
--------
{: .-one-column}

* [Digraphs](vim-digraphs)
* [Help text](vim-help)
* [Vimscript](vimscript)
* [Vim-unite](vim-unite)
* [Vim-easyalign](vim-easyalign)
* [Vim-rails](vim-rails)
{: .-also-see}

This reference was made for Vim 8.0.

