---
title: Linux
subtitle: Unix-like operating system
category: Linux
last_verified_with: "GNU coreutils 9.12, procps-ng 4.0.7, util-linux 2.42.4, sudo 1.9.17p2."
updated: 2026-11-24
---

## Files

### Read, write, execute

```bash
chmod u+x run.sh        # owner can execute it
chmod 755 run.sh        # rwx owner, rx group and others
chmod -R go-w notes/    # drop group and other writes
```

Without an `x` bit, `./run.sh` fails with "permission denied".

### Copy and move

```bash
cp -r notes/ backup/    # copy a whole tree
mv backup/ /tmp/        # move, or rename in place
```

### Create and list

```bash
touch notes.md          # empty file
mkdir -p projects/app   # parents as needed
ls -lh                  # long listing, human sizes
```

### Remove

```bash
rm notes.md
rmdir empty-dir         # empty directories only
rm -rf build/           # the directory and everything in it
```

## Processes

### Find

```bash
# by name, with the full command line
pgrep -af nginx
```

```bash
# biggest memory users first
ps -eo pid,rss,cmd --sort=-rss | head
```

### Stop

```bash
kill 12345              # SIGTERM, lets it clean up
kill -9 12345           # SIGKILL, last resort
pkill -f "npm run dev"  # by command line
```

## Disk

### Free space

```bash
df -h                   # per filesystem, human sizes
df -i                   # inode usage instead
```

### Usage

```bash
du -h --max-depth=1 .   # each entry in this directory
du -hsx * | sort -rh | head -10   # ten largest
```

### RAM disk

```bash
sudo mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /mnt/ram
```

Everything in it is gone after `sudo umount /mnt/ram` or a reboot.

## Admin

### sudoers

#### Edit

```bash
sudo visudo
```

#### Rule

```bash
%sudo ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx
```

`visudo` checks the syntax before saving, so a typo cannot lock you out.

### Answer yes

```bash
yes | ./install.sh
```
