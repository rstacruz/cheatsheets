---
title: Linux
layout: 2017/sheet
updated: 2023-06-11
---

### Read/Write/Execute a file

```console
$ chmod +rwx App
$ ./App
```

[See `chmod` command description](http://man.he.net/?topic=man&section=all) 
{: .-crosslink}

### Remove

```console
$ rm namefile
$ rm -d Directory
$ rm -rf Directory_with_files
```

[See `rm` command description](http://man.he.net/?topic=rm&section=all) 
{: .-crosslink}

### Copy file to a folder

```console
$ cp namefile Downloads
$ ls
namefile  Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
$ cd Downloads
~/Downloads$ ls
namefile
```

[See `cp` command description](http://man.he.net/?topic=cp&section=all) 
{: .-crosslink}

### Create empty file

```console
$ touch namefile
$ touch --help
```

[See `touch` command description](http://man.he.net/?topic=touch&section=all) 
{: .-crosslink}

### Show in the terminal the file

```console
$ cat namefile.txt
$ cat --help
```

[See `cat` command description](http://man.he.net/?topic=cat&section=all) 
{: .-crosslink}

### Edit file

```console
$ nano namefile.txt
$ nano --help
```

[See `nano` command description](http://man.he.net/?topic=nano&section=all) 
{: .-crosslink}

### Create new directory

```console
$ mkdir name
$ mkdir --help
```

[See `mkdir` command description](http://man.he.net/?topic=mkdir&section=all) 
{: .-crosslink}

### list files from directory

```console
$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
$ ls --help
```

[See `ls` command description](http://man.he.net/?topic=ls&section=all) 
{: .-crosslink}

### Mounting a RAM drive

```console
$ mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /tmp
```

[See `mount` command description](http://man.he.net/?topic=mount&section=all) 
{: .-crosslink}

### Visudo

```console
$ sudo visudo

$ username ALL=(ALL) NOPASSWD:/sbin/restart whatever
```

[See `visudo` command description](http://man.he.net/?topic=visudo&section=all) 
{: .-crosslink}

### Display the amount of available disk space

```console
$ df
$ df -h   # human-readable format
$ df -a   # all filesystems
```

[See `df` command description](http://man.he.net/?topic=df&section=all) 
{: .-crosslink}

### Display disk usage

```console
$ du
$ du -hsx * | sort -rh | head -10    # largest 10 folders
```

[See `du` command description](http://man.he.net/?topic=du&section=all) 
{: .-crosslink}

### Answer yes in a bash script

```console
$ yes | /your/command
```

[See `yes` command description](http://man.he.net/?topic=yes&section=all) 
{: .-crosslink}

### Print details about the current machine

```console
$ uname
Linux
$ uname -a
Linux hostname 3.2.0-4-amd64 #1 SMP Debian 3.2.32-1 x86_64 GNU/Linux
$ uname --help
```

[See `uname` command description](http://man.he.net/?topic=uname&section=all) 
{: .-crosslink}

### Print current users

```console
$ whoami # current user
user
$ who -a
user    tty1         2023-06-10 09:30
user    pts/0        2023-06-10 10:45 
```

[See `whoami` command description](http://man.he.net/?topic=whoami&section=all) 
{: .-crosslink}

[See `who` command description](http://man.he.net/?topic=who&section=all) 
{: .-crosslink}

### Change password for user

```console
$ passwd # current user
$ passwd user # another user
$ passwd -S # get current status
```

[See `passwd` command description](http://man.he.net/?topic=passwd&section=all) 
{: .-crosslink}

### Get help on command

```console
$ man ls
$ man --help
```

[See `man` command description](http://man.he.net/?topic=man&section=all) 
{: .-crosslink}

### Clear console

```console
$ clear
```

[See `clear` command description](http://man.he.net/?topic=clear&section=all) 
{: .-crosslink}

### Print current date

```console
$ date
Sun 11 Jun 2023 12:00:00 AM EDT
$ date -d ”tomorrow”
Mon 12 Jun 2023 12:00:00 AM EDT
$ date --help
```

[See `date` command description](http://man.he.net/?topic=date&section=all) 
{: .-crosslink}

### Kill any process

```console
$ kill <process-id>
$ kill -15 <process-id> # kill a process gracefully
$ kill -9 <process-id> # kill a process forcefully
```

[See `kill` command description](http://man.he.net/?topic=kill&section=all) 
{: .-crosslink}

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

[See `history` command description](http://man.he.net/?topic=history&section=all) 
{: .-crosslink}

### Print lines, words, and bytes count

```console
$ wc -w filename.txt # count the number of words 
$ wc -l filename.txt # count the number of lines 
$ wc -c filename.txt # count the number of bytes 
```

[See `wc` command description](http://man.he.net/?topic=wc&section=all) 
{: .-crosslink}

### Print first/last lines/bytes of file

```console
$ head -n 10 filename.txt # first 10 lines of filename.txt
$ tail -n 10 filename.txt # last 10 lines of filename.txt
$ head -c 10 filename.txt # first 10 bytes of filename.txt
$ tail -c 10 filename.txt # last 10 bytes of filename.txt
```

[See `head` command description](http://man.he.net/?topic=head&section=all) 
{: .-crosslink}

[See `tail` command description](http://man.he.net/?topic=tail&section=all) 
{: .-crosslink}

### Print the differences between files/directories

```console
$ ls
dir  dir2  filename.txt  filename.txt
$ diff -u filename.txt filename2.txt
$ diff -ur ./dir ./dir2
```

[See `diff` command description](http://man.he.net/?topic=diff&section=all) 
{: .-crosslink}