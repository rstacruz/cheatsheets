---
title: scp
subtitle: Secure file copy
category: Networking
updated: 2026-11-24
last_verified_with: "OpenSSH 10.6."
authors:
  - github: vastpeng
---

## Copy files
<!-- {: .-three-column} -->

### Upload

```sh
scp file.txt user@host:/path/to/file
```

### Download

```sh
scp user@host:/path/to/file file.txt
```

### Multiple files and directories

```sh
scp file1 file2 user@host:/path/dir
scp -r dir user@host:/path/dir
```

Remote paths take a `[user@]host:path` or `scp://host:port/path` form.

## Options

### Connection

```sh
scp -P 2222 file.txt user@host:/path
scp -i ~/.ssh/id_ed25519 file.txt user@host:/path
scp -J jump.example.com file.txt user@host:/path
```

`-P` is the port; `-p` preserves times and modes.

### Transfer

| Flag | Effect |
| --- | --- |
| `-r` | Copy directories recursively |
| `-p` | Keep times and modes |
| `-C` | Compress the transfer |
| `-l 800` | Limit bandwidth to 800 Kbit/s |
| `-q` | Hide progress and warnings |
| `-v` | Debug output |

### Behaviour

| Flag | Effect |
| --- | --- |
| `-O` | Use the legacy SCP protocol |
| `-3` | Remote-to-remote copies via local host (default) |
| `-R` | Remote-to-remote copies from the origin host |
| `-T` | Skip remote filename checks |
| `-B` | Batch mode, never prompt |

## Protocol

### Default protocol

```sh
scp host:file.txt .
```

Since OpenSSH 9.0 this transfers over SFTP, so `scp` needs an SFTP subsystem on the server.

### Legacy protocol

```sh
scp -O host:file.txt .
```

`-O` selects the original SCP protocol, for servers without SFTP, `~user` expansion, or shell globs.

## Also see

- [scp(1) manual](https://man.openbsd.org/scp.1)
- [SSH cheatsheet](./ssh)
<!-- {: .-also-see} -->
