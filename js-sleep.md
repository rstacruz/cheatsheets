---
title: How to wait in JavaScript
link_title: Wait in JavaScript
subtitle: Pause async code with timers
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
layout: snippet
tier: t3
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-28
intro: |
  `await sleep(ms)` pauses an async function without blocking the event loop.
links:
  - title: setTimeout
    url: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
  - title: await
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  - title: JavaScript cheatsheet
    url: /javascript
---

## Waiting
<!-- {: .-snippets} -->

### Wait N milliseconds
<!-- {: .-snippet} -->

```js
const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

await sleep(1000)
```
<!-- {: data-highlight="setTimeout"} -->

**Resolves after a timer fires.** The event loop stays free while the function is paused; see [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout).

### Sequential pauses
<!-- {: .-snippet} -->

```js
const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

await sleep(200)
console.log('first')

await sleep(200)
console.log('second')
```
<!-- {: data-highlight="await sleep"} -->

**Delays between steps.** Each `await` resumes only after its timer resolves. See [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).

### Time out a promise
<!-- {: .-snippet} -->

```js
const timeout = new Promise(r =>
  setTimeout(() => r(null), 2000)
)
const result = await Promise.race([
  fetch('/data'), timeout
])
```
<!-- {: data-highlight="Promise.race"} -->

**Returns the faster promise.** Race a timer branch against the call to stop waiting on a slow response. See [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).
