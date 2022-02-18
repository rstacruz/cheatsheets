---
title: Linux
---

### Read/Write/Execute a file

    $ chmod +rwx App
    $ ./App

### Remove

    $ rm namefile
    $ rm -d Directory
    $ rm -rf Directory_with_files

### Copy file to a folder

    $ cp namefile Downloads
    $ ls
    namefile  Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
    $ cd Downloads
    ~/Downloads$ ls
    namefile


### Create empty file

    $ touch namefile
    $ touch --help

### Show in the terminal the file

    $ cat namefile
    $ cat --help


### Create new directory

    $ mkdir name
    $ mkdir --help

### list files from directory

    $ ls
    Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
    $ ls --help

### Mounting a RAM drive

    $ mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /tmp

### Visudo

    sudo visudo

    username ALL=(ALL) NOPASSWD:/sbin/restart whatever

### Display the amount of available disk space

```sh
df
df -h   # human-readable format
df -a   # all filesystems
```

### Display disk usage

```sh
du
du -hsx * | sort -rh | head -10    # largest 10 folders
```

### Answer yes in a bash script

```bash
yes | /your/command
```
