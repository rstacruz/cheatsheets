---
title: Homebrew
subtitle: Package manager for macOS
logo: { src: /assets/logos/homebrew.svg }
weight: -3
created_at: 2012-07-03
updated: 2026-11-25
tier: t3
last_verified_with: "Homebrew 7.0.16."
category: Package managers
intro: |
  [Homebrew](https://brew.sh) installs software on macOS and Linux. This sheet covers formula and cask commands, upgrades, and maintenance.
links:
  - title: Homebrew
    url: https://brew.sh
  - title: brew manpage
    url: https://docs.brew.sh/Manpage
---

## Usage

### Commands

| Command                    | Description                 |
| ---                        | ---                         |
| `brew install git`         | Install a package           |
| `brew uninstall git`       | Remove/Uninstall a package  |
| `brew upgrade git`         | Upgrade a package           |
| ---                        | ---                         |
| `brew unlink git`          | Unlink                      |
| `brew link git`            | Link                        |
| `brew pin git`             | Pin the current version     |
| ---                        | ---                         |
| `brew list --versions git` | See what versions you have  |

See: [brew install](https://docs.brew.sh/Manpage#install-formula)

### More package commands

| Command                    | Description                 |
| ---                        | ---                         |
| `brew info git`            | List versions, caveats, etc |
| `brew cleanup git`         | Remove old versions         |
| `brew edit git`            | Edit this formula           |
| `brew cat git`             | Print this formula          |
| `brew home git`            | Open homepage               |
| `brew search git`          | Search for formulas         |

See: [brew info](https://docs.brew.sh/Manpage#info-abv-options-formulacask-)

### Global commands

| Command         | Description              |
| ---             | ---                      |
| `brew update`   | Update brew and cask     |
| `brew upgrade`  | Upgrade all packages     |
| `brew list`     | List installed           |
| `brew outdated` | What's due for upgrades? |
| `brew doctor`   | Diagnose brew issues     |

See: [brew update](https://docs.brew.sh/Manpage#update-up-options)

### Brew Cask commands

| Command                       | Description                           |
| ---                           | ---                                   |
| `brew install --cask firefox` | Install the Firefox browser           |
| `brew list --cask`            | List installed applications           |

Cask commands are used for interacting with graphical applications.

See: [brew install --cask](https://docs.brew.sh/Manpage#install-options-formulacask-)

## Also see

<!-- {: .-one-column} -->

* [Homebrew homepage](https://brew.sh/) _brew.sh_
* [Homebrew docs](https://docs.brew.sh) _docs.brew.sh_

<!-- {: .-also-see} -->
