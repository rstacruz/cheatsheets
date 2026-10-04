---
title: JavaScript
category: JavaScript
weight: -10
updated: 2026-10-04
intro: |
  Core JavaScript language reference: strings, numbers, arrays, objects,
  collections, dates, async, and modules.
---

### Introduction
{: .-intro}

Quick reference for the core JavaScript language. Each section links to a
full cheatsheet.

- [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) _(developer.mozilla.org)_
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) _(developer.mozilla.org)_

### Strings

```js
const name = 'Ada'
`Hello, ${name}!`        // → "Hello, Ada!"
'  hi  '.trim()          // → "hi"
```

[JavaScript Strings cheatsheet](./js-string)
{: .-crosslink}

### Numbers

```js
parseInt('42px', 10)     // → 42
(1234.5).toFixed(2)      // → "1234.50"
(1234).toLocaleString()  // → "1,234"
```

[JavaScript Numbers cheatsheet](./js-number)
{: .-crosslink}

### Arrays

```js
const list = [1, 2, 3]
list.map(n => n * 2)     // → [2, 4, 6]
list.includes(2)         // → true
```

[JavaScript Arrays cheatsheet](./js-array)
{: .-crosslink}

### Objects

```js
const user = { name: 'Ada', age: 36 }
user.name                // → "Ada"
Object.keys(user)        // → ["name", "age"]
```

[JavaScript Objects cheatsheet](./js-object)
{: .-crosslink}

### Map and Set

```js
const seen = new Set([1, 2, 2])      // → Set {1, 2}
const ages = new Map([['Ada', 36]])
ages.get('Ada')                      // → 36
```

[JavaScript Map and Set cheatsheet](./js-map-set)
{: .-crosslink}

### Dates

```js
const now = new Date()
now.toISOString()        // → "2026-10-04T00:00:00.000Z"
```

[JavaScript Date cheatsheet](./js-date)
{: .-crosslink}

### Async and promises

```js
const res = await fetch('/data.json')
const data = await res.json()
```

[JavaScript Async cheatsheet](./js-async)
{: .-crosslink}

### Modules

```js
export const pi = 3.14159
import { pi } from './math.js'
```

[JavaScript Modules cheatsheet](./js-modules)
{: .-crosslink}

### ES2015+ features

```js
const [first, ...rest] = list
const { title } = book
```

[ES2015+ cheatsheet](./es6)
{: .-crosslink}

### Also see

- [Promises cheatsheet](./promise)
- [fetch() cheatsheet](./js-fetch)
- [JavaScript lazy shortcuts](./js-lazy)
{: .-also-see}
