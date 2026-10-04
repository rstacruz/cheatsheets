---
title: JavaScript Async
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Asynchronous JavaScript with async/await: concurrency, timers, and
  cancellation.
---

### Introduction
{: .-intro}

`async`/`await` is syntax on top of promises for writing asynchronous code
that reads like synchronous code.

- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) _(developer.mozilla.org)_
- [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) _(developer.mozilla.org)_

[Promises cheatsheet](./promise)
{: .-crosslink}

### async and await

```js
async function load() {
  const res = await fetch('/data.json')
  return res.json()        // → resolved value
}

load()                     // → Promise
```
{: data-line="2"}

```js
try {
  const data = await load()
} catch (err) {
  console.error(err)       // → rejection lands here
}
```
{: data-line="2"}

An `async` function always returns a promise; `await` unwraps it. `return`
resolves, a throw rejects, and top-level `await` works in ES modules only.

See: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) _(developer.mozilla.org)_

### Running in parallel

```js
// Sequential: one after another
for (const id of ids) {
  results.push(await getItem(id))
}
```

```js
// Parallel: start all, then await all
const results = await Promise.all(ids.map(getItem))
```

| Call | Resolves when |
| --- | --- |
| `Promise.all()` | all fulfill, else rejects |
| `Promise.allSettled()` | every one settles |
| `Promise.any()` | first one fulfills |
| `Promise.race()` | first one settles |

Awaiting in a loop is sequential; `map` plus `Promise.all` starts all at once.
`Promise.all()` fails fast; `Promise.any()` throws `AggregateError` if every
input rejects.

See: [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled), [Promise.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) _(developer.mozilla.org)_

### Timers

```js
const id = setTimeout(() => {
  console.log('later')
}, 1000)                   // → after 1000 ms

clearTimeout(id)           // → cancel it
```
{: data-line="5"}

```js
const id = setInterval(() => {
  console.log('tick')
}, 1000)                   // → every 1000 ms

clearInterval(id)          // → stop it
```
{: data-line="5"}

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

await sleep(1000)          // → wait one second
```

`setTimeout()` runs once; `setInterval()` repeats until cleared. `sleep()`
wraps a timer in a promise so it can be awaited.

See: [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval), [clearTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) _(developer.mozilla.org)_

### Cancellation

```js
const controller = new AbortController()

fetch('/data.json', { signal: controller.signal })
  .catch(err => console.error(err.name))

controller.abort()         // → cancels the request
```
{: data-line="6"}

```js
// Built-in timeout signal
const signal = AbortSignal.timeout(5000)

await fetch('/data.json', { signal })
```

Pass `signal` to `fetch()` and call `abort()` to cancel a request. A manual
abort rejects with `AbortError`; a timeout rejects with `TimeoutError`.

See: [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [AbortSignal.timeout()](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static) _(developer.mozilla.org)_

### Pitfalls

```js
load()                     // floating promise, unhandled
```

```js
items.forEach(async item => {
  await save(item)         // → forEach ignores this
})
```

```js
for (const item of items) {
  await save(item)         // → sequential, one at a time
}
```

Missing `await` leaves a floating promise, so rejections go unhandled;
`forEach()` ignores its async callback; awaiting in a loop is sequential
(fine for rate limits).

See: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) _(developer.mozilla.org)_
