---
title: How to colorize terminal output with tput
link_title: Colorize output with tput
subtitle: Use terminfo colors in scripts
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "ncurses 6.6."
updated: 2026-11-28
tier: t3
links:
  - title: tput(1)
    url: https://man7.org/linux/man-pages/man1/tput.1.html
  - title: ANSI codes cheatsheet
    url: /ansi
---

## Terminal colors with tput
<!-- {: .-snippets} -->

### Count colors
<!-- {: .-snippet} -->

```bash
TERM=xterm-256color tput colors
```
<!-- {: data-highlight="tput colors"} -->

#### Output

```text
256
```

**Reports the palette size for `$TERM`.** Use this to decide between 8, 256, and RGB colors; see [tput(1)](https://man7.org/linux/man-pages/man1/tput.1.html).

### Set foreground
<!-- {: .-snippet} -->

```bash
TERM=xterm-256color tput setaf 1
```
<!-- {: data-highlight="setaf 1"} -->

#### Escaped output

```text
\033[31m$
```

**Sets the foreground color by terminfo index.** `setaf 1` emits red on xterm, so scripts avoid hard-coded escapes; see [tput(1)](https://man7.org/linux/man-pages/man1/tput.1.html).

### Set background
<!-- {: .-snippet} -->

```bash
TERM=xterm-256color tput setab 2
```
<!-- {: data-highlight="setab 2"} -->

#### Escaped output

```text
\033[42m$
```

**Sets the background color by terminfo index.** `setab 2` emits a green background; see [tput(1)](https://man7.org/linux/man-pages/man1/tput.1.html).

### Reset attributes
<!-- {: .-snippet} -->

```bash
TERM=xterm-256color tput sgr0
```
<!-- {: data-highlight="sgr0"} -->

#### Escaped output

```text
\033(B\033[m$
```

**Restores default colors and styles.** Capture it once at startup for cleanup; re-query if `$TERM` changes; see [tput(1)](https://man7.org/linux/man-pages/man1/tput.1.html).
