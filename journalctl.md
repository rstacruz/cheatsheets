---
title: How to read logs with journalctl
link_title: Read logs with journalctl
subtitle: Query the systemd journal
logo: { set: icon-park-outline, name: book-open }
category: Linux
layout: snippet
tier: t3
last_verified_with: "systemd 262."
updated: 2026-11-28
links:
  - title: journalctl(1)
    url: https://man7.org/linux/man-pages/man1/journalctl.1.html
  - title: systemd cheatsheet
    url: /systemd
---

## Read the journal
<!-- {: .-snippets} -->

### Follow a unit
<!-- {: .-snippet} -->

```bash
journalctl -u ssh.service -f
```
<!-- {: data-highlight="-f"} -->

**Streams new lines for one service until `Ctrl+C`.** See [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).

### Last N lines
<!-- {: .-snippet} -->

```bash
journalctl -u ssh.service -n 100 --no-pager
```
<!-- {: data-highlight="-n 100"} -->

**Prints the latest 100 entries without a pager.** See [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).

### Since a time
<!-- {: .-snippet} -->

```bash
journalctl --since "2026-11-28 09:00" \
  --until "2026-11-28 12:00"
```
<!-- {: data-highlight="--since"} -->

**Limits entries to a time window.** Relative values such as `1 hour ago` also work; see [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).

### Errors this boot
<!-- {: .-snippet} -->

```bash
journalctl -p err -b --no-pager
```
<!-- {: data-highlight="-p err"} -->

**Shows only error-priority entries from the current boot.** See [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).

### Previous boot
<!-- {: .-snippet} -->

```bash
journalctl -b -1 --no-pager
```
<!-- {: data-highlight="-b -1"} -->

**Reads the last boot's journal.** See [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).

### Disk usage
<!-- {: .-snippet} -->

```bash
journalctl --disk-usage
```
<!-- {: data-highlight="--disk-usage"} -->

**Reports the space used by journals.** See [journalctl(1)](https://man7.org/linux/man-pages/man1/journalctl.1.html).
