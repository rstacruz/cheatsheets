---
title: Cron
seo_title: Cron cheatsheet — syntax, crontab, examples
description: "Cron syntax: the five-field format, operators, special strings and crontab examples. Reference."
subtitle: Unix job scheduler
category: CLI
updated: 2026-11-23
last_verified_with: "cronie crontab(5), crontab(1)."
weight: -3
---

## Format

<!-- {: .-two-column} -->

### Format

#### Fields

```
Min  Hour Day  Mon  Weekday
```

#### Example

<!-- {: .-setup} -->

```
*    *    *    *    *  command to be executed
```

#### Field ranges

```
┬    ┬    ┬    ┬    ┬
│    │    │    │    └─  Weekday  (0-7, 0/7=Sun)
│    │    │    └──────  Month    (1..12)
│    │    └───────────  Day      (1..31)
│    └────────────────  Hour     (0..23)
└─────────────────────  Minute   (0..59)
```

<!-- {: .-setup.-box-chars} -->

### Operators

| Operator | Description                |
| ---      | ---                        |
| `*`      | all values                 |
| `,`      | separate individual values |
| `-`      | a range of values          |
| `/`      | divide a value into steps  |

### Special strings

| String       | Description                            |
| ---          | ---                                    |
| `@reboot`    | run once after reboot                  |
| `@hourly`    | once every hour - same as `0 * * * *`  |
| `@daily`     | once every day - same as `0 0 * * *`   |
| `@midnight`  | same as `@daily`                       |
| ---          | ---                                    |
| `@weekly`    | once every week - same as `0 0 * * 0`  |
| `@monthly`   | once every month - same as `0 0 1 * *` |
| `@yearly`    | once every year - same as `0 0 1 1 *`  |
| `@annually`  | same as `@yearly`                      |

### Examples

| Example        | Description                 |
| ---            | ---                         |
| `0 * * * *`    | every hour                  |
| `*/15 * * * *` | every 15 mins               |
| `0 */2 * * *`  | every 2 hours               |
| `0 18 * * 1-6` | every week Mon-Sat at 6pm   |
| `10 2 * * 6,7` | every Sat and Sun on 2:10am |
| `0 0 * * 0`    | every Sunday midnight       |

### Crontab

```bash
# Adding tasks easily
echo "@reboot echo hi" | crontab
```

```bash
# Open in editor - optional for another user
crontab -e [-u user]
```

```bash
# List tasks - optional for another user
crontab -l [-u user]
```

```bash
# Delete crontab file - optional for another user
crontab -r [-u user]
```
