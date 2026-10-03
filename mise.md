---
title: mise
category: CLI
updated: 2026-10-03
keywords:
  - dev tool version manager
  - mise.toml
  - mise use
  - asdf alternative
  - project tasks
intro: |
  [mise](https://mise.jdx.dev) installs and switches dev tool versions per
  project, manages environment variables, and runs tasks. This reference covers
  the CLI, `mise.toml`, and daily workflows.
---

## Getting started

### Introduction
{: .-intro}

[mise](https://mise.jdx.dev) installs and switches dev tool versions per project
and manages env vars and tasks. This reference covers the CLI and `mise.toml`.

- [mise documentation](https://mise.jdx.dev) _(mise.jdx.dev)_
- [GitHub repository](https://github.com/jdx/mise) _(github.com)_
- [Tool registry](https://mise.jdx.dev/registry.html) _(mise.jdx.dev)_

### Install

```bash
curl https://mise.run | sh      # → ~/.local/bin/mise
brew install mise               # works, installer preferred

# Debian/Ubuntu
sudo apt install -y extrepo
sudo extrepo enable mise && sudo apt update
sudo apt install -y mise

mise --version                  # installer: ~/.local/bin/mise
mise doctor                     # diagnose shell/shim problems
```
{: data-line="1"}

The installer drops the binary in `~/.local/bin`; activation adds it to `PATH`.

See: [Installing mise](https://mise.jdx.dev/installing-mise.html)

### Activate

```bash
eval "$(mise activate zsh)"                # ~/.zshrc
eval "$(mise activate bash)"               # ~/.bashrc
eval "$(~/.local/bin/mise activate bash)"  # if mise is not on PATH

# fish
mise activate fish | source
```
{: data-line="1,2"}

Activation re-exports `PATH` and project env on every prompt.
Put it in the interactive rc file — not `~/.profile`/`~/.zprofile` —
then restart the shell.

See: [mise activate](https://mise.jdx.dev/cli/activate.html)

### Shims

```bash
eval "$(mise activate zsh --shims)"
export PATH="$HOME/.local/share/mise/shims:$PATH"   # equivalent
mise reshim                                         # after installs
```

Shims give editors and scripts a stable path; `mise activate` supports
more features (env vars, hooks), so prefer it interactively.

See: [Shims](https://mise.jdx.dev/dev-tools/shims.html)

### Core commands
{: .-prime}

#### Tools

| Command                | Goal                       |
| ---                    | ---                        |
| `mise use node@24`     | Add a tool to the project  |
| `mise use -g node@24`  | Set a personal default     |
| `mise install`         | Install config tools       |
| `mise exec -- node -v` | Run one command with tools |

#### Inspect

| Command             | Goal                     |
| ---                 | ---                      |
| `mise ls --current` | Show active versions     |
| `mise config ls`    | Show loaded config files |
| `mise tasks ls`     | List project tasks       |
| `mise doctor`       | Check the install        |

`mise exec` and `mise run` load tools and env without activation — use them in
scripts and CI.

See: [Getting started](https://mise.jdx.dev/getting-started.html),
[Walkthrough](https://mise.jdx.dev/walkthrough.html)

### Update

```bash
mise self-update              # update the mise binary
mise outdated                 # newer versions in the current range
mise upgrade node             # upgrade within the request (24.x)
mise upgrade --bump node      # latest overall, rewrites mise.toml
```

`mise settings set auto_update true` keeps mise current automatically;
package-manager installs update via their manager.

See: [mise self-update](https://mise.jdx.dev/cli/self-update.html),
[mise upgrade](https://mise.jdx.dev/cli/upgrade.html)

## Tools

### Add tools

```bash
mise use node@24 python@3.13     # install + record in mise.toml
mise use -g ripgrep              # global default
mise use --pin node@24           # save the exact resolved version
mise use --path .tool-versions --pin node@24
mise use                         # interactive tool picker
```
{: data-line="1"}

```toml
[tools]
node = "24"
python = "3.13"
```

`use` writes to the lowest-precedence config in the nearest config directory.
No version means `latest`; activation or `mise exec` picks it up.

See: [mise use](https://mise.jdx.dev/cli/use.html),
[dev tools](https://mise.jdx.dev/dev-tools/)

### Install tools

```bash
mise install                     # everything in config
mise install node@20             # latest 20.x
mise install node@20.19.0        # exact version
mise install --include-task-tools
mise uninstall node@18.0.0       # remove installed version only
```

`install` downloads without touching `mise.toml`; `uninstall` removes a version,
`mise unuse` edits the config.

See: [mise install](https://mise.jdx.dev/cli/install.html)

### Version requests

```toml
[tools]
node = "24"             # latest 24.x
python = "3.13.1"       # exact
ruby = "latest"
erlang = "ref:master"   # build a git ref
go = "prefix:1.19"      # latest 1.19.x
shfmt = "path:./shfmt"  # custom install dir
```
{: data-line="5,6,7"}

A request is a range; an exact version is a pin. `prefix:` helps when `1.19`
matches only `1.19`. Aliases like `lts` are not universal.

See: [Scopes](https://mise.jdx.dev/configuration.html#scopes)

### Inspect

```bash
mise ls                    # installed + requested versions
mise ls --current          # versions selected by config
mise ls-remote node@20     # available releases
mise latest node@20        # newest match, without installing
mise which node            # path of the executable in use
mise where node@20         # install directory
```

`which` explains a surprising `node -v`; `where` finds the install tree.

See: [mise ls](https://mise.jdx.dev/cli/ls.html),
[mise which](https://mise.jdx.dev/cli/which.html)

### Lock and prune

```bash
mise lock                  # write mise.lock (versions + checksums)
mise install --locked      # install from the lockfile
mise prune --dry-run       # show unused installed versions
mise ls --prunable
```
{: data-line="1,2"}

`mise.lock` records resolved versions for teammates and CI; `prune` only
deletes versions no config or stub references.

See: [mise lock](https://mise.jdx.dev/dev-tools/mise-lock.html),
[mise prune](https://mise.jdx.dev/cli/prune.html)

## Backends

### Registry shorthands

```bash
mise search jq             # search the registry
mise registry node         # → core:node
mise registry -b core      # all built-in tools
```

The registry maps names like `node`, `terraform`, or `ripgrep` to a backend,
so you rarely need to name one. `mise search --all` queries package registries.

See: [Tool registry](https://mise.jdx.dev/registry.html)

### Backend prefixes

| Prefix    | Source                                         |
| ---       | ---                                            |
| `core:`   | built-in installers (`core:python`)            |
| `aqua:`   | Aqua registry (`aqua:aws/aws-cli`)             |
| `github:` | GitHub releases (`github:BurntSushi/ripgrep`)  |
| `npm:`    | npm packages (`npm:prettier`)                  |
| `pipx:`   | Python apps (`pipx:ruff`)                      |
| `cargo:`  | crates (`cargo:starship`)                      |
| `go:`     | Go modules (`go:github.com/DarthSim/hivemind`) |
| `asdf:`   | asdf plugins (`asdf:owner/plugin`)             |

Package backends need their runtime declared — e.g.
`mise use rust@stable cargo:starship`.

See: [Backends](https://mise.jdx.dev/dev-tools/backends/),
[Registry](https://mise.jdx.dev/registry.html)

### Examples

```bash
mise use aqua:aws/aws-cli             # Aqua registry
mise use github:BurntSushi/ripgrep    # GitHub releases
mise use npm:prettier                 # npm package
mise use pipx:ruff                    # Python app
mise use cargo:starship               # crates.io crate
```
{: data-line="1,2"}

Add a version the same way: `mise use github:BurntSushi/ripgrep@14`.

See: [Aqua](https://mise.jdx.dev/dev-tools/backends/aqua.html),
[GitHub](https://mise.jdx.dev/dev-tools/backends/github.html)

### One-off and session tools

```bash
mise exec node@20 -- node app.js    # alias: mise x
mise x -- node --version            # uses project config
mise exec --command "node -v"
mise shell node@20                  # this shell session only
mise shell --unset node
```

`exec` scopes tools and env to one command; `shell` exports them until the
session ends and needs activation.

See: [mise exec](https://mise.jdx.dev/cli/exec.html),
[mise shell](https://mise.jdx.dev/cli/shell.html)

## Configuration

### mise.toml

```toml
[tools]
node = "24"

[env]
NODE_ENV = "development"

[tasks.hello]
run = "echo hello"
```

```bash
mise config ls      # files mise loaded, in order
mise ls --current
```

Commit `mise.toml`; put machine-local overrides in `mise.local.toml` and
gitignore it.

See: [Configuration](https://mise.jdx.dev/configuration.html)

### Config files

```text
mise.toml                    # project config, committed
mise.local.toml              # local overrides, gitignored
~/.config/mise/config.toml   # global defaults (mise use -g)
/etc/mise/config.toml        # system defaults
.tool-versions               # asdf file, read when present
```

Parent directories cascade; the closest file wins per key, and
`[tools]`/`[env]` merge additively.

See: [mise.toml](https://mise.jdx.dev/configuration.html#mise-toml)

### Idiomatic version files

```bash
mise settings add idiomatic_version_file_enable_tools node
mise settings add idiomatic_version_file_enable_tools python
mise settings add idiomatic_version_file_enable_tools ruby
```

`.nvmrc`, `.python-version`, and `.ruby-version` are ignored until their tool
is listed.

See: [Idiomatic version files](https://mise.jdx.dev/configuration.html#idiomatic-version-files)

### Settings

```bash
mise settings ls --all           # effective values + sources
mise settings set jobs 4         # global config
mise settings set --local jobs 2 # project override
mise settings unset --local jobs
```

```toml
# ~/.config/mise/config.toml
[settings]
idiomatic_version_file_enable_tools = ["node"]
trusted_config_paths = ["~/work/trusted"]
```

Settings control mise itself; project env vars belong in `[env]`. Settings
with no `--local` write to the global config.

See: [Settings](https://mise.jdx.dev/configuration/settings.html)

### Environment variables

| Variable                    | Effect                             |
| ---                         | ---                                |
| `MISE_NODE_VERSION=20`      | override one tool's version        |
| `MISE_ENV_FILE=.env`        | load a dotenv file (cwd + parents) |
| `MISE_JOBS=4`               | parallel install jobs              |
| `MISE_PARANOID=1`           | require explicit trust             |
| `MISE_LOCKED=1`             | require lockfile installs          |
| `MISE_LOG_LEVEL=debug`      | trace/debug/info/warn/error        |
| `MISE_CEILING_PATHS=~/src`  | stop config search upwards         |

`MISE_NO_CONFIG=1`, `MISE_NO_ENV=1`, and `MISE_NO_HOOKS=1` skip config, env,
and hooks for one invocation.

See: [Environment variables](https://mise.jdx.dev/configuration.html#environment-variables)

### Trust

```bash
mise trust --show            # trust status of nearby configs
mise trust                   # trust the local config
mise trust --all             # trust this tree + parents
mise untrust mise.toml
mise trust --ignore
```

Config files can define tasks and hooks that execute code. Normal mode
auto-trusts the active config on `mise run`, `mise install`, and `mise exec`.

Simple tool-only files need no trust; paranoid mode requires explicit,
content-bound trust for non-global files.

See: [mise trust](https://mise.jdx.dev/cli/trust.html),
[paranoid mode](https://mise.jdx.dev/paranoid.html)

## Environments

### Set variables

```toml
[env]
NODE_ENV = "production"
RUST_TEST_THREADS = "1"
CACHE_DIR = false              # unset it
LOG_LEVEL = { default = "info" }
```

```bash
mise set NODE_ENV=development
mise env                        # print exported variables
eval "$(mise env -s zsh)"
```

`[env]` reaches activated shells, `mise exec`, and tasks. `mise set` writes to
`mise.toml`.

See: [Environments](https://mise.jdx.dev/environments/)

### Load .env files

```toml
[env]
_.file = ".env"                # a single file
```

```toml
[env]
_.file = [                     # or several
  ".env",
  { path = ".secrets.yaml", redact = true },
]
```

Dotenv, JSON, YAML, and TOML are supported, and paths resolve against the
config root. `MISE_ENV_FILE=.env` autoloads from the current directory upwards.

See: [Environments](https://mise.jdx.dev/environments/)

### PATH

```toml
[env]
_.path = "./node_modules/.bin"  # one entry
```

```toml
[env]
_.path = ["tools/bin", "{{config_root}}/bin"]  # or several
```

Relative entries resolve against the config root, so they keep working from
subdirectories.

See: [Environments](https://mise.jdx.dev/environments/)

### Secrets and validation

```toml
[env]
DATABASE_URL = { required = true }
API_KEY = { value = "sk-...", redact = true }
redactions = ["SECRET_*", "*_TOKEN"]
```

`required` fails `mise env` when unset; `redact` masks the value in task
output. Secrets do not belong in committed config — `mise.local.toml` is
still plaintext.

See: [Environments](https://mise.jdx.dev/environments/)

## Tasks

### Define tasks

```toml
[tasks]
build = "npm run build"

[tasks.test]
description = "Run unit tests"
run = ["npm run lint", "npm test"]
depends = ["build"]
alias = "t"
```

Tasks run with the project's tools and env, so no activation is needed.

See: [TOML tasks](https://mise.jdx.dev/tasks/toml-tasks.html)

### Run tasks

```bash
mise run build              # also: mise build
mise run test -- --watch    # forward args after --
mise run build ::: test     # run several tasks
mise tasks ls
mise tasks info test
```

`mise run` with no task opens a picker (or runs `default`), and installs
missing tools first.

See: [Running tasks](https://mise.jdx.dev/tasks/running-tasks.html)

### Dependencies

```toml
[tasks.ci]
depends = ["build", "lint"]
wait_for = ["render"]
run = "npm test"

[tasks.deploy]
depends_post = ["notify"]

[tasks.build-rs]
run = "cargo build"
sources = ["src/**/*.rs", "Cargo.toml"]
outputs = ["target/debug/app"]
```

`depends` runs first and only once; `depends_post` runs after;
`sources`/`outputs` skip a task whose outputs are newer.

See: [Task config](https://mise.jdx.dev/tasks/task-configuration.html)

### File tasks

#### mise-tasks/build

```bash
#!/usr/bin/env bash
#MISE description="Build the CLI"
#MISE depends=["lint"]
#MISE sources=["src/**/*.rs"]
#MISE alias="b"
#USAGE flag "-p --profile <profile>" default="dev"
cargo build
```

Scripts live in `mise-tasks/`, `.mise/tasks/`, or `mise/tasks/`, must be
executable (`chmod +x`), and `#USAGE` defines flags as `usage_*` env vars.

See: [File tasks](https://mise.jdx.dev/tasks/file-tasks.html)

### Watch

```bash
mise use -g watchexec@latest   # mise watch needs watchexec
mise watch build               # rerun on source changes
mise watch test --clear
```

Watches the task's `sources`; extra arguments go to watchexec.

See: [mise watch](https://mise.jdx.dev/cli/watch.html)

## Also see

- [mise documentation](https://mise.jdx.dev)
- [Configuration reference](https://mise.jdx.dev/configuration.html)
- [CLI reference](https://mise.jdx.dev/cli/)
- [Migrating from asdf](https://mise.jdx.dev/dev-tools/comparison-to-asdf.html)
