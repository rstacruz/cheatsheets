---
title: How to use TypeScript with Express
link_title: Express TypeScript
subtitle: Typed handlers and bodies
logo: { src: /assets/logos/express.svg, mono: true }
category: Node.js libraries
layout: snippet
created_at: 2026-11-26
updated: 2026-11-28
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
# runtime dependency
npm i express
```
<!-- {: data-highlight="npm i express"} -->

```bash
# type definitions for the editor
npm i -D typescript @types/express @types/node
```
<!-- {: data-highlight="npm i -D"} -->

**Adds Express and types.** This installs Express and its type definitions; `@types/node` supplies `process` and `path`. See [@types/express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express).

### Typed server
<!-- {: .-snippet} -->

```ts
import express from 'express'
import type { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.json({ ok: true })
})

app.listen(3000)
```
<!-- {: data-highlight="Request; Response"} -->

**Types the handlers explicitly.** The types come from `@types/express`; install once and every callback is checked. See [@types/express](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express).

### Route parameters
<!-- {: .-snippet} -->

```ts
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  res.json({ id })
})
```
<!-- {: data-highlight="Number(req.params.id)"} -->

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
<!-- {: data-highlight="as CreateUser"} -->

**Casts the untyped body.** `express.json()` does not validate it, so pair the cast with Zod for runtime checks. See [express.json()](https://expressjs.com/en/5x/api/express/#expressjson).
