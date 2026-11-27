---
title: How to flatten an array
link_title: Flatten an array
subtitle: Shallow or recursive flattening
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
layout: snippet
tier: t3
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-28
intro: |
  `Array.prototype.flat()` flattens nested arrays; pass a depth or `Infinity` for all levels.
links:
  - title: Array.prototype.flat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  - title: Array.prototype.flatMap
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
  - title: JavaScript cheatsheet
    url: /javascript
---

## Flattening
<!-- {: .-snippets} -->

### One level
<!-- {: .-snippet} -->

```js
const nested = [[1, 2], [3, 4]]
nested.flat()
// [1, 2, 3, 4]
```
<!-- {: data-highlight=".flat()"} -->

**Joins nested arrays one level deep.** `flat()` returns a new array and leaves the source unchanged; see [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat).

### All levels
<!-- {: .-snippet} -->

```js
const deep = [1, [2, [3]]]
deep.flat(Infinity)
// [1, 2, 3]
```
<!-- {: data-highlight="flat(Infinity)"} -->

**Flattens recursively with `Infinity`.** Use a numeric depth to stop earlier; see [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat).

### Map and flatten
<!-- {: .-snippet} -->

```js
const phrases = ['a b', 'c d']
phrases.flatMap(s => s.split(' '))
// ['a', 'b', 'c', 'd']
```
<!-- {: data-highlight="flatMap"} -->

**Maps then flattens one level.** `flatMap` avoids a separate `.map().flat()` chain; see [Array.prototype.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap).
