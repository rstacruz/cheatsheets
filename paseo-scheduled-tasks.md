---
title: Paseo scheduled tasks
h1_title: How to schedule Paseo tasks
subtitle: Run agents on a schedule
category: Task automation
layout: snippet
last_verified_with: "Paseo 0.17.0."
updated: 2026-11-23
links:
  - title: Paseo schedules CLI
    url: https://paseo.sh/docs/schedules-cli
---

## Scheduling
<!-- {: .-snippets} -->

### Every interval
<!-- {: .-snippet} -->

```bash
paseo schedule create --every 30m \
  --cwd ~/dev/app "fix the failing tests"
```
<!-- {: data-highlight="--every 30m"} -->

`--every` compiles to cron, not a rolling interval; schedules default to UTC. See [schedules](https://paseo.sh/docs/schedules-cli#create).

### Cron cadence
<!-- {: .-snippet} -->

```bash
paseo schedule create --cron "0 9 * * 1-5" \
  --cwd ~/dev/app "triage new issues"
```
<!-- {: data-highlight="--cron"} -->

`--cron` takes a standard five-field expression; `--run-now` also fires once at creation. See [cadence](https://paseo.sh/docs/schedules-cli#cadence).

### Inspect runs
<!-- {: .-snippet} -->

```bash
paseo schedule logs <id>
```
<!-- {: data-highlight="logs"} -->

Shows recent runs for one schedule; use `paseo schedule ls` to find its id. See [manage schedules](https://paseo.sh/docs/schedules-cli#manage).

### Pause a schedule
<!-- {: .-snippet} -->

```bash
paseo schedule pause <id>
```
<!-- {: data-highlight="pause"} -->

Stops future runs without deleting the schedule; `paseo schedule resume <id>` turns it back on. See [manage schedules](https://paseo.sh/docs/schedules-cli#manage).
