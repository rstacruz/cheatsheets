---
title: rbenv
category: Ruby
updated: 2018-02-20
weight: -1
description: |
  A one-page guide to rbenv Ruby version manager, with usage examples and more.
intro: |
  [rbenv](https://github.com/rbenv/rbenv) lets you manage installations of multiple Ruby versions.
---

### Installation

#### Install rbenv and ruby-build

```bash
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
```

#### Add to ~/.bash_profile

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

#### Verify installation

```bash
type rbenv   # → "rbenv is a function"
```

These are generic instructions; there may be rbenv packages available for your OS.

See: [Installation](https://github.com/rbenv/rbenv#installation)

### Managing versions

| Command                 | Description                 |
| ---                     | ---                         |
| `rbenv install -l`      | List all available versions |
| ---                     | ---                         |
| `rbenv install 2.2.1`   | Install Ruby _2.2.1_        |
| `rbenv uninstall 2.2.1` | Uninstall Ruby _2.2.1_      |
| ---                     | ---                         |
| `rbenv versions`        | See installed versions      |
| `rbenv version`         | See current version         |
| ---                     | ---                         |
| `rbenv which <NAME>`    | Display path to executable  |
| `rbenv rehash`          | Re-write binstubs           |

## Using versions
{: .-three-column}

### Locally

| Command               | Description                 |
| ---                   | ---                         |
| `rbenv local 2.2.2`   | Use Ruby _2.2.2_ in project |
| `rbenv local --unset` | Undo above                  |

Application-specific version numbers are stored in `.ruby-version`.

### Globally

| Command                | Description               |
| ---                    | ---                       |
| `rbenv global 2.2.2`   | Use Ruby _2.2.2_ globally |
| `rbenv global --unset` | Undo above                |

Global version numbers are stored in `~/.rbenv/version`.

### Shell

| Command               | Description               |
| ---                   | ---                       |
| `rbenv shell 2.2.2`   | Use Ruby _2.2.2_ in shell |
| `rbenv shell --unset` | Undo above                |

Shell-local version numbers are stored as environment variables.

## References

- [rbenv project page](https://github.com/rbenv/rbenv) _(github.com)_
- [rbenv ubuntu server cheatsheet](https://gist.github.com/rahul286/7160839f4425a3b7e718) _(gist.github.com)_
