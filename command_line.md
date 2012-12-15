title: Command line stuff
---

### List (ls)

Usage:

    ls [options] [paths]

Format:

    -1   One entry per line
    -l   Long view
    -o   Long view (without groups)
    -C   Multicolumn (sorted horizontally)
    -x   Multicolumn (sorted vertically)

    -F   Add / after directories
    -G   Color

Options:

    -R   Recurse
    -a   Include hidden (dotfiles)
    -A   Include hidden (but not . and ..)

Sorting:

    -r   reverse order
    -S   sort by size
    -t   sort by time modified
    -u   sort by time accessed
    -U   sort by time created
    -c   sort by time status was changed

    -h   Human-readable size (3k)

### Find (find)

Usage:

    find <path> <conditions> <actions>

Conditions:

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

Condition flow:

    \! -name "*.c"
    \( x -or y \)

Actions:

    -exec rm {} \;
    -print
    -delete

Examples:

    find . -name '*.jpg'
    find . -name '*.jpg' -exec rm {} \;

    find . -newerBt "24 hours ago"

### Search-and-replace in all files

    perl -p -i -e 's/hello/HELLO/g' **/*

