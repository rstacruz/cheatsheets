---
title: Intl.NumberFormat vs toLocaleString
link_title: NumberFormat vs toLocaleString
subtitle: Which number API to use
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: Number.prototype.toLocaleString
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
---

## Choosing an API
<!-- {: .-snippets} -->

### One-off formatting
<!-- {: .-snippet} -->

```js
(1234.5).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})
// → '$1,234.50'
```
<!-- {: data-highlight="toLocaleString"} -->

**Formats a single value without building a formatter.** `toLocaleString()` takes the same locales and options; see [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).

### Reuse in a loop
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
const prices = [1.5, 2.25, 10]

prices.map((price) => nf.format(price))
// → ['$1.50', '$2.25', '$10.00']
```
<!-- {: data-highlight="nf.format(price)"} -->

**Builds the formatter once and reuses it.** `toLocaleString()` constructs a formatter per call, which is slower in loops; see [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
