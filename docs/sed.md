---
title: sed
category: CLI
layout: 2017/sheet
intro: |
  Here's home hints on using sed.
---

### In place replacements

#### In GNU sed: use `-i` without arg.

```bash
sed -i -e 's/foo/bar/' example.md
```

#### In OSX, `-i ''` is required.

```bash
sed -i '' -e 's/foo/bar/' example.md
```

### File regions

#### Print until a certain line is met

```bash
sed '/begin api/q'
```

#### Print until a certain line is met, but not that line

```bash
sed '/^# begin/,$d'
```

#### Print everything after a given line

```bash
sed -n '/end api/,$p'
```
