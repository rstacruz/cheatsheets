---
title: SSH
subtitle: Encrypted remote shell client
category: Networking
tier: t2
updated: 2026-11-23
last_verified_with: "OpenSSH 10.6p1."
fragments:
  - "ssh user@host"
  - "ssh -p 2222"
  - "ssh host uptime"
  - "-L 8080:localhos"
  - "known_hosts"
  - "-R 9000:localho"
  - "ProxyJump"
  - "-D 1080"
  - "~/.ssh/config"
  - "-J bastion"
  - "ssh-add -l"
  - "-N"
  - "ed25519"
  - "-v"
  - "IdentityFile"
  - "ssh -t host htop"
intro: |
  OpenSSH's `ssh` opens encrypted remote shells and tunnels. This sheet covers logins, keys, config, forwarding, and diagnostics.
links:
  - title: OpenSSH manuals
    url: https://www.openssh.com/manual.html
  - title: ssh(1)
    url: https://man.openbsd.org/ssh.1
  - title: ssh_config(5)
    url: https://man.openbsd.org/ssh_config.5
---

## Connect
<!-- {: .-three-column} -->

### Log in
<!-- {: .-prime} -->

```bash
ssh user@host
ssh -p 2222 user@host
ssh ssh://user@host:2222
ssh host  # uses a config alias
```

`-l` sets the login name and `-i` selects a key.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

### Run a command

```bash
ssh host uptime
ssh host 'ls -l /var/log'
ssh -t host htop
```

Arguments after the destination form one command sent to the remote shell. `-t` forces a TTY.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

### Escape sequences

| Key   | Action                     |
| ----- | -------------------------- |
| `~.`  | Disconnect                 |
| `~^Z` | Suspend the session        |
| `~#`  | List forwarded connections |
| `~?`  | Show all escapes           |

<!-- {: .-shortcuts} -->

Escapes work only at the start of a line in a TTY session.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

## Keys
<!-- {: .-three-column} -->

### Create a key

```bash
ssh-keygen -t ed25519 -C "me@example.com"
```
<!-- {: data-highlight="ssh-keygen"} -->

This writes `~/.ssh/id_ed25519` and its `.pub` file. Set a passphrase when prompted.

See: [ssh-keygen(1)](https://man.openbsd.org/ssh-keygen.1)

### Install a key

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub \
  user@host
```
<!-- {: data-highlight="ssh-copy-id"} -->

The public key is appended to the remote `authorized_keys`.

See: [ssh-copy-id(1)](https://github.com/openssh/openssh-portable/blob/master/contrib/ssh-copy-id.1)

### Inspect a key

```bash
ssh-keygen -lf ~/.ssh/id_ed25519.pub
```
<!-- {: data-highlight="-lf"} -->

Prints the bit length, fingerprint, comment, and algorithm.

See: [ssh-keygen(1)](https://man.openbsd.org/ssh-keygen.1)

### Use an agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
```

The agent holds decrypted keys so passphrases are entered once.

See: [ssh-agent(1)](https://man.openbsd.org/ssh-agent.1)

## Config

### Host aliases

```bash
Host github
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
```
<!-- {: data-highlight="Host"} -->

`ssh github` now uses this user, host, and key.

See: [ssh_config(5)](https://man.openbsd.org/ssh_config.5)

### Wildcards

```bash
Host prod.internal
    HostName 10.0.0.5

Host *.internal
    User deploy
    ProxyJump bastion
```
<!-- {: data-highlight="*.internal"} -->

For each option, the first value wins, so list specific hosts before wildcards.

See: [ssh_config(5)](https://man.openbsd.org/ssh_config.5)

### Effective configuration

```bash
$ ssh -G -F ~/.ssh/config github | grep -E '^(user|hostname|port) '
user git
hostname github.com
port 22
```
<!-- {: data-highlight="-G"} -->

`-G` resolves options and exits; `-F` checks the given file.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

## Forwarding
<!-- {: .-three-column} -->

### Local port

```bash
ssh -N -L 8080:localhost:80 user@host
```
<!-- {: data-highlight="-L 8080:localhost:80"} -->

Local port 8080 reaches port 80 as seen from `host`.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

### Remote port

```bash
ssh -N -R 9000:localhost:5432 user@host
```
<!-- {: data-highlight="-R 9000:localhost:5432"} -->

Port 9000 on `host` reaches port 5432 on the client.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

### SOCKS proxy

```bash
ssh -N -D 1080 user@host
```
<!-- {: data-highlight="-D 1080"} -->

The client listens on 1080 and forwards through `host`.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

### Jump host

```bash
ssh -J bastion internal
```
<!-- {: data-highlight="-J bastion"} -->

`-J` connects through `bastion`; `ProxyJump` does the same in config.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

## Troubleshoot

### Verbose output

```bash
ssh -vvv user@host
```
<!-- {: data-highlight="-vvv"} -->

Three `-v` flags give the most detail about config and authentication.

See: [ssh(1)](https://man.openbsd.org/ssh.1)

### Changed host key

```bash
ssh-keygen -R host
```
<!-- {: data-highlight="-R"} -->

This removes stale keys from `known_hosts`. Verify the new fingerprint before reconnecting.

See: [ssh-keygen(1)](https://man.openbsd.org/ssh-keygen.1)

## Also see

[scp cheatsheet](./scp)
<!-- {: .-crosslink} -->

[Rsync cheatsheet](./rsync)
<!-- {: .-crosslink} -->
