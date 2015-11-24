---
title: Find
category: CLI
---

### Usage

    find <path> <conditions> <actions>

### Conditions

    -name "*.c"

    -user jonathan
    -nouser

    -type f            # File
    -type d            # Directory
    -type l            # Symlink

    -depth 2           # At least 3 levels deep
    -regex PATTERN

    -newer   file.txt
    -newerm  file.txt        # modified newer than file.txt
    -newerX  file.txt        # [c]hange, [m]odified, [B]create
    -newerXt "1 hour ago"    # [t]imestamp

### Condition flow

    \! -name "*.c"
    \( x -or y \)

### Actions

    -exec rm {} \;
    -print
    -delete

### Examples

    find . -name '*.jpg'
    find . -name '*.jpg' -exec rm {} \;

    find . -newerBt "24 hours ago"

