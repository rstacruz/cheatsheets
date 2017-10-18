---
title: Watchexec
layout: 2017/sheet
updated: 2017-10-18
category: CLI
weight: -1
keywords:
  - "watchexec --excts js,jsx -- npm test"
  - "watchexec --help"
intro: |
  [mattgreen/watchexec](https://github.com/mattgreen/watchexec) runs commands whenever certain files change.
---

### Installation

#### OSX

```bash
brew install watchexec
```

#### Rust

```bash
cargo install watchexec
```

For Linux and Windows, get it from [GitHub releases](https://github.com/mattgreen/watchexec).

### Getting started

```bash
watchexec --exts js,jsx -- npm test
```

Runs `npm test` when `js,jsx` files change.

```bash
watchman -w lib -w test -- npm test
```

Runs `npm test` when `lib/` and `test/` files change.

### Other options

#### Flags

| `-c` `--clear`   | Clear screen                         |
| `-r` `--restart` | Restart process if its still running |

#### Options

| `-s` `--signal SIGKILL` | Kill signal to use            |
| `-d` `--debounce MS`    | Debounce by `MS` milliseconds |
| `-e` `--exts EXTS`      | Extensions                    |
| `-i` `--ignore PATTERN` | Ignore these files            |
| `-w` `--watch PATH`     | Watch these directories       |

## Also see

* [mattgreen/watchexec](https://github.com/mattgreen/watchexec) _(github.com)_
