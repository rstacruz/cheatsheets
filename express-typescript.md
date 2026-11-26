---
title: How to use TypeScript with Express
link_title: Express TypeScript
subtitle: Typed handlers and bodies
category: Node.js
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, TypeScript 7.0.2, Node 26.13.1."
tier: t3
keywords: [express typescript, express types, "@types/express"]
links:
  - title: "@types/express"
    url: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express
  - title: Express 5 API reference
    url: https://expressjs.com/en/5x/api/
---

## TypeScript
<!-- {: .-snippets} -->

### Install
<!-- {: .-snippet} -->

```bash
npm i express
npm i -D typescript @types/express @types/node
```

**Adds Express and its type definitions.** `@types/node` supplies `process` and `path`. See [@types/express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express).

### Typed server
<!-- {: .-snippet} -->

```ts
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ ok: true })
})

app.listen(3000)
```

**Types the handlers from the import.** Install the types once and every `app.get` callback is checked. See [@types/express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express).

### Route parameters
<!-- {: .-snippet} -->

```ts
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  res.json({ id })
})
```

**Params are typed as strings.** They are also strings at runtime, so `Number()` still matters. See [@types/express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express).

### Request bodies
<!-- {: .-snippet} -->

```ts
type CreateUser = { name: string }

app.post('/users', (req, res) => {
  const { name } = req.body as CreateUser
  res.status(201).json({ name })
})
```

**Casts the untyped body.** `express.json()` does not validate it, so pair the cast with Zod for runtime checks. See [express.json()](https://expressjs.com/en/5x/api/express/#expressjson).
