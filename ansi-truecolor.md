---
title: How to print RGB colors in the terminal
link_title: Print RGB colors
subtitle: Use 24-bit ANSI colors
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "ISO/IEC 8613-6, Bash 5.3.0."
updated: 2026-11-28
tier: t3
links:
  - title: ANSI escape code
    url: https://en.wikipedia.org/wiki/ANSI_escape_code
  - title: ANSI codes cheatsheet
    url: /ansi
---

## Truecolor
<!-- {: .-snippets} -->

### Set RGB foreground
<!-- {: .-snippet} -->

```bash
printf '\033[38;2;255;0;0mred\033[0m\n'
```
<!-- {: data-highlight="38; 2; 255"} -->

#### Escaped output

```text
\033[38;2;255;0;0mred\033[0m$
```

**Prints red from an RGB triple.** `38;2;r;g;b` sets a 24-bit foreground; the output above is shown with `sed -n l`. See [24-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit).

### Set RGB background
<!-- {: .-snippet} -->

```bash
printf '\033[48;2;0;0;255mblue\033[0m\n'
```
<!-- {: data-highlight="48; 255m"} -->

**Sets the background from RGB values.** Use `48;2;r;g;b` and reset with `0` afterwards; see [24-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit).

### Check support
<!-- {: .-snippet} -->

```bash
[[ $COLORTERM == truecolor ]] && echo supported
```
<!-- {: data-highlight="COLORTERM"} -->

**Checks a common truecolor hint.** Many emulators set `$COLORTERM`; its absence does not prove truecolor is unavailable; see [environment variables](https://en.wikipedia.org/wiki/ANSI_escape_code#Unix_environment_variables_relating_to_color_support).
