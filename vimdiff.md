---
title: vimdiff
category: Vim
layout: 2017/sheet
tags: []
updated: 2018-10-21
weight: 0
intro: |
  `vimdiff` is a tool to show differences & edit from 2 up to 4 files in Vim. It can be used as a merge-conflict tool for Git.
---

Basics
---------------

### Opening files

```bash
vimdiff file_1 file_2
vimdiff file_1 file_2 file_3
vimdiff file_1 file_2 file_3 file_4
```

`vim -d` is equivalent to `vimdiff` e.g:

```bash
vim -d file_1 file_2 ...
```
{: .-prime}

### Navigation

| Shortcut  | Description       |
| ---       | ---               |
| `]c`      | Jump to next diff |
| `[c`      | Jump to previous diff |
{: .-shortcuts.-prime}

### Applying patches (e.g. resolving Git merge conflicts)

| Shortcut  | Description       |
| ---       | ---               |
| `:diffg <BUFFER>`      | Apply corresponding diff from buffer `<BUFFER>` to current buffer |
| `:diffp <BUFFER>`      | Apply diff under cursor to corresponding area in buffer `<BUFFER>`  |
{: .-shortcuts.-prime}


Examples:

```bash
:diffg file_2 # Apply diff from file_2 to current buffer

# When merging Git conflicts...

:diffg REMOTE # Keep changes from remote branch
:diffg LOCAL # Keep local changes
```

### Configuring Git

```bash
git config --global merge.tool vimdiff
git config --global merge.conflictstyle diff3
git config --global mergetool.prompt false
```
{: .-setup}


Neovim
------
{: .-two-column}

### Configuring Git

Different steps are required to properly configure Git if you are using **Neovim**:

```bash
git config --global merge.tool vimdiff
git config --global mergetool.prompt true
git config --global difftool.prompt false
```

Then, add these lines to `~/.gitconfig`:

```ini
[mergetool "vimdiff"]
  cmd = nvim -d $LOCAL $REMOTE $MERGED -c '$wincmd w' -c 'wincmd J'
```
