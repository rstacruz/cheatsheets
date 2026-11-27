---
title: systemd
subtitle: Service and system manager
logo: { set: icon-park-outline, name: control }
category: Linux
tier: t3
last_verified_with: "systemd 262."
updated: 2026-11-28
intro: |
  systemd manages services, timers, and logs on most Linux systems. This reference covers unit files, systemctl, and journalctl.
links:
  - title: systemd documentation
    url: https://systemd.io/
  - title: systemctl(1)
    url: https://man7.org/linux/man-pages/man1/systemctl.1.html
  - title: journalctl(1)
    url: https://man7.org/linux/man-pages/man1/journalctl.1.html
---

## Services

### Status
<!-- {: .-prime} -->

```bash
systemctl status nginx --no-pager
```
<!-- {: data-highlight="systemctl status"} -->

Shows the active state, main PID, and recent log lines.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Start and stop

```bash
# start now
sudo systemctl start nginx
```
<!-- {: data-highlight="systemctl start"} -->

```bash
# stop now
sudo systemctl stop nginx
```
<!-- {: data-highlight="systemctl stop"} -->

```bash
# restart
sudo systemctl restart nginx
```

These change the current state only, not the boot configuration.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Enable at boot

```bash
# enable at boot
sudo systemctl enable nginx
```

```bash
# enable and start in one step
sudo systemctl enable --now nginx
```
<!-- {: data-highlight="systemctl enable --now"} -->

```bash
# disable and stop
sudo systemctl disable --now nginx
```

`enable` creates the boot symlink; `--now` also changes the running state.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Reload configuration

```bash
# reread a unit file after editing it
sudo systemctl daemon-reload
```
<!-- {: data-highlight="systemctl daemon-reload"} -->

```bash
# ask a service to reread its own config
sudo systemctl reload nginx
```

Use `reload` for config changes; use `daemon-reload` after editing unit files.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

## Units

### List loaded units

```bash
systemctl list-units --type=service --state=running
```
<!-- {: data-highlight="--state=running"} -->

Filters the loaded units by type and state; omit the flags to list everything.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Inspect a unit

```bash
# show the unit file
systemctl cat nginx
```
<!-- {: data-highlight="systemctl cat"} -->

```bash
# show a property
systemctl show -p MainPID nginx
```

`cat` includes active drop-ins, so it shows what systemd actually reads.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Unit file states

| State     | Meaning                         |
| --------- | ------------------------------- |
| `enabled` | starts at boot                  |
| `disabled` | has no boot symlink            |
| `static`  | cannot be enabled               |
| `masked`  | cannot be started               |
<!-- {: .-headers} -->

Use `systemctl list-unit-files` to see the state of installed unit files.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Unit paths

| Path                       | Purpose                     |
| -------------------------- | --------------------------- |
| `/etc/systemd/system/`     | local units and overrides   |
| `/usr/lib/systemd/system/` | package units on Debian     |
| `/run/systemd/system/`     | runtime units               |
<!-- {: .-headers} -->

A unit in `/etc` with the same name overrides the package unit.

See: [systemd.unit(5)](https://man7.org/linux/man-pages/man5/systemd.unit.5.html)

## Service files

### Minimal service

#### /etc/systemd/system/hello.service

```ini
[Unit]
Description=Hello service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/sleep infinity
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
<!-- {: data-highlight="ExecStart"} -->

`WantedBy` makes `enable` place the boot symlink for `multi-user.target`.

See: [systemd.service(5)](https://man7.org/linux/man-pages/man5/systemd.service.5.html)

### Common directives

| Directive             | Purpose                       |
| --------------------- | ----------------------------- |
| `Type=simple`         | foreground process            |
| `Type=oneshot`        | exits after one run           |
| `Restart=on-failure`  | restart after a non-zero exit |
| `User=`               | run as this user              |
| `WorkingDirectory=`   | set the working directory     |
| `Environment=`        | set an environment variable   |
<!-- {: .-headers} -->

`Type=oneshot` is the usual choice for jobs driven by a timer.

See: [systemd.service(5)](https://man7.org/linux/man-pages/man5/systemd.service.5.html)

### Overrides

```bash
# edit a drop-in for a package unit
sudo systemctl edit nginx
```
<!-- {: data-highlight="systemctl edit"} -->

```bash
# apply the drop-in
sudo systemctl daemon-reload
```

Drop-ins live under `/etc/systemd/system/nginx.service.d/` and leave the package unit untouched.

See: [systemd.unit(5)](https://man7.org/linux/man-pages/man5/systemd.unit.5.html)

### Verify a unit

```bash
systemd-analyze verify hello.service
```
<!-- {: data-highlight="systemd-analyze verify"} -->

Reports syntax and dependency problems without starting the service.

See: [systemd-analyze(1)](https://man7.org/linux/man-pages/man1/systemd-analyze.1.html)

## Timers

### Timer and service

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

`Persistent` runs a missed job at the next start, similar to anacron.

See: [systemd.timer(5)](https://man7.org/linux/man-pages/man5/systemd.timer.5.html)

### Enable and inspect

```bash
# enable and start the timer
sudo systemctl enable --now backup.timer
```
<!-- {: data-highlight="enable --now backup.timer"} -->

```bash
# show the next and last runs
systemctl list-timers backup.timer
```
<!-- {: data-highlight="list-timers"} -->

Timers are enabled and listed like other units.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Calendar expressions

| Expression           | Runs                  |
| -------------------- | --------------------- |
| `hourly`             | top of every hour     |
| `daily`              | every day at midnight |
| `*-*-* 02:00:00`     | every day at 2am      |
| `Mon..Fri 09:00:00`  | weekdays at 9am       |
<!-- {: .-headers} -->

Times use the system's local timezone unless `OnCalendar` specifies another.

See: [systemd.time(7)](https://man7.org/linux/man-pages/man7/systemd.time.7.html)

### Verify a schedule

```bash
systemd-analyze calendar '*-*-* 02:00:00'
```
<!-- {: data-highlight="systemd-analyze calendar"} -->

Prints the normalized expression and next elapse; nothing is started.

See: [systemd-analyze(1)](https://man7.org/linux/man-pages/man1/systemd-analyze.1.html)

## Logs

### Recent entries

```bash
journalctl -u nginx -n 50 --no-pager
```
<!-- {: data-highlight="journalctl -u"} -->

Shows the last 50 lines for one unit.

See: [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

### Follow live

```bash
journalctl -u nginx -f
```
<!-- {: data-highlight="-f"} -->

Streams new lines until `Ctrl+C`.

See: [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

### Filter by time and priority

```bash
# entries since a time
journalctl --since "2026-11-28 09:00"
```
<!-- {: data-highlight="--since"} -->

```bash
# errors from this boot
journalctl -p err -b
```
<!-- {: data-highlight="-p err"} -->

`--until` and `--since` also accept relative times such as `1 hour ago`.

See: [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

### Current boot

```bash
# this boot
journalctl -b
```
<!-- {: data-highlight="-b"} -->

```bash
# available boots
journalctl --list-boots
```

Use `-b -1` for the previous boot.

See: [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

### Disk usage

```bash
journalctl --disk-usage
```
<!-- {: data-highlight="--disk-usage"} -->

Reports the space used by archived and active journals.

See: [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

## User units

### Unit location

| Path                           | Purpose                |
| ------------------------------ | ---------------------- |
| `~/.config/systemd/user/`      | your user unit files   |
| `/usr/lib/systemd/user/`       | package user units     |
<!-- {: .-headers} -->

User units run without root and are managed by the per-user systemd instance.

See: [systemd.unit(5)](https://man7.org/linux/man-pages/man5/systemd.unit.5.html)

### Manage a user service

```bash
# start now
systemctl --user start hello.service
```

```bash
# enable at login
systemctl --user enable --now hello.service
```
<!-- {: data-highlight="systemctl --user"} -->

Every `--user` command talks to your own manager rather than PID 1.

See: [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html)

### Read user logs

```bash
journalctl --user -u hello.service
```
<!-- {: data-highlight="journalctl --user"} -->

Reads the journal for the invoking user's manager.

See: [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html)

### Keep user services running

```bash
loginctl enable-linger alice
```
<!-- {: data-highlight="enable-linger"} -->

Linger keeps the user manager alive after the last session logs out.

See: [loginctl(1)](https://man7.org/linux/man-pages/man1/loginctl.1.html)

## Also see

[Linux cheatsheet](./linux)
<!-- {: .-crosslink} -->
