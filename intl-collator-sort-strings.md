---
title: How to sort strings in JavaScript
link_title: Sort strings
subtitle: Alphabetical order by locale
logo: { set: icon-park-outline, name: sort }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-26
links:
  - title: Intl.Collator
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
  - title: Array.prototype.sort()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
---

## Sorting strings
<!-- {: .-snippets} -->

### Sort alphabetically
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en')
const fruit = ['banana', 'apple', 'Cherry']

fruit.sort(collator.compare)
// → ['apple', 'banana', 'Cherry']
```
<!-- {: data-highlight="sort(collator.compare)"} -->

**Sorts by language rules.** Plain `.sort()` compares UTF-16 code units, which puts uppercase and accented letters in odd places; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).

### Keep the original array
<!-- {: .-snippet} -->

```js
const fruit = ['banana', 'apple']
const collator = new Intl.Collator('en')

const sorted = fruit.toSorted(collator.compare)
// → ['apple', 'banana']
```
<!-- {: data-highlight="toSorted" } -->

**Leaves the source untouched.** `toSorted()` returns a new array; use `sort()` when mutating is fine; see [toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted).

### Sort accented words
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en')
const words = ['ápple', 'banana', 'Apple']

words.sort(collator.compare)
// → ['Apple', 'ápple', 'banana']
```
<!-- {: data-highlight="words.sort(collator.compare)" } -->

**Treats accents as secondary.** `Apple` and `ápple` share a base letter, so they group together; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).

### Descending order
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en')
const descending = (a, b) => (
  collator.compare(b, a)
)

['b', 'a', 'c'].sort(descending)
// → ['c', 'b', 'a']
```
<!-- {: data-highlight="compare(b, a)" } -->

**Flips the comparator's arguments.** Reversing after the sort works too, but swapping avoids a second pass; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).
