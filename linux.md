---
title: Linux
layout: 2017/sheet
---

### Read/Write/Execute a file

```console
$ chmod +rwx App
$ ./App
```

### Remove

```console
$ rm namefile
$ rm -d Directory
$ rm -rf Directory_with_files
```

### Copy file to a folder

```console
$ cp namefile Downloads
$ ls
namefile  Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
$ cd Downloads
~/Downloads$ ls
namefile
```

### Create empty file

```console
$ touch namefile
$ touch --help
```

### Show in the terminal the file

```console
$ cat namefile.txt
$ cat --help
```

### Edit file

```console
$ nano namefile.txt
$ nano --help
```

### Create new directory

```console
$ mkdir name
$ mkdir --help
```

### list files from directory

```console
$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
$ ls --help
```

### Mounting a RAM drive

```console
$ mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /tmp
```

### Visudo

```console
$ sudo visudo

$ username ALL=(ALL) NOPASSWD:/sbin/restart whatever
```

### Display the amount of available disk space

```console
$ df
$ df -h   # human-readable format
$ df -a   # all filesystems
```

### Display disk usage

```console
$ du
$ du -hsx * | sort -rh | head -10    # largest 10 folders
```

### Answer yes in a bash script

```console
$ yes | /your/command
```

### Print details about the current machine

```console
$ uname
Linux
$ uname -a
Linux hostname 3.2.0-4-amd64 #1 SMP Debian 3.2.32-1 x86_64 GNU/Linux
$ uname --help
```

### Print current users

```console
$ whoami # current user
user
$ who -a
user    tty1         2023-06-10 09:30
user    pts/0        2023-06-10 10:45 
```

### Change password for user

```console
$ passwd # current user
$ passwd user # another user
$ passwd -S # get current status
```

### Get help on command

```console
$ man ls
$ man --help
```

### Clear console

```console
$ clear
```

### Print current date

```console
$ date
Sun 11 Jun 2023 12:00:00 AM EDT
$ date -d ”tomorrow”
Mon 12 Jun 2023 12:00:00 AM EDT
$ date --help
```

### Kill any process

```console
$ kill <process-id>
$ kill -15 <process-id> # kill a process gracefully
$ kill -9 <process-id> # kill a process forcefully
```

### Print command-line history
```console
$ history
1  date
2  sudo date -s "30 DEC 2050 22:30:55"
3  date -d "last Friday"
4  uname
5  less --help
6  who
7  who -a
8  who -a -H
9  history
$ history 5
1  history
2  date
3  sudo date -s "30 DEC 2050 22:30:55"
4  date -d "last Friday"
5  uname
```

### Print lines, words, and bytes count

```console
$ wc -w filename.txt # count the number of words 
$ wc -l filename.txt # count the number of lines 
$ wc -c filename.txt # count the number of bytes 
```

### Print first/last lines/bytes of file

```console
$ head -n 10 filename.txt # first 10 lines of filename.txt
$ tail -n 10 filename.txt # last 10 lines of filename.txt
$ head -c 10 filename.txt # first 10 bytes of filename.txt
$ tail -c 10 filename.txt # last 10 bytes of filename.txt
```

### Print the differences between files/directories

```console
$ ls
dir  dir2  filename.txt  filename.txt
$ diff -u filename.txt filename2.txt
$ diff -ur ./dir ./dir2
```