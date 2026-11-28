---
title: Spacemacs
subtitle: Emacs configuration distribution
logo: { src: /assets/logos/spacemacs.svg }
category: Hidden
created_at: 2018-02-16
updated: 2026-11-26
# Unfinished since 2018: layer shortcuts without configuration guidance.
tags: [Archived]
archived: |
  This unfinished reference lists layer keybindings without covering current
  configuration or installation. Use
  [Spacemacs documentation](https://www.spacemacs.org/doc/DOCUMENTATION.html).
intro: |
  Spacemacs is a distribution for Emacs.
links:
  - title: Spacemacs
    url: https://www.spacemacs.org/
last_verified_with: "Spacemacs develop, Emacs 31.1."
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

See: [Key bindings](https://www.spacemacs.org/doc/DOCUMENTATION.html#key-bindings)

### More

| Shortcut    | Description |
| ---         | ---         |
| `SPC` `SPC` | **M-x**     |
| `SPC` `'`   | Terminal    |
| `SPC` `/`   | Search      |

<!-- {: .-shortcuts} -->

See: [Executing Vim and Emacs commands](https://www.spacemacs.org/doc/DOCUMENTATION.html#executing-vim-and-emacs-exm-x-commands)

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

See: [Getting help](https://www.spacemacs.org/doc/DOCUMENTATION.html#getting-help)

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

See: [Buffers and files](https://www.spacemacs.org/doc/DOCUMENTATION.html#buffers-and-files)

### `SPC` `b` - Buffer

| Shortcut | Description                |
| ---      | ---                        |
| `n`      | Next buffer (`:bnext`)     |
| `p`      | Previous buffer (`:bprev`) |
| `d`      | Delete buffer (`:bd`)      |

<!-- {: .-shortcuts} -->

See: [Buffers and files](https://www.spacemacs.org/doc/DOCUMENTATION.html#buffers-and-files)

### `SPC` `f` `e` - Config

| Shortcut | Description              |
| ---      | ---                      |
| `d`      | **Edit config**          |
| `D`      | Edit config and template |
| ---      | ---                      |
| `R`      | Reload config            |

<!-- {: .-shortcuts} -->

See: [Dotfile configuration](https://www.spacemacs.org/doc/DOCUMENTATION.html#dotfile-configuration)

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

See: [Window manipulation](https://www.spacemacs.org/doc/DOCUMENTATION.html#window-manipulation)

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

See: [Managing projects](https://www.spacemacs.org/doc/DOCUMENTATION.html#managing-projects)

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

See: [Workspace key bindings](https://www.spacemacs.org/doc/DOCUMENTATION.html#workspace-key-bindings)

### `SPC` `t` - Toggle

| Shortcut | Description  |
| ---      | ---          |
| `n`      | Line numbers |

<!-- {: .-shortcuts} -->

See: [Toggles](https://www.spacemacs.org/doc/DOCUMENTATION.html#toggles-1)

### `SPC` `j` - Jump

| Shortcut | Description |
| ---      | ---         |
| `j`      | Character   |
| `l`      | Line        |
| `w`      | Word        |

<!-- {: .-shortcuts} -->

See: [Jumping, joining and splitting](https://www.spacemacs.org/doc/DOCUMENTATION.html#jumping-joining-and-splitting)

## More shortcuts

### Major modes

#### Markdown

| Shortcut    | Description            |
| ---         | ---                    |
| `,` `-`     | Insert horizontal rule |
| `,` `h` `1` | Insert H1              |

<!-- {: .-shortcuts} -->

See: [Major mode leader key](https://www.spacemacs.org/doc/DOCUMENTATION.html#major-mode-leader-key)

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

See: [Available layers](https://www.spacemacs.org/doc/DOCUMENTATION.html#available-layers)

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

See: [Vim key bindings](https://www.spacemacs.org/doc/DOCUMENTATION.html#vim-key-bindings)

## References

- [Spacemacs documentation](https://github.com/syl20bnr/spacemacs/blob/master/doc/DOCUMENTATION.org) _(github.com)_
