---
title: How to use 256 terminal colors
link_title: Use 256 colors
subtitle: Pick colors from the palette
logo: { set: icon-park-outline, name: color-card }
category: Shell
layout: snippet
last_verified_with: "ECMA-48 5th edition, ncurses 6.6."
updated: 2026-11-28
tier: t3
links:
  - title: ANSI escape code
    url: https://en.wikipedia.org/wiki/ANSI_escape_code
  - title: ANSI codes cheatsheet
    url: /ansi
---

## 256-color palette
<!-- {: .-snippets} -->

### Set foreground
<!-- {: .-snippet} -->

```bash
printf '\033[38;5;196mred\033[0m\n'
```
<!-- {: data-highlight="196m"} -->

#### Escaped output

```text
\033[38;5;196mred\033[0m$
```

**Selects palette index 196 as the foreground.** `38;5;n` is the 256-color foreground form; the output above is shown with `sed -n l`. See [8-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit).

### Set background
<!-- {: .-snippet} -->

```bash
printf '\033[48;5;21mblue\033[0m\n'
```
<!-- {: data-highlight="21m"} -->

**Selects palette index 21 as the background.** Use `48;5;n` for backgrounds and `0` to reset afterwards; see [8-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit).

### Palette ranges
<!-- {: .-snippet} -->

```text
0-15   system colors
16-231 RGB cube
232-255 grayscale
```
<!-- {: data-highlight="16-231"} -->

**Groups the 256 indices by purpose.** The cube varies between terminals, so check the result in your emulator; see [8-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit).
