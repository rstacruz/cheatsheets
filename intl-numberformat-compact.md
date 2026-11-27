---
title: How to format 1000 as 1K in JavaScript
link_title: Compact numbers
subtitle: Short notation such as 1.2K
logo: { set: icon-park-outline, name: list-numbers }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: notation option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#notation
---

## Compact notation
<!-- {: .-snippets} -->

### Short form
<!-- {: .-snippet} -->

```js
const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact'
})

compact.format(1000)     // → '1K'
compact.format(1234)     // → '1.2K'
compact.format(2000000)  // → '2M'
```
<!-- {: data-highlight="notation: 'compact'"} -->

**Sets `notation: 'compact'`.** The formatter picks the unit that matches the value's magnitude and appends a short suffix (`K`, `M`, `B`, or `T` in `en-US`); see [notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#notation).

### Long form
<!-- {: .-snippet} -->

```js
const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'long'
})

compact.format(2000000)  // → '2 million'
```
<!-- {: data-highlight="compactDisplay: 'long'"} -->

**Spells the unit out with `compactDisplay: 'long'`.** The default is `'short'`; see [compactDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#compactdisplay).

### Control the decimals
<!-- {: .-snippet} -->

```js
const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 0
})

compact.format(1234)     // → '1K'
```
<!-- {: data-highlight="maximumFractionDigits: 0"} -->

**Drops the fraction from the compact output.** Compact notation otherwise rounds by significant digits; see [digit options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#digit_options).
