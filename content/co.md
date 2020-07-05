---
title: co
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-10-27
weight: -1
intro: |
  [co](https://github.com/tj/co) allows you to use generators to manage async flow.
---

[co]: https://github.com/tj/co
[thunkify]: https://github.com/visionmedia/node-thunkify
[unyield]: https://github.com/MatthewMueller/unyield
[thenify]: https://www.npmjs.com/package/thenify
[mz]: https://www.npmjs.com/package/mz

### Running generators

```js
co(function * () {
  yield Promise.resolve(true)
}).then(...)
```

A generator can `yield` a thunk or promise. Using `co()` will immediately invoke the block inside it.

### Generator → Promise

```js
var fn = co.wrap(function * (val) {
  return yield Promise.resolve(val)
})

fn().then(...)
```

Use `co.wrap()`. Most of the time, you'll be using co.wrap.

### Generator → Node callback

```js
var get = unyield(function * () {
})

get(function (err, res) { ... })
```

Use [unyield]. (You can [thunkify] this later)


### Node callback → Thunk

```js
var readFile = thunkify(fs.readFile)

co(function * () {
  var data = yield readFile('index.txt', 'utf-8')
})
```

Use [thunkify]. You can yield this. You can also use [thenify] too.

### Using Node.js API

```js
var readFile = require('mz/fs').readFile

var getLines = co.wrap(function * (filename) {
  var data = yield readFile(filename, 'utf-8')
  return data.split('\n')
})

getLines('file.txt').then((lines) => { ... })
```

Use [mz] for async Node.js API. You can also either [thunkify] or [thenify] them instead.
