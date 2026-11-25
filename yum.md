---
title: Yum
seo_title: Yum cheatsheet — install, update, remove
description: "Yum commands: install, update, remove, search, list and repositories. Reference."
subtitle: RPM package manager
category: Package managers
updated: 2026-11-24
last_verified_with: "yum 3.4.3, dnf 4.24."
tier: t3
intro: |
  yum installs, updates, and removes RPM packages and inspects repositories. This reference also maps the commands to dnf.
links:
  - title: yum(8) manual
    url: https://man7.org/linux/man-pages/man8/yum.8.html
  - title: DNF command reference
    url: https://dnf.readthedocs.io/en/latest/command_ref.html
  - title: DNF documentation
    url: https://dnf.readthedocs.io/en/latest/
---

## Install and remove
<!-- {: .-three-column} -->

### Install and update

```sh
yum install vsftpd
yum check-update
yum update
```

See: [install](https://dnf.readthedocs.io/en/latest/command_ref.html#install-command)

### Remove and downgrade

```sh
yum remove vsftpd
yum autoremove httpd
yum downgrade abc
```

`autoremove` also drops dependencies nothing else needs.

See: [remove](https://dnf.readthedocs.io/en/latest/command_ref.html#remove-command)

## Search and inspect
<!-- {: .-three-column} -->

### Search

```sh
yum search samba
yum info vsftpd
yum provides "*bin/top"
```

See: [search](https://dnf.readthedocs.io/en/latest/command_ref.html#search-command)

### List packages

```sh
yum list available
yum list installed
yum list kernel
```

See: [list](https://dnf.readthedocs.io/en/latest/command_ref.html#list-command)

### Dependencies

```sh
yum deplist nfs-utils
```

See: [deplist](https://dnf.readthedocs.io/en/latest/command_ref.html#deplist-command)

## Repositories
<!-- {: .-three-column} -->

### List and inspect

```sh
yum repolist
yum repoinfo rhel-7-server-rpms
```

See: [repolist](https://dnf.readthedocs.io/en/latest/command_ref.html#repolist-command)

### Repository packages

```sh
yum repo-pkgs my-rpms list
yum repo-pkgs my-rpms install
```

See: [repository-packages](https://dnf.readthedocs.io/en/latest/command_ref.html#repository-packages-command)

### Cache

```sh
yum makecache
yum clean packages
yum clean all
```

See: [makecache](https://dnf.readthedocs.io/en/latest/command_ref.html#makecache-command)

## Security updates

### List advisories

```sh
yum updateinfo list security
yum updateinfo list bugfix
```

See: [updateinfo](https://dnf.readthedocs.io/en/latest/command_ref.html#updateinfo-command)

### Apply

```sh
yum update --security
yum update --security --sec-severity=Critical
```

<!-- see: none: --security comes from the yum security plugin, which has no first-party docs page -->

## Groups
<!-- {: .-three-column} -->

### Install a group

```sh
yum groupinstall "Web Server"
```

See: [group](https://dnf.readthedocs.io/en/latest/command_ref.html#group-command)

### Inspect groups

```sh
yum groups list
yum group info "Web Server"
```

See: [grouplist](https://dnf.readthedocs.io/en/latest/command_ref.html#grouplist-command-label)

## History
<!-- {: .-three-column} -->

### Transactions

```sh
yum history list
yum history info 12
```

See: [history](https://dnf.readthedocs.io/en/latest/command_ref.html#history-command)

### Undo

```sh
yum history undo 12
yum history rollback 10
```

`undo` reverts one transaction; `rollback` reverts everything after the given one.

See: [history](https://dnf.readthedocs.io/en/latest/command_ref.html#history-command)

## Options

### Common flags

| Flag | Effect |
| --- | --- |
| `-y` | Assume yes to prompts |
| `--disablerepo=epel` | Skip a repo for this command |
| `--enablerepo=epel` | Add a repo for this command |

See: [options](https://dnf.readthedocs.io/en/latest/command_ref.html#options)

### Download only

```sh
yum install --downloadonly --downloaddir=/tmp vsftpd
```

Without `--downloaddir` the RPMs stay in the yum cache.

See: [downloadonly](https://dnf.readthedocs.io/en/latest/command_ref.html#downloadonly-label)

## Dnf

### Renamed commands

| yum | dnf |
| --- | --- |
| `yum groupinstall "Development Tools"` | `dnf group install "Development Tools"` |
| `yum repo-pkgs my-rpms list` | `dnf repository-packages my-rpms list` |
| `yum deplist nfs-utils` | `dnf repoquery --deplist nfs-utils` |

See: [yum to dnf](https://dnf.readthedocs.io/en/latest/cli_vs_yum.html)

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

See: [command reference](https://dnf.readthedocs.io/en/latest/command_ref.html#command-ref-label)
