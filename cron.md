---
title: Cron
category: CLI
layout: 2017/sheet
updated: 2018-05-03
weight: -3
---

## Format
{: .-two-column}

### Format

```
Min  Hour Day  Mon  Weekday
```
{: .-setup}

```
*    *    *    *    *  command to be executed
```

```
┬    ┬    ┬    ┬    ┬
│    │    │    │    └─  Weekday  (0=Sun .. 6=Sat)
│    │    │    └──────  Month    (1..12)
│    │    └───────────  Day      (1..31)
│    └────────────────  Hour     (0..23)
└─────────────────────  Minute   (0..59)
```
{: .-setup.-box-chars}

### Operators

| Operator | Description                |
| ---      | ---                        |
| `*`      | all values                 |
| `,`      | separate individual values |
| `-`      | a range of values          |
| `/`      | divide a value into steps  |

### Examples

| Example        | Description                 |
| ---            | ---                         |
| `0 * * * *`    | every hour                  |
| `*/15 * * * *` | every 15 mins               |
| `0 */2 * * *`  | every 2 hours               |
| `0 18 * * 0-6` | every week Mon-Sat at 6pm   |
| `10 2 * * 6,7` | every Sat and Thu on 2:10am |
| `0 0 * * 0`    | every Sunday midnight       |
| ---            | ---                         |
| `@reboot`      | every reboot                |

### Crontab

```bash
# Adding tasks easily
echo "@reboot echo hi" | crontab
```

```bash
# Open in editor
crontab -e
```

```bash
# List tasks
crontab -l [-u user]
```
