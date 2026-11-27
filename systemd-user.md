---
title: How to manage systemd user services
link_title: Manage systemd user services
subtitle: Run services per user
logo: { set: icon-park-outline, name: key }
category: Linux
layout: snippet
tier: t3
last_verified_with: "systemd 262."
updated: 2026-11-28
links:
  - title: systemd.unit(5)
    url: https://man7.org/linux/man-pages/man5/systemd.unit.5.html
  - title: loginctl(1)
    url: https://man7.org/linux/man-pages/man1/loginctl.1.html
---

## Manage user services
<!-- {: .-snippets} -->

### Write a user unit
<!-- {: .-snippet} -->

#### ~/.config/systemd/user/hello.service

```ini
[Unit]
Description=Hello user service

[Service]
Type=simple
ExecStart=/usr/bin/sleep infinity
```
<!-- {: data-highlight="ExecStart"} -->

**Defines a service for your own user manager.** No `[Install]` section is needed for a service started explicitly; see [systemd.unit(5)](https://man7.org/linux/man-pages/man5/systemd.unit.5.html).

### Start and enable
<!-- {: .-snippet} -->

```bash
systemctl --user enable --now hello.service
```
<!-- {: data-highlight="systemctl --user"} -->

**Starts the service and enables it at login.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Check state
<!-- {: .-snippet} -->

```bash
systemctl --user status hello.service --no-pager
```
<!-- {: data-highlight="--user status"} -->

**Shows the state of your user service.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Read logs
<!-- {: .-snippet} -->

```bash
journalctl --user -u hello.service -n 20
```
<!-- {: data-highlight="journalctl --user"} -->

**Reads the last 20 journal lines for that service.** See [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).

### Keep running after logout
<!-- {: .-snippet} -->

```bash
loginctl enable-linger alice
```
<!-- {: data-highlight="enable-linger"} -->

**Keeps the user manager alive without an active session.** See [loginctl(1)](https://man7.org/linux/man-pages/man1/loginctl.1.html).
