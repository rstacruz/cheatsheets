---
title: top
subtitle: Process monitor
logo: { set: icon-park-outline, name: dashboard }
category: CLI
created_at: 2019-09-28
updated: 2026-11-26
intro: See the processes in your Unix machine.
links:
  - title: top(1) man page
    url: https://man7.org/linux/man-pages/man1/top.1.html
tier: t3
last_verified_with: "procps-ng top 4.0.7."
---

## Interactive commands

### Help and display

| Shortcut  | Description           |
| --------- | --------------------- |
| `h`       | shows help            |
| `m`       | switches memory view  |
| `1`       | switches cpu view     |
| ---       | ---                   |
| `V`       | switch to forest view |
| `c`       | show full path        |
| `q`       | quits the program     |

<!-- {: .-shortcuts} -->

See: [Display commands](https://man7.org/linux/man-pages/man1/top.1.html#4._INTERACTIVE_Commands)

### Processes and sorting

| Shortcut  | Description           |
| --------- | --------------------- |
| `k`       | kills process         |
| `Shift+p` | sorts by CPU usage    |
| `Shift+m` | sorts by memory usage |
| `Shift+r` | reverses sorting      |

<!-- {: .-shortcuts} -->

See: [Sorting commands](https://man7.org/linux/man-pages/man1/top.1.html#4._INTERACTIVE_Commands)

### Search and filters

| Shortcut  | Description           |
| --------- | --------------------- |
| `Shift+l` | searches for string   |
| `o`       | adds a filter         |
| `u`       | filter by user        |
| `=`       | clears filters        |

<!-- {: .-shortcuts} -->

See: [Filter commands](https://man7.org/linux/man-pages/man1/top.1.html#4._INTERACTIVE_Commands)
