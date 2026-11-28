---
title: How to create an SSH tunnel
link_title: SSH tunnel
subtitle: Forward local and remote ports
logo: { set: icon-park-outline, name: link }
category: Networking
layout: snippet
last_verified_with: "OpenSSH 10.6p1."
created_at: 2026-11-23
updated: 2026-11-28
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

**Forwards a local port.** The target is a port on the remote. Listens on port 8080 and reaches port 80 on `host`; see [ssh(1)](https://man.openbsd.org/ssh.1#L).

### Remote forward
<!-- {: .-snippet} -->

```bash
ssh -N -R 9000:localhost:5432 user@host
```
<!-- {: data-highlight="-R"} -->

**Forwards a remote port.** The target is your machine. Listens on port 9000 on `host` and reaches port 5432 locally; see [ssh(1)](https://man.openbsd.org/ssh.1#R).

### SOCKS proxy
<!-- {: .-snippet} -->

```bash
ssh -N -D 1080 user@host
```
<!-- {: data-highlight="-D"} -->

**Routes via SOCKS.** Traffic goes through a SOCKS proxy. Opens a local proxy on port 1080 and sends traffic through `host`; see [ssh(1)](https://man.openbsd.org/ssh.1#D).

### Background tunnel
<!-- {: .-snippet} -->

```bash
ssh -fN -L 8080:localhost:80 user@host
```
<!-- {: data-highlight="-fN"} -->

**Starts a background tunnel.** The tunnel runs in the background. `-f` backgrounds it and `-N` skips the remote shell; see [ssh(1)](https://man.openbsd.org/ssh.1#f).
