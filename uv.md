---
title: uv
subtitle: Python package and project manager
category: Package managers
updated: 2026-11-21
last_verified_with: "verified on uv 0.13.9; last edited 2026-11."
tier: t1
fragments:
  - "uv init"
  - "uv add rich"
  - "uv add --dev"
  - "uv run"
  - "uv run --with"
  - "uv sync"
  - "uv lock"
  - "uv lock --check"
  - "uv export"
  - "uv python pin"
  - "uv python list"
  - "uv tree"
  - "uvx ruff"
  - "uv tool install"
  - "uv build"
  - "uv publish"
  - "uv version"
intro: |
  [uv](https://docs.astral.sh/uv/) is a Python package and project manager. This reference covers project setup, dependencies, Python versions, lockfiles, syncing, tools, and publishing.
links:
  - title: uv documentation
    url: https://docs.astral.sh/uv/
  - title: Getting started
    url: https://docs.astral.sh/uv/getting-started/first-steps/
  - title: CLI reference
    url: https://docs.astral.sh/uv/reference/cli/
---

## Getting started

### Install uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

On Windows, use the PowerShell installer. `uv self update` upgrades uv.

See: [Installation](https://docs.astral.sh/uv/getting-started/installation/)

### Create a project

<!-- {: .-prime} -->

```bash
uv init
uv init hello
uv init --app hello
uv init --lib libby
uv init --bare
```

Creates `pyproject.toml`, `.python-version`, `README.md` and `.gitignore`; `--bare` writes only `pyproject.toml`.

See: [Creating a project](https://docs.astral.sh/uv/concepts/projects/init/)

### Project version

```bash
uv version
uv version 1.2.3
uv version --bump minor
uv version --dry-run
```

`uv version` reads and updates `[project].version` in `pyproject.toml`.

See: [uv version](https://docs.astral.sh/uv/reference/cli/#uv-version)

## Running code
<!-- {: .-three-column} -->

### Run a command

```bash
uv run python main.py
uv run -m pytest
uv run -U python main.py
uv run --no-sync python -V
```

`uv run` syncs the environment before launching the command.

See: [uv run](https://docs.astral.sh/uv/reference/cli/#uv-run)

### One-off packages

```bash
uv run --with rich python main.py
uv run --with 'pandas>=2' -m notebook
```

Packages passed to `--with` exist for this invocation only.

See: [uv run --with](https://docs.astral.sh/uv/reference/cli/#uv-run--with)

### Run a script

```bash
uv run script.py
uv run --script script.py
uv add --script script.py rich
```

`--script` uses PEP 723 dependencies embedded in the file.

See: [Scripts](https://docs.astral.sh/uv/guides/scripts/)

## Dependencies
<!-- {: .-three-column} -->

### Add and remove

```bash
uv add rich
uv add 'rich>=14'
uv add --dev pytest
uv add --group docs mkdocs
uv remove rich
```

`uv add` updates `pyproject.toml`, `uv.lock`, and the `.venv`.

See: [Dependencies](https://docs.astral.sh/uv/concepts/projects/dependencies/)

### Groups and extras

```bash
uv add --optional pdf reportlab
uv sync --group docs
uv sync --no-dev
```

`--dev` is shorthand for `--group dev`; `--optional` adds an extra.

See: [Dependency groups](https://docs.astral.sh/uv/concepts/projects/dependencies/#dependency-groups)

### Inspect dependencies

```bash
uv tree
uv tree -d 2
uv tree --invert --package markdown-it-py
uv pip list
```

`uv tree` shows resolved versions; `--invert` finds who needs a package.

See: [uv tree](https://docs.astral.sh/uv/reference/cli/#uv-tree)

## Python versions
<!-- {: .-three-column} -->

### List and install

```bash
uv python list
uv python install 3.13
uv python install 3.12 3.13
```

`uv python list` marks downloadable interpreters as `<download available>`.

See: [Python versions](https://docs.astral.sh/uv/concepts/python-versions/)

### Pin a version

```bash
uv python pin 3.13
uv python pin 3.13.2
uv python pin --global 3.13
```

A pin writes `.python-version` and must satisfy the project's `requires-python` range.

See: [Python version files](https://docs.astral.sh/uv/concepts/python-versions/#python-version-files)

### Select an interpreter

```bash
uv run -p 3.12 python main.py
uv sync -p 3.12
uv python find 3.12
```

`-p` is shorthand for `--python` and applies to one command; `uv python find` prints its path.

See: [uv python find](https://docs.astral.sh/uv/reference/cli/#uv-python-find)

## Lockfiles

### Lock and check

```bash
uv lock
uv lock --check
uv lock --dry-run
```

`--check` verifies `uv.lock` matches the project; `--dry-run` previews changes.

See: [uv lock](https://docs.astral.sh/uv/reference/cli/#uv-lock)

### Upgrade locked versions

```bash
uv lock -U
uv lock -P rich
uv lock --upgrade-group dev
```

`-U` upgrades all locked packages; `-P` upgrades one package.

See: [Locking and syncing](https://docs.astral.sh/uv/concepts/projects/sync/#locking-and-syncing)

### Export a lockfile

```bash
uv export --format requirements.txt -o requirements.txt
uv export --format pylock.toml -o pylock.toml
uv export --format cyclonedx1.5 -o sbom.json
```

`cyclonedx1.5` is experimental.

See: [Exporting](https://docs.astral.sh/uv/concepts/projects/export/)

## Syncing

### Sync the environment

```bash
uv sync
uv sync --all-groups
uv sync --python 3.12
```

Creates `.venv`, installs the project, and applies `uv.lock`.

See: [Syncing](https://docs.astral.sh/uv/concepts/projects/sync/)

### Sync flags

| Flag | Effect |
| --- | --- |
| `--locked` | Require an up-to-date lockfile |
| `--frozen` | Use the lockfile without checking it |
| `--dry-run` | Report changes without applying |
| `--no-dev` | Skip the dev group |
| `--group docs` | Include one group |
| `-U` | Upgrade locked packages |

See: [uv sync](https://docs.astral.sh/uv/reference/cli/#uv-sync)

## Tools

### Run a tool

```bash
uvx ruff check .
uv tool run black .
uvx --from httpie http GET example.com
```

`uvx` is shorthand for `uv tool run`; tools run in isolated environments.

See: [Using tools](https://docs.astral.sh/uv/guides/tools/)

### Install and manage tools

```bash
uv tool install ruff
uv tool install --with rich httpie
uv tool upgrade ruff
uv tool list
uv tool uninstall ruff
```

Installed tools get their own environment and executables on `PATH`.

See: [Tools](https://docs.astral.sh/uv/concepts/tools/)

## Build and publish

### Build distributions

```bash
uv build
uv build --sdist
uv build --wheel
uv build -o dist
```

Writes a source distribution and wheel into `dist/`.

See: [Building packages](https://docs.astral.sh/uv/guides/package/)

### Publish

```bash
uv publish --token "$UV_PUBLISH_TOKEN"
uv publish --trusted-publishing always
uv publish --dry-run
```

Trusted publishing or `$UV_PUBLISH_TOKEN` keeps a literal token out of the command.

See: [Publishing packages](https://docs.astral.sh/uv/guides/package/#publishing-your-package)
