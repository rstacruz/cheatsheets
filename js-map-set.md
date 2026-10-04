---
title: JavaScript Map and Set
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Keyed collections: Map for arbitrary keys, Set for unique values.
---

### Introduction
{: .-intro}

Map and Set hold keyed or unique values, keep insertion order, and are
iterable.

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) _(developer.mozilla.org)_
- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) _(developer.mozilla.org)_

### Map

```js
const map = new Map()
map.set('a', 1).set('b', 2)   // set() chains, returns map
map.get('a')                  // → 1
map.has('a')                  // → true
map.size                      // → 2 (property, not a method)
map.delete('a')               // → true
map.clear()                   // removes everything
```
{: data-line="2"}

```js
const key = {}
const map = new Map([['a', 1], [key, 2]])
map.get(key)        // → 2 (identity, not value)
map.get({})         // → undefined (different object)
map.set(NaN, 'x')
map.get(NaN)        // → 'x' (SameValueZero)
```
{: data-line="3"}

```js
const map = new Map([['a', 1], ['b', 2]])
for (const [key, value] of map) console.log(key, value)
[...map.keys()]     // → ['a', 'b']
[...map.values()]   // → [1, 2]
[...map.entries()]  // → [['a', 1], ['b', 2]]
[...map]            // → same as entries
map.forEach((value, key) => ...)
```
{: data-line="2"}

Plain objects coerce keys to strings; Map keeps the original key type. Keys
compare with SameValueZero, so `NaN` equals `NaN`.

See: [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set), [Map.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) _(developer.mozilla.org)_

### Set

```js
const set = new Set([1, 2, 2, 3])
set.size             // → 3 (duplicates dropped)
set.has(2)           // → true
set.add(4)           // returns the set
set.delete(2)        // → true
set.clear()
```
{: data-line="1"}

```js
[...new Set([1, 1, 2])]      // → [1, 2] (dedupe)
const set = new Set(['a', 'b'])
for (const value of set) console.log(value)
[...set]                     // → ['a', 'b']
[...set.keys()]              // → same as values
```
{: data-line="1"}

Sets store unique values; adding an existing value is a no-op. Iteration
follows insertion order.

See: [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [Set.add()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) _(developer.mozilla.org)_

### Conversions

```js
Object.fromEntries(map)       // Map → plain object
new Map(Object.entries(obj))  // plain object → Map
[...map]                      // → array of [key, value]
Array.from(set)               // Set → array
[...set]                      // → array
```
{: data-line="1"}

`Object.fromEntries()` stringifies keys, and `Object.entries()` reads only own
enumerable string keys.

See: [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries), [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) _(developer.mozilla.org)_

### WeakMap and WeakSet

```js
const cache = new WeakMap()
cache.set(element, { data: 1 })
cache.get(element)   // → { data: 1 }
cache.has(element)   // → true
cache.delete(element)
```
{: data-line="1"}

```js
const seen = new WeakSet()
seen.add(element)
seen.has(element)    // → true
seen.delete(element)
```

Keys must be objects or non-registered symbols, entries are not enumerable,
and they are garbage collected with the key. There is no `.size` or `.clear()`.

See: [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) _(developer.mozilla.org)_
