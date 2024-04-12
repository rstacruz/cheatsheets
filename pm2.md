---
title: pm2
category: CLI
authors: { github: "Dr-Dino" }
updated: 2020-05-08
---

### Fork mode

| Command                          | Description              |
| ---                              | ---                      |
| `pm2 start app.js --name my-api` | Start and name a process |

### Cluster mode

| Command                 | Description                                                        |
| ---                     | ---                                                                |
| `pm2 start app.js -i 0` | Will start maximum processes with LB depending on available CPUs	 |

### Listing

| Command          | Description                                         |
| ---              | ---                                                 |
| `pm2 list`       | Display all processes status                        |
| `pm2 jlist`      | Print process list in raw JSON                      |
| `pm2 prettylist` | Print process list in beautified JSON               |
| ---              | ---                                                 |
| `pm2 describe 0` | Display all information about a specific process	 |
| ---              | ---                                                 |
| `pm2 monit`      | Monitor all processes                               |

### Logs

| Command            | Description                               |
| ---                | ---                                       |
| `pm2 logs [--raw]` | Display all processes logs in streaming	 |
| `pm2 flush`        | Empty all log files                       |
| `pm2 reloadLogs`	 | Reload all logs                           |

### Actions

| Command           | Description                                    |
| ---               | ---                                            |
| `pm2 stop all`    | Stop all processes                             |
| `pm2 restart all` | Restart all processes                          |
| ---               | ---                                            |
| `pm2 reload all`  | Will 0s downtime reload (for NETWORKED apps)	 |
| ---               | ---                                            |
| `pm2 stop 0`      | Stop specific process id                       |
| `pm2 restart 0`   | Restart specific process id                    |
| ---               | ---                                            |
| `pm2 delete 0`    | Will remove process from pm2 list              |
| `pm2 delete all`  | Will remove all processes from pm2 list        |
| ---               | ---                                            |
| `pm2 save`        | Save processes list to respawn at reboot       |
| ---               | ---                                            |
| `pm2 reset`       | reset the restart counter                      |
| `pm2 reset all`   | reset all restart counters                     |

### Misc

| Command                             | Description                                                    |
| ---                                 | ---                                                            |
| `pm2 reset <process>`               | Reset meta data (restarted time...)                            |
| `pm2 updatePM2`                     | Update in memory pm2                                           |
| `pm2 ping`                          | Ensure pm2 daemon has been launched                            |
| `pm2 sendSignal SIGUSR2 my-app`     | Send system signal to script                                   |
| ---                                 | ---                                                            |
| `pm2 start app.js --no-daemon`      | Run pm2 daemon in the foreground if it doesn't exist already	 |
| `pm2 start app.js --no-vizion`      | Skip vizion features (versioning control)                      |
| `pm2 start app.js --no-autorestart` | Do not automatically restart app                               |
