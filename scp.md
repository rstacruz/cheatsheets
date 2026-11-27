---
title: scp
subtitle: Secure file copy
logo: { set: icon-park-outline, name: copy }
category: Networking
updated: 2026-11-24
last_verified_with: "OpenSSH 10.6."
authors:
  - github: vastpeng
tier: t3
intro: |
  scp copies files between hosts over SSH. This reference covers uploads, downloads, options, and the SFTP-backed protocol.
links:
  - title: scp(1) manual
    url: https://man.openbsd.org/scp.1
  - title: OpenSSH manuals
    url: https://www.openssh.com/manual.html
  - title: OpenSSH source
    url: https://github.com/openssh/openssh-portable
---

## Copy files
<!-- {: .-three-column} -->

### Upload

```sh
scp file.txt user@host:/path/to/file
```

See: [scp(1)](https://man.openbsd.org/scp.1)

### Download

```sh
scp user@host:/path/to/file file.txt
```

See: [scp(1)](https://man.openbsd.org/scp.1)

### Multiple files and directories

```sh
scp file1 file2 user@host:/path/dir
scp -r dir user@host:/path/dir
```

Remote paths take a `[user@]host:path` or `scp://host:port/path` form.

See: [scp(1)](https://man.openbsd.org/scp.1)

## Options

### Connection

```sh
scp -P 2222 file.txt user@host:/path
scp -i ~/.ssh/id_ed25519 file.txt user@host:/path
scp -J jump.example.com file.txt user@host:/path
```

`-P` is the port; `-p` preserves times and modes.

See: [scp(1)](https://man.openbsd.org/scp.1)

### Transfer

| Flag | Effect |
| --- | --- |
| `-r` | Copy directories recursively |
| `-p` | Keep times and modes |
| `-C` | Compress the transfer |
| `-l 800` | Limit bandwidth to 800 Kbit/s |
| `-q` | Hide progress and warnings |
| `-v` | Debug output |

See: [scp(1)](https://man.openbsd.org/scp.1)

### Behaviour

| Flag | Effect |
| --- | --- |
| `-O` | Use the legacy SCP protocol |
| `-3` | Remote-to-remote copies via local host (default) |
| `-R` | Remote-to-remote copies from the origin host |
| `-T` | Skip remote filename checks |
| `-B` | Batch mode, never prompt |

See: [scp(1)](https://man.openbsd.org/scp.1)

## Protocol

### Default protocol

```sh
scp host:file.txt .
```

Since OpenSSH 9.0 this transfers over SFTP, so `scp` needs an SFTP subsystem on the server.

See: [OpenSSH 9.0 release notes](https://www.openssh.com/txt/release-9.0)

### Legacy protocol

```sh
scp -O host:file.txt .
```

`-O` selects the original SCP protocol, for servers without SFTP, `~user` expansion, or shell globs.

See: [scp(1) -O](https://man.openbsd.org/scp.1#O)

## Also see

- [scp(1) manual](https://man.openbsd.org/scp.1)
- [SSH cheatsheet](./ssh)
<!-- {: .-also-see} -->
