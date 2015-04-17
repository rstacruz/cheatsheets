---
title: bluebird.js
layout: default
---

Also see the [promise cheatsheet](promise.html).
{:.center.brief-intro}

```js
promise
  .then(okFn, errFn)
  .spread(okFn, errFn) //*
  .catch(errFn)
  .catch(TypeError, errFn) //*
  .finally(fn) //*
  .map(function (e) { ... })
  .each(function (e) { ... })
```

### Simultaneous promises (array)

```js
Promise.any(promises)     // succeeds if one succeeds first
  .then(...)
```

### Simultaneous promises (object)

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

### Chain of promises

```js
Promise.try(function () {
  if (err) throw new Error("boo");
  return result;
});
```

### Working with node-style functions

```js
var readFile = Promise.promisify(fs.readFile);
var fs = Promise.promisifyAll(require('fs'));
```

## References

 * [Bluebird API](https://github.com/petkaantonov/bluebird/blob/master/API.md) (github.com)
