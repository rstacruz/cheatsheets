---
title: pyenv
subtitle: Python version manager
category: Package managers
updated: 2026-11-21
tier: t1
fragments:
  - "pyenv install"
  - "pyenv global"
  - ".python-version"
  - "pyenv local"
  - "pyenv shell"
  - "3.12"
  - "pyenv versions"
  - "PYENV_VERSION"
  - "pyenv which"
  - "pyenv shims"
  - "pyenv uninstall"
  - "pyenv virtualenv"
  - "pyenv rehash"
  - "pyenv activate"
  - "system"
  - "pyenv update"
  - "pyenv whence"
  - "pyenv exec"
keywords:
  - pyenv
  - Python versions
  - pyenv shims
  - pyenv virtualenv
  - pyenv plugins
intro: |
  [pyenv](https://github.com/pyenv/pyenv) installs Python versions, selects
  them per project, and exposes their commands through shims.
links:
  - title: pyenv documentation
    url: https://github.com/pyenv/pyenv
  - title: Commands reference
    url: https://github.com/pyenv/pyenv/blob/master/COMMANDS.md
  - title: Common build problems
    url: https://github.com/pyenv/pyenv/wiki/Common-build-problems
  - title: pyenv-virtualenv
    url: https://github.com/pyenv/pyenv-virtualenv
---

## Getting started

### Install

```bash
curl -fsSL https://pyenv.run | bash
brew install pyenv
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

The installer bundles pyenv-doctor, pyenv-update, and pyenv-virtualenv. Most Python versions are built from source.

See: [Installation](https://github.com/pyenv/pyenv#installation), [Build dependencies](https://github.com/pyenv/pyenv/wiki#suggested-build-environment)

### Set up the shell

```bash
pyenv init --install
exec "$SHELL"
```

This adds the init lines to the shell rc and puts shims first on `PATH`. For manual setup, use `eval "$(pyenv init - bash)"` in the interactive rc.

See: [pyenv init](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-init)

### Core commands

| Command | Shows |
| --- | --- |
| `pyenv versions` | Installed versions |
| `pyenv version` | Active version and its origin |
| `pyenv which python` | Executable behind a shim |
| `pyenv root` | Install directory |
| `pyenv commands` | Every available command |

See: [Commands reference](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md)

## Python versions

### Available versions

```bash
pyenv install --list
pyenv install -l | grep 3.12
pyenv latest --known 3.12
```

Without `--known`, `pyenv latest` only considers installed versions.

See: [pyenv latest](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-latest)

### Install and uninstall

```bash
pyenv install 3.12.16
pyenv install 3.12
pyenv uninstall 3.11.9
pyenv prefix 3.12.16
```

A partial version installs the latest known patch release. Versions live under `$(pyenv root)/versions`.

See: [pyenv install](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-install)

### Global version

```bash
pyenv global 3.12.16
pyenv global system 3.12.16
pyenv global
```

Writes `$(pyenv root)/version`; list multiple versions to search them in order.

See: [pyenv global](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-global)

### Local version

```bash
pyenv local 3.12.16
pyenv local --unset
```

Writes `.python-version` in the current directory. Child directories inherit it; parent directories can pin their own.

See: [pyenv local](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-local)

### Shell and one-off versions

```bash
pyenv shell 3.12.16
pyenv shell --unset
PYENV_VERSION=3.12.16 python
pyenv exec python --version
```

`pyenv shell` needs shell integration; `PYENV_VERSION` works without it. Selection order is shell, local file, parent files, global.

See: [pyenv shell](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-shell)

## Shims

### How shims work

pyenv puts its `shims` directory first on `PATH`. Each shim forwards `python`, `pip`, and other commands to the selected version; missing commands fall through to `system`.

See: [Understanding shims](https://github.com/pyenv/pyenv#understanding-shims)

### Inspect a shim

```bash
pyenv which python
pyenv whence pip
```

`which` follows the current selection; `whence` lists every installation that provides the command.

See: [pyenv which](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-which)

### Reshim

```bash
pyenv rehash
pyenv shims
```

pyenv reshims on installs and uninstalls. Run `pyenv rehash` after adding executables outside pyenv.

See: [pyenv rehash](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-rehash)

## Virtual environments

### pyenv-virtualenv

```bash
git clone https://github.com/pyenv/pyenv-virtualenv.git \
  "$(pyenv root)/plugins/pyenv-virtualenv"
```

Virtualenvs appear as versions under `$(pyenv root)/versions`.

See: [pyenv-virtualenv installation](https://github.com/pyenv/pyenv-virtualenv#installation)

### Create and manage

#### Create

```bash
pyenv virtualenv 3.12.16 myenv
pyenv virtualenv myenv
```

#### Manage

```bash
pyenv virtualenvs
pyenv uninstall myenv
```

The one-argument form uses the active version; `uninstall` removes the environment.

See: [pyenv-virtualenv usage](https://github.com/pyenv/pyenv-virtualenv#usage)

### Activate an environment

```bash
pyenv activate myenv
pyenv deactivate
```

Activation needs shell integration: load `pyenv init` and `eval "$(pyenv virtualenv-init -)"` in the shell rc. `virtualenv-init` also follows `.python-version` when changing directories.

See: [Activate virtualenv](https://github.com/pyenv/pyenv-virtualenv#activate-virtualenv)

### Environment per project

```bash
pyenv local myenv
pyenv version
```

`pyenv local myenv` stores the environment name in `.python-version`.

See: [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv#usage)

### Plain venv

```bash
python -m venv .venv
source .venv/bin/activate
deactivate
```

The stdlib module needs no plugin; pyenv still selects the interpreter version.

See: [venv](https://docs.python.org/3/library/venv.html)

## Plugins

### Add plugins

```bash
git clone https://github.com/pyenv/pyenv-update.git \
  "$(pyenv root)/plugins/pyenv-update"
```

Plugins live in `$(pyenv root)/plugins`; their commands appear in `pyenv commands`.

See: [Plugins wiki](https://github.com/pyenv/pyenv/wiki/Plugins)

### pyenv-update

```bash
pyenv update
```

Updates pyenv and every installed plugin. Homebrew installs use `brew upgrade pyenv` instead.

See: [pyenv-update](https://github.com/pyenv/pyenv-update)

## Upgrades

### Upgrade pyenv

```bash
brew upgrade pyenv
pyenv update
cd "$(pyenv root)" && git pull
```

Use the command that matches how pyenv was installed.

See: [Upgrading pyenv](https://github.com/pyenv/pyenv#upgrading)

### Upgrade Python

```bash
pyenv latest --known 3.12
pyenv install 3.12.16
pyenv global 3.12.16
pyenv uninstall 3.12.15
```

Install the new patch release, move the version files, then remove the old one.

See: [pyenv latest](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-latest)

## References

### Official resources

<!-- {: .-intro} -->

- [pyenv repository](https://github.com/pyenv/pyenv) _(github.com)_
- [Commands reference](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md) _(github.com)_
- [pyenv wiki](https://github.com/pyenv/pyenv/wiki) _(github.com)_

### Plugins

<!-- {: .-intro} -->

- [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv) _(github.com)_
- [pyenv-update](https://github.com/pyenv/pyenv-update) _(github.com)_
- [Plugins wiki](https://github.com/pyenv/pyenv/wiki/Plugins) _(github.com)_
