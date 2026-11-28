---
title: How to clear the terminal screen
link_title: Clear terminal screen
subtitle: Erase terminal output
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "ECMA-48 5th edition, ncurses 6.6."
created_at: 2026-11-28
updated: 2026-11-28
tier: t3
links:
  - title: console_codes(4)
    url: https://man7.org/linux/man-pages/man4/console_codes.4.html
  - title: ANSI codes cheatsheet
    url: /ansi
---

## Clearing the screen
<!-- {: .-snippets} -->

### Clear and home
<!-- {: .-snippet} -->

```bash
printf '\033[2J\033[H'
```
<!-- {: data-highlight="2J; H"} -->

#### Escaped output

```text
\033[2J\033[H$
```
<!-- {: data-highlight="2J; H"} -->

**Clears and homes the cursor.** `2J` clears the display and `H` puts the cursor at row 1, column 1; the output above is shown with `sed -n l`. See [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Clear a line
<!-- {: .-snippet} -->

```bash
printf '\033[2K'
```
<!-- {: data-highlight="2K"} -->

**Erases the entire current line.** Use `0K` to clear from the cursor right and `1K` to its left; see [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Clear to end of screen
<!-- {: .-snippet} -->

```bash
printf '\033[0J'
```
<!-- {: data-highlight="0J"} -->

**Clears to end of screen.** `1J` clears from the start of the screen to the cursor; see [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Clear with tput
<!-- {: .-snippet} -->

```bash
TERM=xterm-256color tput clear
```
<!-- {: data-highlight="tput clear"} -->

#### Escaped output

```text
\033[H\033[2J\033[3J$
```
<!-- {: data-highlight="3J"} -->

**Lets terminfo clear the screen.** `tput clear` also clears scrollback on xterm; see [tput(1)](https://man7.org/linux/man-pages/man1/tput.1.html).
