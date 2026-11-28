---
title: How to handle errors in Express
link_title: Express error handling
subtitle: Error handlers and 404s
logo: { src: /assets/logos/express.svg, mono: true }
category: Node.js libraries
layout: snippet
updated: 2026-11-28
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express error handling, express error middleware, express 404]
links:
  - title: Error handling guide
    url: https://expressjs.com/en/5x/guide/error-handling.html
  - title: Express 5 migration
    url: https://expressjs.com/en/guide/migrating-5.html
---

## Error handling
<!-- {: .-snippets} -->

### Error handler
<!-- {: .-snippet} -->

```js
app.use((err, req, res, next) => {
  res.status(err.status ?? 500)
  res.json({ error: err.message })
})
```
<!-- {: data-highlight="(err, req, res, next)"} -->

**Catches errors.** It receives errors passed with `next(err)`; register it last, after routes, and give it four parameters to mark it as an error handler. See [error handling](https://expressjs.com/en/5x/guide/error-handling.html).

### Async errors
<!-- {: .-snippet} -->

```js
app.get('/users', async (req, res) => {
  const users = await db.users.all()
  res.json(users)
})
```
<!-- {: data-highlight="async"} -->

**Forwards rejected promises automatically.** Express 5 sends them to the error handler, so no `try/catch` is needed. See the [migration guide](https://expressjs.com/en/guide/migrating-5.html#rejected-promises-handled-from-middleware-and-handlers).

### 404 responses
<!-- {: .-snippet} -->

```js
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})
```
<!-- {: data-highlight="res.status(404)"} -->

**Answers unmatched routes.** Put it after every route and before the error handler. See the [FAQ](https://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses).

### Custom status codes
<!-- {: .-snippet} -->

```js
app.get('/admin', (req, res) => {
  const err = new Error('Forbidden')
  err.status = 403
  throw err
})
```
<!-- {: data-highlight="err.status"} -->

**Sets a custom status.** The error handler sends it; any `Error` without `status` becomes a 500. See [error handling](https://expressjs.com/en/5x/guide/error-handling.html).
