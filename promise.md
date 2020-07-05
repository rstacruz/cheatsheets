---
title: Promises
category: JavaScript
intro: A quick reference to the [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
---

## Reference
{:.-three-column}

### Creating promises

```js
new Promise((resolve, reject) => {
  doStuff(() => {
    if (success) {
      resolve('good')
    } else {
      reject(new Error('oops'))
    }
  })
})
```

Use [new Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Contstructor) to create new promises.

### Consuming promises

```js
promise
  .then((result) => {
    /* success */
  })
  .catch((error) => {
    /* failure */
  })
```

[then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) runs a function when a promise resolves. [catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) runs when a promise fails.

### Multiple promises

```js
const promises = [promise1(), promise2() /* ... */]
```

```js
// Succeeds when all succeed
Promise.all(promises).then((results) => {
  /* ... */
})
```

```js
// Succeeds when one finishes first
Promise.race(promises).then((result) => {
  /* ... */
})
```

### Converting other promises

```js
return Promise.resolve('result')
return Promise.resolve(promise)
return Promise.resolve(thenable)

return Promise.reject('reason')

Promise.resolve(result).then(() => {
  /* ... */
})
```

`Promise.resolve(val)` will return a promise that resolves to the value given to it.
