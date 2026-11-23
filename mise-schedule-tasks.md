---
title: Mise scheduled tasks
h1_title: How to schedule mise tasks
subtitle: Schedule mise tasks with cron
category: Task automation
layout: snippet
last_verified_with: "mise 2026.10.17."
updated: 2026-11-23
links:
  - title: mise tasks
    url: https://mise.jdx.dev/tasks/running-tasks.html
  - title: systemd timers
    url: https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html
---

## Scheduling
<!-- {: .-snippets} -->

### Cron entry
<!-- {: .-snippet} -->

```bash
0 2 * * * cd /path/to/project && mise run update
```
<!-- {: data-highlight="mise run update"} -->

Run tasks through cron with an absolute project path and a `PATH` that includes `mise`; see [running tasks](https://mise.jdx.dev/tasks/running-tasks.html).

### Systemd service
<!-- {: .-snippet} -->

```ini
[Service]
WorkingDirectory=/srv/app
ExecStart=/home/me/.local/bin/mise run update
```
<!-- {: data-highlight="ExecStart"} -->

A systemd timer can trigger this service; use absolute paths because user services have a minimal environment. See [systemd.timer](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html).

### Watch for changes
<!-- {: .-snippet} -->

```bash
mise watch build
```
<!-- {: data-highlight="mise watch"} -->

`mise watch` reruns a task when its `sources` change, not on a clock; see [mise watch](https://mise.jdx.dev/cli/watch.html).
