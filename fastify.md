---
title: Fastify
category: JavaScript libraries
updated: 2017-09-23
---

## Getting started

### Introduction
{: .-intro}

[Fastify](https://github.com/fastify/fastify) lets you create HTTP servers in Node.js with good performance. This guide targets fastify v0.28.x.

- [Fastify source code](https://github.com/fastify/fastify) _(github.com)_
- [Documentation](https://github.com/fastify/fastify#documentation) _(github.com)_

### Hello world
{: .-prime}

```js
const fastify = require('fastify')()

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen(3000, err => {
  if (err) throw err
  const port = fastify.server.address().port
  console.log(`server listening on ${port}`)
})
```

### Plugins

#### app.js

```js
fastify.register(require('./route'))
```

#### route.js

```js
function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  })

  next()
})
```

Compose your app functionality into plugins. Plugins are simply functions.

See: [Plugins](https://github.com/fastify/fastify/blob/master/docs/Plugins.md)

## Routes

### Writing routes

```js
fastify.route({
  method: 'GET',
  url: '/',
  schema: { ··· },
  handler: (req, reply) => { ··· }
  beforeHandler: (req, reply, done) => { ··· }
})
```

### Shorthand declarations

```js
fastify.get(path, [options], handler)
fastify.head(···)
fastify.post(···)
fastify.put(···)
fastify.delete(···)
fastify.options(···)
fastify.patch(···)
```

### Async/await

```js
fastify.get('/', options, async (req, reply) => {
  return data
  // or
  reply.send(data)
})
```

When using async functions, you can either `return` data or use `reply.send`.

Request/reply
-------------

### Request

```js
request.query
request.body
request.params
request.headers
request.req  // Node.js core
request.log.info('hello')
```

See: [Request](https://github.com/fastify/fastify/blob/master/docs/Request.md)

### Reply

#### Response headers

```js
reply.code(404)
reply.header('Content-Type', 'text/html')
reply.type('text/html')
```

#### Redirects

```js
reply.redirect('/foo')
reply.redirect(302, '/foo')
```

#### Sending

```js
reply.send(payload)
reply.sent // → true|false
```

See: [Reply](https://github.com/fastify/fastify/blob/master/docs/Reply.md)

### JSON schema

#### Define a JSON schema

```js
const schema = {
  querystring: {
    name: { type: 'string' },
    excitement: { type: 'integer' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        hello: { type: 'string' }
      }
    }
  }
}
```

#### Pass it to the route

```js
fastify.get('/', { schema }, (req, reply) => {
  ···
})
```
{: data-line="1"}

#### or (same as above)

```js
fastify.route({
  method: 'GET',
  url: '/',
  schema,
  handler: (req, reply) => { ··· }
})
```
{: data-line="4"}

By defining a JSON schema, you get validation and improved performance.

See: [Validation and serialization](https://github.com/fastify/fastify/blob/master/docs/Validation-and-Serialization.md)

Plugins
-------

### With function

```js
fastify.register(
  require('./route'),
  err => { if (err) throw err }
)
```
{: data-line="3"}

#### route.js

```js
module.exports = (fastify, options, next) => {
  fastify.get('/', ···)
  next()
}
```


See: [Register](https://github.com/fastify/fastify/blob/master/docs/Getting-Started.md#register)

### Multiple

```js
fastify.register([
  require('./another-route'),
  require('./yet-another-route')
], opts, (err) => {
  if (err) throw err
})
```

You can pass arrays to `register()`.

### Register with prefix

```js
fastify.register(
  require('./route'),
  { prefix: '/v1' }
)
```

This prefixes all routes in that module.

### Helmet

```js
const helmet = require('fastify-helmet')

fastify.register(helmet)
```

See: [fastify-helmet](https://github.com/fastify/fastify-helmet)

### fastify-plugin

```js
const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  // your plugin code
  fastify.decorate('utility', () => {})

  next()
}, '0.x')
```

Allows you to limit Fastify versions via semver, and allows you not make a new Fastify scope.

See: [fastify-plugin](https://github.com/fastify/fastify-plugin)

### Decorators

Middleware
----------

### Middleware

```js
fastify.use(require('cors')())
fastify.use(require('dns-prefetch-control')())
fastify.use(require('frameguard')())
fastify.use(require('hide-powered-by')())
fastify.use(require('hsts')())
fastify.use(require('ienoopen')())
fastify.use(require('x-xss-protection')())
```

Compatible with Express and Restify middlewares. (Don't use these middleware, these are covered by [fastify-helmet](https://github.com/fastify/fastify-helmet).)

See: [Middlewares](https://github.com/fastify/fastify/blob/master/docs/Middleware.md)

Template rendering
------------------

### point-of-view

```js
const fastify = require('fastify')()

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
})
```
{: data-line="3"}

```js
fastify.get('/', (req, reply) => {
  reply.view('/templates/index.ejs', { text: 'text' })
})
```
{: data-line="2"}

Support `ejs`, `pug`, `handlebars` and `marko`.

See: [point-of-view](https://github.com/fastify/point-of-view)

### Options

```js
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  },
  templates: '/templates',
  options: {}
})
```

`templates` lets you update the templates folder. `options` are options passed onto the template engines.
