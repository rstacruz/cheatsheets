---
title: Watchexec
subtitle: Run commands when files change
category: CLI
weight: -1
updated: 2026-11-22
keywords:
  - "watchexec --exts js,jsx -- npm test"
  - "watchexec --restart -- node server.js"
intro: |
  [Watchexec](https://watchexec.github.io/) runs a command when files change, with no language runtime or repository required.
links:
  - title: Watchexec documentation
    url: https://watchexec.github.io/
  - title: CLI manual
    url: https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md
---

## Watch and run

### Any change

```sh
$ watchexec -- echo ran
[Running: echo ran]
ran
[Command was successful]
```

The command runs once at startup, then after each change. Stop with `Ctrl+C`.

### Command flags

```bash
watchexec -w src -- rsync -a src dest
```

Use `--` before flags meant for the command.

### File extensions

```bash
watchexec --exts js,jsx -- npm test
```

`-e` accepts comma-separated extensions or repeated flags.

### Selected paths

```bash
watchexec -w lib -w test -- npm test
```

Without `-w`, the current directory is watched recursively.

### Delayed and first-change runs

#### Wait after events

```bash
watchexec --delay-run 1s -- make
```

#### First change only

```bash
watchexec --postpone -- make
```

`--postpone` skips the startup run and waits for a change.

## Filter events

### Include by glob

```bash
watchexec -f '*/src/**/*' -- make
```

Patterns match absolute paths, so start non-absolute globs with `*/`.

### Ignore by glob

```bash
watchexec -i 'target/**' -- make test
```

Repeat `-i` for more patterns; ignore files are loaded too.

### Ignore files

```bash
watchexec --ignore-nothing -- make
```

By default, `.gitignore`, `.ignore`, and built-in patterns apply.

### Change kinds

```bash
watchexec --fs-events create -- \
  s3 sync . s3://my-bucket
```

Choices: `access`, `create`, `remove`, `rename`, `modify`, `metadata`.

### Debounce

```bash
watchexec --debounce 200ms -- make
```

Bursts of events become one run; the default is 50ms.

### Poll for changes

```bash
watchexec --poll 1s -- make
```

Polling helps on network shares and filesystems without native events.

### Diagnose filters

```bash
watchexec --print-events -- make
```

Prints the events that triggered each run.

## Long-running commands

### Restart on change

```bash
watchexec --restart -- node server.js
```

`-r` restarts a command that is still running.

### Busy updates

```bash
watchexec -o queue -- npm test
```

#### Modes

| Mode         | When events arrive during a run |
| ---          | ---                             |
| `do-nothing` | Ignore them (default)           |
| `queue`      | Run again after this run ends   |
| `restart`    | Stop and start again            |
| `signal`     | Send the `--signal` signal      |

### Signal instead of restart

```bash
watchexec --signal SIGHUP -- \
  nginx -g 'daemon off;'
```

`--signal` implies `-o signal`; `--stop-signal` controls restart's stop signal.

### Stop and timeouts

#### Restart timeout

```bash
watchexec -r --stop-signal SIGKILL \
  --stop-timeout 5s -- my_server
```

#### Run timeout

```bash
watchexec --timeout 30s -- ./long-job
```

`--stop-signal` stops a restart; `--timeout` ends a run that takes too long.

### Fail fast

```bash
watchexec --exit-on-error -- npm test
```

Exits on the first non-zero command result.

## Interaction and output

### Keypress controls

```bash
watchexec --interactive -- npm test
```

With a TTY: `r` restart, `s` stop, `p` pause, `q` quit.

### Shell

```bash
watchexec --shell=bash -- 'echo $BASH_VERSION'
```

Use `-n` or `--shell=none` to execute the program directly.

### Quiet and clear

```bash
watchexec --clear --quiet -- make
```

`-c` clears the screen; `-q` hides the runner's status lines.

### Changed paths

```bash
watchexec --emit-events-to=stdio -- cat
```

The command receives `create:`, `modify:`, and other prefixed paths on stdin.

### Event stream only

```bash
watchexec --only-emit-events
```

Emits JSON events to stdout without running a command.

## Install

### Package managers

```bash
brew install watchexec
```

See [known packages](https://github.com/watchexec/watchexec/blob/main/doc/packages.md) for other systems.

### From source

```bash
cargo install watchexec-cli
```

The Cargo package is `watchexec-cli`; prebuilt binaries are on [GitHub releases](https://github.com/watchexec/watchexec/releases/latest).

## Also see

- [Watchexec CLI manual](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md)
- [Glob pattern syntax](https://watchexec.github.io/docs/glob-patterns.html)
