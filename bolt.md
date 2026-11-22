---
title: Bolt
subtitle: Puppet automation and orchestration runner
category: Devops
updated: 2026-11-22
last_verified_with: "Bolt 4.0.0 CLI on Linux x86_64; examples cross-checked against 5.2.1 docs."
links:
  - title: Bolt documentation
    url: https://help.puppet.com/bolt/current/topics/bolt.htm
  - title: Install Bolt
    url: https://help.puppet.com/bolt/current/topics/bolt_installing.htm
  - title: Command reference
    url: https://help.puppet.com/bolt/current/topics/bolt_command_reference.htm
keywords: [Puppet Bolt, tasks, plans, inventory]
intro: |
  [Bolt](https://help.puppet.com/bolt/current/topics/bolt.htm) runs commands, tasks, plans, and Puppet code on remote targets without a Puppet server. Bolt 5.x installs from authenticated packages.
---

## Run something
<!-- {: .-three-column} -->

### Run a command

```sh
bolt command run whoami -t localhost
# → rsc
```

Quotes keep spaces and shell characters together.

See: [Run Bolt](https://help.puppet.com/bolt/current/topics/running_bolt_commands.htm)

### Run a task

```sh
bolt task run package -t localhost \
  action=status name=vim
```

Task names are `module::task`; `init` tasks use the module name alone.

See: [Running tasks](https://help.puppet.com/bolt/current/topics/bolt_running_tasks.htm)

### Run a plan

```sh
bolt plan run myproject::check
```

Plans live in `plans/` and chain tasks, commands, and scripts.

See: [Running plans](https://help.puppet.com/bolt/current/topics/bolt_running_plans.htm)

## Make a project
<!-- {: .-three-column} -->

### Initialize

```sh
mkdir myproject && cd myproject
bolt project init
```

Creates `bolt-project.yaml`; the name defaults to the directory name.

See: [Bolt projects](https://help.puppet.com/bolt/current/topics/projects.htm)

### Write a task

#### tasks/hello.sh

```sh
#!/usr/bin/env bash
echo "hello $PT_name"
```

#### Run it

```sh
bolt task run myproject::hello \
  name=Ada -t localhost
# → hello Ada
```

Parameters arrive as `PT_<name>` environment variables.

See: [Writing tasks](https://help.puppet.com/bolt/current/topics/writing_tasks.htm)

### Add inventory

#### inventory.yaml

```yaml
groups:
  - name: web
    targets: [web1.example.com]
    config:
      transport: ssh
```

Target groups are addressed by name, such as `-t web`.

See: [Inventory files](https://help.puppet.com/bolt/current/topics/inventory_files.htm)

## Target and connect
<!-- {: .-three-column} -->

### Use a URI

```sh
bolt command run uptime \
  -t ssh://deploy@web1:2222
```

SSH is the default transport; `winrm://` and `local://` are also available.

See: [Transports](https://help.puppet.com/bolt/current/topics/bolt_transports_reference.htm)

### Select targets

```sh
bolt command run whoami \
  -t '@targets.txt'
```

#### Options

| Option            | Description                  |
| ----------------- | ---------------------------- |
| `-t, --targets`   | Hosts, groups, or globs      |
| `--rerun failure` | Targets that failed last run |

See: [Specify targets](https://help.puppet.com/bolt/current/topics/running_bolt_commands.htm#specify-targets)

### Authenticate

```sh
bolt command run whoami -t web \
  -u deploy \
  --private-key ~/.ssh/id_ed25519
```

Passwords use `-p`; add `--no-host-key-check` only for trusted hosts.

See: [Credentials](https://help.puppet.com/bolt/current/topics/running_bolt_commands.htm#specify-connection-credentials)

## Work with code
<!-- {: .-three-column} -->

### Pass parameters

```sh
bolt task run myproject::hello \
  --params '{"name":"Ada"}' -t localhost
# → hello Ada
```

Use `--params @file.json` for larger structures.

See: [Structured data](https://help.puppet.com/bolt/current/topics/bolt_running_tasks.htm#passing-structured-data)

### Preview changes

```sh
bolt apply -e "notify { 'hi': }" \
  -t localhost --noop
```

Tasks must set `supports_noop: true` to honor `--noop`.

See: [Apply code](https://help.puppet.com/bolt/current/topics/applying_manifest_blocks.htm)

### Inspect content

```sh
bolt task show myproject::hello
```

Omit the name to list tasks; `bolt plan show` lists plans.

See: [Command reference](https://help.puppet.com/bolt/current/topics/bolt_command_reference.htm)
