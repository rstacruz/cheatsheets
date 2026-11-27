---
title: How to style parts of a formatted number in JavaScript
link_title: Style number parts
subtitle: Wrap currency or digits
logo: { set: icon-park-outline, name: list-numbers }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: formatToParts()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts
---

## Styling output parts
<!-- {: .-snippets} -->

### Inspect the parts
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

nf.formatToParts(1234.5)
// → [
//   { type: 'currency', value: '$' },
//   { type: 'integer', value: '1' },
//   { type: 'group', value: ',' },
//   ...
// ]
```
<!-- {: data-highlight="formatToParts"} -->

**Splits the formatted string into typed pieces.** Join every `value` to reproduce `format()`; see [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts).

### Wrap the currency sign
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
const parts = nf.formatToParts(1234.5)
const html = parts.map(({ type, value }) =>
  type === 'currency'
    ? `<b>${value}</b>`
    : value
).join('')

html  // → '<b>$</b>1,234.50'
```
<!-- {: data-highlight="type === 'currency'"} -->

**Maps the parts to markup and joins them.** Check `type` instead of matching text, because symbols and spacing vary by locale; see [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts).

### Superscript the fraction
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2
})
const parts = nf.formatToParts(1.5)
const html = parts
  .map(({ type, value }) =>
    type === 'fraction'
      ? `<sup>${value}</sup>`
      : value
  )
  .join('')

html  // → '1.<sup>50</sup>'
```
<!-- {: data-highlight="type === 'fraction'"} -->

**Wraps the fraction digits in a superscript.** Pad with `minimumFractionDigits` so the part holds `50`; see [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts).
