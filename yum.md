---
title: Yum
seo_title: Yum cheatsheet — install, update, remove
description: "Yum commands: install, update, remove, search, list and repositories. Reference."
subtitle: RPM package manager
category: Package managers
updated: 2026-11-24
last_verified_with: "yum 3.4.3, dnf 4.24."
---

## Install and remove
<!-- {: .-three-column} -->

### Install and update

```sh
yum install vsftpd
yum check-update
yum update
```

### Remove and downgrade

```sh
yum remove vsftpd
yum autoremove httpd
yum downgrade abc
```

`autoremove` also drops dependencies nothing else needs.

## Search and inspect
<!-- {: .-three-column} -->

### Search

```sh
yum search samba
yum info vsftpd
yum provides "*bin/top"
```

### List packages

```sh
yum list available
yum list installed
yum list kernel
```

### Dependencies

```sh
yum deplist nfs-utils
```

## Repositories
<!-- {: .-three-column} -->

### List and inspect

```sh
yum repolist
yum repoinfo rhel-7-server-rpms
```

### Repository packages

```sh
yum repo-pkgs my-rpms list
yum repo-pkgs my-rpms install
```

### Cache

```sh
yum makecache
yum clean packages
yum clean all
```

## Security updates

### List advisories

```sh
yum updateinfo list security
yum updateinfo list bugfix
```

### Apply

```sh
yum update --security
yum update --security --sec-severity=Critical
```

## Groups
<!-- {: .-three-column} -->

### Install a group

```sh
yum groupinstall "Web Server"
```

### Inspect groups

```sh
yum groups list
yum group info "Web Server"
```

## History
<!-- {: .-three-column} -->

### Transactions

```sh
yum history list
yum history info 12
```

### Undo

```sh
yum history undo 12
yum history rollback 10
```

`undo` reverts one transaction; `rollback` reverts everything after the given one.

## Options

### Common flags

| Flag | Effect |
| --- | --- |
| `-y` | Assume yes to prompts |
| `--disablerepo=epel` | Skip a repo for this command |
| `--enablerepo=epel` | Add a repo for this command |

### Download only

```sh
yum install --downloadonly --downloaddir=/tmp vsftpd
```

Without `--downloaddir` the RPMs stay in the yum cache.

## Dnf

### Renamed commands

| yum | dnf |
| --- | --- |
| `yum groupinstall "Development Tools"` | `dnf group install "Development Tools"` |
| `yum repo-pkgs my-rpms list` | `dnf repository-packages my-rpms list` |
| `yum deplist nfs-utils` | `dnf repoquery --deplist nfs-utils` |

### Same commands

- `install`
- `remove`
- `update`
- `search`
- `list`
- `info`
- `provides`
- `repolist`
- `history`
- `updateinfo`
- `autoremove`
<!-- {: .-enum} -->

RHEL 8 and later ship dnf, where `yum` is a compatibility wrapper that accepts the same commands.
