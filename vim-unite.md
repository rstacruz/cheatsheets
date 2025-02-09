---
title: Vim-Unite
category: Vim
---

### Usage

``` vim
:Unite file
:Unite file_rec/async:!
:Unite tag
:Unite buffer
```

### Sources

* `file/new`
* `file/async`
* `file_rec/async`
* `file_rec/git`
* `buffer`
* `buffer_tab` (current tab only)
* `tab`
* `register`
* `bookmark`
* `source`

### Options

| Option                     | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `-start-insert`            |                                                             |
| `-no-quit`                 |                                                             |
| `-winheight=10`            |                                                             |
| `-quick-match`             | select by pressing asdf keys                                |
| `-winwidth=40`             | use with vertical                                           |
| `-no-split`                | open in current buffer                                      |
| `-auto-preview`            | great for outline                                           |
| `-vertical`                | open as sidebar                                             |
| `-buffer-name=xxx -resume` | resume the next time it's called (faster)                   |
| `-input=`                  | reset input (use with -resume)                              |
| `-unique`                  | remove duplicates (eg, if using `file_rec` with `file_mru`) |
