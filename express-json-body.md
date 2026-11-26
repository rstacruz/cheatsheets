---
title: How to parse a JSON body in Express
link_title: Parse JSON body
subtitle: Read req.body with express.json
category: Node.js
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express json body, express body parser, express req.body]
links:
  - title: express.json() reference
    url: https://expressjs.com/en/5x/api/express/#expressjson
  - title: express.urlencoded() reference
    url: https://expressjs.com/en/5x/api/express/#expressurlencoded
---

## Request bodies
<!-- {: .-snippets} -->

### JSON
<!-- {: .-snippet} -->

```js
app.use(express.json())

app.post('/users', (req, res) => {
  res.status(201).json(req.body)
})
```

**Parses `application/json` into `req.body`.** Without a parser, `req.body` stays `undefined`. See [express.json()](https://expressjs.com/en/5x/api/express/#expressjson).

### Form bodies
<!-- {: .-snippet} -->

```js
app.use(express.urlencoded({ extended: true }))
```

**Parses HTML form posts.** `extended: true` allows nested fields; the default only handles flat keys. See [express.urlencoded()](https://expressjs.com/en/5x/api/express/#expressurlencoded).

### Size limit
<!-- {: .-snippet} -->

```js
app.use(express.json({ limit: '1mb' }))
```

**Caps the request body.** Larger payloads fail with a 413 that reaches your error handler. See [express.json()](https://expressjs.com/en/5x/api/express/#expressjson).

### Missing body
<!-- {: .-snippet} -->

```js
app.post('/users', (req, res) => {
  const name = req.body?.name
  res.json({ name })
})
```

**Guards against unparsed bodies.** Optional chaining avoids a crash when the client sends no JSON. See [req.body](https://expressjs.com/en/5x/api/request/#reqbody).
