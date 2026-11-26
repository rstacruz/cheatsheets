---
title: How to round a number to 2 decimal places in JavaScript
link_title: Round to 2 decimals
subtitle: Fixed fraction digits
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: minimumFractionDigits
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits
---

## Rounding decimals
<!-- {: .-snippets} -->

### Pad to two places
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

nf.format(1.5)    // → '1.50'
nf.format(1.005)  // → '1.01'
```
<!-- {: data-highlight="minimumFractionDigits; maximumFractionDigits"} -->

**Sets both fraction limits to 2.** `minimumFractionDigits` pads whole numbers and `maximumFractionDigits` rounds the rest; see [minimumFractionDigits](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits).

### Round without padding
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
})

nf.format(1.5)     // → '1.5'
nf.format(1.005)   // → '1.01'
```
<!-- {: data-highlight="maximumFractionDigits: 2"} -->

**Caps the fraction at two digits without padding.** `1.5` stays `1.5`, and the default minimum is 0; see [maximumFractionDigits](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumfractiondigits).

### Change the rounding mode
<!-- {: .-snippet} -->

```js
const floor = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
  roundingMode: 'floor'
})

floor.format(1.9)   // → '1'
floor.format(-1.9)  // → '-2'
```
<!-- {: data-highlight="roundingMode: 'floor'"} -->

**Rounds toward negative infinity with `'floor'`.** Other modes include `'ceil'`, `'trunc'`, and `'halfEven'`; the default is `'halfExpand'`. See [roundingMode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingmode).
