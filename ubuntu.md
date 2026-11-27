---
title: Ubuntu
subtitle: Linux distribution
logo: { src: /assets/logos/ubuntu.svg }
category: Linux
intro: |
  Ubuntu is a Debian-based Linux distribution.
links:
  - title: aptitude(8)
    url: https://manpages.debian.org/bookworm/aptitude/aptitude.8.en.html
  - title: apt-get(8)
    url: https://manpages.debian.org/bookworm/apt/apt-get.8.en.html
  - title: dpkg(1)
    url: https://manpages.ubuntu.com/manpages/noble/en/man1/dpkg.1.html
tier: t3
last_verified_with: "Ubuntu 24.04 LTS."
updated: 2026-11-26
---

## System administration

### Aptitude stuff

```
aptitude search mysql       # Look for something
dpkg -S `which tsclient`    # What package does it belong to?
dpkg -L aria2c              # What does this package provide?
dpkg -i *.deb               # Install a deb file
dpkg -s nodejs              # Show info

dpkg --get-selections       # list installed packages
```
<!-- {: data-highlight="aptitude search; dpkg -S; dpkg -L; dpkg -i"} -->

See: [aptitude(8)](https://manpages.debian.org/bookworm/aptitude/aptitude.8.en.html), [dpkg(1)](https://manpages.ubuntu.com/manpages/noble/en/man1/dpkg.1.html)

### Apt archives path

```
/var/cache/apt/archives
```

See: [apt-get(8)](https://manpages.debian.org/bookworm/apt/apt-get.8.en.html)

### List services

```
service --status-all
```

See: [service(8)](https://manpages.ubuntu.com/manpages/noble/en/man8/service.8.html)
