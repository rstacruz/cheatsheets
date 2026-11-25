---
title: ncftp
subtitle: Command-line FTP client
category: Networking
last_verified_with: "NcFTP Client 3.3.0."
updated: 2026-11-25
tier: t3
---

### Bookmarking

```bash
$ ncftp
$ open -u username ftp.host.com
$ bookmark bookmarkname
```

<!-- {: data-highlight="open; bookmark"} -->

See: [ncftp manual](https://www.ncftp.com/ncftp/doc/ncftp.html)

### Mass download

```bash
$ ncftpget -R bookmarkname /www/ .
```

<!-- {: data-highlight="ncftpget -R"} -->

See: [ncftpget manual](https://www.ncftp.com/ncftp/doc/ncftpget.html)

### Mass upload

```bash
$ ncftpput -R bookmarkname /www/ .
```

<!-- {: data-highlight="ncftpput -R"} -->

See: [ncftpput manual](https://www.ncftp.com/ncftp/doc/ncftpput.html)

### Upload just the changed files

```bash
$ git show --pretty="format:" --name-only HEAD~1
$ ncftpget -R -C log bookmarkname /www/ .
```

<!-- {: data-highlight="git show; ncftpget -R -C"} -->

See: [ncftpget manual](https://www.ncftp.com/ncftp/doc/ncftpget.html)
