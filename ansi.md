---
title: Ansi codes
category: CLI
layout: 2017/sheet
intro: |
  Quick reference to ANSI color codes.
---

### Format

```
\033[#m
```

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

### Bash utilities

```sh
hide_cursor() { printf "\e[?25l"; }
show_cursor() { printf "\e[?25h"; }
```
