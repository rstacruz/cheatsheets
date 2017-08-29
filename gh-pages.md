---
title: GitHub pages
category: Jekyll
layout: 2017/sheet
---

## Setting up a domain

### Update your repo

```sh
$ echo "foobar.com" > CNAME
$ git commit && git push
```

Create a `CNAME` file with your domain on it.

### Set up your domain

Subdomain (like www):
{: .-setup}

     CNAME => username.github.io

Apex domains:
{: .-setup}

     ALIAS => username.github.io

Apex domains (alternative):
{: .-setup}

    A => 192.30.252.153, 192.30.252.154

## References
{: .-one-column}

- <https://pages.github.com>
