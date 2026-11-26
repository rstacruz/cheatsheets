---
title: How to format a percentage in JavaScript
link_title: Format percent
subtitle: Fractions as percent signs
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: Intl.NumberFormat percent style
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style
---

## Formatting percentages
<!-- {: .-snippets} -->

### Format a fraction
<!-- {: .-snippet} -->

```js
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent'
})

pct.format(0.256)  // → '26%'
pct.format(0.5)    // → '50%'
```
<!-- {: data-highlight="style: 'percent'"} -->

**Sets `style: 'percent'`.** The formatter multiplies by 100 and appends the locale's percent sign; see [style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style).

### Control the decimals
<!-- {: .-snippet} -->

```js
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1
})

pct.format(0.256)  // → '25.6%'
```
<!-- {: data-highlight="maximumFractionDigits: 1"} -->

**Trims the fraction with `maximumFractionDigits`.** Percent defaults to whole numbers; use `minimumFractionDigits` to pad instead; see [digit options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#digit_options).

### Pass a fraction, not a percentage
<!-- {: .-snippet} -->

```js
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent'
})

pct.format(25)    // → '2,500%'
pct.format(0.25)  // → '25%'
```
<!-- {: data-highlight="format(25)"} -->

**Percent style multiplies by 100, so `25` becomes `2,500%`.** Divide a user-entered percentage by 100 first; see [style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style).
