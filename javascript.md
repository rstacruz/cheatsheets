---
title: JavaScript
subtitle: Core scripting language
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
weight: -10
updated: 2026-11-11
last_verified_with: "ES2022–2026 APIs."
tier: t2
fragments:
  - "const res"
  - "n => n * 2"
  - "await"
  - "await fetch"
  - "Promise.all"
  - "res.json"
  - "list.map"
  - "Object.keys"
  - "JSON.stringify"
  - "console.log"
  - "list.filter"
  - "list.find"
  - "new Map"
  - "Array.fromAsync"
intro: |
  Quick reference for the core JavaScript language. Most sections link to a
  full cheatsheet.
links:
  - title: JavaScript reference
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
  - title: JavaScript Guide
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

## Built-in types

### Strings

```js
const name = 'Ada'
`Hello, ${name}!`          // → "Hello, Ada!"
'  hi  '.trim()            // → "hi"
'hello'.includes('ell')    // → true
'a,b,c'.split(',')         // → ["a", "b", "c"]
'hello'.slice(1, 3)        // → "el"
```
<!-- {: data-highlight="trim; includes; split; slice"} -->

[JavaScript Strings cheatsheet](./js-string)

<!-- {: .-crosslink} -->

### Numbers

```js
parseInt('42px', 10)       // → 42
(1234.5).toFixed(2)        // → "1234.50"
(1234).toLocaleString('en-US')  // → "1,234"
Math.max(1, 2, 3)          // → 3
Number.isInteger(2.5)      // → false
```
<!-- {: data-highlight="parseInt; toFixed; toLocaleString; Number.isInteger"} -->

[JavaScript Numbers cheatsheet](./js-number)

<!-- {: .-crosslink} -->

### Arrays

```js
const list = [1, 2, 3]
list.map(n => n * 2)       // → [2, 4, 6]
list.filter(n => n > 1)    // → [2, 3]
list.find(n => n > 1)      // → 2
list.includes(2)           // → true
[...list, 4]               // → [1, 2, 3, 4]
```
<!-- {: data-highlight="map; filter; find; ...list"} -->

[JavaScript Arrays cheatsheet](./js-array)

<!-- {: .-crosslink} -->

### Objects

```js
const user = { name: 'Ada', age: 36 }
user.name                        // → "Ada"
user['age']                      // → 36
Object.keys(user)                // → ["name", "age"]
Object.entries(user)             // → [["name", "Ada"], ["age", 36]]
const { name, ...rest } = user   // rest → { age: 36 }
({ ...user, age: 37 })           // → { name: "Ada", age: 37 }
```

[JavaScript Objects cheatsheet](./js-object)

<!-- {: .-crosslink} -->

### Map and Set

#### Set

```js
const seen = new Set([1, 2, 2])  // → Set {1, 2}
seen.add(3)                      // → Set {1, 2, 3}
seen.has(2)                      // → true
seen.size                        // → 3
[...seen]                        // → [1, 2, 3]
```
<!-- {: data-highlight="new Set; add; has"} -->

#### Map

```js
const ages = new Map([['Ada', 36]])
ages.set('Bob', 40)
ages.get('Ada')                  // → 36
ages.has('Bob')                  // → true
[...ages.keys()]                 // → ['Ada', 'Bob']
```
<!-- {: data-highlight="new Map; set; get; keys"} -->

[JavaScript Map and Set cheatsheet](./js-map-set)

<!-- {: .-crosslink} -->

### Modern built-ins

```js
[3, 1, 2].toSorted()                // → [1, 2, 3]
[1, 2, 3].with(0, 9)                // → [9, 2, 3]
Object.groupBy(list, n => n % 2)    // → { 0: [2], 1: [1, 3] }
Object.hasOwn(user, 'name')         // → true
new Set(a).union(b)                 // → Set union
Promise.withResolvers()             // → { promise, resolve, reject }
await Array.fromAsync(gen())        // → collected values
[1, 2].values().map(x => x * 2).toArray()  // → [2, 4]
await Promise.try(risky)            // → rejects on sync throw
structuredClone(obj)                // → deep copy
```
<!-- {: data-highlight="toSorted; Object.groupBy; Promise.withResolvers; structuredClone"} -->

Recent additions (ES2022–2026); `structuredClone` is a Web API, not ECMAScript.

See: [toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) · [Object.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) · [Promise.withResolvers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers)

### Dates

```js
const now = new Date()
now.toISOString()          // → UTC now, e.g. 2026-10-04T00:00:00.000Z
now.getFullYear()          // → 2026
Date.now()                 // → ms since epoch
new Date(2014, 2, 1)       // → Sat Mar 01 2014, local midnight
new Date(0).toISOString()  // → "1970-01-01T00:00:00.000Z"
```
<!-- {: data-highlight="toISOString; getFullYear; Date.now"} -->

[JavaScript Date cheatsheet](./js-date)

<!-- {: .-crosslink} -->

### Temporal

```js
// Limited availability: Chrome 144+, Firefox 139+, Node 26
const d = Temporal.PlainDate.from('2026-11-05')
d.add({ months: 1 })    // → 2026-12-05
Temporal.Now.instant()  // → Temporal.Instant
Temporal.Now.plainDateISO()     // → current local date
Temporal.Duration.from('P2D')   // → 2 days
```
<!-- {: data-highlight="Temporal.PlainDate.from; Temporal.Now; Temporal.Duration"} -->

A modern replacement for `Date`; plain dates have no time zone.

[JavaScript Temporal cheatsheet](./js-temporal)

<!-- {: .-crosslink} -->

## Async and modules

### Async

```js
const res = await fetch('/data.json')
const data = await res.json()

const results = await Promise.all([a(), b()])
try {
  await risky()
} catch (err) {
  console.error(err)
}
await new Promise(r => setTimeout(r, 1000))  // wait 1 second
```
<!-- {: data-highlight="Promise.all"} -->

[JavaScript Async cheatsheet](./js-async)

<!-- {: .-crosslink} -->

### Promises

```js
new Promise((resolve, reject) => { resolve(1) })
promise.then(v => v * 2).catch(console.error)
await Promise.all([a(), b()])         // → all results, fails fast
await Promise.allSettled([a(), b()])  // → every result, never rejects
await Promise.race([a(), b()])        // → first settled, either way
await Promise.any([a(), b()])         // → first fulfilled (ES2021)
```
<!-- {: data-highlight="Promise.allSettled; Promise.race; Promise.any; then"} -->

[Promises cheatsheet](./promise)

<!-- {: .-crosslink} -->

### fetch()

```js
const res = await fetch('/data.json')
res.status                        // → 200
res.ok                            // → true (status 200-299)
await res.json()                  // → parsed JSON body
await fetch('/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```
<!-- {: data-highlight="fetch('/data.json')"} -->

[fetch() cheatsheet](./js-fetch)

<!-- {: .-crosslink} -->

### Modules

```js
export const pi = 3.14159
export default class Circle {}
import Circle, { pi } from './math.js'
import * as math from './math.js'
import data from './data.json' with { type: 'json' }
const { default: Chart } = await import('./chart.js')
```
<!-- {: data-highlight="export; import; with { type: 'json' }"} -->

[JavaScript Modules cheatsheet](./js-modules)

<!-- {: .-crosslink} -->

### ES2015+ features

```js
const [first, ...rest] = list
const { title, ...others } = book
const fn = (x = 1) => x * 2
const message = `Hello ${name}`
for (const item of list) console.log(item)
```
<!-- {: data-highlight="[first, ...rest]; { title, ...others }; for (const item of list)"} -->

[ES2015+ cheatsheet](./es6)

<!-- {: .-crosslink} -->

## Also see

- [JavaScript lazy shortcuts](./js-lazy)

<!-- {: .-also-see} -->
