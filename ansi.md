---
title: Ansi codes
subtitle: ANSI terminal color codes
logo: { set: icon-park-outline, name: color-card }
category: Shell
intro: |
  Quick reference to ANSI escape sequences for colors, text styles, cursor movement, and screen clearing.
last_verified_with: "ECMA-48 5th edition, ANSI X3.64, ISO/IEC 8613-6."
updated: 2026-11-28
tier: t2
fragments:
  - '\033[31m'
  - '\033[1;4;31m'
  - '\033[42m'
  - '\033[39;49m'
  - '\033[7m'
  - '\033[38;5;196m'
  - '48;5;n'
  - '38;2;r;g;b'
  - '\033[3;5H'
  - '\033[H'
  - '\033[2K'
  - '\033[2J'
  - '\033[?25l'
  - '\033[?1049h'
links:
  - title: ANSI escape code
    url: https://en.wikipedia.org/wiki/ANSI_escape_code
  - title: ECMA-48 standard
    url: https://ecma-international.org/publications-and-standards/standards/ecma-48/
  - title: console_codes(4)
    url: https://man7.org/linux/man-pages/man4/console_codes.4.html
---

## Color text
<!-- {: .-three-column} -->

### Print a color

```bash
printf '\033[31mred\033[0m\n'
```
<!-- {: data-highlight="\033[31m"} -->

See: [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters)

### Combine styles

```bash
printf '\033[1;4;31mbold red\033[0m\n'
```
<!-- {: data-highlight="1;4;31m"} -->

See: [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters)

### Background color

```bash
printf '\033[42mgreen bg\033[0m\n'
```
<!-- {: data-highlight="\033[42m"} -->

See: [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters)

### Default colors

```bash
printf '\033[39;49mdefault colors\n'
```
<!-- {: data-highlight="39;49m"} -->

See: [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters)

## Color codes

### Standard colors

| Code | Color |
| --- | --- |
| `30` | Black foreground |
| `40` | Black background |
| `31` | Red foreground |
| `41` | Red background |
| --- | --- |
| `32` | Green foreground |
| `42` | Green background |
| `33` | Yellow foreground |
| `43` | Yellow background |
| --- | --- |
| `34` | Blue foreground |
| `44` | Blue background |
| `35` | Magenta foreground |
| `45` | Magenta background |
| --- | --- |
| `36` | Cyan foreground |
| `46` | Cyan background |
| `37` | White foreground |
| `47` | White background |
<!-- {: .-headers} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Bright colors

| Code | Color |
| --- | --- |
| `90` | Bright black foreground |
| `100` | Bright black background |
| `91` | Bright red foreground |
| `101` | Bright red background |
| --- | --- |
| `92` | Bright green foreground |
| `102` | Bright green background |
| `93` | Bright yellow foreground |
| `103` | Bright yellow background |
| --- | --- |
| `94` | Bright blue foreground |
| `104` | Bright blue background |
| `95` | Bright magenta foreground |
| `105` | Bright magenta background |
| --- | --- |
| `96` | Bright cyan foreground |
| `106` | Bright cyan background |
| `97` | Bright white foreground |
| `107` | Bright white background |
<!-- {: .-headers} -->

Bright background support varies by terminal; see [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html).

### Palette ranges

| Codes | Palette |
| --- | --- |
| `0–7` | Standard colors |
| `8–15` | Bright colors |
| `16–231` | 6×6×6 RGB cube |
| `232–255` | Grayscale ramp |
<!-- {: .-headers} -->

See: [8-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit)

### 256 colors

```bash
printf '\033[38;5;196mred\033[0m\n'
```
<!-- {: data-highlight="196m"} -->

#### Syntax

| Sequence | Meaning |
| --- | --- |
| `38;5;n` | Foreground color `n` |
| `48;5;n` | Background color `n` |
<!-- {: .-headers} -->

See: [8-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit)

### Truecolor

```bash
printf '\033[38;2;255;0;0mred\033[0m\n'
```
<!-- {: data-highlight="38; 2; 255"} -->

#### Syntax

| Sequence | Meaning |
| --- | --- |
| `38;2;r;g;b` | RGB foreground |
| `48;2;r;g;b` | RGB background |
<!-- {: .-headers} -->

See: [24-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit)

## Text styles

### Set styles

| Code | Effect |
| --- | --- |
| `1` | Bold |
| `2` | Dim |
| `3` | Italic |
| `4` | Underline |
| --- | --- |
| `5` | Blink |
| `7` | Reverse video |
| `8` | Hidden |
| `9` | Strikethrough |
<!-- {: .-headers} -->

See: [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters)

### Clear styles

| Code | Effect |
| --- | --- |
| `0` | Reset all |
| `22` | Normal intensity |
| `23` | Italic off |
| `24` | Underline off |
| --- | --- |
| `25` | Blink off |
| `27` | Reverse off |
| `28` | Reveal |
| `29` | Strikethrough off |
<!-- {: .-headers} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Reverse video

```bash
printf '\033[7mselected\033[0m\n'
```
<!-- {: data-highlight="\033[7m"} -->

See: [SGR parameters](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters)

## Cursor

### Move cursor

```bash
printf '\033[3;5Hhello\n'
```
<!-- {: data-highlight="3;5H"} -->

#### Syntax

| Sequence | Meaning |
| --- | --- |
| `nA` | Up `n` rows |
| `nB` | Down `n` rows |
| `nC` | Forward `n` columns |
| `nD` | Back `n` columns |
| `n;mH` | Move to row `n`, column `m` |
| `H` | Move to 1;1 |
<!-- {: .-headers} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Move relative

```bash
printf '\033[2A\033[3C'
```
<!-- {: data-highlight="2A; 3C"} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Save and restore

```bash
printf '\033[sworking\033[u'
```
<!-- {: data-highlight="\033[s; \033[u"} -->

Some terminals use `ESC 7` and `ESC 8` instead; see [examples](https://en.wikipedia.org/wiki/ANSI_escape_code#Examples).

## Erase and reset

### Erase line

```bash
printf '\033[2K'
```
<!-- {: data-highlight="2K"} -->

#### Syntax

| Sequence | Meaning |
| --- | --- |
| `0K` | Cursor to end of line |
| `1K` | Start of line to cursor |
| `2K` | Whole line |
<!-- {: .-headers} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Erase screen

```bash
printf '\033[H\033[2J'
```
<!-- {: data-highlight="2J"} -->

#### Syntax

| Sequence | Meaning |
| --- | --- |
| `0J` | Cursor to end of screen |
| `1J` | Start of screen to cursor |
| `2J` | Whole screen |
| `3J` | Screen and scrollback |
<!-- {: .-headers} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

## Terminal modes

### Hide cursor

```bash
printf '\033[?25l'
```
<!-- {: data-highlight="?25l"} -->

See: [console_codes(4)](https://man7.org/linux/man-pages/man4/console_codes.4.html)

### Alternate screen

```bash
printf '\033[?1049h'
```
<!-- {: data-highlight="?1049h"} -->

Use `\033[?1049l` to return to the normal screen; see [CSI sequences](https://en.wikipedia.org/wiki/ANSI_escape_code#Control_Sequence_Introducer_commands).
