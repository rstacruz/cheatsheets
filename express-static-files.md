---
title: How to serve static files in Express
link_title: Serve static files
subtitle: Serve a folder with express.static
category: Node.js libraries
layout: snippet
updated: 2026-11-26
last_verified_with: "Express 5.3.0, Node 26.13.1."
tier: t3
keywords: [express static files, express.static, express public folder]
links:
  - title: Serving static files
    url: https://expressjs.com/en/starter/static-files.html
  - title: express.static() reference
    url: https://expressjs.com/en/5x/api/express/#expressstatic
---

## Static files
<!-- {: .-snippets} -->

### Serve a folder
<!-- {: .-snippet} -->

```js
app.use(express.static('public'))
// GET /logo.png -> public/logo.png
```
<!-- {: data-highlight="express.static"} -->

**Serves files from `public` at the site root.** An `index.html` in the folder answers `/`. See [serving static files](https://expressjs.com/en/starter/static-files.html).

### Absolute path
<!-- {: .-snippet} -->

```js
import path from 'node:path'

const dir = path.join(
  import.meta.dirname,
  'public'
)

app.use(express.static(dir))
```
<!-- {: data-highlight="import.meta.dirname"} -->

**Keeps the directory correct from any cwd.** `import.meta.dirname` needs Node 20.11 or newer; relative roots resolve against `process.cwd()`. See [serving static files](https://expressjs.com/en/starter/static-files.html).

### Mount at a prefix
<!-- {: .-snippet} -->

```js
app.use('/assets', express.static('dist'))
```
<!-- {: data-highlight="'/assets'"} -->

**Serves assets under `/assets`.** The prefix is stripped before the file lookup. See [serving static files](https://expressjs.com/en/starter/static-files.html).

### Disable the index file
<!-- {: .-snippet} -->

```js
app.use(
  express.static('public', { index: false })
)
```
<!-- {: data-highlight="index: false"} -->

**Stops `/` serving `index.html`.** Requests for `/` then fall through to your routes. See [express.static()](https://expressjs.com/en/5x/api/express/#expressstatic).
