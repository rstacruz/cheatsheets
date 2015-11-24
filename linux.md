---
title: Linux
---

### Mounting a RAM drive

    $ mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /tmp

### Visudo

    sudo visudo

    username ALL=(ALL) NOPASSWD:/sbin/restart whatever
