---
title: Paseo CLI
subtitle: Multi-agent coding CLI
logo: { set: icon-park-outline, name: robot }
category: Agents
updated: 2026-11-28
last_verified_at: 2026-11-28
last_verified_with: "paseo 0.18.1."
tier: t1
fragments:
  - "paseo"
  - "paseo run"
  - "paseo ls -a"
  - "paseo attach"
  - "paseo send"
  - "paseo logs <id>"
  - "paseo wait"
  - "paseo stop"
  - "--no-wait"
  - "--provider codex"
  - "--workspace"
  - "paseo project ls"
  - "paseo workspace"
  - "paseo terminal"
  - "paseo schedule"
  - "--every 30m"
  - "paseo daemon"
  - "paseo plugin"
  - "--json"
  - "PASEO_HOST"
keywords:
  - Paseo CLI
  - coding agents
  - multi-agent
  - workspaces
  - schedules
  - daemon
intro: |
  [Paseo](https://paseo.sh) runs coding agents on your machines from a
  terminal, desktop, mobile, or web client.
links:
  - title: Paseo CLI reference
    url: https://paseo.sh/docs/cli
  - title: Schedules from the CLI
    url: https://paseo.sh/docs/schedules-cli
  - title: Getting started
    url: https://paseo.sh/docs
  - title: Paseo repository
    url: https://github.com/getpaseo/paseo
---

## Getting started

### Install

```bash
npm install -g @getpaseo/cli
paseo                         # starts daemon, then offers pairing
```
<!-- {: data-highlight="@getpaseo/cli"} -->

The desktop app bundles a daemon; Paseo does not ship a coding agent, so install at least one provider CLI.

See: [Server / CLI](https://paseo.sh/docs#server--cli)

### First run

```bash
paseo run "fix the tests"
paseo ls
paseo attach <id>     # stream output; Ctrl+C to detach
```

The CLI creates a local workspace for the current directory.

See: [Quick reference](https://paseo.sh/docs/cli#quick-reference)

## Agents

### Run

```bash
paseo run "fix the tests"
paseo run --workspace <workspace-id> "review the current diff"
paseo run --provider codex --no-wait "run the focused test suite"
paseo run --output-schema schema.json "name this branch"
paseo run --new-workspace worktree --worktree-mode branch-off \
  --new-branch feature/x --base origin/main "implement feature X"
```

A bare `run` creates a local workspace in the current directory; `--workspace` uses an existing one. `--no-wait` returns early; `--output-schema` cannot combine with `--no-wait`.

See: [Running agents](https://paseo.sh/docs/cli#running-agents)

### List

```bash
paseo ls
paseo ls -a
paseo ls -a -g --json
paseo ls --background
paseo ls -q
```

`-a` adds archived and background agents; `-g` crosses directories.
`--background` adds background agents without archived ones.

See: [Listing agents](https://paseo.sh/docs/cli#listing-agents)

### Attach and logs

```bash
paseo attach <id>
paseo logs <id> -f
paseo logs <id> --tail 10
paseo logs <id> --filter tools
```

IDs accept unambiguous prefixes.

See: [Streaming output](https://paseo.sh/docs/cli#streaming-output) and [Viewing logs](https://paseo.sh/docs/cli#viewing-logs)

### Send

```bash
paseo send <id> "now run the tests"
paseo send <id> --image screenshot.png "what's wrong here?"
paseo send <id> --behavior steer "continue on this path"
paseo send <id> --no-wait "run this task"
```

Agent sends queue until the running turn ends; `--behavior steer` joins that turn. Human sends default to `interrupt`.

See: [Sending messages](https://paseo.sh/docs/cli#sending-messages)

### Wait and stop

```bash
paseo wait <id>
paseo wait <id> --timeout 60
paseo stop <id>
paseo stop --all
```

`wait` blocks until the current task finishes; `stop` is a no-op for idle agents.

See: [Waiting for agents](https://paseo.sh/docs/cli#waiting-for-agents)

### Permissions and modes

```bash
paseo permit ls
paseo permit allow <id>
paseo permit deny <id> --all
paseo agent mode <id> --list
paseo agent mode <id> plan
```

Permission requests are per-agent; modes are provider-specific.

See: [Permissions](https://paseo.sh/docs/cli#permissions) and [Agent modes](https://paseo.sh/docs/cli#agent-modes)

## Workspaces

### Projects

```bash
cd ~/dev/my-app
paseo project create
paseo project ls
paseo project rename <project-id> "My app"
paseo project delete <project-id>
```

`create [path]` defaults to the current directory; with `--host`, the path is resolved on the daemon machine.

See: [Projects](https://paseo.sh/docs/cli#projects)

### Create

```bash
paseo workspace create --isolation local \
  --path ~/dev/my-app --title main
paseo workspace create --isolation worktree \
  --path ~/dev/my-app --mode checkout-pr --pr-number 2186
paseo workspace create --isolation local --background \
  --path /path/to/repo
```
<!-- {: data-highlight="--background"} -->

`--background` hides a workspace from default discovery; `--no-background` overrides caller inheritance.

See: [Workspaces](https://paseo.sh/docs/cli#workspaces)

### Worktrees

```bash
paseo run --new-workspace worktree \
  --worktree-mode branch-off --new-branch feature/auth \
  --base origin/main "implement auth"
paseo workspace create --isolation worktree \
  --mode checkout-branch --branch feature/existing \
  --worktree-slug existing-copy
```
<!-- {: data-highlight="--worktree-mode branch-off"} -->

Worktree modes are `branch-off`, `checkout-branch`, and `checkout-pr`; `paseo.json` scripts attach to the worktree.

See: [Create a worktree-backed workspace](https://paseo.sh/docs/worktrees#create-a-worktree-backed-workspace)

### Manage

```bash
paseo workspace ls
paseo workspace ls --background
paseo workspace rename <workspace-id> "Auth rework"
paseo workspace archive <workspace-id>
paseo workspace setup <id>
```

Inside an agent, `PASEO_WORKSPACE_ID` holds its own workspace ID.

See: [Workspaces](https://paseo.sh/docs/cli#workspaces)

## Terminals and scripts

### Terminals

```bash
paseo terminal create --workspace <workspace-id> --name Development
paseo terminal send-keys <terminal-id> -l "echo ready"
paseo terminal send-keys <terminal-id> Enter
paseo terminal capture <terminal-id>
paseo terminal ls --workspace <workspace-id> --json
paseo terminal kill <terminal-id>
```

Creation uses the workspace directory unless `--cwd` is given; `ls --all` lists every terminal on the host.

See: [Terminals](https://paseo.sh/docs/cli#terminals)

### Scripts

```bash
paseo script ls
paseo script start web
paseo script stop web
```

Scripts come from the workspace's `paseo.json`; services add port, proxy URL, and health.

See: [Workspace scripts](https://paseo.sh/docs/cli#workspace-scripts) and [Scripts and services](https://paseo.sh/docs/worktrees#scripts-and-services)

## Orchestration

### Subagents

```bash
agent_id=$(paseo run --no-wait --quiet \
  --title api-agent "implement the API")
paseo wait "$agent_id"
paseo agent detach <id>
```
<!-- {: data-highlight="detach"} -->

`PASEO_AGENT_ID` makes a new run a subagent in the same workspace unless `--workspace` is set. Detach changes only the parent relationship and the agent keeps running.

See: [Multi-agent workflows](https://paseo.sh/docs/cli#multi-agent-workflows)

### Verify loop

```bash
paseo run --provider codex "make the tests pass"
verdict=$(paseo run --provider claude --output-schema schema.json \
  "ensure tests all pass")
echo "$verdict" | jq -e '.criteria_met == true'
```
<!-- {: data-highlight="--output-schema"} -->

A builder plus a verifier can loop until the verdict passes; `jq` reads the JSON schema output.

See: [Multi-agent workflows](https://paseo.sh/docs/cli#multi-agent-workflows)

### Remote hosts

```bash
paseo --host localhost:6767 host add \
  'ssh://deploy@build-box' --label build-box --meta team=infra
paseo --host localhost:6767 host ls --json
paseo --host "$OFFER_URL" run "fix the failing tests"
```
<!-- {: data-highlight="host add; host ls"} -->

`--host` also accepts pairing offers; relay connections are end-to-end encrypted and SSH hosts must already run a daemon.

See: [Connecting to a remote daemon](https://paseo.sh/docs/cli#connecting-to-a-remote-daemon)

## Schedules

### Create

```bash
paseo schedule create --every 30m --cwd ~/dev/my-app \
  --name overnight-refactor --provider codex/gpt-5.5 \
  "Continue the refactor. Run the focused checks."
paseo schedule create --cron "0 9 * * 1-5" \
  --timezone America/New_York --name morning-triage \
  "Review overnight CI failures."
```
<!-- {: data-highlight="--every"} -->

`--every` compiles to cron, not a rolling interval; schedules default to UTC and `--run-now` fires once at creation.

See: [Create](https://paseo.sh/docs/schedules-cli#create) and [Cadence](https://paseo.sh/docs/schedules-cli#cadence)

### Manage

```bash
paseo schedule ls
paseo schedule inspect <id>
paseo schedule logs <id>
paseo schedule pause <id>
paseo schedule resume <id>
paseo schedule run-once <id>
paseo schedule update <id> --every 10m --max-runs 6
paseo schedule update <id> --no-archive-on-finish
paseo schedule delete <id>
```

Each run starts a fresh agent and archives its workspace by default; `--no-archive-on-finish` keeps run workspaces active.

See: [Manage](https://paseo.sh/docs/schedules-cli#manage)

### Heartbeats

```bash
paseo heartbeat create --cron "*/20 * * * *" \
  --name heartbeat \
  "Check the current task state and continue."
paseo heartbeat update <id> --cron "*/10 * * * *"
paseo heartbeat delete <id>
```
<!-- {: data-highlight="--cron"} -->

Heartbeats need `PASEO_AGENT_ID` and raw `--cron`. `--every` presets apply only to new-agent schedules.

See: [Heartbeats](https://paseo.sh/docs/schedules-cli#heartbeats)

## Daemon

### Configure

```bash
paseo daemon config set daemon.listen 127.0.0.1:6799 \
  --home ~/.paseo
paseo daemon config set daemon.relay.enabled false \
  --home ~/.paseo
paseo daemon reload --home ~/.paseo
```
<!-- {: data-highlight="daemon.listen; daemon.relay.enabled"} -->

`reload` applies runtime-safe changes and never restarts implicitly.

See: [Apply changes](https://paseo.sh/docs/configuration#apply-changes)

### Lifecycle

```bash
paseo daemon start --home ~/.paseo
paseo daemon status --home ~/.paseo
paseo daemon restart --home ~/.paseo
paseo daemon stop --home ~/.paseo
PASEO_LISTEN=127.0.0.1:6799 \
  PASEO_RELAY_ENABLED=false \
  paseo daemon run --home ~/.paseo
```

`start` backgrounds the daemon; `stop --home` waits for exit; `run` stays attached with launch-time env overrides.

See: [Daemon management](https://paseo.sh/docs/cli#daemon-management) and [Foreground deployments and migration](https://paseo.sh/docs/cli#foreground-deployments-and-migration)

### Pairing

```bash
paseo daemon pair --relay
paseo daemon pair --json
paseo --host "$OFFER_URL" ls
```
<!-- {: data-highlight="--relay"} -->

Relay is off by default; `--relay` opts in.

See: [Connecting to a remote daemon](https://paseo.sh/docs/cli#connecting-to-a-remote-daemon)

## Reference

### Global options

```bash
paseo --json ls
paseo ls --format yaml
paseo ls -q
paseo --no-color ls
```
<!-- {: data-highlight="--json"} -->

Most commands accept these output flags; `-q` prints IDs only.

See: [Global options](https://paseo.sh/docs/cli#global-options)

### Select a daemon

```bash
paseo --home ~/.paseo ls
paseo --host devbox:6767 project ls
paseo --host "$OFFER_URL" run "fix the failing tests"
```
<!-- {: data-highlight="--home; --host"} -->

Selectors work before or after the command. Two selectors yield `TARGET_AMBIGUOUS`; there is no default-port fallback.

See: [Select one daemon](https://paseo.sh/docs/cli#select-one-daemon)

### Environment

```bash
PASEO_HOME=~/.paseo paseo ls
PASEO_HOST=devbox:6767 paseo ls
echo "$PASEO_AGENT_ID"        # set inside agent sessions
echo "$PASEO_WORKSPACE_ID"    # current agent's workspace
```
<!-- {: data-highlight="PASEO_HOME; PASEO_HOST; PASEO_AGENT_ID; PASEO_WORKSPACE_ID"} -->

Flags override environment selectors; the agent variables are read-only inside sessions.

See: [Select one daemon](https://paseo.sh/docs/cli#select-one-daemon)

### Providers

```bash
paseo provider ls
paseo provider models claude
paseo provider diagnostic claude
paseo provider diagnostic codex --json
```

Provider diagnostics report the daemon's own PATH, binaries, and model count.

See: [Provider diagnostics](https://paseo.sh/docs/cli#provider-diagnostics)

### Usage

```bash
paseo usage
paseo usage ls --refresh
paseo usage inspect <report-id>
paseo usage ls --json
```
<!-- {: data-highlight="--refresh"} -->

Quota reports come from the host and `--refresh` bypasses the five-minute cache.

See: [Account usage](https://paseo.sh/docs/cli#account-usage)

### Hub

```bash
paseo hub status
paseo hub login [url]
paseo hub permissions list
paseo hub permissions grant hub.execute
paseo hub deploy --dry-run
```

Grant `hub.execute` only to trusted automations.

See: [Hub](https://paseo.sh/docs/cli#hub)

### Plugins

```bash
paseo plugin add owner/slug
paseo plugin ls
paseo plugin logs my-plugin
paseo plugin update --all
paseo plugin disable my-plugin
```

Plugins run unsandboxed with the daemon user's access: add only trusted sources.

See: [Plugins](https://paseo.sh/docs/cli#plugins)

## Also see

### Scheduled tasks

[Paseo scheduled tasks cheatsheet](./paseo-scheduled-tasks)
<!-- {: .-crosslink} -->
