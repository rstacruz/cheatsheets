---
title: Find
subtitle: File search utility
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

```bash
-name "*.c"
-iname "*.c"       # Case-insensitive
```

```bash
-user jonathan
-nouser
```

```bash
-type f            # File
-type d            # Directory
-type l            # Symlink
```

```bash
-depth 2           # At least 3 levels deep
-regex PATTERN
```

```bash
-size 8            # Exactly 8 512-bit blocks 
-size -128c        # Smaller than 128 bytes
-size 1440k        # Exactly 1440KiB
-size +10M         # Larger than 10MiB
-size +2G          # Larger than 2GiB
```

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
-ctime -6h30m      # File status changed within the last 6 hours and 30 minutes
-mtime +1w         # Last modified more than 1 week ago
```

These conditions only work in MacOS and BSD-like systems (no GNU/Linux support).

See: [Time primaries](https://man7.org/linux/man-pages/man1/find.1.html#EXPRESSION)

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

```bash
find . -name '*.jpg'
find . -name '*.jpg' -exec rm {} \;
```

```bash
find . -newerBt "24 hours ago"
```

```bash
find . -type f -mtime +29 # find files modified more than 30 days ago
find . -type f -newermt 2016-08-07 \! -newermt 2016-08-08 # find in date range
```

See: [Examples](https://man7.org/linux/man-pages/man1/find.1.html#EXAMPLES)

## Also see

### fd vs find

[fd vs find cheatsheet](./fd-vs-find)
<!-- {: .-crosslink} -->
