---
title: How to schedule Paseo tasks
link_title: Paseo scheduled tasks
subtitle: Run agents on a schedule
logo: { set: icon-park-outline, name: schedule }
category: Agents
layout: snippet
tier: t1
last_verified_with: "Paseo 0.17.4."
updated: 2026-11-23
fragments:
  - "paseo schedule"
  - "schedule create"
  - "--every 30m"
  - "--cwd ~/dev/app"
  - "--cron"
  - "0 9 * * 1-5"
  - "--run-now"
  - "schedule logs"
  - "<id>"
  - "fix the failing"
  - "triage new"
  - "schedule ls"
  - "schedule pause"
  - "resume <id>"
intro: |
  Paseo schedules run coding agents on a cron or interval cadence. This sheet covers creating, inspecting, pausing, and resuming scheduled tasks from the CLI.
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

**Creates a scheduled task.** `--every` compiles to cron, not a rolling interval; schedules default to UTC. See [schedules](https://paseo.sh/docs/schedules-cli#create).

### Cron cadence
<!-- {: .-snippet} -->

```bash
paseo schedule create --cron "0 9 * * 1-5" \
  --cwd ~/dev/app "triage new issues"
```
<!-- {: data-highlight="--cron"} -->

**Creates a cron-scheduled task.** `--cron` takes a standard five-field expression; `--run-now` also fires once at creation. See [cadence](https://paseo.sh/docs/schedules-cli#cadence).

### Inspect runs
<!-- {: .-snippet} -->

```bash
paseo schedule logs <id>
```
<!-- {: data-highlight="logs"} -->

**Inspects a schedule's runs.** Shows recent runs for one schedule; use `paseo schedule ls` to find its id. See [manage schedules](https://paseo.sh/docs/schedules-cli#manage).

### Pause a schedule
<!-- {: .-snippet} -->

```bash
paseo schedule pause <id>
```
<!-- {: data-highlight="pause"} -->

**Pauses future runs.** Keeps the schedule; `paseo schedule resume <id>` turns it back on. See [manage schedules](https://paseo.sh/docs/schedules-cli#manage).
