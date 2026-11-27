---
title: How to schedule a GitHub Actions workflow
link_title: Schedule a workflow
subtitle: Cron triggers in UTC
category: Devops
layout: snippet
last_verified_with: "GitHub Actions workflow schema."
updated: 2026-11-27
links:
  - title: schedule event
    url: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
---

## Scheduling runs
<!-- {: .-snippets} -->

### Run on a schedule
<!-- {: .-snippet} -->

```yaml
on:
  schedule:
    - cron: '0 6 * * 1-5'
```
<!-- {: data-highlight="cron: '0 6 * * 1-5'"} -->

**Runs at 06:00 UTC on weekdays.** The shortest interval is 5 minutes, and each run uses the latest commit on the default branch. See [schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

### Read the cron fields
<!-- {: .-snippet} -->

```text
* * * * *
│ │ │ │ └─ day of week (0-6, Sun=0)
│ │ │ └─── month (1-12)
│ │ └───── day of month (1-31)
│ └─────── hour (0-23)
└───────── minute (0-59)
```

**Reads left to right.** Use `,` for lists, `-` for ranges, and `/` for steps. See [cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07).

### Set a timezone
<!-- {: .-snippet} -->

```yaml
on:
  schedule:
    - cron: '30 5 * * 1-5'
      timezone: 'America/New_York'
```
<!-- {: data-highlight="timezone:"} -->

**Shifts the schedule without rewriting the cron.** The timezone is an IANA name; omit it to stay on UTC. See [schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

### Allow manual runs too
<!-- {: .-snippet} -->

```yaml
on:
  schedule:
    - cron: '0 6 * * 1-5'
  workflow_dispatch:
```

**Lets you test the job on demand.** A scheduled run cannot be retried with its original trigger; dispatch one instead. See [workflow_dispatch](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_dispatch).

### Check why a schedule never ran
<!-- {: .-snippet} -->

```bash
gh run list --workflow=nightly.yml
```
<!-- {: data-highlight="gh run list"} -->

**Lists recent runs and their trigger.** A disabled workflow shows none; enable it with `gh workflow enable`. See [gh run list](https://cli.github.com/manual/gh_run_list).
