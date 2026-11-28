---
title: ncftp
subtitle: Command-line FTP client
logo: { set: icon-park-outline, name: transfer-data }
category: Networking
last_verified_with: "NcFTP Client 3.3.0."
created_at: 2012-07-03
updated: 2026-11-25
tier: t3
intro: |
  [ncftp](https://www.ncftp.com/ncftp/) is an interactive FTP client with bookmarks and recursive transfers. This sheet covers bookmarking and bulk uploads or downloads.
links:
  - title: NcFTP Client
    url: https://www.ncftp.com/ncftp/
  - title: ncftp manual
    url: https://www.ncftp.com/ncftp/doc/ncftp.html
  - title: ncftpput manual
    url: https://www.ncftp.com/ncftp/doc/ncftpput.html
---

### Bookmarking

```bash
$ ncftp
$ open -u username ftp.host.com
$ bookmark bookmarkname
```

<!-- {: data-highlight="bookmark"} -->

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
$ git show --pretty="format:" --name-only HEAD~1 \
  | xargs ncftpput bookmarkname /www/
```
<!-- {: data-highlight="ncftpput"} -->

See: [ncftpput manual](https://www.ncftp.com/ncftp/doc/ncftpput.html)
