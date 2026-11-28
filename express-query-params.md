---
title: How to read query params in Express
link_title: Express query params
subtitle: Read strings from req.query
logo: { src: /assets/logos/express.svg, mono: true }
category: Node.js libraries
layout: snippet
created_at: 2026-11-26
updated: 2026-11-28
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express query params, express req.query, express query string]
links:
  - title: req.query reference
    url: https://expressjs.com/en/5x/api/request/#reqquery
  - title: Express 5 migration
    url: https://expressjs.com/en/guide/migrating-5.html#reqquery
---

## Query parameters
<!-- {: .-snippets} -->

### Read a value
<!-- {: .-snippet} -->

```js
// GET /search?q=redis
app.get('/search', (req, res) => {
  res.json({ q: req.query.q }) // 'redis'
})
```
<!-- {: data-highlight="req.query.q"} -->

**Reads strings from `req.query`.** Single values are strings, so convert numbers yourself. See [req.query](https://expressjs.com/en/5x/api/request/#reqquery).

### Repeated keys
<!-- {: .-snippet} -->

```js
// GET /search?tag=a&tag=b
app.get('/search', (req, res) => {
  res.json(req.query.tag) // ['a', 'b']
})
```
<!-- {: data-highlight="req.query.tag"} -->

**Repeated keys arrive as arrays.** A single `tag` is still a string, so check with `Array.isArray()`. See [req.query](https://expressjs.com/en/5x/api/request/#reqquery).

### Defaults and numbers
<!-- {: .-snippet} -->

```js
app.get('/search', (req, res) => {
  const page = Number(req.query.page) || 1
  res.json({ page })
})
```
<!-- {: data-highlight="Number(req.query.page)"} -->

**Coerces and falls back.** The string becomes a number, falling back to `1`. `Number(undefined)` is `NaN`, which is falsy. See [req.query](https://expressjs.com/en/5x/api/request/#reqquery).

### Nested keys
<!-- {: .-snippet} -->

```js
// GET /search?user[name]=ann
req.query['user[name]'] // 'ann'
```
<!-- {: data-highlight="req.query['user[name]']"} -->

**Keeps nested keys flat.** Express 5 does this by default. Set `app.set('query parser', 'extended')` to parse them into objects. See the [migration guide](https://expressjs.com/en/guide/migrating-5.html#reqquery).
