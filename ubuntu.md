---
title: Ubuntu
---

### Aptitude stuff

    aptitude search mysql       # Look for something
    dpkg -S `which tsclient`    # What package does it belong to?
    dpkg -L aria2c              # What does this package provide?
    dpkg -i *.deb               # Install a deb file
    dpkg -s nodejs              # Show info

    dpkg --get-selections       # list installed packages

### Apt archives path

    /var/cache/apt/archives

### List services

    service --status-all
