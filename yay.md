---
title: Yay
subtitle: AUR helper for Arch Linux
category: Package managers
updated: 2026-11-22
tier: t1
fragments:
  - "yay"
  - "yay -Syu"
  - "yay foo"
  - "yay -S foo"
  - "yay -Ss foo"
  - "yay -Yc"
  - "yay -Sua"
  - "--aur"
  - "--repo"
  - "--devel"
  - "yay -Gp foo"
  - "yay -Bi ./pkg"
  - "yay -Ps"
  - "yay -Pd"
  - "--save"
  - "yay -Y --gendb"
  - "--mflags"
  - "AURDEST"
  - "yay -Wv foo"
  - "--noconfirm"
keywords:
  - yay
  - AUR helper
  - Arch Linux
  - pacman wrapper
  - PKGBUILD
intro: |
  [Yay](https://jguer.github.io/yay/) wraps pacman to install Arch packages
  from the official repos and the AUR, resolving dependencies before building.
links:
  - title: Yay manual
    url: https://jguer.github.io/yay/man.html
  - title: README and examples
    url: https://github.com/Jguer/yay#readme
  - title: "Arch Wiki: AUR"
    url: https://wiki.archlinux.org/title/Arch_User_Repository
---

## Getting started

### Install

```bash
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

Use the `yay-bin` AUR package to skip compiling.

See: [Installation](https://github.com/Jguer/yay#installation)

### Everyday use

```bash
yay                  # refresh and upgrade everything
yay foo              # search, then pick packages to install
```

A bare `yay` runs `yay -Syu`; with targets it opens the selection menu.

See: [Examples](https://github.com/Jguer/yay#examples-of-custom-operations)

### Operation modes

#### Pacman operations

| Mode                             | What it does                       |
| -------------------------------- | ---------------------------------- |
| `yay`                            | Update everything (`-Syu`)         |
| `-Y`                             | Search and install menu            |
| `-S`, `-Si`, `-Ss`, `-Su`, `-Sc` | pacman operations with AUR support |
| `-R`                             | Remove; also drops devel cache     |

#### Yay operations

| Mode        | What it does                  |
| ----------- | ----------------------------- |
| `-B`        | Build a local PKGBUILD        |
| `-G`        | Download a PKGBUILD           |
| `-P`        | Print information or config   |
| `-W`        | Vote or unvote on the AUR     |
| `-N`, `-a`  | Limit targets to repos or AUR |

See: [Yay operations](https://jguer.github.io/yay/man.html)

## Install and upgrade

### Search and install

```bash
yay -S foo              # install from a repo or the AUR
yay -S --needed foo     # skip packages already installed
yay -Ss foo             # search names and descriptions
yay -Si foo             # show details
```

`-Ss` searches names and descriptions; `-Si` shows details before installing.

See: [Examples](https://github.com/Jguer/yay#examples-of-custom-operations)

### Upgrade

```bash
yay -Syu                # upgrade repo and AUR packages
yay -Sua                # upgrade AUR packages only
yay -Syu --devel        # also check -git packages
```

`--devel` compares the Git commit hashes stored at install time.

See: [First use](https://github.com/Jguer/yay#first-use)

### Clean up

```bash
yay -R foo              # remove and clear devel cache data
yay -Yc                 # remove unneeded dependencies
yay -Ycc                # also drop optional dependencies
yay -Sc                 # clean AUR cache and untracked files
```

`yay -Sc` keeps VCS sources so devel packages can pull updates.

See: [Extended pacman operations](https://jguer.github.io/yay/man.html)

## AUR workflow
<!-- {: .-three-column} -->

### Source selection

```bash
yay -Syu --repo
yay -Syu --aur
yay -Ss foo --aur
```

`--repo` and `--aur` limit sysupgrade to one source; dependencies still resolve from both.

See: [New options](https://jguer.github.io/yay/man.html)

### Build a local PKGBUILD

```bash
yay -B ./pkg
yay -Bi ./pkg
yay -Bi ./pkg --mflags "--skipchecksums"
```

Only skip integrity checks for sources you trust; AUR dependencies are resolved before makepkg runs.

See: [Build options](https://jguer.github.io/yay/man.html)

### Download a PKGBUILD

```bash
yay -G foo
yay -Gp foo
yay -Gf foo
```

`-G` uses ABS for repo packages and the AUR otherwise; `-p` prints, `-f` overwrites.

See: [getpkgbuild options](https://jguer.github.io/yay/man.html)

### Development packages

```bash
yay -Y --gendb
yay -Y --devel --save
```

Run `--gendb` once after migration; only Git sources are tracked.

See: [First use](https://github.com/Jguer/yay#first-use)

### Voting

```bash
yay -Wv foo
yay -Wu foo
```

Voting needs `AUR_USERNAME` and `AUR_PASSWORD`.

See: [Web options](https://jguer.github.io/yay/man.html)

## Configuration

### Show operations

```bash
yay -Ps                 # installed-package statistics
yay -Pd                 # print the default config
yay -Pg                 # print the current config
yay -Pw                 # new Arch news
yay -Pww                # all available news
yay -Pwq                # news titles only
```

`-Ps` also reports orphaned, out-of-date, and missing AUR packages.

See: [Show options](https://jguer.github.io/yay/man.html)

### Persist options

```bash
yay --editmenu --diffmenu=false --save
yay --noanswerupgrade --save
```

`--save` writes to `config.json`; answer flags pre-select menu replies.

See: [Permanent configuration settings](https://jguer.github.io/yay/man.html)

### Common options

| Flag              | Description                    |
| ----------------- | ------------------------------ |
| `--noconfirm`     | Skip confirmation prompts      |
| `--needed`        | Skip already-installed packages |
| `--mflags <flags>` | Pass options to makepkg        |
| `--builddir <dir>` | Use another build directory    |
| `--batchinstall`  | Queue builds before installing |
| `--sudoloop`      | Keep sudo alive during builds  |
| `--editmenu`      | Review PKGBUILDs before build  |

See: [Yay options](https://jguer.github.io/yay/man.html)

### Files and environment

| Location                    | Purpose                |
| --------------------------- | ---------------------- |
| `~/.config/yay/config.json` | Saved options          |
| `~/.cache/yay/vcs.json`     | Tracked Git commits    |
| `AURDEST`                   | Build directory        |
| `EDITOR`, `VISUAL`          | PKGBUILD editor        |
| `PAGER`                     | PKGBUILD diff pager    |

`XDG_CONFIG_HOME` and `XDG_CACHE_HOME` override the default paths.

See: [Files](https://jguer.github.io/yay/man.html)
