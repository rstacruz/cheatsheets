title: Command line stuff
---

## List (ls)

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

## Find (find)

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

## Tail

Usage:

    tail [-F | -f | -r] [-bN | -cN | -nN] [file ...]

Modes:

    -f     # follow
    -F     # follow by filename (accounts for log rotation)
    -r     # Reverse order

Options:

    -bN    # N*512 bytes
    -cN    # N bytes
    -nN    # N lines

    +N     # Start from line N

## Sudo

Listing:

    -l           # List allowed commands

Options:

    -A           # Use $SUDO_ASKPASS
    -b           # Run in background
    -E           # Preserve environment
    -H           # use target's $HOME
    -n           # Don't prompt for password
    -P           # Preserve group vector
    -S           # Read password from stdin

File descriptors:

    -C fd        # Close all open file descriptors

Prompt:

    -p prompt    # Custom prompt (-p "%p password:")

Interactive:

    -i [cmd]     # Interactive shell without variables
    -s [cmd]     # Interactive shell

    -u user      # run as this user
    -g group     # run as this group

Timestamp:

    -v           # revalidate timestamp for 5 mins
    -k           # invalidate timestamp
    -K           # just like -k

## wc (Word count)

    -c   # Bytes
    -l   # Lines
    -m   # Characters (incl multi-byte)
    -w   # Words

## Search-and-replace in all files

    perl -p -i -e 's/hello/HELLO/g' **/*

## Grep

    -A num      # Print `num` lines of training context

    -G          # --basic-regexp (default)
    -E          # --extended-regexp
    -P          # --perl-regexp

    -f file     # --file (Get patterns for file)
    -F          # --fixed-strings

    -h          # --no-filename
    -H          # --with-filename

    -l          # --files-with-matches (just print filenames)
    -L          # --files-without-match

    -r, -R      # --recursive
    -v          # --invert-match
    -i          # --ignore-case

Synonyms:

    egrep  =>  grep -E
    fgrep  =>  grep -F
