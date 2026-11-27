---
title: How to hide the terminal cursor
link_title: Hide terminal cursor
subtitle: Control cursor visibility in scripts
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "ECMA-48 5th edition, Bash 5.3.0."
updated: 2026-11-28
tier: t3
links:
  - title: console_codes(4)
    url: https://man7.org/linux/man-pages/man4/console_codes.4.html
  - title: ANSI codes cheatsheet
    url: /ansi
---

## Cursor visibility
<!-- {: .-snippets} -->

### Hide the cursor
<!-- {: .-snippet} -->

```bash
printf '\033[?25l'
```
<!-- {: data-highlight="?25l"} -->

#### Escaped output

```text
\033[?25l$
```

**Turns off the text cursor.** `?25l` is a private DEC mode; the output above is shown with `sed -n l`. See [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Show the cursor
<!-- {: .-snippet} -->

```bash
printf '\033[?25h'
```
<!-- {: data-highlight="?25h"} -->

**Turns the text cursor back on.** Always pair the hide sequence with this one so an interrupted script does not leave the terminal invisible; see [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Restore on exit
<!-- {: .-snippet} -->

```bash
trap 'printf "\033[?25h"' EXIT
printf '\033[?25l'
```
<!-- {: data-highlight="trap"} -->

**Restores the cursor when the script ends.** The `EXIT` trap also runs on interruption, but not on `SIGKILL`; see [trap](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-trap).
