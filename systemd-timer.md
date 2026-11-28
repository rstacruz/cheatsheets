---
title: How to run a job with a systemd timer
link_title: Run jobs with a timer
subtitle: Schedule jobs with a timer
logo: { set: icon-park-outline, name: calendar }
category: Linux
layout: snippet
tier: t3
last_verified_with: "systemd 262."
updated: 2026-11-28
links:
  - title: systemd.timer(5)
    url: https://man7.org/linux/man-pages/man5/systemd.timer.5.html
  - title: systemd.time(7)
    url: https://man7.org/linux/man-pages/man7/systemd.time.7.html
  - title: systemd cheatsheet
    url: /systemd
---

## Schedule a job
<!-- {: .-snippets} -->

### Write the units
<!-- {: .-snippet} -->

#### /etc/systemd/system/backup.service

```ini
[Unit]
Description=Backup job

[Service]
Type=oneshot
ExecStart=/usr/bin/backup
```

#### /etc/systemd/system/backup.timer

```ini
[Unit]
Description=Run backup daily

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true
Unit=backup.service

[Install]
WantedBy=timers.target
```
<!-- {: data-highlight="OnCalendar"} -->

**Pairs a oneshot and timer.** The oneshot service holds the command and the timer its schedule; `Persistent` catches up a missed run after boot. See [systemd.timer(5)](https://man7.org/linux/man-pages/man5/systemd.timer.5.html).

### Enable the timer
<!-- {: .-snippet} -->

```bash
sudo systemctl enable --now backup.timer
```
<!-- {: data-highlight="enable --now backup.timer"} -->

**Enables the timer at boot.** It starts now too; enable the timer, not the service it activates. See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Check the next run
<!-- {: .-snippet} -->

```bash
systemctl list-timers backup.timer
```
<!-- {: data-highlight="list-timers"} -->

**Shows the next elapse.** `list-timers` also reports the last elapse and the unit that will run. See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Verify the schedule
<!-- {: .-snippet} -->

```bash
systemd-analyze calendar 'Mon..Fri 09:00:00'
```
<!-- {: data-highlight="systemd-analyze calendar"} -->

**Prints the next elapse.** The output also shows the normalized `OnCalendar` expression. See [systemd.time(7)](https://man7.org/linux/man-pages/man7/systemd.time.7.html).
