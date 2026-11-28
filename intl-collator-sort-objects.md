---
title: How to sort an array of objects by a string property
link_title: Sort objects
subtitle: By name and second key
logo: { set: icon-park-outline, name: sort }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Intl.Collator
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
  - title: Array.prototype.toSorted()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
---

## Sorting objects
<!-- {: .-snippets} -->

### Sort by one property
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en')
const users = [
  { name: 'bob' },
  { name: 'Alice' }
]
const byName = (a, b) => (
  collator.compare(a.name, b.name)
)

users.toSorted(byName).map((u) => u.name)
// → ['Alice', 'bob']
```
<!-- {: data-highlight="collator.compare(a.name, b.name)"} -->

**Extracts the key before comparing.** Pass a comparator that reads the property; passing `collator.compare` alone compares object string forms; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).

### Sort by two properties
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en')
const byLastThenFirst = (a, b) => (
  collator.compare(a.last, b.last) ||
  collator.compare(a.first, b.first)
)
```
<!-- {: data-highlight="compare(a.last, b.last); compare(a.first, b.first)"} -->

**Breaks ties with a key.** The second key is used only on ties. `||` short-circuits when the first comparison is non-zero; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).

### Sort descending
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en')
const byNameDesc = (a, b) => (
  collator.compare(b.name, a.name)
)
```
<!-- {: data-highlight="compare(b.name, a.name)"} -->

**Swaps the property arguments.** The collator stays ascending; only the keys are reversed; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).
