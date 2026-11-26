---
title: rclone
seo_title: rclone cheatsheet — commands, remotes, sync
description: "rclone commands: config, list remotes, copy, sync, check and general flags. Reference."
subtitle: Cloud storage sync tool
category: Networking
updated: 2026-11-24
last_verified_with: "rclone 1.76.0."
tier: t3
intro: |
  rclone syncs files between cloud storage, local disks, and remote servers. This reference covers remotes, transfers, and common flags.
links:
  - title: rclone documentation
    url: https://rclone.org/docs/
  - title: rclone commands
    url: https://rclone.org/commands/
  - title: rclone filtering
    url: https://rclone.org/filtering/
---

## Remotes
<!-- {: .-three-column} -->

### Configure

```sh
rclone config
rclone config show
```

`rclone config redacted` prints the same file with secrets masked.

See: [rclone config](https://rclone.org/commands/rclone_config/)

### List remotes

```sh
rclone listremotes
rclone listremotes --long
```

`--long` adds each remote's backend type and description.

See: [rclone listremotes](https://rclone.org/commands/rclone_listremotes/)

## Browse
<!-- {: .-three-column} -->

### List files

```sh
rclone ls remote:path
rclone lsl remote:path
rclone lsd remote:path
rclone tree remote:path
```

`ls` and `lsl` recurse; `lsd` stops after one level.

See: [rclone ls](https://rclone.org/commands/rclone_ls/), [rclone tree](https://rclone.org/commands/rclone_tree/)

### Measure

```sh
rclone size remote:path
rclone about remote:
```

`about` reports quota on backends that expose it.

See: [rclone size](https://rclone.org/commands/rclone_size/), [rclone about](https://rclone.org/commands/rclone_about/)

## Transfer
<!-- {: .-three-column} -->

### Copy

```sh
rclone copy src:path dst:path
rclone copy src:path dst:path --dry-run
```

`copy` skips identical files and never deletes from the destination.

See: [rclone copy](https://rclone.org/commands/rclone_copy/)

### Sync

```sh
rclone sync src:path dst:path --dry-run
rclone sync src:path dst:path
```

`sync` deletes destination files that are missing from the source.

See: [rclone sync](https://rclone.org/commands/rclone_sync/)

### Verify

```sh
rclone check src:path dst:path
rclone check src:path dst:path --one-way
```

`check` compares sizes and hashes; `--size-only` is a quick check.

See: [rclone check](https://rclone.org/commands/rclone_check/)

### Bidirectional

```sh
rclone bisync drive:docs ~/docs
```

`bisync` propagates changes both ways from each side's last listing; the first run needs `--resync`.

See: [rclone bisync](https://rclone.org/commands/rclone_bisync/)

## Modify
<!-- {: .-three-column} -->

### Move and delete

```sh
rclone move src:path dst:path
rclone delete remote:path
rclone purge remote:path
```

`purge` removes the path and everything under it.

See: [rclone move](https://rclone.org/commands/rclone_move/), [rclone purge](https://rclone.org/commands/rclone_purge/)

### Files and directories

```sh
rclone mkdir remote:path
rclone touch remote:path/file.txt
rclone cat remote:path/file.txt
```

See: [rclone mkdir](https://rclone.org/commands/rclone_mkdir/), [rclone cat](https://rclone.org/commands/rclone_cat/)

## Flags

### Transfer flags

| Flag | Effect |
| --- | --- |
| `--dry-run` | Log transfers without doing them |
| `-P, --progress` | Show live progress |
| `--transfers 8` | Parallel file transfers (default 4) |
| `--checkers 16` | Parallel checkers (default 8) |

See: [transfers](https://rclone.org/docs/#transfers-int)

### Filtering flags

| Flag | Effect |
| --- | --- |
| `--include '*.jpg'` | Only transfer matching paths |
| `--exclude '*.tmp'` | Skip matching paths |
| `--max-age 7d` | Only files newer than a week |
| `--min-age 7d` | Only files older than a week |
| `--max-size 100M` | Only files under 100 MB |
| `--fast-list` | Fewer transactions, more memory |

See: [filtering](https://rclone.org/filtering/)

### Performance flags

| Flag | Effect |
| --- | --- |
| `--multi-thread-cutoff 256Mi` | Multi-thread above this size |
| `--multi-thread-streams 4` | Streams per multi-threaded file |
| `--buffer-size 32Mi` | Memory buffer per transfer (16Mi) |

See: [multi-thread cutoff](https://rclone.org/docs/#multi-thread-cutoff)
