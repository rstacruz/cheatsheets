---
title: Linux
---

### Read/Write/Execute a file

```sh
chmod +rwx App
./App
```

### Remove

```sh
rm namefile
rm -d Directory
rm -rf Directory_with_files
```

### Copy file to a folder

```sh
cp namefile Downloads
ls
# Output:
# namefile  Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
cd Downloads
ls
# Output:
# namefile
```

### Create empty file

```sh
touch namefile
touch --help
```

### Show the file content in the terminal

```sh
cat namefile
cat --help
```

### Create a new directory

```sh
mkdir name
mkdir --help
```

### List files from a directory

```sh
ls
# Output:
# Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
ls --help
```

### Mount a RAM drive

```sh
mount -t tmpfs -o size=5G,nr_inodes=5k,mode=700 tmpfs /tmp
```

### Visudo

```sh
sudo visudo
```

Add the following line in the editor:

```
username ALL=(ALL) NOPASSWD:/sbin/restart whatever
```

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

### Answer "yes" in a bash script

```sh
yes | /your/command
```