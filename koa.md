---
title: Koa
created_at: 2016-01-21
subtitle: Async middleware framework
category: Hidden
# Generator middleware examples do not run on Koa 2+; Koa 3 dropped generators.
tags: [Archived]
archived: |
  These examples use generator middleware, which Koa 2 replaced with
  async/await and Koa 3 no longer supports. Use
  [async middleware](https://koajs.com/).
intro: |
  Koa is a web framework for Node.js.
links:
  - title: https://koajs.com/
    url: https://koajs.com/
---

### Reference

```js
app.use(function * (next) {
  var ctx = this

  ctx.request
  ctx.response

  ctx.body = 'hello'

  ctx.state.user = yield User.find(id).fetch()

  ctx.cookies.set('foo', 'hello', { signed: true })
  ctx.cookies.get('foo')

  ctx.throw(403)
```

### Request

```js
  ctx.header        // ctx.headers
  ctx.method        // and =
  ctx.url           // and =
  ctx.originalUrl
  ctx.origin        // => 'http://example.com'
  ctx.href          // => 'http://example.com/foo?q=hello'
  ctx.path          // and =
  ctx.query         // { q: 'hello' }
  ctx.query         // and =
  ctx.querystring
  ctx.querystring   // and =
  ctx.host
  ctx.hostname
  ctx.fresh
  ctx.stale
  ctx.socket
  ctx.protocol
  ctx.secure
  ctx.ip
  ctx.ips
  ctx.subdomains
  ctx.is()                  // .is('html') .is('text/html')
  ctx.accepts()             // .accepts('html') .accepts('html', 'json')
  ctx.acceptsEncodings()    // .acceptsEncodings('gzip')
  ctx.acceptsCharsets()
  ctx.acceptsLanguages()
  ctx.get()

  ctx.request.type          // => 'image/jpg'
  ctx.request.charset       // => 'utf-8'
  ctx.request.protocol      // => 'https'
  ctx.request.secure        // => true
  ctx.request.ip            // (supports X-Forwarded-For if app.proxy)
  ctx.request.ips
  ctx.request.subdomains

  ctx.request.fresh
  ctx.request.stale
```

### Response

```js
  ctx.body = 'hello'

  ctx.throw(403)
  ctx.throw('name required', 403)
  ctx.throw(403, 'name required')
  ctx.throw('oops')
  ctx.assert(ctx.state.user, 401, 'You must log in')
```

### Middlewares

```js
exports.conditionalGet = require('koa-conditional-get');
exports.responseTime = require('koa-response-time');
exports.ratelimit = require('koa-ratelimit');
exports.compress = require('koa-compress');
exports.rewrite = require('koa-rewrite');
exports.favicon = require('koa-favicon');
exports.session = require('koa-session');
exports.static = require('koa-static');
exports.logger = require('koa-logger');
exports.mount = require('koa-mount');
exports.etag = require('koa-etag');
```
