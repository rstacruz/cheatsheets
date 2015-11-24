---
title: Promises
category: JavaScript
---

Based on the [Promise API reference][promise] (mozilla.org).
{:.brief-intro.center}

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### Creating promises

```js
new Promise(function (ok, err) {
  doStuff(function () {
    if (success) { ok(); }
    else { err(); }
  });
})
```

### Consuming promises

```js
promise
  .then(okFn, errFn)
  .catch(errFn)
```

### Multiple promises

```js
var promises = [
  promise1(), promise2(), ...
]

// succeeds when all succeed
Promise.all(promises)
  .then(function (results) {
  });

// succeeds when one finishes first
Promise.race(promises)
  .then(function (result) {
  });
```

### Converting other promises

```js
return Promise.resolve("result");
return Promise.resolve(promise);
return Promise.resolve(thenable);

return Promise.reject("reason");

Promise.resolve($.get('http://google.com'))
.then(...)
```
