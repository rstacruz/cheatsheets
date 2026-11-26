---
title: How to write Express middleware
link_title: Express middleware
subtitle: Functions that run before routes
category: Web frameworks
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express middleware, express auth middleware, express next]
links:
  - title: Writing middleware guide
    url: https://expressjs.com/en/5x/guide/writing-middleware.html
  - title: Using middleware guide
    url: https://expressjs.com/en/5x/guide/using-middleware.html
---

## Middleware
<!-- {: .-snippets} -->

### Logger
<!-- {: .-snippet} -->

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url)
  next()
}

app.use(logger)
```
<!-- {: data-highlight="next()"} -->

**Runs on every request.** Call `next()` to continue; a middleware that neither responds nor calls it hangs the request. See [writing middleware](https://expressjs.com/en/5x/guide/writing-middleware.html).

### Auth guard
<!-- {: .-snippet} -->

#### Middleware

```js
const auth = (req, res, next) => {
  if (req.headers.authorization) return next()
  res.status(401).json({
    error: 'unauthorized'
  })
}
```
<!-- {: data-highlight="res.status(401)"} -->

#### Protected route

```js
app.get('/admin', auth, (req, res) => {
  res.json({ ok: true })
})
```
<!-- {: data-highlight="auth"} -->

**Sends a 401 unless the request carries an `authorization` header.** Pass it as a route handler, or mount it with `app.use('/admin', auth)`. See [using middleware](https://expressjs.com/en/5x/guide/using-middleware.html).

### Order of execution
<!-- {: .-snippet} -->

```js
app.use(express.json())
app.use(auth)
app.get('/me', (req, res) => {
  res.json(req.user)
})
```
<!-- {: data-highlight="app.use"} -->

**Runs middleware in registration order.** Parsers and guards must come before the routes that read their results. See [using middleware](https://expressjs.com/en/5x/guide/using-middleware.html).
