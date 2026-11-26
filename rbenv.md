---
title: rbenv
seo_title: rbenv cheatsheet — install, versions, global
subtitle: Ruby version manager
category: Ruby
tier: t3
updated: 2026-11-23
last_verified_with: "rbenv 1.3.2, ruby-build 20261119."
weight: -1
description: "rbenv versions: install, global, local and rehash commands. Ruby version manager reference."
intro: |
  [rbenv](https://github.com/rbenv/rbenv) lets you manage installations of multiple Ruby versions.
links:
  - title: Installation
    url: https://github.com/rbenv/rbenv#installation
---

### Installation

#### Install rbenv and ruby-build

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git \
  ~/.rbenv/plugins/ruby-build
```
<!-- {: data-highlight="git clone"} -->

#### Set up your shell

```bash
~/.rbenv/bin/rbenv init bash
```
<!-- {: data-highlight="rbenv init"} -->

#### Verify installation

```bash
type rbenv   # → "rbenv is a function"
```
<!-- {: data-highlight="type rbenv"} -->

These are generic instructions; your OS may provide an rbenv package. You can also add `eval "$(rbenv init - bash)"` to your shell profile yourself.

See: [Installation](https://github.com/rbenv/rbenv#installation)

### Managing versions

| Command                 | Description                 |
| ---                     | ---                         |
| `rbenv install -l`      | List all available versions |
| ---                     | ---                         |
| `rbenv install 3.1.2`   | Install Ruby _3.1.2_        |
| `rbenv uninstall 3.1.2` | Uninstall Ruby _3.1.2_      |
| ---                     | ---                         |
| `rbenv versions`        | See installed versions      |
| `rbenv version`         | See current version         |
| ---                     | ---                         |
| `rbenv which <NAME>`    | Display path to executable  |
| `rbenv rehash`          | Create shims (automatic)    |

See: [Command reference](https://github.com/rbenv/rbenv#command-reference)

## Using versions

<!-- {: .-three-column} -->

### Locally

| Command               | Description                 |
| ---                   | ---                         |
| `rbenv local 3.1.2`   | Use Ruby _3.1.2_ in project |
| `rbenv local --unset` | Undo above                  |

Application-specific version numbers are stored in `.ruby-version`.

See: [rbenv local](https://github.com/rbenv/rbenv#rbenv-local)

### Globally

| Command                | Description               |
| ---                    | ---                       |
| `rbenv global 3.1.2`   | Use Ruby _3.1.2_ globally |
| `rbenv global --unset` | Undo above                |

Global version numbers are stored in `~/.rbenv/version`.

See: [rbenv global](https://github.com/rbenv/rbenv#rbenv-global)

### Shell

| Command               | Description               |
| ---                   | ---                       |
| `rbenv shell 3.1.2`   | Use Ruby _3.1.2_ in shell |
| `rbenv shell --unset` | Undo above                |

Shell-local version numbers are stored as environment variables.

See: [rbenv shell](https://github.com/rbenv/rbenv#rbenv-shell)

## References

- [rbenv project page](https://github.com/rbenv/rbenv) _(github.com)_
- [rbenv command reference](https://github.com/rbenv/rbenv#command-reference) _(github.com)_
