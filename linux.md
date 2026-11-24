---
title: Linux
subtitle: Unix-like operating system
category: Linux
last_verified_with: "GNU coreutils 9.12, procps-ng 4.0.7, util-linux 2.42.4, sudo 1.9.17p2."
updated: 2026-11-24
tier: t3
intro: |
  Linux commands for files, processes, disks, and sudo. This reference covers the everyday tools from coreutils, procps, and util-linux.
links:
  - title: Linux man pages
    url: https://man7.org/linux/man-pages/
  - title: kernel.org documentation
    url: https://www.kernel.org/doc/html/latest/
  - title: sudo manual pages
    url: https://www.sudo.ws/docs/man/
---

## Files

### Read, write, execute

```bash
chmod u+x run.sh        # owner can execute it
chmod 755 run.sh        # rwx owner, rx group and others
chmod -R go-w notes/    # drop group and other writes
```

Without an `x` bit, `./run.sh` fails with "permission denied".

See: [chmod(1)](https://man7.org/linux/man-pages/man1/chmod.1.html)

### Copy and move

```bash
cp -r notes/ backup/    # copy a whole tree
mv backup/ /tmp/        # move, or rename in place
```

See: [cp(1)](https://man7.org/linux/man-pages/man1/cp.1.html)

### Create and list

```bash
touch notes.md          # empty file
mkdir -p projects/app   # parents as needed
ls -lh                  # long listing, human sizes
```

See: [touch(1)](https://man7.org/linux/man-pages/man1/touch.1.html)

### Remove

```bash
rm notes.md
rmdir empty-dir         # empty directories only
rm -rf build/           # the directory and everything in it
```

See: [rm(1)](https://man7.org/linux/man-pages/man1/rm.1.html)

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

See: [pgrep(1)](https://man7.org/linux/man-pages/man1/pgrep.1.html), [ps(1)](https://man7.org/linux/man-pages/man1/ps.1.html)

### Stop

```bash
kill 12345              # SIGTERM, lets it clean up
kill -9 12345           # SIGKILL, last resort
pkill -f "npm run dev"  # by command line
```

See: [kill(1)](https://man7.org/linux/man-pages/man1/kill.1.html)

## Disk

### Free space

```bash
df -h                   # per filesystem, human sizes
df -i                   # inode usage instead
```

See: [df(1)](https://man7.org/linux/man-pages/man1/df.1.html)

### Usage

```bash
du -h --max-depth=1 .   # each entry in this directory
du -hsx * | sort -rh | head -10   # ten largest
```

See: [du(1)](https://man7.org/linux/man-pages/man1/du.1.html)

### RAM disk

```bash
sudo mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /mnt/ram
```

Everything in it is gone after `sudo umount /mnt/ram` or a reboot.

See: [tmpfs](https://www.kernel.org/doc/html/latest/filesystems/tmpfs.html)

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

See: [sudoers(5)](https://man7.org/linux/man-pages/man5/sudoers.5.html)

### Answer yes

```bash
yes | ./install.sh
```

See: [yes(1)](https://man7.org/linux/man-pages/man1/yes.1.html)
