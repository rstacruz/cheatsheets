---
title: Command line stuff
---

## List (ls)

    ls [options] [paths]

### Format

| Switch | Description |
|---|---|
| `-1` | One entry per line |
| `-l` | Long view |
| `-o` | Long view (without groups) |
| `-C` | Multicolumn (sorted horizontally) |
| `-x` | Multicolumn (sorted vertically) |
|---
| `-F` | Add / after directories |
| `-G` | Color |
{:.shortcuts}

### Options

| `-R` | Recurse |
| `-a` | Include hidden (dotfiles) |
| `-A` | Include hidden (but not . and ..) |
{:.shortcuts}

### Sorting

| Switch | Description |
|---|---|
| `-r` | reverse order |
| `-S` | sort by size |
| `-t` | sort by time modified |
| `-u` | sort by time accessed |
| `-U` | sort by time created |
| `-c` | sort by time status was changed |
|---
| `-h` | Human-readable size (3k) |
{:.shortcuts}


<br>

## Tail

    tail [-F | -f | -r] [-bN | -cN | -nN] [file ...]

### Modes

| `-f` | follow |
| `-F` | follow by filename (accounts for log rotation) |
| `-r` | Reverse order |
{:.shortcuts}

### Options

| `-bN` | N*512 bytes |
| `-cN` | N bytes |
| `-nN` | N lines |
| `+N`  | Start from line N |
{:.shortcuts}

<br>

### View current disk space

```
$ df -h
```

<br>

### Delete Files older than X Days

```
find . -type f -name '*.xz' -mtime +30 -exec ls {}
```

### Find files are taking up the space

##### Linux

```
sudo apt install ncdu 
ncdu
```

##### Mac

```
brew install ncdu
ncdu
```

<br>

### Copy/Sync Files and Directory to or From a Server

```
[root@tecmint]$ rsync -avz rpmpkgs/ root@192.168.0.101:/home/

root@192.168.0.101's password:

sending incremental file list
./
httpd-2.2.3-82.el5.centos.i386.rpm
...

```

### Copy/Sync a Remote Directory to a Local Machine

```
[root@tecmint]# rsync -avzh root@192.168.0.100:/home/tarunika/rpmpkgs /tmp/myrpms

root@192.168.0.100's password:

receiving incremental file list

created directory /tmp/myrpms
rpmpkgs/
rpmpkgs/httpd-2.2.3-82.el5.centos.i386.rpm

...
```

### Copy a File from a Remote Server to a Local Server with SSH

```
[root@tecmint]# rsync -avzhe ssh root@192.168.0.100:/root/install.log /tmp/

root@192.168.0.100's password:

receiving incremental file list
install.log
sent 30 bytes  received 8.12K bytes  1.48K bytes/sec
...
```

### Show Progress While Transferring Data with rsync

```
[root@tecmint]# rsync -avzhe ssh --progress /home/rpmpkgs root@192.168.0.100:/root/rpmpkgs

root@192.168.0.100's password:

sending incremental file list

created directory /root/rpmpkgs
rpmpkgs/
rpmpkgs/httpd-2.2.3-82.el5.centos.i386.rpm

           1.02M 100%        2.72MB/s        0:00:00 (xfer#1, to-check=3/5)

```

<br>

## Sudo

```
sudo [options] <command>
```

### Listing

| `-l` | List allowed commands |
{:.shortcuts}

### Options

| `-A` | Use $SUDO_ASKPASS |
| `-b` | Run in background |
| `-E` | Preserve environment |
| `-H` | use target's $HOME |
| `-n` | Don't prompt for password |
| `-P` | Preserve group vector |
| `-S` | Read password from stdin |
{:.shortcuts}

### File descriptors

| `-C fd` | Close all open file descriptors |
{:.shortcuts}

### Prompt

| `-p prompt` | Custom prompt (-p "%p password:") |
{:.shortcuts}

### Interactive

| Switch | Description |
|---|---|
| `-i [cmd]` | Interactive shell without variables |
| `-s [cmd]` | Interactive shell |
|----
| `-u user` | run as this user |
| `-g group` | run as this group |
{:.shortcuts}

### Timestamp

| `-v` | revalidate timestamp for 5 mins |
| `-k` | invalidate timestamp |
| `-K` | just like -k |
{:.shortcuts}

<br>

## wc (Word count)

```
... | wc [options]
```

| `-c` | Bytes |
| `-l` | Lines |
| `-m` | Characters (incl multi-byte) |
| `-w` | Words |
{:.shortcuts}

<br>

## Search-and-replace in all files

    perl -p -i -e 's/hello/HELLO/g' **/*

<br>

## Grep

```
grep [options] [pattern] [file ...]

# find by filename 
$ grep -rl "rahul" /home/

# Search text in a file
grep "FATAL" /var/log/syslog

# Search multiple strings 
grep "FATAL|Warning|Error" /var/log/syslog

# Search in all files
grep "Error" /var/log/*            

# Search in specific extension files
grep "rahul" /var/log/*.log


```

### Options

| Switch | Description |
|---|---|
| `-A num` | Print `num` lines of training context |
|----
| `-G` | --basic-regexp (default) |
| `-E` | --extended-regexp |
| `-P` | --perl-regexp |
|----
| `-f file` | --file (Get patterns for file) |
| `-F` | --fixed-strings |
|----
| `-h` | --no-filename |
| `-H` | --with-filename |
|----
| `-l` | --files-with-matches (just print filenames) |
| `-L` | --files-without-match |
|----
| `-r, -R` | --recursive |
| `-v` | --invert-match |
| `-i` | --ignore-case |
{:.shortcuts}

### Synonyms

    egrep  =>  grep -E
    fgrep  =>  grep -F
    
   
## Ag the Silver search

```
# Search string DHH with 3 rows extra informations
ag -C 3 DHH  

# Search string in specify path
ag DHH guides/ 

# Search string in filesnames that contain the word action.
ag readme -l -G action

# Search string only to match filenames that end with ec.
ag readme -l -i -G ec$

# Search string with --ignore-dir Flag
ag readme -l --ignore-dir=railties/lib

# Search string in specific extension files(.rb)
ag create_table -C 3 -G .rb$

```

<br>

## Restart Linux Server using command prompt

```
   $  reboot
   $  poweroff
   $  shutdown -r 10  # Reboot server just after 10 minutes without displaying any message.
   $  shudwown -r now # Reboot server immediately without any message.
      # Reboot server at 02:10 AM with displaying proper message to user.
   $  shutdown -r 02:10 "System is going to reboot..."  
 ```
    
