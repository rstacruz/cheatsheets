---
title: How to remove duplicates from an array
link_title: Remove array duplicates
subtitle: Dedupe primitives and objects
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
layout: snippet
tier: t3
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-28
intro: |
  Remove duplicate values with `Set`, or deduplicate objects by a key with `Map`.
links:
  - title: Set
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  - title: Map
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  - title: JavaScript cheatsheet
    url: /javascript
---

## Removing duplicates
<!-- {: .-snippets} -->

### Primitive values
<!-- {: .-snippet} -->

```js
const list = [1, 2, 2, 3]
const unique = [...new Set(list)]
// [1, 2, 3]
```
<!-- {: data-highlight="new Set"} -->

**Keeps first occurrences.** `Set` compares primitives by value and keeps the first copy of each. See [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

### Objects by a key
<!-- {: .-snippet} -->

```js
const users = [{ id: 1 }, { id: 1 }, { id: 2 }]
const seen = new Map(users.map(u => [u.id, u]))
const unique = [...seen.values()]
// [{ id: 1 }, { id: 2 }]
```
<!-- {: data-highlight="new Map"} -->

**Keeps the last object.** It keeps one object per key; `Map` overwrites earlier entries with the same key. See [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
