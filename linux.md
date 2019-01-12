---
title: Linux
---

### Mounting a RAM drive

    $ mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /tmp

### Visudo

    sudo visudo

    username ALL=(ALL) NOPASSWD:/sbin/restart whatever

### Display the amount of available disk space

    $ df

All File System:

    $ df -a

Human Readable Format:

    $ df -h

Largest 10 folder/file in the current directory:

    $ du -hsx * | sort -rh | head -10
