---
title: Fastify
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-09-21
intro: |
  [Fastify](https://github.com/fastify/fastify) lets you create HTTP servers in Node.js with good performance. This guide targets fastify v0.28.x.
---

### Hello world
{: .-prime}

```js
const fastify = require('fastify')()

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

### Register

#### app.js

```js
fastify.register(require('./route')), err => {
  if (err) throw err
})
```

#### route.js

```js
function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  })
})
```

See: [Register](https://github.com/fastify/fastify/blob/master/docs/Getting-Started.md#register)

### Register with prefix

```js
fastify.register(
  require('./route'),
  { prefix: '/v1' }
)
```

This prefixes all routes in that module.

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

## Request/reply

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

See: [Validation and serialize](https://github.com/fastify/fastify/blob/master/docs/Validation-And-Serialize.md)
