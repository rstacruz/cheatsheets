---
title: Tig
category: Git
updated: 2022-12-08
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
| `tig blame FILE`    | Blame                                        |
| ---                 | ---                                          |
| `tig master`        | Show a branch                                |
| `tig test..master`  | Show difference between two branches         |
| `tig FILE`          | Show history of file                         |
| `tig v0.0.3:README` | Show contents of file in a specific revision |
| `tig -C /repo/path` | Run in dir `/repo/path` (like `git -C`)      |

You can substitute `git log` → `tig`.

## Shortcut keys
{: .-three-column}

### Switching views

| Shortcut | Description  |
| -------- | ------------ |
| `m`      | Main view    |
| `d`      | Diff         |
| `t`      | Tree (files) |
| `b`      | Blame        |
| `s`      | Status       |
| `c`      | Stage        |
| `y`      | Stash        |
| `g`      | Grep         |
| `h`      | Help         |
{: .-shortcuts}

### All views

| Shortcut  | Description                  |
| ---       | ---                          |
| `<enter>` | Enter and open selected line |
| `<`       | Back to previous view state  |
| `<tab>`   | Move focus to next view      |
| `R`       | Refresh                      |
| `q`       | Close view                   |
| `Q`       | Close all (quit)             |
| `,`       | Parent commit                |
{: .-shortcuts}

### Cursor navigation

| Shortcut  | Description                  |
| ---       | ---                          |
| `/`       | Search                       |
| `?`       | Search backwards             |
| `j`  `k`  | Up/down                      |
| `J`  `K`  | Next/previous                |
| `<space>` | Page down                    |
| `-`       | Page up                      |
| `^D`      | Half page down               |
| `^U`      | Half page up                 |
{: .-shortcuts}

### Option toggles

| Shortcut  | Description                  |
| ---       | ---                          |
| `I`       | Toggle sort order modes      |
| `i`       | Change sort header           |
| `D`       | Toggle date display modes    |
| `A`       | Toggle author display modes  |
| `#`       | Toggle line numbers          |
| `~`       | Toggle line graphics         |
| `F`       | Toggle file names            |
| `W`       | Toggle ignore space          |
{: .-shortcuts}

### `m` - Main view

| Shortcut  | Description                  |
| ---       | ---                          |
| `X`       | Toggle commit sha            |
| `C`       | Cherry pick a commit         |
{: .-shortcuts}

### `s` - Status view

| Shortcut  | Description                        |
| ---       | ---                                |
| `u`       | Stage/unstage file or chunk        |
| `!`       | Revert file or chunk               |
| `C`       | Commit                             |
| `M`       | Merge with external tool           |
{: .-shortcuts}

### `c` - Stage view

| Shortcut  | Description                        |
| ---       | ---                                |
| `u`       | Stage/unstage file or chunk        |
| `!`       | Revert file or chunk               |
| `1`       | Stage line                         |
| `\`       | Split current diff hunk            |
| `[` `]`   | Increase/decrease the diff context |
{: .-shortcuts}

### `d` - Diff view

| Shortcut  | Description                        |
| ---       | ---                                |
| `[` `]`   | Increase/decrease the diff context |
{: .-shortcuts}

### `y` - Stash view

| Shortcut  | Description                        |
| ---       | ---                                |
| `A`       | Apply selected stash               |
| `P`       | Pop selected stash                 |
| `!`       | Drop selected stash                |
{: .-shortcuts}
