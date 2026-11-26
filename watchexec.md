---
title: Watchexec
subtitle: Runs commands when files change
category: CLI
weight: -1
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
tier: t3
last_verified_with: "watchexec 2.8.0."
updated: 2026-11-26
---

## Getting started
<!-- {: .-three-column} -->

### Run a command

```bash
$ watchexec -- echo ran
[Running: echo ran]
ran
[Command was successful]
```
<!-- {: data-highlight="watchexec"} -->

Runs once at startup, then after each change. Stop with `Ctrl+C`.

See: [Description](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#description)

### By extension

```bash
watchexec -e js,jsx npm test
```
<!-- {: data-highlight="-e"} -->

`-e` takes comma-separated extensions or repeated flags.

See: [Filtering](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#filtering)

### In selected paths

```bash
watchexec -w lib -w test \
  npm test
```
<!-- {: data-highlight="-w"} -->

Without `-w`, the current directory is watched recursively.

See: [Output](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#output)

### Wait for a change

```bash
watchexec -p -- make
```
<!-- {: data-highlight="-p"} -->

`-p` skips the startup run.

See: [Options](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#options)

### After a short delay

```bash
watchexec -d 200ms -- make
```
<!-- {: data-highlight="-d"} -->

`-d` coalesces bursts; the default is 50ms.

See: [Events](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#events)

## Filter events
<!-- {: .-three-column} -->

### Include by glob

```bash
watchexec -f 'src/**/*' -- make
```
<!-- {: data-highlight="-f"} -->

Patterns match paths relative to the project origin; `**` spans directories.

See: [Filtering](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#filtering)

### Ignore by glob

```bash
watchexec -i 'target/**' -- make test
```
<!-- {: data-highlight="-i"} -->

Repeat `-i` for more patterns; ignore files are loaded too.

See: [Filtering](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#filtering)

### Disable ignore files

```bash
watchexec --ignore-nothing -- make
```
<!-- {: data-highlight="--ignore-nothing"} -->

By default, `.gitignore`, `.ignore`, and built-in patterns apply.

See: [Filtering](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#filtering)

### Change kinds

```bash
watchexec --fs-events create -- \
  aws s3 sync . s3://my-bucket
```
<!-- {: data-highlight="--fs-events"} -->

Choices: `access`, `create`, `remove`, `rename`, `modify`, `metadata`.

See: [Filtering](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#filtering)

### Debounce

```bash
watchexec --debounce 200ms -- make
```
<!-- {: data-highlight="--debounce"} -->

Bursts of events become one run; the default is 50ms.

See: [Events](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#events)

### Poll for changes

```bash
watchexec --poll 1s -- make
```
<!-- {: data-highlight="--poll"} -->

Polling helps on network shares and filesystems without native events.

See: [Events](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#events)

### Diagnose filters

```bash
watchexec --print-events -- make
```
<!-- {: data-highlight="--print-events"} -->

Prints the events that triggered each run.

See: [Debugging](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#debugging)

## Long-running services
<!-- {: .-three-column} -->

### Restart on change

```bash
watchexec -r -- node server.js
```
<!-- {: data-highlight="-r"} -->

`-r` restarts a command that is still running.

See: [Events](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#events)

### Signal on change

```bash
watchexec --signal SIGHUP -- \
  nginx -g 'daemon off;'
```
<!-- {: data-highlight="--signal"} -->

`--signal` implies `-o signal`; `--stop-signal` controls restart's stop signal.

See: [Command](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#command)

### Fail fast

```bash
watchexec --exit-on-error -- npm test
```
<!-- {: data-highlight="--exit-on-error"} -->

Exits on the first non-zero command result.

See: [Options](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#options)

## Command control
<!-- {: .-three-column} -->

### Command flags

```bash
watchexec -w src -- \
  rsync -a src dest
```
<!-- {: data-highlight="--"} -->

`--` separates watchexec flags from the command's flags.

See: [Command](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#command)

### Shell

```bash
watchexec --shell=bash -- \
  'echo $BASH_VERSION'
```
<!-- {: data-highlight="--shell=bash"} -->

Use `-n` or `--shell=none` to execute the program directly.

See: [Command](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#command)

### Quiet and clear

```bash
watchexec --clear --quiet -- make
```
<!-- {: data-highlight="--clear"} -->

`-c` clears the screen; `-q` hides the runner's status lines.

See: [Output](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#output)

## Process control

### Busy updates

```bash
watchexec -o queue -- npm test
```
<!-- {: data-highlight="-o queue"} -->

#### Modes

| Mode         | When events arrive during a run |
| ---          | ---                             |
| `do-nothing` | Ignore them (default)           |
| `queue`      | Run again after this run ends   |
| `restart`    | Stop and start again            |
| `signal`     | Send the `--signal` signal      |
<!-- {: .-headers} -->

See: [Events](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#events)

### Stop and timeouts

#### Restart timeout

```bash
watchexec -r --stop-timeout 5s -- my_server
```

#### Run timeout

```bash
watchexec --timeout 30s -- ./long-job
```

`--stop-signal` sets the shutdown signal (default SIGTERM); `--timeout` ends a run that takes too long.

See: [Command](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#command)

## Interaction and output
<!-- {: .-three-column} -->

### Keypress controls

```bash
watchexec -I -- npm test
```
<!-- {: data-highlight="-I"} -->

With a TTY: `r` restart, `s` stop, `p` pause, `q` quit.

See: [Options](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#options)

### Changed paths

```bash
watchexec --emit-events-to=stdio -- cat
```
<!-- {: data-highlight="--emit-events-to=stdio"} -->

The command receives `create:`, `modify:`, and other prefixed paths on stdin.

See: [Options](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#options)

### Event stream only

```bash
watchexec --only-emit-events
```
<!-- {: data-highlight="--only-emit-events"} -->

Emits JSON events to stdout without running a command.

See: [Options](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md#options)

## Install
<!-- {: .-three-column} -->

### Package managers

```bash
brew install watchexec
```

See: [Known packages](https://github.com/watchexec/watchexec/blob/main/doc/packages.md)

### From source

```bash
cargo install watchexec-cli
```

The Cargo package is `watchexec-cli`.

See: [README](https://github.com/watchexec/watchexec/blob/main/README.md)

### Prebuilt binaries

See: [GitHub releases](https://github.com/watchexec/watchexec/releases/latest)

## Also see

- [Watchexec CLI manual](https://github.com/watchexec/watchexec/blob/main/doc/watchexec.1.md)
- [Glob pattern syntax](https://watchexec.github.io/docs/glob-patterns.html)
