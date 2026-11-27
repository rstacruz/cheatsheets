---
title: JavaScript
subtitle: Core scripting language
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
weight: -10
updated: 2026-11-28
last_verified_with: "Node.js 26.13.1 (V8 14.6)."
tier: t2
fragments:
  - "const list"
  - "n => n * 2"
  - "await fetch"
  - "Promise.all"
  - "list.map"
  - "list.filter"
  - "list.find"
  - "Object.keys"
  - "JSON.stringify"
  - "structuredClone"
  - "Object.groupBy"
  - "import Circle"
  - "export default"
  - "new Date()"
intro: |
  Quick reference for everyday JavaScript: values, collections, dates, async work, and modules. Related cheatsheets are linked throughout.
links:
  - title: JavaScript reference
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
  - title: JavaScript Guide
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

## Everyday values
<!-- {: .-three-column} -->

### Strings

```js
const name = 'Ada'
`Hello, ${name}!` // → "Hello, Ada!"
'  hi  '.trim() // → "hi"
'hello'.includes('ell') // → true
'a,b,c'.split(',') // → ["a", "b", "c"]
'hello'.slice(1, 3) // → "el"
```
<!-- {: data-highlight="trim; includes; split; slice"} -->

[JavaScript Strings cheatsheet](./js-string)

<!-- {: .-crosslink} -->

### Numbers

```js
parseInt('42px', 10) // → 42
(1234.5).toFixed(2) // → "1234.50"
(1234).toLocaleString('en-US')
// → "1,234"

Math.max(1, 2, 3) // → 3
Number.isInteger(2.5) // → false
```
<!-- {: data-highlight="parseInt; toFixed; toLocaleString; Number.isInteger"} -->

[JavaScript Numbers cheatsheet](./js-number)

<!-- {: .-crosslink} -->

### Arrays

```js
const list = [1, 2, 3]
list.map(n => n * 2) // → [2, 4, 6]
list.filter(n => n > 1) // → [2, 3]
list.find(n => n > 1) // → 2
list.includes(2) // → true
[...list, 4] // → [1, 2, 3, 4]
```
<!-- {: data-highlight="map; filter; find; ...list"} -->

[JavaScript Arrays cheatsheet](./js-array)

<!-- {: .-crosslink} -->

### Objects

```js
const user = { name: 'Ada', age: 36 }
user.name // → "Ada"
user['age'] // → 36
Object.keys(user) // → ["name", "age"]
Object.entries(user)
// → [["name", "Ada"], ["age", 36]]

const { name, ...rest } = user
// rest → { age: 36 }

({ ...user, age: 37 })
// → { name: "Ada", age: 37 }
```
<!-- {: data-highlight="Object.keys; Object.entries"} -->

[JavaScript Objects cheatsheet](./js-object)

<!-- {: .-crosslink} -->

## Collections

### Map

```js
const ages = new Map([['Ada', 36]])
ages.set('Bob', 40)
ages.get('Ada') // → 36
ages.has('Bob') // → true
[...ages.keys()] // → ['Ada', 'Bob']
```
<!-- {: data-highlight="new Map; set; get; keys"} -->

[JavaScript Map and Set cheatsheet](./js-map-set)

<!-- {: .-crosslink} -->

### Set

```js
const seen = new Set([1, 2, 2])
// → Set {1, 2}

seen.add(3) // → Set {1, 2, 3}
seen.has(2) // → true
seen.size // → 3
[...seen] // → [1, 2, 3]
```
<!-- {: data-highlight="new Set; add; has"} -->

[JavaScript Map and Set cheatsheet](./js-map-set)

<!-- {: .-crosslink} -->

## Dates and time

### Date

```js
const now = new Date()
now.toISOString()
// → ISO timestamp, UTC

now.getFullYear() // → 2026
Date.now() // → ms since epoch
new Date('2026-11-05')
// → UTC midnight
```
<!-- {: data-highlight="toISOString; getFullYear; Date.now"} -->

[JavaScript Date cheatsheet](./js-date)

<!-- {: .-crosslink} -->

### Temporal

```js
const d = Temporal.PlainDate.from('2026-11-05')
d.add({ months: 1 }) // → 2026-12-05

Temporal.Now.instant()
// → current instant

Temporal.Duration.from('P2D')
// → 2 days
```
<!-- {: data-highlight="Temporal.PlainDate.from; Temporal.Now; Temporal.Duration.from"} -->

Node.js 26 provides `Temporal` globally; browser support is still limited.

[JavaScript Temporal cheatsheet](./js-temporal)

<!-- {: .-crosslink} -->

## Async work
<!-- {: .-three-column} -->

### Async and await

```js
const value = await a()
const next = await b()

try {
  await risky()
} catch (err) {
  console.error(err)
}
await new Promise(r =>
  setTimeout(r, 1000)
)
```
<!-- {: data-highlight="await; setTimeout"} -->

[JavaScript Async cheatsheet](./js-async)

<!-- {: .-crosslink} -->

### Promises

```js
new Promise((resolve, reject) => {
  resolve(1)
})
promise
  .then(v => v * 2)
  .catch(console.error)

await Promise.all([a(), b()])
// → results

await Promise.allSettled([a(), b()])
// → every result, never rejects

await Promise.race([a(), b()])
// → first settled, either way

await Promise.any([a(), b()])
// → first fulfilled
```
<!-- {: data-highlight="Promise.allSettled; Promise.race; Promise.any; .then"} -->

[Promises cheatsheet](./promise)

<!-- {: .-crosslink} -->

### fetch()

```js
const res = await fetch('/data.json')
res.status // → 200
res.ok // → true (200-299)
await res.json() // → parsed body

await fetch('/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```
<!-- {: data-highlight="fetch('/data.json')"} -->

[fetch() cheatsheet](./js-fetch)

<!-- {: .-crosslink} -->

## Code and syntax

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

### Modern syntax

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

## Newer APIs

### Arrays and objects

```js
[3, 1, 2].toSorted() // → [1, 2, 3]
[1, 2, 3].with(0, 9) // → [9, 2, 3]
const groups = Object.groupBy(list, n => n % 2)
// → { 0: [2], 1: [1, 3] }

Object.hasOwn(user, 'name') // → true
structuredClone(user) // → deep copy
```
<!-- {: data-highlight="toSorted; .with(0, 9); Object.groupBy; Object.hasOwn"} -->

`structuredClone` is a Web API, not ECMAScript.

See: [toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) · [Object.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) · [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)

### Promises and iterators

```js
const { promise, resolve } = Promise.withResolvers()
resolve(42)
await promise // → 42

await Promise.try(() => JSON.parse('{"ok":true}'))
// → { ok: true }

const gen = (async function* () { yield 1; yield 2 })()
await Array.fromAsync(gen) // → [1, 2]
[1, 2].values().map(n => n * 2).toArray()
// → [2, 4]
```
<!-- {: data-highlight="Promise.withResolvers; Promise.try; Array.fromAsync; .toArray()"} -->

See: [Promise.withResolvers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers) · [Array.fromAsync](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync) · [Iterator helpers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

## Also see

- [Remove duplicates from an array](./js-array-unique)
- [Group an array of objects](./js-group-by)
- [Deep copy an object](./js-deep-copy)
- [Round a number](./js-round-number)
- [Wait in JavaScript](./js-sleep)
- [Flatten an array](./js-flatten-array)
- [JavaScript lazy shortcuts](./js-lazy)

<!-- {: .-also-see} -->
