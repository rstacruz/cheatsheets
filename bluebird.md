---
title: bluebird.js
layout: default
---

See [promise](promise.html).

### Consuming promises

```js
promise
  .then(okFn, errFn)
  .spread(okFn, errFn) #*
  .catch(errFn)
  .catch(TypeError, errFn) #*
  .finally(fn) #*
  .map(function (e) { ... })
  .each(function (e) { ... });
```

### Handling simultaneous promises

```js
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

### Consuming arrays

```js
getFiles()
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
