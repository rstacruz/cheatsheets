---
title: JavaScript
category: JavaScript
weight: -10
updated: 2026-10-04
intro: |
  Core JavaScript language reference: strings, numbers, arrays, objects,
  collections, dates, async, and modules.
---

## Built-in types

### Introduction
{: .-intro}

Quick reference for the core JavaScript language. Each section links to a
full cheatsheet.

- [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) _(developer.mozilla.org)_
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) _(developer.mozilla.org)_

### Strings

```js
const name = 'Ada'
`Hello, ${name}!`          // → "Hello, Ada!"
'  hi  '.trim()            // → "hi"
'hello'.includes('ell')    // → true
'a,b,c'.split(',')         // → ["a", "b", "c"]
'hello'.slice(1, 3)        // → "el"
```

[JavaScript Strings cheatsheet](./js-string)
{: .-crosslink}

### Numbers

```js
parseInt('42px', 10)       // → 42
(1234.5).toFixed(2)        // → "1234.50"
(1234).toLocaleString()    // → "1,234"
Math.max(1, 2, 3)          // → 3
Number.isInteger(2.5)      // → false
```

[JavaScript Numbers cheatsheet](./js-number)
{: .-crosslink}

### Arrays

```js
const list = [1, 2, 3]
list.map(n => n * 2)       // → [2, 4, 6]
list.filter(n => n > 1)    // → [2, 3]
list.find(n => n > 1)      // → 2
list.includes(2)           // → true
[...list, 4]               // → [1, 2, 3, 4]
```

[JavaScript Arrays cheatsheet](./js-array)
{: .-crosslink}

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
{: .-crosslink}

### Map and Set

```js
const seen = new Set([1, 2, 2])  // → Set {1, 2}
seen.has(2)                      // → true
[...seen]                        // → [1, 2]
```

```js
const ages = new Map([['Ada', 36]])
ages.set('Bob', 40)
ages.get('Ada')                  // → 36
ages.has('Bob')                  // → true
[...ages.keys()]                 // → ['Ada', 'Bob']
```

[JavaScript Map and Set cheatsheet](./js-map-set)
{: .-crosslink}

### Dates

```js
const now = new Date()
now.toISOString()          // → "2026-10-04T00:00:00.000Z"
now.getFullYear()          // → 2026
Date.now()                 // → ms since epoch
new Date(2014, 2, 1)       // → Sat Mar 01 2014 (month 0-indexed)
new Date(0).toISOString()  // → "1970-01-01T00:00:00.000Z"
```

[JavaScript Date cheatsheet](./js-date)
{: .-crosslink}

## Async and modules

### Async and promises

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

[JavaScript Async cheatsheet](./js-async)
{: .-crosslink}

### Modules

```js
export const pi = 3.14159
export default class Circle {}
import Circle, { pi } from './math.js'
import * as math from './math.js'
const { Chart } = await import('./chart.js')
```

[JavaScript Modules cheatsheet](./js-modules)
{: .-crosslink}

### ES2015+ features

```js
const [first, ...rest] = list
const { title, ...others } = book
const fn = (x = 1) => x * 2
const message = `Hello ${name}`
for (const item of items) { ... }
```

[ES2015+ cheatsheet](./es6)
{: .-crosslink}

## Also see

- [Promises cheatsheet](./promise)
- [fetch() cheatsheet](./js-fetch)
- [JavaScript lazy shortcuts](./js-lazy)
{: .-also-see}
