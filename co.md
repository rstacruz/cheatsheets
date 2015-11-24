---
title: co
category: JavaScript libraries
---

[co]: https://github.com/tj/co
[thunkify]: https://github.com/visionmedia/node-thunkify
[unyield]: https://github.com/MatthewMueller/unyield
[thenify]: https://www.npmjs.com/package/thenify
[mz]: https://www.npmjs.com/package/mz

[co] allows you to use generators to manage async flow.

### Running generators

A generator can `yield` a thunk or promise. Using `co()` will immediately invoke the block inside it.

```js
co(function * () {
  yield Promise.resolve(true)
}).then(...)
```

### Generator → Promise

Use `co.wrap()`. Most of the time, you'll be using co.wrap.

```js
var fn = co.wrap(function * (val) {
  return yield Promise.resolve(val)
})

fn().then(...)
```

### Generator → Node callback

Use [unyield]. (You can [thunkify] this later)

```js
var get = unyield(function * () {
})

get(function (err, res) { ... })
```

### Node callback → Thunk

Use [thunkify]. You can yield this. You can also use [thenify] too.

```js
var readFile = thunkify(fs.readFile)

co(function * () {
  var data = yield readFile('index.txt', 'utf-8')
})
```

### Using Node.js API

Uze [mz] for async Node.js API. You can also either [thunkify] or [thenify] them instead.

```js
var readFile = require('mz/fs').readFile

var getLines = co.wrap(function * (filename) {
  var data = yield readFile(filename, 'utf-8')
  return data.split('\n')
})

getLines('file.txt').then((lines) => { ... })
```
