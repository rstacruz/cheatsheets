---
title: sed
category: CLI
layout: 2017/sheet
intro: |
  Here's some hints on using sed.
---

## In place replacements

### In-place replacement (GNU)

```bash
sed -i -e 's/foo/bar/' example.md
```

In GNU sed: use `-i` without arg.

#### In-place replacement (BSD)

```bash
sed -i '' -e 's/foo/bar/' example.md
```

In OSX, `-i ''` is required.

## File regions

{:.-three-column}

### Print until a certain line is met

```bash
sed '/begin api/q'
```

### Print until a certain line is met, but not that line

```bash
sed '/^# begin/,$d'
```

### Print everything after a given line

```bash
sed -n '/end api/,$p'
```

Print after a given line is found.

### Print everything except matching

```bash
sed -n '/regex/!p'
```

Print everything except lines matching regex. Useful for printing files with comments.

### Append a text after a specific line number

```bash
sed -e "1a ## HEADING 02:" README.md
```

this appends "## HEADING 02:" after the first line in the file README.md
and print the result to stdout replace -e with -i to write the file .

### Insert text before a specific line number

```bash
sed -e "1i # HEADING 01:" README.md
```

the same as appending but before the first line.

### Deleting text

#### With line number

```bash
sed -e "1,5d" README.md
```

delete a RANGE (i.e. including lines 1 to 5)

```bash
sed -e '1,5!d' README.md
```

delete everything (i.e. excluding lines 1 to 5)

#### With REGEX matching

```bash
sed -e "/REGEX/Id" README.md
```

delete lines with /REGEX/ matched
/I is for insensitive search

```bash
sed -e '/REGEX/Ip;d' README.md
```

this invert the previous sed command
delete everything (excluding lines with REGEX)
