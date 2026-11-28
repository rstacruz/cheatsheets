---
title: pm2
seo_title: pm2 cheatsheet — commands, logs, restart
description: "pm2 commands: list, describe, restart, logs, stop and delete. Process manager reference."
subtitle: Node.js process manager
logo: { src: /assets/logos/pm2.svg, mono: true }
category: Node.js libraries
created_at: 2017-10-31
updated: 2026-11-18
last_verified_at: 2026-11-18
last_verified_with: "PM2 7.1.2."
tier: t2
fragments:
  - "pm2 start"
  - "pm2 start -i max"
  - "pm2 list"
  - "pm2 describe"
  - "pm2 restart"
  - "pm2 reload"
  - "pm2 scale"
  - "pm2 logs"
  - "--watch"
  - "--max-memory"
  - "--cron"
  - "pm2 save"
  - "pm2 startup"
  - "pm2 deploy"
  - "pm2 update"
keywords:
  - pm2
  - process manager
  - node.js
  - cluster mode
  - pm2 ecosystem
  - pm2 logs
  - pm2 startup
intro: |
  [PM2](https://pm2.keymetrics.io) is a production process manager for Node.js.
links:
  - title: PM2 command reference
    url: https://pm2.keymetrics.io/docs/usage/commands/
  - title: PM2 documentation
    url: https://pm2.keymetrics.io/docs/usage/process-management/
  - title: GitHub repository
    url: https://github.com/Unitech/pm2
---

## Start apps

### Fork mode
<!-- {: .-prime} -->

```bash
pm2 start app.js --name my-api
pm2 start server.js -- --port 3000
```
<!-- {: data-highlight="pm2 start"} -->

#### Common flags

| Flag          | Effect                      |
| ---           | ---                         |
| `--name`      | Name the process            |
| `--attach`    | Attach to logs after start  |
| `--no-daemon` | Run in the foreground       |
| `--no-vizion` | Skip git metadata parsing   |

Git parsing is opt-in: set `PM2_ENABLE_GIT_PARSING=true` to use vizion.

See: [Process management](https://pm2.keymetrics.io/docs/usage/process-management/)

### Cluster mode

```bash
pm2 start app.js -i max
pm2 start app.js -i 4 --name api
```
<!-- {: data-highlight="-i max"} -->

#### Cluster flags

| Flag          | Effect                       |
| ---           | ---                          |
| `-i max`      | Start one worker per CPU     |
| `-i 0`        | Legacy equivalent of `-i max` |
| `--wait-ready` | Wait for the app ready signal |

Cluster mode balances traffic across workers.

See: [Cluster mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)

### Ecosystem file

```bash
pm2 init simple
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --only api
pm2 start ecosystem.config.js --env production
```
<!-- {: data-highlight="ecosystem.config.js"} -->

#### Ecosystem commands

| Command                            | Effect                    |
| ---                                | ---                       |
| `pm2 ecosystem`                    | Generate an ecosystem file |
| `pm2 init`                         | Alias for `pm2 ecosystem` |
| `pm2 start ecosystem.config.js`    | Start every declared app  |
| `--only api`                       | Start one named app       |
| `--env production`                 | Use the named env block   |

An ecosystem file declares apps, environment blocks and cluster settings.

See: [Application declaration](https://pm2.keymetrics.io/docs/usage/application-declaration/)

### Start flags

| Flag                        | Effect                          |
| ---                         | ---                             |
| `--watch`                   | Restart when files change       |
| `--max-memory-restart 200M` | Restart above a memory limit    |
| `--cron '0 30 9 * * *'`     | Restart on a cron schedule      |
| `--update-env`              | Refresh environment on restart  |
| `--no-autorestart`          | Disable automatic restarts      |
| `--only api`                | Start one app from the file     |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

## Process management

### List processes

| Command          | Effect                           |
| ---              | ---                              |
| `pm2 list`       | Show all processes               |
| `pm2 jlist`      | Print the process list as JSON   |
| `pm2 prettylist` | Print a formatted JSON list      |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

### Inspect process

| Command         | Effect                          |
| ---             | ---                             |
| `pm2 describe 0` | Show details for one process   |
| `pm2 show api`  | Show details for a named process |
| `pm2 pid api`   | Print process IDs               |
| `pm2 env 0`     | Print a process's environment   |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

### Monitor

| Command    | Effect                                |
| ---        | ---                                   |
| `pm2 monit` | Live metrics and logs in the terminal |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

### Stop & restart

| Command                     | Effect                        |
| ---                         | ---                           |
| `pm2 stop api`              | Stop one process              |
| `pm2 stop all`              | Stop all processes            |
| `pm2 restart api`           | Restart one process           |
| `pm2 restart all`           | Restart all processes         |
| `pm2 restart api --update-env` | Restart with fresh env vars |
| `pm2 reset api`             | Reset one restart counter     |
| `pm2 reset all`             | Reset all restart counters    |

See: [Process management](https://pm2.keymetrics.io/docs/usage/process-management/)

### Reload & scale

```bash
pm2 reload api
pm2 scale api 4
```
<!-- {: data-highlight="pm2 reload; pm2 scale"} -->

#### Cluster commands

| Command          | Effect                            |
| ---              | ---                               |
| `pm2 reload all` | Zero-downtime reload of all apps  |
| `pm2 reload api` | Zero-downtime reload of one app   |
| `pm2 scale api 4` | Resize a cluster to four workers |
| `pm2 scale api +2` | Add two workers                |

Reload avoids downtime for clustered apps; fork mode falls back to a restart.

See: [Cluster mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)

### Delete processes

| Command         | Effect                         |
| ---             | ---                            |
| `pm2 delete api` | Remove one process from PM2   |
| `pm2 delete all` | Remove all processes from PM2 |

Deleting stops the process and drops it from the process list.

See: [Process management](https://pm2.keymetrics.io/docs/usage/process-management/)

## Logs

### Stream logs

```bash
pm2 logs
pm2 logs --json --lines 100
pm2 logs api --err
```
<!-- {: data-highlight="pm2 logs"} -->

#### Log options

| Flag        | Effect                    |
| ---         | ---                       |
| `--json`    | Output JSON lines         |
| `--lines N` | Show the last N lines     |
| `--err`     | Only error output         |
| `--out`     | Only standard output      |

Streaming uses PM2's raw format by default.

See: [Log management](https://pm2.keymetrics.io/docs/usage/log-management/)

### Clear & rotate

| Command          | Effect                        |
| ---              | ---                           |
| `pm2 flush`      | Empty all log files           |
| `pm2 reloadLogs` | Reopen logs after rotation    |
| `pm2 logrotate`  | Generate a logrotate config   |

Run `pm2 reloadLogs` after an external rotation.

See: [Log management](https://pm2.keymetrics.io/docs/usage/log-management/)

## Restart & watch

### Watch files

```bash
pm2 start app.js --watch
pm2 start app.js --watch --ignore-watch node_modules
```
<!-- {: data-highlight="--watch"} -->

#### Watch flags

| Flag                 | Effect                     |
| ---                  | ---                        |
| `--watch`            | Watch the app directory    |
| `--watch-delay 1`    | Debounce restarts by 1s    |

Use `--watch` in development; production restarts belong to reloads and deploys.

See: [Watch & restart](https://pm2.keymetrics.io/docs/usage/watch-and-restart/)

### Restart policies

| Flag                        | Effect                       |
| ---                         | ---                          |
| `--max-memory-restart 200M` | Restart above 200 MB RSS     |
| `--cron '0 30 9 * * *'`     | Restart daily at 09:30       |
| `--update-env`              | Apply new env vars on restart |
| `--no-autorestart`          | Leave crashed processes down |

PM2 restarts a process that exits by default.

See: [Watch & restart](https://pm2.keymetrics.io/docs/usage/watch-and-restart/)

### Signals

| Command                     | Effect                      |
| ---                         | ---                         |
| `pm2 sendSignal SIGUSR2 api` | Signal one named process    |
| `pm2 sendSignal SIGUSR2 all` | Signal every process        |

Use app-level signal handlers for graceful shutdown or reload hooks.

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

## Startup & persistence

### Startup script

| Command           | Effect                             |
| ---               | ---                                |
| `pm2 startup`     | Print a script for your init system |
| `pm2 unstartup`   | Remove the startup script          |

Run the command printed by `pm2 startup` to register the script.

See: [Startup](https://pm2.keymetrics.io/docs/usage/startup/)

### Save & resurrect

| Command          | Effect                       |
| ---              | ---                          |
| `pm2 save`       | Persist the current list     |
| `pm2 resurrect`  | Restore the saved list       |

Run `pm2 save` again whenever the process list changes.

See: [Startup](https://pm2.keymetrics.io/docs/usage/startup/)

### Dumps

| Command          | Effect                      |
| ---              | ---                         |
| `pm2 dump`       | Write the process dump      |
| `pm2 cleardump`  | Delete the process dump     |

`pm2 save` writes the dump that startup uses at boot.

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

## Deployment & modules

### Deploy

| Command                                       | Effect              |
| ---                                           | ---                 |
| `pm2 deploy ecosystem.config.js production`        | Deploy a release    |
| `pm2 deploy ecosystem.config.js production update` | Pull and restart    |
| `pm2 deploy ecosystem.config.js production revert` | Roll back a release |
| `pm2 deploy ecosystem.config.js production list`   | List releases       |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

### Modules

| Command                   | Effect                       |
| ---                       | ---                          |
| `pm2 install <module>`    | Install a PM2 module         |
| `pm2 uninstall <module>`  | Remove an installed module   |
| `pm2 plus`                | Link the daemon to PM2 Plus  |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

### Configuration

| Command                | Effect                      |
| ---                    | ---                         |
| `pm2 set key value`    | Set a configuration value   |
| `pm2 get key`          | Read a configuration value  |

Ecosystem files also declare per-app `env` blocks.

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

## Daemon management

### Daemon lifecycle

| Command     | Effect                             |
| ---         | ---                                |
| `pm2 update` | Reload the daemon and its apps     |
| `pm2 ping`   | Check that the daemon is running   |
| `pm2 kill`   | Stop the daemon and its processes  |

`updatePM2` is the legacy alias for `pm2 update`.

See: [Update PM2](https://pm2.keymetrics.io/docs/usage/update-pm2/)

### Report & dashboard

| Command         | Effect                            |
| ---             | ---                               |
| `pm2 report`    | Print a diagnostic report         |
| `pm2 dashboard` | Terminal dashboard, like `monit`  |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)

### Static server

| Command                              | Effect                       |
| ---                                  | ---                          |
| `pm2 serve dist 8080`                | Serve a directory on a port  |
| `pm2 serve dist 8080 --spa`          | Fall back to index.html      |
| `pm2 serve dist 8080 --name site`    | Name the served process      |

See: [CLI reference](https://pm2.keymetrics.io/docs/usage/commands/)
