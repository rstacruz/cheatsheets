---
title: How to sort numbers in JavaScript
link_title: Sort numbers
subtitle: Numeric, not lexicographic
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: Array.prototype.sort()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  - title: numeric option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#numeric
---

## Sorting numbers
<!-- {: .-snippets} -->

### Sort with a subtraction
<!-- {: .-snippet} -->

```js
const numbers = [10, 9, 2]

numbers.toSorted((a, b) => a - b)
// → [2, 9, 10]
```
<!-- {: data-highlight="a - b" } -->

**Returns the numeric difference.** Positive, negative, and zero results tell `toSorted()` the order; see [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

### Sort numeric strings
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  numeric: true
})
const values = ['10', '9', '2']

values.sort(collator.compare)
// → ['2', '9', '10']
```
<!-- {: data-highlight="numeric: true"} -->

**Compares digit runs by value.** Use this when the numbers arrive as text, such as query params or form values; see [numeric](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#numeric).

### See the default order
<!-- {: .-snippet} -->

```js
[10, 9, 2].sort()
// → [10, 2, 9]
```
<!-- {: data-highlight="sort()" } -->

**Shows why a comparator is required.** The default converts each number to a string and compares code units; see [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
