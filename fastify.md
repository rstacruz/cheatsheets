---
title: Fastify
category: JavaScript libraries
updated: 2026-11-14
intro: |
  [Fastify](https://fastify.dev) is a Node.js web framework with a fast router, JSON-schema validation, and a pino logger. This reference targets Fastify v5.
links:
  - title: Documentation
    url: https://fastify.dev/docs/latest/
  - title: GitHub repository
    url: https://github.com/fastify/fastify
---

## Getting started

### Hello world

<!-- {: .-prime} -->

```js
import Fastify from 'fastify'

const app = Fastify({ logger: true })

app.get('/', async () => {
  return { hello: 'world' }
})

await app.listen({ port: 3000 })
```

`listen` takes an object. It binds `127.0.0.1` by default; pass `host: '0.0.0.0'` inside a container.

See: [Getting started](https://fastify.dev/docs/latest/Guides/Getting-Started/)

### Project layout

#### app.js

```js
import Fastify from 'fastify'

export function build (opts = {}) {
  const app = Fastify(opts)
  app.get('/', async () => ({ hello: 'world' }))
  return app
}
```

#### server.js

```js
import { build } from './app.js'

const app = build({ logger: true })
await app.listen({ port: 3000, host: '0.0.0.0' })
```

Keeping the app separate from `listen` lets tests call `app.inject()` without a port.

See: [Testing](https://fastify.dev/docs/latest/Guides/Testing/)

### Graceful shutdown

```js
process.on('SIGTERM', async () => {
  await app.close()
  process.exit(0)
})
```

`close()` waits for in-flight requests and runs `onClose` hooks, so pools and queues close with the server.

See: [close](https://fastify.dev/docs/latest/Reference/Server/#close)

## Routing

### Shorthand

```js
app.get('/users/:id', async (request) => {
  return { id: request.params.id }
})

app.post('/users', async (request) => {
  return request.body
})
```

`get`, `post`, `put`, `patch`, `delete`, `head`, `options`, and `trace` all take the same arguments.

See: [Routes](https://fastify.dev/docs/latest/Reference/Routes/)

### Full declaration

```js
app.route({
  method: 'GET',
  url: '/users/:id',
  schema: {
    params: {
      type: 'object',
      properties: { id: { type: 'string' } }
    }
  },
  handler: async (request) => ({ id: request.params.id })
})
```

`method` also takes an array, and `url` has an alias `path`. The full form accepts every hook as an option.

See: [Full declaration](https://fastify.dev/docs/latest/Reference/Routes/#full-declaration)

### Route options

```js
app.get('/admin', {
  logLevel: 'warn',
  bodyLimit: 1024,
  config: { role: 'admin' },
  handler: async () => ({ ok: true })
})
```

`config` is arbitrary data, read back as `request.routeOptions.config`. `exposeHeadRoute` adds a `HEAD` sibling for `GET`.

See: [Routes options](https://fastify.dev/docs/latest/Reference/Routes/#routes-options)

### Error handling

```js
app.setErrorHandler((error, request, reply) => {
  request.log.error(error)
  reply.code(error.statusCode ?? 500)
    .send({ error: error.message })
})
```

Throw from a handler and Fastify lands here; the default handler returns `{ statusCode, error, message }`.

See: [setErrorHandler](https://fastify.dev/docs/latest/Reference/Server/#seterrorhandler)

## Plugins

### Writing a plugin

```js
async function routes (app, opts) {
  app.get('/', async () => ({ hello: opts.name }))
}

export default routes
```

```js
await app.register(routes, { name: 'world' })
```

Everything in Fastify is a plugin: routes, decorators, hooks, and third-party packages.

See: [Plugins](https://fastify.dev/docs/latest/Reference/Plugins/)

### Encapsulation

```js
app.register(async (scope) => {
  scope.decorate('db', { users: [] })
  scope.get('/internal', async () => scope.db.users)
})
```

Decorators and hooks stay inside the plugin that added them. Sibling plugins cannot see `db`, and routes added outside the plugin cannot either.

See: [Encapsulation](https://fastify.dev/docs/latest/Reference/Plugins/#encapsulation)

### fastify-plugin

```js
import fp from 'fastify-plugin'

export default fp(async (app) => {
  app.decorate('db', await connect())
}, { name: 'db', fastify: '5.x' })
```

Wrapping a plugin skips encapsulation, so its decorators land on the parent instance. The metadata names the plugin and pins compatible versions.

See: [fastify-plugin](https://github.com/fastify/fastify-plugin)

### Official plugins

| Package | Adds |
| --- | --- |
| `@fastify/cors` | CORS headers |
| `@fastify/helmet` | Security headers |
| `@fastify/cookie` | Cookie parsing and signing |
| `@fastify/jwt` | JWT authentication |
| `@fastify/static` | Static file serving |
| `@fastify/autoload` | Load a folder as plugins |
| `@fastify/swagger` | OpenAPI from route schemas |

Every `fastify-*` package moved to the `@fastify` scope in v4, and the old names are unmaintained.

See: [Ecosystem](https://fastify.dev/ecosystem/)

## Hooks

### Lifecycle

| Hook | Runs |
| --- | --- |
| `onRequest` | First; `request.body` is still undefined |
| `preParsing` | Before the payload is parsed |
| `preValidation` | After parsing, before validation |
| `preHandler` | Before the route handler |
| `preSerialization` | Before the reply is serialized |
| --- | --- |
| `onError` | When the handler or a hook throws |
| `onSend` | Before the reply is flushed |
| `onResponse` | After the reply is sent |
| `onTimeout` | When `handlerTimeout` expires |
| `onRequestAbort` | When the client disconnects |

Application hooks (`onReady`, `onListen`, `onClose`, `onRoute`) cover the server, not a request.

See: [Lifecycle](https://fastify.dev/docs/latest/Reference/Lifecycle/)

### Adding hooks

```js
app.addHook('onRequest', async (request) => {
  request.start = Date.now()
})

app.addHook('onResponse', async (request) => {
  request.log.info({ ms: Date.now() - request.start })
})
```

Never pass a `done` callback to an `async` hook; return or throw instead.

See: [Hooks](https://fastify.dev/docs/latest/Reference/Hooks/)

### Route hooks

```js
app.get('/private', {
  onRequest: [authenticate],
  preHandler: [loadUser],
  handler: async (request) => ({ user: request.user })
})
```

Route hooks run after the ones registered on the instance, and each option takes an array.

See: [Route-level hooks](https://fastify.dev/docs/latest/Reference/Hooks/#route-level-hooks)

## Schemas

### Validation

```js
const schema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      age: { type: 'integer', minimum: 0 }
    }
  }
}

app.post('/users', { schema }, async (request) => {
  return request.body
})
```

v5 removed schema shorthand, so every schema needs `type`. An invalid request gets a `400` before the handler runs.

See: [Validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)

### Response serialization

```js
const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' }
      }
    }
  }
}
```

`fast-json-stringify` compiles the schema and drops properties it does not list, which is both faster and safer than `JSON.stringify`.

See: [Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#serialization)

### Shared schemas

```js
app.addSchema({
  $id: 'user',
  type: 'object',
  properties: { id: { type: 'string' } }
})

app.get('/me', {
  schema: { response: { 200: { $ref: 'user#' } } }
}, handler)
```

`addSchema` is encapsulated, so a schema added in a plugin stays in that plugin's scope.

See: [Adding a shared schema](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#adding-a-shared-schema)

## Request and reply

### Request

| Property | Holds |
| --- | --- |
| `request.body` | Parsed payload |
| `request.query` | Parsed query string |
| `request.params` | Route parameters |
| `request.headers` | Request headers |
| `request.id` | Request ID, also in every log line |
| --- | --- |
| `request.ip` | Client IP; `request.ips` when behind a proxy |
| `request.host` | Host and port from the `Host` header |
| `request.protocol` | `http` or `https` |
| `request.log` | Request-scoped pino logger |
| `request.raw` | Node.js `IncomingMessage` |

`request.signal` aborts when the handler times out or the client disconnects.

See: [Request](https://fastify.dev/docs/latest/Reference/Request/)

### Reply

```js
reply.code(201)
reply.header('X-Request-Id', request.id)
reply.type('text/html')
reply.redirect('/login')        // 302
reply.redirect('/login', 301)
reply.send({ ok: true })
reply.callNotFound()
```

Returning a value from an `async` handler is the same as calling `reply.send()`. `reply.sent` tells you whether a response has gone out.

See: [Reply](https://fastify.dev/docs/latest/Reference/Reply/)

### Decorators

```js
app.decorate('db', connect())
app.decorateRequest('user', null)
app.decorateReply('cache', null)
```

```js
app.addHook('preHandler', async (request) => {
  request.user = await request.server.db.findUser(request)
})
```

Declare request decorators with a scalar such as `null` or `''`. Assigning a reference type at startup throws.

See: [Decorators](https://fastify.dev/docs/latest/Reference/Decorators/)

## Logging

### Setup

```js
const app = Fastify({
  logger: {
    level: 'info',
    transport: { target: 'pino-pretty' }
  }
})
```

A custom instance goes in `loggerInstance`; v5 stopped accepting one in `logger`.

```js
import pino from 'pino'

const app = Fastify({ loggerInstance: pino({ level: 'warn' }) })
```

`pino-pretty` is a dev dependency, not bundled.

See: [Logging](https://fastify.dev/docs/latest/Reference/Logging/)

### Request logs

```js
app.get('/', async (request) => {
  request.log.info({ user: request.user }, 'loading dashboard')
  return { ok: true }
})
```

Fastify logs one line per request by default. Set `disableRequestLogging: true` to silence it and log from hooks yourself.

See: [Request logging](https://fastify.dev/docs/latest/Reference/Logging/#usage)

### Redaction

```js
const app = Fastify({
  logger: {
    redact: {
      paths: ['req.headers.authorization', 'req.body.password'],
      censor: '[redacted]'
    }
  }
})
```

Redaction is a pino feature, so it applies to child loggers such as `request.log` too.

See: [pino redaction](https://getpino.io/#/docs/redaction)

## Testing

### inject

```js
const response = await app.inject({
  method: 'POST',
  url: '/users',
  payload: { name: 'Ada' }
})

response.statusCode   // 201
response.json()       // { id: '1', name: 'Ada' }
```

`inject()` boots every plugin and sends a fake request through the real lifecycle; no port is bound.

See: [Testing with HTTP injection](https://fastify.dev/docs/latest/Guides/Testing/#testing-with-http-injection)

### node:test

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { build } from './app.js'

test('GET /', async (t) => {
  const app = build()
  t.after(() => app.close())

  const res = await app.inject({ method: 'GET', url: '/' })
  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.json(), { hello: 'world' })
})
```

Call the same `build()` helper the server calls, so tests exercise the real plugin tree.

See: [Testing](https://fastify.dev/docs/latest/Guides/Testing/)
