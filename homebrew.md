---
title: Homebrew
---

### Commands

| Command                    | Description                 |
| ---                        | ---                         |
| `brew install git`         | Install a package           |
| `brew upgrade git`         | Upgrade a package           |
| ---                        | ---                         |
| `brew unlink git`          | Unlink                      |
| `brew link git`            | Link                        |
| `brew switch git 2.5.0`    | Change versions             |
| ---                        | ---                         |
| `brew list --versions git` | See what versions you have  |
| `brew info git`            | List versions, caveats, etc |
| `brew cleanup git`         | Remove old versions         |
| `brew edit git`            | Edit this formula           |
| `brew home git`            | Open homepage               |
{:.no-head.greycode}

### Global commands

| Command         | Description              |
| ---             | ---                      |
| `brew update`   | Update brew              |
| `brew list`     | List installed           |
| `brew outdated` | What's due for upgrades? |
{:.no-head.greycode}

## Caskroom

### Updating caskroom

```sh
brew update && brew upgrade brew-cask && brew cleanup && brew cask cleanup
```

### Show latest casks
  
```sh
cd "/usr/local/Library/Taps/caskroom/homebrew-cask/Casks" && \
   git log --pretty=format: --name-only --since="30 days ago" | \
   egrep "Casks" | uniq
```

