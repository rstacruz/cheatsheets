---
title: scp
category: CLI
updated: 2018-12-25
authors:
  - github: vastpeng
---

### Usage
{: .-prime}

```bash
scp <options> source_path destination_path
```

### Conditions

```bash
-r      # transfer directory 
-v      # see the transfer details
-C      # copy files with compression
-l 800  # limit bandwidth with 800
-p      # preserving the original attributes of the copied files
-P      # connection port
-q      # hidden the output
```

### Commands

```bash
$ scp file user@host:/path/to/file                        # copying a file to the remote system using scp command
$ scp user@host:/path/to/file /local/path/to/file         # copying a file from the remote system using scp command
```

```bash
$ scp file1 file2 user@host:/path/to/directory            # copying multiple files using scp command
$ scp -r /path/to/directory user@host:/path/to/directory  # Copying an entire directory with scp command
```
