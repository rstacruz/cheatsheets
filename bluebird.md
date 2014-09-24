---
title: bluebird.js
layout: default
---

### Creating promises

```js
var Promise = require("bluebird");

new Promise(function (ok, err) {
  doStuff(function () {
    if (success)
      ok();
    else
      err();
  });
})
```

### Consuming promises

```js
promise
  .then(okFn, errFn)
  .spread(okFn, errFn)
  .catch(errFn)
  .catch(TypeError, errFn)
  .finally(fn)
```

### Handling simultaneous promises

Via Arrays

```js
var promises = [
  promise1(), promise2(), ...
]

Promise.all(promises)     // succeeds when all succeed
  .then(...)
Promise.any(promises)     // succeeds if one succeeds first
  .then(...)
```

or Objects

```js
Promise.props({
  photos: get('photos'),
  posts: get('posts')
})
.then(function (res) {
  res.photos
  res.posts
})
```

### Turn foreign promises into Bluebird promises

```js
Promise.resolve($.get('http://google.com'))
.then(...)
```

### Consuming arrays

```js
getFiles()
  .map(function (e) { ... })
  .each(function (e) { ... });
```

### Chain of promises

```js
Promise.try(function () {
  if (err) throw new Error("boo");
  return result;
});

### Working with node-style functions

```js
var readFile = Promise.promisify(fs.readFile);
var fs = Promise.promisifyAll(require('fs'));
```

### References

 * https://github.com/petkaantonov/bluebird/blob/master/API.md
