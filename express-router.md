---
title: How to split Express routes into files
link_title: Express router
subtitle: Group routes with Router
logo: { src: /assets/logos/express.svg, mono: true }
category: Node.js libraries
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express router, express routes files, express.Router]
links:
  - title: express.Router
    url: https://expressjs.com/en/5x/guide/routing/#expressrouter
  - title: Using middleware guide
    url: https://expressjs.com/en/5x/guide/using-middleware/
---

## Routing
<!-- {: .-snippets} -->

### Create a router
<!-- {: .-snippet} -->

#### users.js

```js
import { Router } from 'express'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)

export default router
```
<!-- {: data-highlight="Router()"} -->

**Groups related routes in their own file.** `Router()` returns middleware with the same routing methods as `app`. See [express.Router](https://expressjs.com/en/5x/guide/routing/#expressrouter).

### Mount the router
<!-- {: .-snippet} -->

#### app.js

```js
import users from './users.js'

app.use('/users', users)
```
<!-- {: data-highlight="'/users'"} -->

**Mounts the router on a prefix.** Paths inside `users.js` stay relative to `/users`. See [express.Router](https://expressjs.com/en/5x/guide/routing/#expressrouter).

### Router-level middleware
<!-- {: .-snippet} -->

#### users.js

```js
router.use((req, res, next) => {
  console.log('users', req.method)
  next()
})
```
<!-- {: data-highlight="router.use"} -->

**Runs for this router only.** Mount it inside `users.js` so `app.js` only mounts. See [using middleware](https://expressjs.com/en/5x/guide/using-middleware.html).
