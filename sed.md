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
sed -n '/regex/d;'
```

Print everything except lines matching regex. Useful for printing files with comments.
