---
title: How to create an SSH tunnel
link_title: SSH tunnel
subtitle: Forward local and remote ports
category: Networking
layout: snippet
last_verified_with: "OpenSSH 10.6p1."
updated: 2026-11-23
links:
  - title: ssh(1) manual
    url: https://man.openbsd.org/ssh.1
---

## Tunneling
<!-- {: .-snippets} -->

### Local forward
<!-- {: .-snippet} -->

```bash
ssh -N -L 8080:localhost:80 user@host
```
<!-- {: data-highlight="-L"} -->

Listens on local port 8080 and forwards it to port 80 on `host`; see [ssh(1)](https://man.openbsd.org/ssh.1#L).

### Remote forward
<!-- {: .-snippet} -->

```bash
ssh -N -R 9000:localhost:5432 user@host
```
<!-- {: data-highlight="-R"} -->

Listens on port 9000 on `host` and forwards it back to port 5432 on your machine; see [ssh(1)](https://man.openbsd.org/ssh.1#R).

### SOCKS proxy
<!-- {: .-snippet} -->

```bash
ssh -N -D 1080 user@host
```
<!-- {: data-highlight="-D"} -->

Opens a local SOCKS proxy on port 1080 and routes traffic through `host`; see [ssh(1)](https://man.openbsd.org/ssh.1#D).

### Background tunnel
<!-- {: .-snippet} -->

```bash
ssh -fN -L 8080:localhost:80 user@host
```
<!-- {: data-highlight="-fN"} -->

`-f` backgrounds the tunnel and `-N` skips the remote shell; see [ssh(1)](https://man.openbsd.org/ssh.1#f).
