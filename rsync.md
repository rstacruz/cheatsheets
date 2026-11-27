---
title: Rsync
subtitle: File sync utility
logo: { set: icon-park-outline, name: sync }
intro: |
  A quick reference for rsync commands and flags covering syncing directories, filtering files, compression, backups, and updates.
links:
  - title: rsync(1) manual
    url: https://download.samba.org/pub/rsync/rsync.1
category: Networking
weight: -1
updated: 2026-11-26
last_verified_with: "rsync 3.5.2."
tier: t3
---

### Basic example

<!-- {: .-prime} -->

```bash
# syncing folder src into dest:
rsync -avz ./src /dest
# syncing the content of src into dest:
rsync -avz ./src/ /dest
```
<!-- {: data-highlight="rsync -avz"} -->

See: [rsync(1) usage](https://download.samba.org/pub/rsync/rsync.1#USAGE)

### OSX

```bash
--exclude '.Trashes'
--exclude '.Spotlight-V100'
--exclude '.fseventsd'
```
<!-- {: data-highlight="--exclude"} -->

See: [rsync(1) --exclude](https://download.samba.org/pub/rsync/rsync.1#opt--exclude)

### Transfer options

```bash
-z, --compress
-n, --dry-run
    --partial   # allows resuming of aborted syncs
    --bwlimit=RATE    # limit socket I/O bandwidth
```
<!-- {: data-highlight="--compress; --dry-run; --partial; --bwlimit=RATE"} -->

See: [rsync(1) --compress](https://download.samba.org/pub/rsync/rsync.1#opt--compress)

### Display options

```bash
-q, --quiet
-v, --verbose
    --stats
-h, --human-readable
    --progress
-P                     # same as --partial --progress
```
<!-- {: data-highlight="--quiet; --verbose; --stats; --progress"} -->

See: [rsync(1) --verbose](https://download.samba.org/pub/rsync/rsync.1#opt--verbose)

### Skipping options

```bash
-u, --update     # skip files newer on dest
-c, --checksum   # skip based on checksum, not mod-time & size
```
<!-- {: data-highlight="--update; --checksum"} -->

See: [rsync(1) --update](https://download.samba.org/pub/rsync/rsync.1#opt--update)

### Backup options

```bash
-b, --backup           # backup with suffix
    --suffix=SUFFIX    # default ~ without --backup-dir
    --backup-dir=DIR
```
<!-- {: data-highlight="--backup; --suffix=SUFFIX"} -->

See: [rsync(1) --backup](https://download.samba.org/pub/rsync/rsync.1#opt--backup)

### Include options

#### Patterns

```bash
--exclude=PATTERN
--include=PATTERN
```
<!-- {: data-highlight="--exclude=PATTERN; --include=PATTERN"} -->

#### From files

```bash
--exclude-from=FILE
--include-from=FILE
--files-from=FILE    # read list of filenames from FILE
```
<!-- {: data-highlight="--exclude-from=FILE; --include-from=FILE; --files-from=FILE"} -->

#### CVS excludes

```bash
-C, --cvs-exclude    # exclude from local/global .cvsignore
```
<!-- {: data-highlight="--cvs-exclude"} -->

See: [rsync(1) --include](https://download.samba.org/pub/rsync/rsync.1#opt--include)

### Archive options

#### Archive mode

```bash
-a, --archive    # archive (-rlptgoD)
```
<!-- {: data-highlight="--archive"} -->

#### Individual flags

```bash
-r, --recursive
-l, --links      # copy symlinks as links
-p, --perms      # preserve permissions
-t, --times      # preserve times
-g, --group      # preserve group
-o, --owner      # preserve owner
-D               # same as --devices --specials
```
<!-- {: data-highlight="--recursive; --links; --perms; --times"} -->

#### Deletion

```bash
--delete         # delete extra files
```
<!-- {: data-highlight="--delete"} -->

See: [rsync(1) --archive](https://download.samba.org/pub/rsync/rsync.1#opt--archive)
