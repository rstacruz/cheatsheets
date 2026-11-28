---
title: When to use Intl.NumberFormat vs toLocaleString
link_title: NumberFormat vs toLocaleString
subtitle: Which number API to use
logo: { set: icon-park-outline, name: list-numbers }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-28
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

**Formats one value.** It takes the same locales and options but does not keep a formatter for later calls. See [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).

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

**Reuses one formatter.** Build it once and call `format()` in the loop; `toLocaleString()` constructs a formatter per call, which is slower. See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
