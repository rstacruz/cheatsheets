---
title: How to enable CORS in Express
link_title: Express CORS
subtitle: Cross-origin requests with cors
category: Node.js
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, cors 2.8.6, Node 26.13.1."
tier: t3
keywords: [express cors, express cors middleware, express access-control]
links:
  - title: cors package
    url: https://github.com/expressjs/cors
  - title: cors options
    url: https://github.com/expressjs/cors#configuration-options
---

## CORS
<!-- {: .-snippets} -->

### Allow all origins
<!-- {: .-snippet} -->

```js
import cors from 'cors'

app.use(cors())
```

**Adds `Access-Control-Allow-Origin: *`.** Fine for public APIs that do not use cookies. See [cors](https://github.com/expressjs/cors).

### Allow one origin
<!-- {: .-snippet} -->

```js
app.use(cors({
  origin: 'https://app.example.com'
}))
```

**Restricts browsers to one origin.** Requests that send credentials need an exact origin, not `*`. See [cors options](https://github.com/expressjs/cors#configuration-options).

### Limit methods and headers
<!-- {: .-snippet} -->

```js
app.use(cors({
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))
```

**Narrows what browsers may send.** Preflight `OPTIONS` requests are answered by the middleware. See [cors options](https://github.com/expressjs/cors#configuration-options).
