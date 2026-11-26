---
title: How to split Express routes into files
link_title: Express router
subtitle: Group routes with Router
category: Node.js
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express router, express routes files, express.Router]
links:
  - title: express.Router
    url: https://expressjs.com/en/5x/guide/routing.html#express-router
  - title: Using middleware guide
    url: https://expressjs.com/en/5x/guide/using-middleware.html
---

## Routing
<!-- {: .-snippets} -->

### users.js
<!-- {: .-snippet} -->

```js
import { Router } from 'express'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)

export default router
```

**Groups related routes in their own file.** `Router()` returns middleware with the same methods as `app`. See [express.Router](https://expressjs.com/en/5x/guide/routing.html#express-router).

### app.js
<!-- {: .-snippet} -->

```js
import users from './users.js'

app.use('/users', users)
```

**Mounts the router on a prefix.** Paths inside `users.js` stay relative to `/users`. See [express.Router](https://expressjs.com/en/5x/guide/routing.html#express-router).

### Router-level middleware
<!-- {: .-snippet} -->

```js
router.use((req, res, next) => {
  console.log('users', req.method)
  next()
})
```

**Runs for this router only.** Mount it inside the module so the guard stays out of `app.js`. See [using middleware](https://expressjs.com/en/5x/guide/using-middleware.html).
