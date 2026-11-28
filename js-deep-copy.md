---
title: How to deep copy an object
link_title: Deep copy object
subtitle: Clone nested values safely
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
layout: snippet
tier: t3
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-28
intro: |
  `structuredClone` copies nested objects and arrays; spread and `Object.assign` copy only one level.
links:
  - title: structuredClone
    url: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  - title: Spread syntax
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  - title: JavaScript cheatsheet
    url: /javascript
---

## Copying
<!-- {: .-snippets} -->

### Nested object
<!-- {: .-snippet} -->

```js
const original = { tags: ['a'] }
const copy = structuredClone(original)
copy.tags.push('b')

original.tags
// ['a']
```
<!-- {: data-highlight="structuredClone"} -->

**Copies nested values without sharing them.** `structuredClone` also handles `Date` and `Map`; see [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone).

### Shallow spread
<!-- {: .-snippet} -->

```js
const original = { tags: ['a'] }
const shallow = { ...original }
shallow.tags.push('c')

original.tags
// ['a', 'c']
```
<!-- {: data-highlight="{ ...original }"} -->

**Shares nested objects with the source.** Spread copies only the top level; see [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

### JSON fallback
<!-- {: .-snippet} -->

```js
const cloned = JSON.parse(
  JSON.stringify({
    when: new Date('2026-01-01')
  })
)
cloned.when
// '2026-01-01T00:00:00.000Z'
```
<!-- {: data-highlight="JSON.parse"} -->

**Loses types and unsupported values.** `Date` becomes a string, and `undefined` or functions disappear; see [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
