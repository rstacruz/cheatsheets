---
title: Vimdiff
subtitle: Vim diff comparison mode
category: Vim
updated: 2026-11-26
weight: -10
intro: |
  Vim is a very efficient text editor. This reference follows Vim 9.2.
links:
  - title: Vim
    url: https://www.vim.org/
tier: t3
last_verified_with: "Vim 9.2."
---

## Getting started

<!-- {: .-three-column} -->

### Navigating

<!-- {: .-prime} -->

| Shortcut       | Description                      |
| ---            | ---                              |
| `]c`           | Next difference                  |
| `[c`           | Previous difference              |

<!-- {: .-shortcuts} -->

See: [Jump to differences](https://vimhelp.org/diff.txt.html#jumpto-diffs)

### Editing

| Shortcut | Description                         |
| ---            | ---                              |
| `do`           | Diff Obtain! <br>Pull the changes to the current file. |
| `dp`           | Diff Put! <br>Push the changes to the other file. |
| ---            | ---                              |
| `:diffupdate`  | Re-scan the files for differences.                    |
| `ZQ`           | Quit without checking changes    |

<!-- {: .-shortcuts} -->

See: [Copying diffs](https://vimhelp.org/diff.txt.html#copy-diffs), [diffupdate](https://vimhelp.org/diff.txt.html#%3Adiffupdate)

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

<!-- {: .-shortcuts} -->

See: [Fold commands](https://vimhelp.org/fold.txt.html#fold-commands)

## Also see

- [Vim cheatsheet](https://vim.rtorr.com/) _(vim.rotrr.com)_
- [Vim documentation](https://vimdoc.sourceforge.net/htmldoc/) _(vimdoc.sourceforge.net)_
- [Interactive Vim tutorial](https://openvim.com/) _(openvim.com)_
