---
title: How to list services with systemctl
link_title: List services with systemctl
subtitle: Inspect service states
logo: { set: icon-park-outline, name: list }
category: Linux
layout: snippet
tier: t3
last_verified_with: "systemd 262."
updated: 2026-11-28
links:
  - title: systemctl(1)
    url: https://man7.org/linux/man-pages/man1/systemctl.1.html
  - title: systemd cheatsheet
    url: /systemd
---

## List services
<!-- {: .-snippets} -->

### Running services
<!-- {: .-snippet} -->

```bash
systemctl list-units --type=service \
  --state=running
```
<!-- {: data-highlight="--state=running"} -->

**Lists services that are active now.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### All service unit files
<!-- {: .-snippet} -->

```bash
systemctl list-unit-files --type=service
```
<!-- {: data-highlight="--type=service"} -->

**Lists installed services with their boot state.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### Failed services
<!-- {: .-snippet} -->

```bash
systemctl list-units --type=service \
  --state=failed
```
<!-- {: data-highlight="--state=failed"} -->

**Shows services that exited badly.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### One service
<!-- {: .-snippet} -->

#### State

```bash
systemctl is-active atd.service
```
<!-- {: data-highlight="is-active"} -->

#### Details

```bash
systemctl status atd.service --no-pager
```

**Checks a single service's state and details.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).

### User services
<!-- {: .-snippet} -->

```bash
systemctl --user list-units \
  --type=service
```
<!-- {: data-highlight="--user"} -->

**Lists your own user services.** See [systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html).
