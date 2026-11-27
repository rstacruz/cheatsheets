---
title: How to reset terminal colors
link_title: Reset terminal colors
subtitle: Restore default text styles
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "ECMA-48 5th edition, Bash 5.3.0."
updated: 2026-11-28
tier: t3
links:
  - title: ANSI escape code
    url: https://en.wikipedia.org/wiki/ANSI_escape_code
  - title: console_codes(4)
    url: https://man7.org/linux/man-pages/man4/console_codes.4.html
---

## Resetting colors
<!-- {: .-snippets} -->

### Reset all attributes
<!-- {: .-snippet} -->

```bash
printf 'colored\033[0m plain\n'
```
<!-- {: data-highlight="\033[0m"} -->

#### Escaped output

```text
colored\033[0m plain$
```

**Clears every style at once.** `0` restores default color, weight, and background; the output above is shown with `sed -n l`. See [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters).

### Reset foreground
<!-- {: .-snippet} -->

```bash
printf '\033[39mdefault fg\n'
```
<!-- {: data-highlight="39m"} -->

**Restores the default foreground color.** `39` leaves the background and other attributes alone; see [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Reset background
<!-- {: .-snippet} -->

```bash
printf '\033[49mdefault bg\n'
```
<!-- {: data-highlight="49m"} -->

**Restores the default background color.** Pair `39` and `49` to reset both without clearing bold or underline; see [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters).

### Reset with tput
<!-- {: .-snippet} -->

#### Setup

```bash
RED=$(TERM=xterm-256color tput setaf 1)
RESET=$(TERM=xterm-256color tput sgr0)
```
<!-- {: data-highlight="tput setaf 1"} -->

#### Output

```bash
printf '%sred%s plain\n' "$RED" "$RESET"
```

**Stores terminfo escapes in variables.** Pinning `TERM=xterm-256color` makes the output reproducible: these `tput` calls emit xterm's sequences, not necessarily the reader's; see [tput(1)](https://man7.org/linux/man-pages/man1/tput.1.html).
