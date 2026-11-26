---
title: How to sort strings with numbers in JavaScript
link_title: Natural sort
subtitle: Files, versions, and IDs
category: String sorting
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: numeric option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#numeric
---

## Natural sorting
<!-- {: .-snippets} -->

### Sort filenames
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  numeric: true
})
const files = ['file 10', 'file 2', 'file 1']

files.sort(collator.compare)
// → ['file 1', 'file 2', 'file 10']
```
<!-- {: data-highlight="numeric: true"} -->

**Compares digit runs by value.** Without `numeric`, `file 10` sorts before `file 2`; see [numeric](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#numeric).

### Sort versions
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  numeric: true
})
const versions = ['1.10', '1.9', '1.2']

versions.sort(collator.compare)
// → ['1.2', '1.9', '1.10']
```
<!-- {: data-highlight="versions.sort(collator.compare)" } -->

**Handles each number separately.** Dots stay punctuation, so every dotted segment compares as a number; see [numeric](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#numeric).

### See the default order
<!-- {: .-snippet} -->

```js
['file 10', 'file 2', 'file 1'].sort()
// → ['file 1', 'file 10', 'file 2']
```
<!-- {: data-highlight="sort()" } -->

**Shows why `numeric` is needed.** The default comparator reads character by character; see [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
