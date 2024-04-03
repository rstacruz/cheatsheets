---
title: Node.js path API
category: Node.js
intro: |
  Quick reference to the [Node.js path API](https://nodejs.org/api/path.html).
---

### Functions

```js
const fs = require('fs')

fs.realpath('/etc/passwd', function (err, path) {
  path // => "/private/etc/passwd"
})
```

```js
const path = require('path')
dir = path.join('etc', 'passwd')
dir = path.resolve('/etc', 'passwd', '..', 'var')
```

```js
path.dirname('/etc/passwd') //      => "/etc"
path.basename('/etc/passwd') //     => "passwd"
path.basename('/etc/rc.d', '.d') // => "rc"
```

### References

- https://nodejs.org/api/path.html
