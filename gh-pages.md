---
title: GitHub pages
subtitle: GitHub Pages deployment
category: Jekyll
---

## Custom domains

### Custom domains

```sh
$ echo "foobar.com" > CNAME
$ git commit && git push
```

Create a `CNAME` file with your domain on it.

See: [Setting up a custom domain](https://help.github.com/articles/quick-start-setting-up-a-custom-domain/) _(github.com)_

### Set up your domain

Subdomain (like www):

<!-- {: .-setup} -->

```
 CNAME => username.github.io
```

Apex domains:

<!-- {: .-setup} -->

```
 ALIAS => username.github.io
```

Apex domains (alternative):

<!-- {: .-setup} -->

```
A => 185.199.108.153
A => 185.199.109.153
A => 185.199.110.153
A => 185.199.111.153
```

## References

<!-- {: .-one-column} -->

- <https://pages.github.com>
