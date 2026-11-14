---
title: Vim
category: Vim
tags: [Featured]
updated: 2026-11-11
tier: t1
weight: -10
intro: |
  [Vim](https://www.vim.org/) is a highly efficient text editor. This reference covers Vim 9.2.

  For shortcut notation, see `:help key-notation`. Run `:Tutor` for the built-in tutorial.
links:
  - title: Vim documentation
    url: https://vimhelp.org/
  - title: Vim source code
    url: https://github.com/vim/vim
---

## Getting started

<!-- {: .-three-column} -->

### Exiting

<!-- {: .-prime} -->

| Shortcut       | Description                      |
| -------------- | -------------------------------- |
| `:q`           | Close window                     |
| `:qa`          | Close all windows                |
| ---            | ---                              |
| `:w`           | Save                             |
| `:wq` _/_ `:x` | Save and close file              |
| ---            | ---                              |
| `ZZ`           | Save and quit                    |
| `:q!` _/_ `ZQ` | Quit without checking changes    |

<!-- {: .-shortcuts} -->

See: [Writing and quitting](https://vimhelp.org/editing.txt.html#write-quit)

### Exiting insert mode

| Shortcut          | Description                            |
| ---               | ---                                    |
| `Esc` _/_ `<C-[>` | Exit insert mode                       |
| `<C-C>`           | Exit insert mode without abbreviations |
| `<C-O>`           | Run one command, then resume insert    |

<!-- {: .-shortcuts} -->

See: [Insert mode](https://vimhelp.org/insert.txt.html#i_CTRL-%5B)

## Editing

<!-- {: .-three-column} -->

### Editing

| Shortcut | Description                         |
| ---      | ---                                 |
| `a`      | Append                              |
| `A`      | Append from end of line             |
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
| `J`      | Join next line                      |
| `gJ`     | Join next line without space        |
| ---      | ---                                 |
| `u`      | Undo changes                        |
| `<C-R>`  | Redo changes                        |

<!-- {: .-shortcuts} -->

See: [Insert mode](https://vimhelp.org/insert.txt.html)

### Clipboard

| Shortcut        | Description                 |
| ---             | ---                         |
| `x`             | Delete character            |
| ---             | ---                         |
| `dd`            | Delete line _(Cut)_         |
| `yy`            | Yank line _(Copy)_          |
| ---             | ---                         |
| `p`             | Paste after cursor          |
| `P`             | Paste before cursor         |
| ---             | ---                         |
| `"*p` _/_ `"+p` | Paste from system clipboard |
| `"*y` _/_ `"+y` | Copy to system clipboard    |

<!-- {: .-shortcuts} -->

See: [Registers](https://vimhelp.org/change.txt.html#quote)

### Visual mode

| Shortcut | Description             |
| ---      | ---                     |
| `v`      | Enter visual mode       |
| `V`      | Enter visual line mode  |
| `<C-V>`  | Enter visual block mode |
| `gv`     | Reselect last selection |

<!-- {: .-shortcuts} -->

#### In visual mode

| Shortcut    | Description                    |
| ---         | ---                            |
| `d` _/_ `x` | Delete selection               |
| `s`         | Change selection               |
| `y`         | Yank selection _(Copy)_        |
| `>` _/_ `<` | Shift selection right/left     |
| `o`         | Move to other end of selection |

<!-- {: .-shortcuts} -->

See [Operators](#operators) for other things you can do.

### Find and replace

| Shortcut         | Description                |
| ---              | ---                        |
| `:%s/foo/bar/g`  | Replace in whole document  |
| `:%s/foo/bar/gc` | Replace with confirmation  |
| `:s/foo/bar/g`   | Replace in current line    |

See: [Search and replace](https://vimhelp.org/change.txt.html#%3Asubstitute)

## Navigating

<!-- {: .-three-column} -->

### Directions

| Shortcut            | Description       |
| ---                 | ---               |
| `h` `j` `k` `l`     | Arrow keys        |
| `<C-U>` _/_ `<C-D>` | Half-page up/down |
| `<C-B>` _/_ `<C-F>` | Page up/down      |

<!-- {: .-shortcuts} -->

See: [Left-right motions](https://vimhelp.org/motion.txt.html#left-right-motions)

### Words

| Shortcut     | Description               |
| ---          | ---                       |
| `b` _/_ `w`  | Previous/next word        |
| `ge` _/_ `e` | Previous/next end of word |

<!-- {: .-shortcuts} -->

See: [Word motions](https://vimhelp.org/motion.txt.html#w)

### Line

| Shortcut     | Description                        |
| ---          | ---                                |
| `0` _(zero)_ | Start of line                      |
| `^`          | Start of line _(after whitespace)_ |
| `$`          | End of line                        |

<!-- {: .-shortcuts} -->

See: [Line motions](https://vimhelp.org/motion.txt.html#0)

### Character

| Shortcut      | Description                    |
| ---           | ---                            |
| `fc`          | Go forward to character `c`    |
| `Fc`          | Go backward to character `c`   |
| `tc` _/_ `Tc` | Go just before/after `c`       |
| `;` _/_ `,`   | Repeat character search        |

<!-- {: .-shortcuts} -->

See: [Character motions](https://vimhelp.org/motion.txt.html#f)

### Document

| Shortcut    | Description              |
| ---         | ---                      |
| `gg`        | First line               |
| `G`         | Last line                |
| `:{number}` | Go to line `{number}`    |
| `{number}G` | Go to line `{number}`    |
| `{number}j` | Go down `{number}` lines |
| `{number}k` | Go up `{number}` lines   |

<!-- {: .-shortcuts} -->

See: [Go to line](https://vimhelp.org/motion.txt.html#G)

### Screen

| Shortcut | Description              |
| ---      | ---                      |
| `zz`     | Center this line         |
| `zt`     | Top this line            |
| `zb`     | Bottom this line         |
| `H`      | Move to top of screen    |
| `M`      | Move to middle of screen |
| `L`      | Move to bottom of screen |

<!-- {: .-shortcuts} -->

See: [Scrolling](https://vimhelp.org/scroll.txt.html#zz)

### Search

| Shortcut    | Description                     |
| ---         | ---                             |
| `/pattern`  | Search forward                  |
| `?pattern`  | Search backward                 |
| `n` _/_ `N` | Next/previous match             |
| `*` _/_ `#` | Next/previous word under cursor |
| `:noh`      | Clear search highlight          |

<!-- {: .-shortcuts} -->

See: [Search commands](https://vimhelp.org/pattern.txt.html#search-commands)

Operators
---------

<!-- {: .-three-column} -->

### Usage

Operators let you operate in a range of text (defined by *motion*). These are performed in normal mode.

<!-- {: .-setup} -->

| Operator | Motion |
| --- | --- |
| `d`      | `w`    |
| Operator | Motion |

<!-- {: .-css-breakdown} -->

See: [Operators](https://vimhelp.org/motion.txt.html#operator)

### Operators list

| Shortcut | Description                     |
| ---      | ---                             |
| `d`      | Delete                          |
| `y`      | Yank _(copy)_                   |
| `c`      | Change _(delete then insert)_   |
| ---      | ---                             |
| `>`      | Indent right                    |
| `<`      | Indent left                     |
| `=`      | Reindent                        |
| ---      | ---                             |
| `g~`     | Swap case                       |
| `gU`     | Uppercase                       |
| `gu`     | Lowercase                       |
| ---      | ---                             |
| `!`      | Filter through external program |

<!-- {: .-shortcuts} -->

See: [Operators](https://vimhelp.org/motion.txt.html#operator)

### Examples

Combine operators with *motions* to use them.

<!-- {: .-setup} -->

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

<!-- {: .-three-column} -->

### Usage

Text objects let you operate (with an *operator*) in or around text blocks (*objects*).

<!-- {: .-setup} -->

| Operator | [i]nside or [a]round | Text object |
| --- | --- | --- |
| `v`      | `i`                  | `p`         |
| Operator | [i]nside or [a]round | Text object |

<!-- {: .-css-breakdown} -->

See: [Text objects](https://vimhelp.org/motion.txt.html#text-objects)

### Text objects

| Shortcut               | Description               |
| ---                    | ---                       |
| `p`                    | Paragraph                 |
| `w`                    | Word                      |
| `s`                    | Sentence                  |
| ---                    | ---                       |
| `[` `(` `{` `<`        | A [], (), {}, or <> block |
| `'` `"` <code>`</code> | A quoted string           |
| ---                    | ---                       |
| `b`                    | Alias for `(` block       |
| `B`                    | Alias for `{` block       |
| `t`                    | An XML tag block          |

<!-- {: .-shortcuts} -->

See: [Text objects](https://vimhelp.org/motion.txt.html#text-objects)

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

<!-- {: .-shortcuts} -->

See [Operators](#operators) for other things you can do.

## Files and windows

### Diff

| Shortcut                     | Description              |
| ---                          | ---                      |
| `vimdiff file1 file2`        | Edit files in diff mode  |
| `gvimdiff file1 file2`       | Same, in the GUI         |
| `:diffthis`                  | Add window to diff mode  |
| `:diffoff`                   | Stop diff mode           |
| `:set diffopt+=linematch:60` | Align similar diff lines |

See: [Diff mode](https://vimhelp.org/diff.txt.html#vimdiff)

### Tab pages

| Shortcut                   | Description            |
| ---                        | ---                    |
| `:tabnew` _/_ `:tabedit`   | New tab                |
| `:tabfind [file]`          | Find file in a new tab |
| `:tabclose`                | Close current tab      |
| ---                        | ---                    |
| `:tabs`                    | List all tabs          |
| `gt` _/_ `gT`              | Next/previous tab      |
| `:tabfirst`                | Go to first tab        |
| `:tablast`                 | Go to last tab         |
| `:tabn` _/_ `:tabp`        | Next/previous tab      |

<!-- {: .-shortcuts} -->

Vim 9.2 adds a vertical tabpanel: `:set showtabpanel=2` always shows it.

See: [Tab pages](https://vimhelp.org/tabpage.txt.html)

### Windows

| Shortcut             | Description                     |
| ---                  | ---                             |
| `:sp [file]`         | Split horizontally              |
| `:vsp [file]`        | Split vertically                |
| ---                  | ---                             |
| `<C-W>w`             | Next window                     |
| `<C-W>h/j/k/l`       | Go to window left/down/up/right |
| ---                  | ---                             |
| `<C-W>c`             | Close window                    |
| `<C-W>o`             | Close other windows             |
| ---                  | ---                             |
| `z{height}<Cr>`      | Resize to `{height}` lines      |
| `:terminal`          | Open a terminal window          |
| `:vertical terminal` | Terminal in vertical split      |

<!-- {: .-shortcuts} -->

See: [Windows](https://vimhelp.org/windows.txt.html), [Terminal](https://vimhelp.org/terminal.txt.html)

## Reference

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
| `zi`          | Toggle folding               |
| ---           | ---                          |
| `zx`          | Update folds                 |

<!-- {: .-shortcuts} -->

Uppercase ones are recursive (eg, `zO` is open recursively).

See: [Folds](https://vimhelp.org/fold.txt.html#zo)

### Navigation

| Shortcut      | Description                |
| ---           | ---                        |
| `%`           | Matching `()`, `[]`, `{}`  |
| `[(` `[{`     | Previous unmatched `(`/`{` |
| `])` `]}`     | Next unmatched `)`/`}`     |
| ---           | ---                        |
| `[m` _/_ `[M` | Previous method start/end  |
| `]m` _/_ `]M` | Next method start/end      |

<!-- {: .-shortcuts} -->

See: [Matching pairs](https://vimhelp.org/motion.txt.html#%25)

### Jumping

| Shortcut | Description                  |
| ---      | ---                          |
| `<C-O>`  | Go back to previous location |
| `<C-I>`  | Go forward                   |
| ---      | ---                          |
| `gf`     | Go to file in cursor         |

<!-- {: .-shortcuts} -->

See: [Jump motions](https://vimhelp.org/motion.txt.html#jump-motions)

### Counters

| Shortcut                | Description                              |
| ---                     | ---                                      |
| `<C-A>`                 | Increment number                         |
| `<C-X>`                 | Decrement                                |
| `g<C-A>` _/_ `g<C-X>`   | In visual mode: increment/decrement lines |

<!-- {: .-shortcuts} -->

See: [CTRL-A](https://vimhelp.org/change.txt.html#CTRL-A)

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
| `:tjump Classname`    | Find definitions of Classname (jump if one)     |

<!-- {: .-shortcuts} -->

See: [Tags](https://vimhelp.org/tagsrch.txt.html)

### Case

| Shortcut | Description                          |
| ---      | ---                                  |
| `~`      | Toggle case (Case => cASE)           |
| `gU`     | Uppercase                            |
| `gu`     | Lowercase                            |
| ---      | ---                                  |
| `gUU`    | Uppercase current line (also `gUgU`) |
| `guu`    | Lowercase current line (also `gugu`) |

<!-- {: .-shortcuts} -->

Do these in visual or normal mode.

See: [Changing case](https://vimhelp.org/change.txt.html#g~)

### Marks

| Shortcut           | Description                                          |
| ---                | ---                                                  |
| <code>`^</code>    | Last position of cursor in insert mode               |
| <code>`.</code>    | Last change in current buffer                        |
| <code>`"</code>    | Last exited current buffer                           |
| <code>`0</code>    | In last file edited                                  |
| <code>''</code>    | Back to line in current buffer where jumped from     |
| <code>``</code>    | Back to position in current buffer where jumped from |
| <code>`[</code>    | To beginning of previously changed or yanked text    |
| <code>`]</code>    | To end of previously changed or yanked text          |
| <code>`&lt;</code> | To beginning of last visual selection                |
| <code>`&gt;</code> | To end of last visual selection                      |
| ---                | ---                                                  |
| `ma`               | Mark this cursor position as `a`                     |
| <code>`a</code>    | Jump to the cursor position `a`                      |
| `'a`               | Jump to the beginning of the line with position `a`  |
| <code>d'a</code>   | Delete from current line to line of mark `a`         |
| <code>d`a</code>   | Delete from current position to position of mark `a` |
| <code>c'a</code>   | Change text from current line to line of `a`         |
| <code>y`a</code>   | Yank text from current position to position of `a`   |
| ---                | ---                                                  |
| `:marks`           | List all current marks                               |
| `:delm a`          | Delete mark `a`                                      |
| `:delm a-d`        | Delete marks `a`, `b`, `c`, `d`                      |
| `:delm abc`        | Delete marks `a`, `b`, `c`                           |

<!-- {: .-shortcuts} -->

See: [Marks](https://vimhelp.org/motion.txt.html#mark-motions)

## Misc

### Misc

| Shortcut       | Description                               |
| ---            | ---                                       |
| `.`            | Repeat last command                       |
| `]p`           | Paste under the current indentation level |
| ---            | ---                                       |
| `:set ff=unix` | Write with Unix line endings              |
| `:set ff=dos`  | Write with DOS line endings               |

<!-- {: .-shortcuts} -->

See: [Repeating commands](https://vimhelp.org/repeat.txt.html#.)

### Command line

| Shortcut     | Description                |
| ---          | ---                        |
| `<C-R><C-W>` | Insert current word        |
| `<C-R>"`     | Paste from unnamed register |

<!-- {: .-shortcuts} -->

See: [Command-line editing](https://vimhelp.org/cmdline.txt.html#c_CTRL-R)

### Insert completion

| Shortcut             | Description                        |
| ---                  | ---                                |
| `<C-N>` _/_ `<C-P>`  | Complete word from buffer          |
| `<C-X><C-F>`         | Complete file path                 |
| `<C-X><C-L>`         | Complete whole line                |
| `<C-X><C-R>`         | Complete from registers (Vim 9.2)  |
| `<C-X>s`             | Suggest spelling                   |

<!-- {: .-shortcuts} -->

Vim 9.2 matches fuzzily with `:set completeopt+=fuzzy`.

See: [Insert completion](https://vimhelp.org/insert.txt.html#ins-completion)

### Text alignment

```
:center [width]
:right [width]
:left
```

See: [Aligning text](https://vimhelp.org/change.txt.html#%3Acenter)

### Calculator

| Shortcut      | Description                               |
| ---           | ---                                       |
| `<C-R>=128/2` | Shows the result of the division : '64'   |

Do this in insert mode.

See: [Expression register](https://vimhelp.org/insert.txt.html#i_CTRL-R_%3D)

### Exiting with an error

```
:cq
:cquit
```

Quits like `:qa!`, abandoning changes, and returns an error code. Great for aborting Git commands.

See: [:cquit](https://vimhelp.org/quickfix.txt.html#%3Acquit)

### Spell checking

| Shortcut                     | Description                       |
| ---                          | ---                               |
| `:set spell spelllang=en_us` | Turn on US English spell checking |
| `]s`                         | Next misspelled word              |
| `[s`                         | Previous misspelled word          |
| ---                          | ---                               |
| `z=`                         | Suggest spellings                 |
| `zg`                         | Add word to spell list            |
| `zw`                         | Mark word as misspelled           |
| `zug`                        | Undo `zg`/`zw` for word           |
| `<C-X>s`                     | Suggest spelling (insert mode)    |

See: [Spell checking](https://vimhelp.org/spell.txt.html)

Also see
--------

- [Vim 9.2 release notes](https://www.vim.org/vim-9.2-released.php) _(vim.org)_
- [Vim FAQ](https://vimhelp.org/vim_faq.txt.html) _(vimhelp.org)_
- [Vim downloads](https://www.vim.org/download.php) _(vim.org)_
