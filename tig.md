---
title: Tig
subtitle: Terminal Git repository browser
category: Git
updated: 2026-11-23
last_verified_with: "tig 2.6.1."
weight: -3
---

### Installing

```bash
# MacOS + Homebrew
$ brew install tig --HEAD
```

```bash
# Ubuntu
$ sudo apt install tig
```

### Invocation

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `tig`               | Logs                                         |
| ---                 | ---                                          |
| `tig status`        | Status                                       |
| `tig log`           | Log messages and diffstat                    |
| `tig blame FILE`    | Blame                                        |
| ---                 | ---                                          |
| `tig master`        | Show a branch                                |
| `tig test..master`  | Show difference between two branches         |
| `tig FILE`          | Show history of file                         |
| `tig v0.0.3:README` | Show contents of file in a specific revision |
| `tig -C /repo/path` | Run in dir `/repo/path` (like `git -C`)      |
| `tig refs`          | Branches, remotes, tags                      |
| `tig stash`         | Stashes                                      |

You can substitute `git log` → `tig`.

## Shortcut keys

<!-- {: .-three-column} -->

### Switching views

| Shortcut | Description  |
| -------- | ------------ |
| `m`      | Main view    |
| `d`      | Diff         |
| `l`      | Log          |
| `t`      | Tree (files) |
| `b`      | Blame        |
| ---      | ---          |
| `s`      | Status       |
| `c`      | Stage        |
| `y`      | Stash        |
| `g`      | Grep         |
| `p`      | Pager        |
| `f`      | Blob (file)  |
| `r`      | Refs         |
| ---      | ---          |
| `h`      | Help         |

<!-- {: .-shortcuts} -->

### All views

| Shortcut  | Description                  |
| ---       | ---                          |
| `<enter>` | Open selected line           |
| `<tab>`   | Move focus to next view      |
| `R`       | Refresh                      |
| `O`       | Maximize current view        |
| `q`       | Close view                   |
| `Q`       | Close all (quit)             |
| `,`       | Move to parent               |

<!-- {: .-shortcuts} -->

### Cursor navigation

| Shortcut  | Description                  |
| ---       | ---                          |
| `/`       | Search                       |
| `?`       | Search backwards             |
| `n`  `N`  | Next/previous match          |
| ---       | ---                          |
| `j`  `k`  | Up/down                      |
| `<home>`  | First line                   |
| `<end>`   | Last line                    |
| `<space>` | Page down                    |
| `-`       | Page up                      |

<!-- {: .-shortcuts} -->

### Option toggles

| Shortcut  | Description                  |
| ---       | ---                          |
| `o`       | Open option menu             |
| ---       | ---                          |
| `D`       | Toggle date display modes    |
| `A`       | Toggle author display modes  |
| `G`       | Toggle revision graph        |
| `#`       | Toggle line numbers          |
| `~`       | Toggle line graphics         |
| `F`       | Toggle ref names             |
| `W`       | Toggle ignore whitespace     |
| `X`       | Toggle commit ID             |

<!-- {: .-shortcuts} -->

### `m` - Main view

| Shortcut  | Description                  |
| ---       | ---                          |
| `C`       | Cherry-pick selected commit  |
| `H`       | Go to HEAD                   |

<!-- {: .-shortcuts} -->

### `s` - Status view

| Shortcut  | Description                        |
| ---       | ---                                |
| `u`       | Stage/unstage file or chunk        |
| `!`       | Revert file or chunk               |
| `C`       | Commit                             |
| `M`       | Merge with external tool           |

<!-- {: .-shortcuts} -->

### `c` - Stage view

| Shortcut  | Description                        |
| ---       | ---                                |
| `u`       | Stage/unstage file or chunk        |
| `!`       | Revert file or chunk               |
| `1`       | Stage line                         |
| `@`       | Next diff chunk                    |
| `[` `]`   | Increase/decrease the diff context |

<!-- {: .-shortcuts} -->

### `d` - Diff view

| Shortcut  | Description                        |
| ---       | ---                                |
| `[` `]`   | Increase/decrease the diff context |

<!-- {: .-shortcuts} -->

### `y` - Stash view

```ini
# ~/.tigrc
bind stash A !git stash apply %(stash)
bind stash P !git stash pop %(stash)
bind stash ! !git stash drop %(stash)
```

Tig already binds `A`/`P`/`!` to apply, pop, and drop with a confirmation prompt; the bindings below skip that prompt.
