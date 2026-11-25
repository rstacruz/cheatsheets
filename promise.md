---
title: Promises
subtitle: Asynchronous JavaScript API
category: JavaScript
intro: |
  A quick reference to the JavaScript [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
links:
  - title: Using Promises guide
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
  - title: Promise documentation
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
tier: t3
last_verified_with: "ECMAScript 2026."
updated: 2026-11-25
---

## Reference

<!-- {:.-three-column} -->

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
<!-- {: data-highlight="new Promise"} -->

Use [new Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#constructor) to create new promises.

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
<!-- {: data-highlight=".then; .catch"} -->

[then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) runs a function when a promise resolves. [catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) runs when a promise fails.

### Multiple promises

```js
const promises = [
  promise1(),
  promise2() /* ... */
]
```

```js
// Succeeds when all succeed
Promise.all(promises).then((results) => {
  /* ... */
})
```
<!-- {: data-highlight="Promise.all"} -->

```js
// Succeeds when one finishes first
Promise.race(promises).then((result) => {
  /* ... */
})
```
<!-- {: data-highlight="Promise.race"} -->

See: [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

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
<!-- {: data-highlight="Promise.resolve; Promise.reject"} -->

`Promise.resolve(val)` will return a promise that resolves to the value given to it.

See: [Promise.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
