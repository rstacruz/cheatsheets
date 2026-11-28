---
title: Tig
subtitle: Terminal Git repository browser
logo: { set: icon-park-outline, name: view-list }
category: Git
intro: |
  Tig is a terminal browser for Git repositories and history.
links:
  - title: Tig website
    url: https://jonas.github.io/tig/
  - title: Tig manual
    url: https://jonas.github.io/tig/doc/manual.html
  - title: tigrc configuration
    url: https://jonas.github.io/tig/doc/tigrc.5.html
created_at: 2012-03-16
updated: 2026-11-26
last_verified_with: "tig 2.6.1."
weight: -3
tier: t3
---

## Getting started

### Installing

#### macOS

```bash
brew install tig --HEAD
```

#### Ubuntu

```bash
sudo apt install tig
```

See: [Installation and news](https://jonas.github.io/tig/#_installation_and_news)

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

See: [tig(1) examples](https://jonas.github.io/tig/doc/tig.1.html#_examples), [revision specification](https://jonas.github.io/tig/doc/manual.html#refspec)

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

See: [View switching](https://jonas.github.io/tig/doc/manual.html#view-switching)

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

See: [View manipulation](https://jonas.github.io/tig/doc/manual.html#view-manipulation)

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

See: [Cursor navigation](https://jonas.github.io/tig/doc/manual.html#cursor-nav)

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

See: [Miscellaneous keys](https://jonas.github.io/tig/doc/manual.html#misc-keys)

### `m` - Main view

| Shortcut  | Description                  |
| ---       | ---                          |
| `C`       | Cherry-pick selected commit  |
| `H`       | Go to HEAD                   |

<!-- {: .-shortcuts} -->

See: [View-specific actions](https://jonas.github.io/tig/doc/manual.html#view-actions)

### `s` - Status view

| Shortcut  | Description                        |
| ---       | ---                                |
| `u`       | Stage/unstage file or chunk        |
| `!`       | Revert file or chunk               |
| `C`       | Commit                             |
| `M`       | Merge with external tool           |

<!-- {: .-shortcuts} -->

See: [View-specific actions](https://jonas.github.io/tig/doc/manual.html#view-actions)

### `c` - Stage view

| Shortcut  | Description                        |
| ---       | ---                                |
| `u`       | Stage/unstage file or chunk        |
| `!`       | Revert file or chunk               |
| `1`       | Stage line                         |
| `@`       | Next diff chunk                    |
| `[` `]`   | Increase/decrease the diff context |

<!-- {: .-shortcuts} -->

See: [View-specific actions](https://jonas.github.io/tig/doc/manual.html#view-actions)

### `d` - Diff view

| Shortcut  | Description                        |
| ---       | ---                                |
| `[` `]`   | Increase/decrease the diff context |

<!-- {: .-shortcuts} -->

See: [View-specific actions](https://jonas.github.io/tig/doc/manual.html#view-actions)

### `y` - Stash view

```ini
# ~/.tigrc
bind stash A !git stash apply %(stash)
bind stash P !git stash pop %(stash)
bind stash ! !git stash drop %(stash)
```
<!-- {: data-highlight="bind stash"} -->

Tig already binds `A`/`P`/`!` to apply, pop, and drop with a confirmation prompt; these bindings skip that prompt.

See: [bind command](https://jonas.github.io/tig/doc/tigrc.5.html#_bind_command)
