---
title: Vim
category: Vim
layout: 2017/sheet
tags: [Featured]
updated: 2017-08-26
weight: -10
intro: |
  [Vim](http://www.vim.org/) is a very efficient text editor. This reference was made for Vim 8.0.
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

| `h` `j` `k` `l`     | Arrow keys                         |
| `<C-U>` _/_ `<C-D>` | Page up/page down                  |
{: .-shortcuts}

#### Words

| `b` _/_ `w`     | Previous/next word                 |
| `e` _/_ `ge`    | Previous/next end of word          |
{: .-shortcuts}

#### Line

| Shortcut     | Description                        |
| ---          | ---                                |
| `0` _(zero)_ | Start of line                      |
| `^`          | Start of line _(after whitespace)_ |
| `$`          | End of line                        |
{: .-shortcuts}

#### Document

| Shortcut | Description    |
| ---      | ---            |
| `gg`     | First line     |
| `G`      | Last line      |
| `:n`     | Go to line `n` |
| `nG`     | Go to line `n` |
{: .-shortcuts}

#### Window

| Shortcut | Description              |
| ---      | ---                      |
| `zz`     | Center this line         |
| `H`      | Move to top of screen    |
| `M`      | Move to middle of screen |
| `L`      | Move to bottom of screen |
{: .-shortcuts}


### Editing

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
| `r`      | Replace one character               |
| `R`      | Enter Replace mode                  |
{: .-shortcuts}

### Exiting insert mode

| Shortcut | Description |
| --- | --- |
| `Esc` _/_ `<C-[>` | Exit insert mode |
| `<C-C>` | Exit insert mode, and abort current command |
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

| `v`         | Enter visual mode       |
| `V`         | Enter visual line mode  |
| `<C-V>`        | Enter visual block mode |
{: .-shortcuts}

#### In visual mode

| `d` _/_ `x` | Delete selection        |
| `s`         | Replace selection       |
| `y`         | Yank selection _(Copy)_ |
{: .-shortcuts}

See [Operators](#operators) for other things you can do.

Operators
---------
{: .-three-column}

### Usage
{: .-prime}

Operators let you operate in a range of text (defined by *motion*). These are preformed in normal mode.
{: .-setup}

| `d`      | `w`    |
| Operator | Motion |
{: .-css-breakdown}

### Operators list

| Shortcut | Description                     |
| ---      | ---                             |
| `d`      | Delete                          |
| `y`      | Yank _(copy)_                   |
| `c`      | Change _(delete then insert)_   |
| ---      | ---                             |
| `>`      | Indent right                    |
| `<`      | Indent left                     |
| ---      | ---                             |
| `g~`     | Swap case                       |
| `gU`     | Uppercase                       |
| `gu`     | Lowercase                       |
| ---      | ---                             |
| `!`      | Filter through external program |
{: .-shortcuts}

See `:help operator`

### Examples

Combine operators with *motions* to use them.
{: .-setup}

| Shortcut               | Description                               |
| ---                    | ---                                       |
| `d`_d_                 | _(repeat the letter)_ Delete current line |
| `d`_w_                 | Delete to next word                       |
| `d`_b_                 | Delete to beginning of word               |
| _2_`dd`                | Delete 2 lines                            |
| `d`_ip_                | Delete a text object _(inside paragraph)_ |
| _(in visual mode)_ `d` | Delete selection                          |

See: `:help motion.txt`

Text objects
------------
{: .-three-column}

### Usage
{: .-prime}

Text objects let you operate (with an *operator*) in or around text blocks (*objects*).
{: .-setup}

| `v`      | `i`                  | `p`         |
| Operator | [i]nside or [a]round | Text object |
{: .-css-breakdown}

### Text objects

| Shortcut               | Description           |
| ---                    | ---                   |
| `p`                    | Paragraph             |
| `w`                    | Word                  |
| `s`                    | Sentence              |
| ---                    | ---                   |
| `[` `(` `{` `<`        | A [], (), or {} block |
| `'` `"` <code>`</code> | A quoted string       |
| ---                    | ---                   |
| `b`                    | A block [(            |
| `B`                    | A block in [{         |
| `t`                    | A XML tag block       |
{: .-shortcuts}

### Examples

| Shortcut    | Description                        |
| ---         | ---                                |
| `vip`       | Select paragraph                   |
| `vipipipip` | Select more                        |
| ---         | ---                                |
| `yip`       | Yank inner paragraph               |
| `yap`       | Yank paragraph (including newline) |
| ---         | ---                                |
| `dip`       | Delete inner paragraph             |
| `cip`       | Change inner paragraph             |
{: .-shortcuts}

See [Operators](#operators) for other things you can do.

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

### Navigation

| Shortcut            | Description                |
| ---                 | ---                        |
| `[(` `[{` `[<`      | previous `(` or `{` or `<` |
| `])`                | next                       |
| ---                 | ---                        |
| `[m`                | previous method start      |
| `[M`                | previous method end        |
{: .-shortcuts}

### Jumping

| Shortcut | Description                  |
| ---      | ---                          |
| `<C-O>`     | Go back to previous location |
| `<C-I>`     | Go forward                   |
| ---      | ---                          |
| `gf`     | go to file in cursor         |
{: .-shortcuts}

### Counters

| `<C-A>` | increment number |
| `<C-X>` | decrement |
{: .-shortcuts}

### Windows

| `z{height}<Cr>` | Resize pane to `{height}` lines tall |

### Tags

| Shortcut              | Description                                     |
| ---                   | ---                                             |
| `:tag Classname`      | Jump to first definition of Classname           |
| ---                   | ---                                             |
| `<C-]>`               | Jump to definition                              |
| `g]`                  | See all definitions                             |
| `<C-T>`               | Go back to last tag                             |
| `<C-O> <C-I>`         | Back/forward                                    |
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

Do these in visual or normal mode.

### Marks

| Shortcut        | Description                                        |
| ---             | ---                                                |
| <code>`^</code> | Last position of cursor in insert mode             |
| <code>`.</code> | Last change                                        |
| <code>``</code> | Last jump                                          |
| ---             | ---                                                |
| `ma`            | Mark this cursor position as `a`                   |
| <code>`a</code> | Jump to the cursor position `a`                    |
| `'a`            | Jump to the beginning of the line with position `a`|
{: .-shortcuts}

### Misc

| Shortcut | Description                               |
| ---      | ---                                       |
| `.`      | repeat last command                       |
| `]p`     | paste under the current indentation level |
{: .-shortcuts}

### Command line

| Shortcut     | Description                               |
| ---          | ---                                       |
| `<C-R><C-W>` | insert current word into the command line |
| `<C-R>"`     | paste from " register                     |
{: .-shortcuts}

### Text alignment

    :center [width]
    :right [width]
    :left

See `:help formatting`

### Calculator

    <C-R>=128/2

Do this in insert mode.

### Exiting with an error

    :cq
    :cquit

Works like `:qa`, but throws an error. Great for aborting Git commands.

Also see
--------

- [Vim cheatsheet](https://vim.rtorr.com/) _(vim.rotrr.com)_
- [Vim documentation](http://vimdoc.sourceforge.net/htmldoc/) _(vimdoc.sourceforge.net)_
- [Interactive Vim tutorial](http://openvim.com/) _(openvim.com)_
