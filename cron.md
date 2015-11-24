---
title: Cron
category: CLI
---

### Format

 * Min Hour Day Month Weekday


### Format

    *    *    *    *    *  command to be executed
    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │
    │    │    │    │    │
    │    │    │    │    └───── day of week (0 - 6) (0 or 6 are Sunday to Saturday, or use names)
    │    │    │    └────────── month (1 - 12)
    │    │    └─────────────── day of month (1 - 31)
    │    └──────────────────── hour (0 - 23)
    └───────────────────────── min (0 - 59)

### Examples

    0 * * * * every hour
    */15 * * * * every 15 mins
    0 */2 * * * every 2 hours
    0 0 0 * 0 every sunday midnight

    @reboot every reboot

### crontab

    # Adding tasks easily
    echo "@reboot echo hi" | crontab

    # Open in editor
    crontab -e

    # List tasks
    crontab -l [-u user]
