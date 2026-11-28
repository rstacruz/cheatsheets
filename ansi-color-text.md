---
title: How to print colored text in Bash
link_title: Print colored Bash text
subtitle: Colorize terminal output
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "Bash 5.3.0, ECMA-48 5th edition."
updated: 2026-11-28
tier: t3
links:
  - title: ANSI escape code
    url: https://en.wikipedia.org/wiki/ANSI_escape_code
  - title: Bash printf
    url: https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-printf
---

## Coloring output
<!-- {: .-snippets} -->

### Print a color
<!-- {: .-snippet} -->

```bash
printf '\033[31mred\033[0m\n'
```
<!-- {: data-highlight="\033[31m"} -->

#### Escaped output

```text
\033[31mred\033[0m$
```
<!-- {: data-highlight="\033[31m"} -->

**Prints red text.** `31` selects red and `0` resets the style; the output above is shown with `sed -n l`. See [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code).

### Use echo
<!-- {: .-snippet} -->

```bash
echo -e '\033[31mred\033[0m'
```
<!-- {: data-highlight="-e"} -->

**Interprets escapes with `echo -e`.** Prefer `printf` for predictable output; use `%s` when the text contains `%`; see [echo](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-echo).

### Store color codes
<!-- {: .-snippet} -->

#### Setup

```bash
RED=$'\033[31m'
RESET=$'\033[0m'
```
<!-- {: data-highlight="$'\033[31m'"} -->

#### Output

```bash
printf '%s\n' "${RED}red${RESET}"
```
<!-- {: data-highlight="${RED}"} -->

**Keeps escapes in variables.** ANSI-C quoting turns `\033` into ESC, and `%s` avoids format-string surprises; see [ANSI-C quoting](https://www.gnu.org/software/bash/manual/html_node/ANSI-C-Quoting.html).
