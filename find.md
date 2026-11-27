---
title: Find
subtitle: File search utility
logo: { set: icon-park-outline, name: file-search }
category: CLI
last_verified_with: "GNU findutils 4.11."
updated: 2026-10-31
tier: t3
---

### Usage

<!-- {: .-prime} -->

```bash
find <path> <conditions> <actions>
```

See: [Synopsis](https://man7.org/linux/man-pages/man1/find.1.html#SYNOPSIS)

### Conditions

#### Names

```bash
-name "*.c"
-iname "*.c"       # Case-insensitive
```

#### Ownership

```bash
-user jonathan
-nouser
```

#### File types

```bash
-type f            # File
-type d            # Directory
-type l            # Symlink
```

#### Depth and regex

```bash
-depth 2           # At least 3 levels deep
-regex PATTERN
```

#### Size

```bash
-size 8            # Exactly 8 512-bit blocks 
-size -128c        # Smaller than 128 bytes
-size 1440k        # Exactly 1440KiB
-size +10M         # Larger than 10MiB
-size +2G          # Larger than 2GiB
```

#### Modification time

```bash
-newer   file.txt
-newerm  file.txt        # modified newer than file.txt
-newerX  file.txt        # [c]hange, [m]odified, [B]create
-newerXt "1 hour ago"    # [t]imestamp
```

See: [Expression primaries](https://man7.org/linux/man-pages/man1/find.1.html#EXPRESSION)

### Access time conditions

```bash
-atime 0           # Last accessed between now and 24 hours ago
-atime +0          # Accessed more than 24 hours ago
-atime 1           # Accessed between 24 and 48 hours ago
-atime +1          # Accessed more than 48 hours ago
-atime -1          # Accessed less than 24 hours ago (same a 0)
-ctime -6h30m      # Status changed in the last 6h30m
-mtime +1w         # Last modified more than 1 week ago
```

These conditions only work in MacOS and BSD-like systems (no GNU/Linux support).

See: [find(1) on FreeBSD](https://man.freebsd.org/cgi/man.cgi?query=find&sektion=1)

### Condition flow

```bash
\! -name "*.c" # NOT named "*.c"
\( x -or y \)
```

See: [Combining primaries](https://man7.org/linux/man-pages/man1/find.1.html#EXPRESSION)

### Actions

```bash
-exec rm {} \;
-print
-delete
```

See: [Actions](https://man7.org/linux/man-pages/man1/find.1.html#EXPRESSION)

### Examples

#### Names and actions

```bash
find . -name '*.jpg'
find . -name '*.jpg' -exec rm {} \;
```

#### Creation time

```bash
find . -newerBt "24 hours ago"
```

#### Modification time and ranges

```bash
find . -type f -mtime +29 # find files modified more than 30 days ago
find . -type f -newermt 2016-08-07 \! \
  -newermt 2016-08-08 # find in date range
```

See: [Examples](https://man7.org/linux/man-pages/man1/find.1.html#EXAMPLES)

## Also see

### fd vs find

[fd vs find cheatsheet](./fd-vs-find)
<!-- {: .-crosslink} -->
