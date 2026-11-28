---
title: Ansi codes
subtitle: ANSI terminal color codes
logo: { set: icon-park-outline, name: color-card }
category: Shell
intro: |
  Quick reference to ANSI color codes.
last_verified_with: "ECMA-48 5th edition, ANSI X3.64."
created_at: 2013-10-14
updated: 2026-11-25
tier: t3
links:
  - title: ANSI escape code
    url: https://en.wikipedia.org/wiki/ANSI_escape_code
---

### Format

```
\033[#m
```

See: [ECMA-48](https://ecma-international.org/publications-and-standards/standards/ecma-48/)

### ANSI codes

```
0      clear
1      bold
4      underline
5      blink

30-37  fg color
40-47  bg color

1K     clear line (to beginning of line)
2K     clear line (entire line)
2J     clear screen
0;0H   move cursor to 0;0

1A     move up 1 line
```

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Colors

```
0      black
1      red
2      green
3      yellow
4      blue
5      magenta
6      cyan
7      white
```

See: [ECMA-48](https://ecma-international.org/publications-and-standards/standards/ecma-48/)

### Bash utilities

```sh
hide_cursor() { printf "\e[?25l"; }
show_cursor() { printf "\e[?25h"; }
```

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)
