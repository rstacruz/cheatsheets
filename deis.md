---
title: Deis
category: Devops
layout: 2017/sheet
---

### Deploy

```
deis create app-name
git push deis master
deis open
```

### Deploy dockerfile

```sh
$ deis create app-name
$ deis pull redis:latest
  Creating build...  done, v2
# default process type is `cmd`
```

### Config

```
deis config:list
deis config:set FOO=bar BAZ=foo
deis config:unset FOO
deis config:pull  # writes to .env
deis config:push  # reads from .env
```

### Managing instances

```
deis logs
deis run rake db:migrate
deis ps
```

### Custom domains

```
deis domains:list
deis domains:add www.myapp.com
deis domains:remove www.myapp.com
```

### Limits

```sh
deis limits:set web=1G
deis limits:set web=1024 --cpu
# (`web` is a process type)
```

### Sharing

```
deis perms:create otheruser
```

### SSL

```
deis certs:add server.crt server.key
```

See: [SSL](http://docs.deis.io/en/latest/using_deis/app-ssl/)
