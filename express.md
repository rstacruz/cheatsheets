---
title: Express
subtitle: Node.js web framework
category: Web frameworks
updated: 2026-11-26
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t2
fragments:
  - "express()"
  - "app.get"
  - "app.use"
  - "express.json()"
  - "express.Router()"
  - ":id"
  - "{/:id}"
  - "/*splat"
  - "req.params.id"
  - "req.query.q"
  - "res.status(404)"
  - "res.json()"
  - "next(err)"
  - "express.static"
  - "res.render"
  - "app.listen"
keywords:
  - express
  - express.js
  - express middleware
  - express router
  - express error handling
  - express 5
  - express json body
  - express static files
intro: |
  [Express](https://expressjs.com) is a Node.js web framework built on routing and middleware. This reference covers Express 5.
links:
  - title: Express documentation
    url: https://expressjs.com/
  - title: Express 5 API reference
    url: https://expressjs.com/en/5x/api/
  - title: GitHub repository
    url: https://github.com/expressjs/express
---

## Getting started

### Hello world
<!-- {: .-prime} -->

```js
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000)
```

Express 5 requires Node 18 or newer. Examples use ESM; CommonJS uses `require('express')`.

See: [Hello world](https://expressjs.com/en/starter/hello-world.html)

### JSON bodies

```js
app.use(express.json())

app.post('/users', (req, res) => {
  res.status(201).json(req.body)
})
```
<!-- {: data-highlight="express.json()"} -->

`express.json()` parses `application/json` into `req.body`. Without a parser, `req.body` stays `undefined`.

See: [express.json()](https://expressjs.com/en/5x/api/express/#expressjson)

## Routing
<!-- {: .-three-column} -->

### Route methods

```js
app.get('/health', (req, res) => {
  res.send('ok')
})
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)
```
<!-- {: data-highlight="app.get; app.post; app.put; app.delete"} -->

Each method takes a path and one or more handlers.

See: [Routing](https://expressjs.com/en/5x/guide/routing.html)

### Route parameters

```js
// GET /users/42
app.get('/users/:id', (req, res) => {
  const id = req.params.id // '42'
  res.json({ id })
})
```
<!-- {: data-highlight="req.params.id"} -->

Parameters are always strings; convert them with `Number()` when needed.

See: [Route parameters](https://expressjs.com/en/5x/guide/routing.html#route-parameters)

### Optional segments

```js
app.get('/users{/:id}', (req, res) => {
  const id = req.params.id ?? null
  res.json({ id })
})
```
<!-- {: data-highlight="{/:id}"} -->

Matches `/users` and `/users/7`. Express 5 dropped the old `:id?` syntax.

See: [Path route matching](https://expressjs.com/en/guide/migrating-5.html#path-route-matching-syntax)

### Wildcards

```js
// GET /files/a/b/c.txt
app.get('/files/*splat', (req, res) => {
  const splat = req.params.splat
  res.json(splat) // ['a', 'b', 'c.txt']
})
```
<!-- {: data-highlight="/*splat"} -->

A named wildcard captures the remaining segments as an array. A bare `*` is rejected when the route is registered, so name the wildcard.

See: [Path route matching](https://expressjs.com/en/guide/migrating-5.html#path-route-matching-syntax)

### Query strings

```js
// GET /search?q=redis&tag=a&tag=b
app.get('/search', (req, res) => {
  const { q, tag } = req.query
  res.json({ q, tag })
})
```
<!-- {: data-highlight="req.query"} -->

Repeating a key gives an array. Express 5's default `simple` parser leaves `?user[name]=x` flat as `'user[name]'`.

See: [req.query](https://expressjs.com/en/5x/api/request/#reqquery)

### Request headers

```js
app.get('/users/:id', (req, res) => {
  const auth = req.get('authorization')
  const host = req.headers.host
  res.json({ auth, host })
})
```
<!-- {: data-highlight="req.get; req.headers"} -->

`req.get()` is case-insensitive; `req.headers` holds the lowercase header map.

See: [req.get](https://expressjs.com/en/5x/api/request/#reqget)

### Router modules

#### users.js

```js
import { Router } from 'express'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)

export default router
```
<!-- {: data-highlight="Router()"} -->

#### app.js

```js
import users from './users.js'

app.use('/users', users)
```
<!-- {: data-highlight="'/users'"} -->

A router is middleware: mount it on a prefix and paths inside it stay relative.

See: [express.Router](https://expressjs.com/en/5x/guide/routing/#expressrouter)

## Middleware

### Write middleware

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url)
  next()
}

app.use(logger)
```
<!-- {: data-highlight="next()"} -->

Call `next()` to continue or send a response. A middleware that neither responds nor calls `next()` hangs the request.

See: [Writing middleware](https://expressjs.com/en/5x/guide/writing-middleware.html)

### Order matters

```js
app.use(express.json()) // parse the body
app.use(auth)           // authenticate
app.get('/me', (req, res) => res.json(req.user))
```
<!-- {: data-highlight="auth"} -->

Middleware and routes run in registration order, so parsers and guards go before the routes that need them.

See: [Using middleware](https://expressjs.com/en/5x/guide/using-middleware.html)

### Built-in middleware

| Middleware | Purpose |
| --- | --- |
| `express.json()` | Parse JSON bodies |
| `express.urlencoded()` | Parse form bodies |
| `express.static()` | Serve files from a directory |
| `express.raw()` | Parse bodies into a `Buffer` |
| `express.text()` | Parse bodies into a string |
<!-- {: .-headers} -->

`express.urlencoded({ extended: true })` adds nested form fields; the default only handles flat keys.

See: [Built-in middleware](https://expressjs.com/en/5x/guide/using-middleware/#built-in-middleware)

### Static files

#### Serve a directory

```js
import path from 'node:path'

const publicDir = path.join(import.meta.dirname, 'public')

app.use(express.static(publicDir))
```
<!-- {: data-highlight="express.static"} -->

#### Mount at a prefix

```js
app.use('/assets', express.static('dist'))
// GET /assets/app.js -> dist/app.js
```
<!-- {: data-highlight="'/assets'"} -->

An absolute root keeps the directory correct when the app starts from another cwd; relative roots resolve against `process.cwd()`. `import.meta.dirname` needs Node 20.11 or newer.

See: [Serving static files](https://expressjs.com/en/starter/static-files.html)

### Third-party middleware

```js
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
```
<!-- {: data-highlight="helmet(); cors(); morgan('dev')"} -->

`helmet` sets security headers, `cors` allows cross-origin requests, and `morgan` logs requests.

See: [helmet](https://helmet.js.org/), [cors](https://github.com/expressjs/cors), [morgan](https://github.com/expressjs/morgan)

## Responses

### Status and body

```js
res.status(201).json({ id: 1 })
res.status(204).end()
res.send('text')
res.redirect(301, '/new')
```
<!-- {: data-highlight="res.status(201).json"} -->

`res.status()` only sets the code; a body method still has to send the response.

See: [Response methods](https://expressjs.com/en/5x/api/response/#methods)

### Files

```js
res.sendFile('/srv/report.pdf')
res.download('/srv/report.pdf', 'report.pdf')
res.sendStatus(404) // 'Not Found'
```
<!-- {: data-highlight="sendFile; download; sendStatus"} -->

Paths must be absolute unless you pass `{ root }`. `download` sets `Content-Disposition`.

See: [res.sendFile](https://expressjs.com/en/5x/api/response/#ressendfile)

### Templates

#### app.js

```js
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})
```
<!-- {: data-highlight="res.render"} -->

#### views/index.ejs

```html
<h1><%= title %></h1>
```

Install the engine (`npm i ejs`); `views` defaults to `./views`.

See: [Template engines](https://expressjs.com/en/5x/guide/using-template-engines.html)

## Errors
<!-- {: .-three-column} -->

### Error handler

```js
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status ?? 500).json({
    error: err.message
  })
})
```
<!-- {: data-highlight="(err, req, res, next)"} -->

Register it last, after routes. Four parameters mark it as an error handler, not ordinary middleware.

See: [Error handling](https://expressjs.com/en/5x/guide/error-handling.html)

### Async errors

```js
app.get('/users', async (req, res) => {
  const users = await db.users.all()
  res.json(users)
})
```
<!-- {: data-highlight="async"} -->

Express 5 forwards rejected promises to the error handler. Express 4 needed `try/catch` or `next(err)`.

See: [Rejected promises](https://expressjs.com/en/guide/migrating-5.html#rejected-promises-handled-from-middleware-and-handlers)

### 404 handler

```js
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})
```
<!-- {: data-highlight="res.status(404)"} -->

Place it after every route and before the error handler.

See: [404 responses](https://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses)

### Throw with a status

```js
app.get('/admin', (req, res) => {
  const err = new Error('Forbidden')
  err.status = 403
  throw err
})
```
<!-- {: data-highlight="err.status"} -->

The error handler reads `err.status`; a plain `Error` becomes a 500.

See: [Error handling](https://expressjs.com/en/5x/guide/error-handling.html)

## Also see

- [Express CORS cheatsheet](./express-cors)
- [Express error handling cheatsheet](./express-error-handling)
- [Parse JSON body cheatsheet](./express-json-body)
- [Express middleware cheatsheet](./express-middleware)
- [Express query params cheatsheet](./express-query-params)
- [Express router cheatsheet](./express-router)
- [Serve static files cheatsheet](./express-static-files)
- [Express TypeScript cheatsheet](./express-typescript)
- [Fastify cheatsheet](./fastify)
- [Hono](https://hono.dev) _(hono.dev)_
<!-- {: .-also-see} -->
