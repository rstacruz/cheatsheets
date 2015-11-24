---
title: ncftp
category: CLI
---

Bookmarking

    $ ncftp
    $ open -u username ftp.host.com
    $ bookmark bookmarkname

Mass download

    $ ncftpget -R bookmarkname /www/ .

Mass upload

    $ ncftpget -R bookmarkname /www/ .

    $ ncftpget -R bookmarkname /www/ .

Upload just the changed files

    $ git show --pretty="format:" --name-only HEAD~1
    $ ncftpget -R -C log bookmarkname /www/ .
