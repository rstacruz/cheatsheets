---
title: Vimmergetool
category: Vim
layout: 2017/sheet
updated: 2019-05-23
weight: -10
intro: |
  [Vim](http://www.vim.org/) is a very efficient text editor. This reference was made for Vim 8.0.
---

Getting started
---------------
{: .-three-column}

```
  git mergetool
```

```
+--------------------------------+
| LOCAL  |     BASE     | REMOTE |
+--------------------------------+
|             MERGED             |
+--------------------------------+
```

### Find out what mergetool editors are supported

```
  git mergetool --tool-help
```

### Setting up different editors/tool for using 
```
  git config merge.tool vimdiff
```

### Navigating
{: .-prime}

| Shortcut       | Description                      |
| ---            | ---                              |
| `]c`           | Next difference                  |
| `[c`           | Previous difference              |
{: .-shortcuts}

### Editing

| Shortcut            | Description                      |
| ---                 | ---                              |
| `:diffget LOCAL`    | Diff Obtain from local           |
| `:diffget BASE`     | Diff Obtain from base            |
| `:diffget REMOTE`   | Diff Obtain from remote          |
| ---            | ---                                   |
| `:diffupdate`  | Re-scan the files for differences.    |
| `ZQ`           | Quit without checking changes         |
| `qa`           | Quit all files                        |
{: .-shortcuts}



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


Also see
--------

- [Vim cheatsheet](https://vim.rtorr.com/) _(vim.rotrr.com)_
- [Vim documentation](http://vimdoc.sourceforge.net/htmldoc/) _(vimdoc.sourceforge.net)_
- [Interactive Vim tutorial](http://openvim.com/) _(openvim.com)_
