---
title: Promises
layout: default
---

Based on 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### Creating promises

```js
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
  .catch(errFn)
```

### Multiple promises

```js
var promises = [
  promise1(), promise2(), ...
]

// succeeds when all succeed
Promise.all(promises)
  .then(function (values) {
  });

// succeeds when one finishes first
Promise.race(promises)
  .then(function (value) {
  });
```

### Converting other promises

```js
Promise.resolve("reason");
Promise.resolve(promise);
Promise.resolve(thenable);

Promise.reject("reason");

Promise.resolve($.get('http://google.com'))
.then(...)
```
