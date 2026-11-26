---
title: sed
subtitle: Stream text editor
category: CLI
intro: |
  Here's some hints on using sed.
links:
  - title: GNU sed manual
    url: https://www.gnu.org/software/sed/manual/sed.html
tier: t3
last_verified_with: "GNU sed 4.10."
updated: 2026-11-26
---

### Replacements

#### In-place (GNU)

```bash
sed -i -e 's/foo/bar/' example.md
```
<!-- {: data-highlight="-i -e"} -->

GNU sed takes `-i` without an argument.

#### In-place (BSD)

```bash
sed -i '' -e 's/foo/bar/' example.md
```
<!-- {: data-highlight="-i ''"} -->

On macOS, `-i ''` is required.

#### Multiple substitutions

```bash
sed -i 's/match1/replace1/g; s/match2/replace2/g' example.md
```
<!-- {: data-highlight="s/match1/replace1/g"} -->

Change different matches to different values.

#### One value for several matches

```bash
sed -i 's/\(MATCH1\|MATCH2\)/VALUE/g' example.md
```
<!-- {: data-highlight="MATCH1\|MATCH2"} -->

Change several matches to one value.

See: [The s command](https://www.gnu.org/software/sed/manual/sed.html#The-_0022s_0022-Command)


## File regions

<!-- {: .-three-column} -->

### Print until a line is met

```bash
sed '/begin api/q'
```
<!-- {: data-highlight="begin api"} -->

See: [q command](https://www.gnu.org/software/sed/manual/sed.html#Common-Commands)

### Print until a line, excluding it

```bash
sed '/^# begin/,$d'
```
<!-- {: data-highlight=",$d"} -->

See: [Range addresses](https://www.gnu.org/software/sed/manual/sed.html#Range-Addresses)

### Print after a given line

```bash
sed -n '/end api/,$p'
```
<!-- {: data-highlight="$p"} -->

Prints everything after the line is found.

See: [Range addresses](https://www.gnu.org/software/sed/manual/sed.html#Range-Addresses)

### Print except matching lines

```bash
sed -n '/regex/!p'
```
<!-- {: data-highlight="!p"} -->

#### Regex ranges

```bash
sed -n -e '/^START$/,/^END$/p'
```
<!-- {: data-highlight="^START$"} -->

#### Without -n

```bash
sed -e '/^START$/,/^END$/p;d'
```
<!-- {: data-highlight="^END$"} -->

Prints all lines except those matching the regex. The first range prints only the range; the second deletes other lines.

See: [Range addresses](https://www.gnu.org/software/sed/manual/sed.html#Range-Addresses)

### Append after a line number

```bash
sed -e "1a ## HEADING 02:" README.md
```
<!-- {: data-highlight="1a"} -->

Appends a heading after line 1; use `-i` to write the file.

See: [a command](https://www.gnu.org/software/sed/manual/sed.html#Other-Commands)

### Insert before a line number

```bash
sed -e "1i # HEADING 01:" README.md
```
<!-- {: data-highlight="1i"} -->

Inserts a heading before line 1.

See: [i command](https://www.gnu.org/software/sed/manual/sed.html#Other-Commands)

### Deleting text

#### By line number

```bash
sed -e "1,5d" README.md
```
<!-- {: data-highlight="1,5d"} -->

#### Keep only those lines

```bash
sed -e '1,5!d' README.md
```
<!-- {: data-highlight="1,5!d"} -->

#### Case-insensitive matches

```bash
sed -e "/REGEX/Id" README.md
```
<!-- {: data-highlight="/REGEX/I"} -->

#### Keep matches

```bash
sed -e '/REGEX/Ip;d' README.md
```
<!-- {: data-highlight="/REGEX/Ip"} -->

`1,5d` deletes lines 1–5; `1,5!d` keeps them. `/REGEX/Id` deletes matches; `Ip;d` keeps them. Quote expressions with single quotes when they contain `!`.

See: [Common commands](https://www.gnu.org/software/sed/manual/sed.html#Common-Commands)

## Also see

### In-place edits

[sed in place cheatsheet](./sed-in-place)
<!-- {: .-crosslink} -->
