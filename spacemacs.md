---
title: Spacemacs
category: Apps
updated: 2020-05-22
tags: [WIP]
intro: |
  [Spacemacs](http://spacemacs.org) is a distribution for Emacs.
---

Shortcuts
---------
{: .-three-column}

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
{: .-shortcuts.-prime}

### More

| Description | Shortcut    |
| ---         | ---         |
| **M-x**     | `SPC` `SPC` |
| Terminal    | `SPC` `'`   |
| Search      | `SPC` `/`   |
{: .-shortcuts-right}

### `SPC` `h` - Help

| Description        | Shortcut |
| ---                | ---      |
| **Spacemacs help** | `SPC`    |
| ---                | ---      |
| Layers             | `l`      |
| Documentation      | `r`      |
| FAQ                | `f`      |
| Vimtutor           | `T`      |
{: .-shortcuts-right}

### `SPC` `f` - File

| Description   | Shortcut |
| ---           | ---      |
| **Save**      | `s`      |
| Save all      | `S`      |
| Copy          | `c`      |
| Delete        | `D`      |
| ---           | ---      |
| Show filename | `y`      |
{: .-shortcuts-right}

### `SPC` `b` - Buffer

| Description                | Shortcut |
| ---                        | ---      |
| Next buffer (`:bnext`)     | `n`      |
| Previous buffer (`:bprev`) | `p`      |
| Delete buffer (`:bd`)      | `d`      |
{: .-shortcuts-right}

### `SPC` `f` `e` - Config

| Description              | Shortcut |
| ---                      | ---      |
| **Edit config**          | `d`      |
| Edit config and template | `D`      |
| ---                      | ---      |
| Reload config            | `R`      |
{: .-shortcuts}

### `SPC` `w` - Window

| Description         | Shortcut              |
| ---                 | ---                   |
| Help                | `.`                   |
|                     | ---                   |
| Select              | `h` / `j` / `k` / `l` |
| Move                | `H` / `J` / `K` / `L` |
| ---                 | ---                   |
| Split               | `s`                   |
| Split & follow      | `S`                   |
| ---                 | ---                   |
| Split vert          | `v`                   |
| Split vert & follow | `V`                   |
{: .-shortcuts-right}

### `SPC` `p` - Project

| Description             | Shortcut |
| ---                     | ---      |
| **Switch project**      | `l`      |
| Switch project          | `p`      |
| ---                     | ---      |
| **Open files & recent** | `h`      |
| Open files              | `f`      |
| ---                     | ---      |
| **Show tree**           | `t`      |
| ---                     | ---      |
| Open terminal           | `'`      |
| Open terminal in root   | `$` `t`  |
{: .-shortcuts-right}

### `SPC` `l` `w` - Workspaces

| Description                 | Shortcut    |
| ---                         | ---         |
| Help                        | `?`         |
| ---                         | ---         |
| Switch previous layout      | `TAB`       |
| **Switch to nth workspace** | `0` ... `9` |
| ---                         | ---         |
| Rename                      | `R`         |
{: .-shortcuts-right}

### `SPC` `t` - Toggle

| Description  | Shortcut |
| ---          | ---      |
| Line numbers | `n`      |
{: .-shortcuts

### `SPC` `j` - Jump

| Description | Shortcut |
| ---         | ---      |
| Character   | `j`      |
| Line        | `l`      |
| Word        | `w`      |
{: .-shortcuts-right}

## Major modes

### Markdown

| Shortcut    | Description            |
| ---         | ---                    |
| `,` `-`     | Insert horizontal rule |
| `,` `h` `1` | Insert H1              |
{: .-shortcuts}

## Other layers

### version-control

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
{: .-shortcuts}

Version control is provided by Magit.

## Emacs standard

### File

| Description      | Emacs       | Spacemacs     |
| ---              | ---         | ---           |
| Save             | `C-x` `C-s` | `SPC` `f` `s` |
| Open             | `C-x` `C-f` | `SPC` `f` `f` |
| Close            | `C-x` `C-k` |               |
| ---              | ---         | ---           |
| Split horizontal | `C-x` `2`   | `SPC` `w` `h` |
| Split vertical   | `C-x` `3`   | `SPC` `w` `v` |
| ---              | ---         | ---           |
| Confirm          | `C-c` `C-c` |               |
| Abort            | `C-c` `C-k` |               |
{: .-shortcuts-right}

## References

- [Spacemacs documentation](https://github.com/syl20bnr/spacemacs/blob/master/doc/DOCUMENTATION.org) _(github.com)_
