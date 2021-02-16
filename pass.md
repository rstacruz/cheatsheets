---
title: Pass
layout: 2017/sheet
category: CLI
---

Reference
---------

### Create

``` bash
$ pass init [-p] <gpg-id>
$ pass git init
$ pass git remote add origin <your.git:repository>
$ pass git push -u --all
```

### Store

``` bash
$ pass insert [-m] twitter.com/rsc
$ pass generate [-n] twitter.com/rsc length
```

### Retrieve

``` bash
$ pass ls twitter.com/
$ pass show twitter.com/rsc
$ pass -c twitter.com/rsc
```

### Search

``` bash
$ pass find twitter.com
```

### Management

``` bash
$ pass mv twitter.com twitter.com/rsc
$ pass rm [-rf] twitter.com
$ pass cp twitter.com/rsc twitter.com/ricosc
```

``` bash
$ pass edit twitter.com/rsc
```

### Synchronize

```
$ pass git push
$ pass git pull
```

## References

* <http://passwordstore.org>
