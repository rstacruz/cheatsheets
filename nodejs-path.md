---
title: Node.js path API
subtitle: Path manipulation module
logo: { set: icon-park-outline, name: map-road }
category: Node.js
last_verified_with: "Node.js 26.13.1."
created_at: 2014-10-23
updated: 2026-11-25
tier: t3
intro: |
  Quick reference to the [Node.js path API](https://nodejs.org/api/path.html).
links:
  - title: Node.js path API
    url: https://nodejs.org/api/path.html
---

### Functions

#### Resolve real paths

```js
const fs = require('fs')

fs.realpath('/etc/passwd', function (err, path) {
  path // => "/private/etc/passwd"
})
```
<!-- {: data-highlight="realpath"} -->

#### Join and resolve

```js
const path = require('path')
dir = path.join('etc', 'passwd')
dir = path.resolve('/etc', 'passwd', '..', 'var')
```
<!-- {: data-highlight="path.join; path.resolve"} -->

#### Split paths

```js
path.dirname('/etc/passwd') //      => "/etc"
path.basename('/etc/passwd') //     => "passwd"
path.basename('/etc/rc.d', '.d') // => "rc"
```
<!-- {: data-highlight="path.dirname; path.basename"} -->

See: [Node.js path module](https://nodejs.org/api/path.html)

### References

See: [Node.js path API](https://nodejs.org/api/path.html)
