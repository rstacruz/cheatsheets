---
title: How to group an array of objects
link_title: Group array objects
subtitle: Group by property or key
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
layout: snippet
tier: t3
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-28
intro: |
  Group items into objects with `Object.groupBy`, or into a `Map` when keys are not strings.
links:
  - title: Object.groupBy
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
  - title: Map.groupBy
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy
  - title: JavaScript cheatsheet
    url: /javascript
---

## Grouping
<!-- {: .-snippets} -->

### By a property
<!-- {: .-snippet} -->

```js
const people = [
  { name: 'Ada', team: 'A' },
  { name: 'Bob', team: 'B' },
  { name: 'Cy', team: 'A' },
  { name: 'Dee', team: 'B' }
]

const byTeam = Object.groupBy(
  people, person => person.team
)
byTeam.A.map(p => p.name)
// ['Ada', 'Cy']
```
<!-- {: data-highlight="Object.groupBy"} -->

**Groups items under their property values.** `Object.groupBy` returns arrays of matching items; see [Object.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy).

### Count by a property
<!-- {: .-snippet} -->

```js
const people = [
  { name: 'Ada', team: 'A' },
  { name: 'Bob', team: 'B' },
  { name: 'Cy', team: 'A' }
]

const counts = new Map()
for (const person of people) {
  const key = person.team
  counts.set(key, (counts.get(key) ?? 0) + 1)
}
Object.fromEntries(counts)
// { A: 2, B: 1 }
```
<!-- {: data-highlight="counts.set"} -->

**Counts items by key with `Map`.** Use `?? 0` to start a new counter; see [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

### Non-string keys
<!-- {: .-snippet} -->

```js
const day = new Date('2026-11-28')
const other = new Date('2026-11-29')
const events = [
  { day, name: 'standup' },
  { day: other, name: 'review' }
]

const byDay = Map.groupBy(events, e => e.day)
byDay.get(other).map(e => e.name)
// ['review']
```
<!-- {: data-highlight="Map.groupBy"} -->

**Keeps object keys intact.** `Map.groupBy` compares keys by identity, unlike `Object.groupBy`; see [Map.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy).

### Fallback for older runtimes
<!-- {: .-snippet} -->

```js
const people = [
  { name: 'Ada', team: 'A' },
  { name: 'Bob', team: 'B' },
  { name: 'Cy', team: 'A' }
]

const groups = people.reduce((out, person) => {
  const key = person.team
  out[key] ??= []
  out[key].push(person)
  return out
}, {})
```
<!-- {: data-highlight="reduce"} -->

**Builds groups with `reduce`.** Use this where `Object.groupBy` is unavailable; see [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
