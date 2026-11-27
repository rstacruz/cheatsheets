---
title: How to create a systemd service
link_title: Create a systemd service
subtitle: Run a program at boot
logo: { set: icon-park-outline, name: file-code }
category: Linux
layout: snippet
tier: t3
last_verified_with: "systemd 262."
updated: 2026-11-28
links:
  - title: systemd.service(5)
    url: https://man7.org/linux/man-pages/man5/systemd.service.5.html
  - title: systemctl(1)
    url: https://man7.org/linux/man-pages/man1/systemctl.1.html
  - title: systemd cheatsheet
    url: /systemd
---

## Create a service
<!-- {: .-snippets} -->

### Write the unit
<!-- {: .-snippet} -->

#### /etc/systemd/system/hello.service

```ini
[Unit]
Description=Hello service

[Service]
Type=simple
ExecStart=/usr/bin/sleep infinity
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
<!-- {: data-highlight="ExecStart"} -->

**Defines a long-running service.** `ExecStart` is the process systemd supervises; see [systemd.service(5)](https://man7.org/linux/man-pages/man5/systemd.service.5.html).

### Enable and start
<!-- {: .-snippet} -->

```bash
sudo systemctl enable --now hello.service
```
<!-- {: data-highlight="enable --now"} -->

**Enables the service at boot and starts it now.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Reload after edits
<!-- {: .-snippet} -->

```bash
# reread the unit file
sudo systemctl daemon-reload
```
<!-- {: data-highlight="daemon-reload"} -->

```bash
# apply the change
sudo systemctl restart hello.service
```

**Applies a changed unit file.** Skipping `daemon-reload` leaves systemd using the old definition; see [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Check state and logs
<!-- {: .-snippet} -->

#### Status

```bash
systemctl status hello.service --no-pager
```
<!-- {: data-highlight="systemctl status"} -->

#### Logs

```bash
journalctl -u hello.service -n 20 --no-pager
```
<!-- {: data-highlight="journalctl"} -->

**Shows whether the service is running and why it failed.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Override a package unit
<!-- {: .-snippet} -->

```bash
sudo systemctl edit nginx.service
```
<!-- {: data-highlight="systemctl edit"} -->

**Creates a drop-in without touching the package unit.** The file lands in `/etc/systemd/system/nginx.service.d/`; see [systemd.unit(5)](https://man7.org/linux/man-pages/man5/systemd.unit.5.html).
