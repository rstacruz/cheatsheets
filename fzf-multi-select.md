---
title: How to select multiple files with fzf
link_title: Select multiple files in fzf
subtitle: Mark several results at once
logo: { set: icon-park-outline, name: search }
category: Terminal
layout: snippet
last_verified_with: "fzf 0.75.0."
updated: 2026-11-28
tier: t3
links:
  - title: Using the finder
    url: https://github.com/junegunn/fzf#using-the-finder
  - title: fzf usage
    url: https://github.com/junegunn/fzf#usage
---

## Multi-select
<!-- {: .-snippets} -->

### Mark files
<!-- {: .-snippet} -->

```bash
fzf -m
```
<!-- {: data-highlight="-m"} -->

**Enables multi-select.** Press `Tab` or `Shift-Tab` to mark items; Enter prints every marked line. See [using the finder](https://github.com/junegunn/fzf#using-the-finder).

### Pass the selections on
<!-- {: .-snippet} -->

```bash
fzf -m --print0 | xargs -0 vim
```
<!-- {: data-highlight="--print0"} -->

**Handles unusual filenames.** NUL separators preserve spaces and newlines when another command reads the selection. See [fzf usage](https://github.com/junegunn/fzf#usage).
