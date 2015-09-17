---
title: Divshot
---

### Install divshot-cli

```
$ npm install -g divshot-cli
$ divshot login
```

### Create `divshot.json`

Only `root` is mandatory.

```json
{
  "name": "yourapp",
  "root": "./app"
}
```

### Push your app

```
$ divshot config:add name your-app-name-here
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
