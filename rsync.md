---
title: Rsync
category: CLI
---

    rsync -avz ./src /dest

### OSX

    --exclude '.Trashes'
    --exclude '.Spotlight-V100'
    --exclude '.fseventsd'

### Options

Transfer:

    -z, --compress
    -n, --dry-run

Display:

    -q, --quiet
    -v, --verbose
    -h, --human-readable
        --progress

Skipping:

    -u, --update     # skip files newer on dest
    -c, --checksum   # skip based on checksum, not mod-time & size

Backups:

    -b, --backup           # backup with suffix
        --suffix=SUFFIX    # default ~ without --backup-dir

        --backup-dir=DIR

### Include

    --exclude=PATTERN
    --include=PATTERN

    --exclude-from=FILE
    --include-from=FILE
    --files-from=FILE    # read list of filenames from FILe

### Archive

    -a, --archive    # archive (-rlptgoD)

    -r, --recursive
    -l, --links      # copy symlinks as links
    -p, --perms      # preserve permissions
    -t, --times      # preserve times
    -g, --group      # preserve group
    -o, --owner      # preserve owner
    -D               # --devices --specials

    --delete         # Delete extra files

