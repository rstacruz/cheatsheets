---
title: Find
category: CLI
layout: 2017/sheet
---

### Usage
{: .-prime}

```bash
find <path> <conditions> <actions>
```

### Conditions

```bash
-name "*.c"
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
-newer   file.txt
-newerm  file.txt        # modified newer than file.txt
-newerX  file.txt        # [c]hange, [m]odified, [B]create
-newerXt "1 hour ago"    # [t]imestamp
```

### Condition flow

```bash
\! -name "*.c"
\( x -or y \)
```

### Actions

```bash
-exec rm {} \;
-print
-delete
```

### Examples

```bash
find . -name '*.jpg'
find . -name '*.jpg' -exec rm {} \;
```

```bash
find . -newerBt "24 hours ago"
```
