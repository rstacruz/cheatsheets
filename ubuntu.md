title: Ubuntu/Debian
----

### Aptitude stuff

    aptitude search mysql       # Look for something
    dpkg -S `which tsclient`    # What package does it belong to?
    dpkg -L aria2c              # What does this package provide?
    dpkg -i *.deb               # Install a deb file

### Apt archives path

    /var/cache/apt/archives
