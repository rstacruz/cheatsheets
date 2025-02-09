---
title: Divshot
tags: [Archived]
archived: Divshot is no longer in operation.
---

## Getting started

### About

Divshot was a static hosting platform.

- <https://divshot.com/>

### Install divshot-cli

```
$ npm install -g divshot-cli
$ divshot login
```

### Create divshot.json

```json
{
  "name": "yourapp",
  "root": "./app"
}
```

### Push your app

```
$ divshot push
```

## Configuration

See [configuration reference](https://docs.divshot.com/guides/configuration) and [routing guide](https://docs.divshot.com/guides/routing).

```json
{
  "name": "yourapp",
  "root": "./app",
  "clean_urls": true,
  "clean_urls": ["/app/**", "/!components/**"],,
  "error_page": "error.html",
  "exclude": [ "Gruntfile.js" ],
  "cache_control": {},
  "routes": {
    "/*.html": "index.html",
    "/app/**/*.html": "app.html",
    "**": "index.html"
  },
  "redirects": {
    "/old/:segment/path": "/new/path/:segment",
    "/some/old/path": {
      "status": 302,
      "url": "/some/new/path"
    }
  },
  "headers": {
    "/cors-stuff/**": {
      "Access-Control-Allow-Origin": "*"
    },
    "/scripts/**": {
      "content-type": "text/javascript"
    }
  }
}
```

## CLI

```sh
divshot s   # server

divshot push [staging|production|development]
divshot pull [staging|production|development]
divshot purge   # cleans cache
divshot files

divshot promote development production

divshot open [<env>]
```

### Config
Edits `divshot.json`

```

divshot config:add name your-app-name
divshot config:remove name
```

### Environment vars

```
divshot env:add <env> KEY=value
divshot env:remove <env> KEY
divshot env:pull <env>
```

### App management

```
divshot create <appname>
divshot rename <newname>
divshot status
divshot destroy
```

divshot apps
divshot account
```

### Password protect

```sh
divshot protect <env> <username:password>
```

## Custom domains

See [custom domains guide](http://docs.divshot.com/guides/domains).

```sh
divshot domains:add foo.bar.com
```

In your DNS create a `CNAME`: (no apex domains are supported)

```
www.    CNAME    yourname.divshot.io
```
