---
title: Spacemacs
category: Apps
updated: 2020-05-22
tags: [WIP]
intro: |
  [Spacemacs](http://spacemacs.org) is a distribution for Emacs.
links:
  - title: Spacemacs
    url: https://www.spacemacs.org/
---

Shortcuts
---------

<!-- {: .-three-column} -->

### Layers

| Shortcut  | Description       |
| ---       | ---               |
| `SPC` `f` | File              |
| `SPC` `p` | Project           |
| `SPC` `t` | Toggle            |
| `SPC` `b` | Buffer            |
| ---       | ---               |
| `SPC` `m` | Major mode        |
| `,`       | Same as `SPC` `m` |
| ---       | ---               |
| `SPC` `g` | Git               |
| `SPC` `l` | Layout            |
| `SPC` `a` | Apps              |
| `SPC` `h` | Help              |

<!-- {: .-shortcuts.-prime} -->

### More

| Shortcut    | Description |
| ---         | ---         |
| `SPC` `SPC` | **M-x**     |
| `SPC` `'`   | Terminal    |
| `SPC` `/`   | Search      |

<!-- {: .-shortcuts} -->

### `SPC` `h` - Help

| Shortcut | Description        |
| ---      | ---                |
| `SPC`    | **Spacemacs help** |
| ---      | ---                |
| `l`      | Layers             |
| `r`      | Documentation      |
| `f`      | FAQ                |
| `T`      | Vimtutor           |

<!-- {: .-shortcuts} -->

### `SPC` `f` - File

| Shortcut | Description   |
| ---      | ---           |
| `s`      | **Save**      |
| `S`      | Save all      |
| `c`      | Copy          |
| `D`      | Delete        |
| ---      | ---           |
| `y`      | Show filename |

<!-- {: .-shortcuts} -->

### `SPC` `b` - Buffer

| Shortcut | Description                |
| ---      | ---                        |
| `n`      | Next buffer (`:bnext`)     |
| `p`      | Previous buffer (`:bprev`) |
| `d`      | Delete buffer (`:bd`)      |

<!-- {: .-shortcuts} -->

### `SPC` `f` `e` - Config

| Shortcut | Description              |
| ---      | ---                      |
| `d`      | **Edit config**          |
| `D`      | Edit config and template |
| ---      | ---                      |
| `R`      | Reload config            |

<!-- {: .-shortcuts} -->

### `SPC` `w` - Window

| Shortcut              | Description         |
| ---                   | ---                 |
| `.`                   | Help                |
| ---                   | |
| `h` / `j` / `k` / `l` | Select              |
| `H` / `J` / `K` / `L` | Move                |
| ---                   | ---                 |
| `s`                   | Split               |
| `S`                   | Split & follow      |
| ---                   | ---                 |
| `v`                   | Split vert          |
| `V`                   | Split vert & follow |

<!-- {: .-shortcuts} -->

### `SPC` `p` - Project

| Shortcut | Description             |
| ---      | ---                     |
| `l`      | **Switch project**      |
| `p`      | Switch project          |
| ---      | ---                     |
| `h`      | **Open files & recent** |
| `f`      | Open files              |
| ---      | ---                     |
| `t`      | **Show tree**           |
| ---      | ---                     |
| `'`      | Open terminal           |
| `$` `t`  | Open terminal in root   |

<!-- {: .-shortcuts} -->

### `SPC` `l` `w` - Workspaces

| Shortcut    | Description                 |
| ---         | ---                         |
| `?`         | Help                        |
| ---         | ---                         |
| `TAB`       | Switch previous layout      |
| `0` ... `9` | **Switch to nth workspace** |
| ---         | ---                         |
| `R`         | Rename                      |

<!-- {: .-shortcuts} -->

### `SPC` `t` - Toggle

| Shortcut | Description  |
| ---      | ---          |
| `n`      | Line numbers |

<!-- {: .-shortcuts} -->

### `SPC` `j` - Jump

| Shortcut | Description |
| ---      | ---         |
| `j`      | Character   |
| `l`      | Line        |
| `w`      | Word        |

<!-- {: .-shortcuts} -->

## More shortcuts

### Major modes

#### Markdown

| Shortcut    | Description            |
| ---         | ---                    |
| `,` `-`     | Insert horizontal rule |
| `,` `h` `1` | Insert H1              |

<!-- {: .-shortcuts} -->

### Other layers

#### version-control

| Shortcut              | Description            |
| ---                   | ---                    |
| `SPC` `g` `s`         | **Status**             |
| ---                   | ---                    |
| `SPC` `g` `m`         | **Open dispatch menu** |
| `SPC` `g` `m` `s`     | Stage                  |
| `SPC` `g` `m` `P` `p` | Push                   |
| `SPC` `g` `m` `c`     | Commit                 |
| ---                   | ---                    |
| `SPC` `g` `t`         | Open time machine      |
| ---                   | ---                    |
| `SPC` `g` `l` `l`     | Open in GitHub         |
| `SPC` `g` `l` `L`     | Show GitHub URL        |

<!-- {: .-shortcuts} -->

Version control is provided by Magit.

### Emacs standard

#### File

| Emacs       | Spacemacs     | Description      |
| ---         | ---           | ---              |
| `C-x` `C-s` | `SPC` `f` `s` | Save             |
| `C-x` `C-f` | `SPC` `f` `f` | Open             |
| `C-x` `C-k` |               | Close            |
| ---         | ---           | ---              |
| `C-x` `2`   | `SPC` `w` `h` | Split horizontal |
| `C-x` `3`   | `SPC` `w` `v` | Split vertical   |
| ---         | ---           | ---              |
| `C-c` `C-c` |               | Confirm          |
| `C-c` `C-k` |               | Abort            |

<!-- {: .-shortcuts} -->

## References

- [Spacemacs documentation](https://github.com/syl20bnr/spacemacs/blob/master/doc/DOCUMENTATION.org) _(github.com)_
