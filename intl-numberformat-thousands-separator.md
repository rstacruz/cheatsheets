---
title: How to add thousands separators to a number in JavaScript
link_title: Thousands separator
subtitle: Comma-grouped digits
logo: { set: icon-park-outline, name: list-numbers }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: useGrouping option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping
---

## Grouping digits
<!-- {: .-snippets} -->

### Default grouping
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US')

nf.format(1234567)  // → '1,234,567'
nf.format(1234.5)   // → '1,234.5'
```
<!-- {: data-highlight="'en-US'"} -->

**Groups digits in threes,** for `en-US` by default. Grouping rules come from the locale; See [useGrouping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping).

### Turn grouping off
<!-- {: .-snippet} -->

```js
const nf = new Intl.NumberFormat('en-US', {
  useGrouping: false
})

nf.format(1234567)  // → '1234567'
```
<!-- {: data-highlight="useGrouping: false"} -->

**Disables separators with `useGrouping: false`.** Use it for IDs, years, and machine-readable numbers; see [useGrouping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#usegrouping).

### Follow the locale
<!-- {: .-snippet} -->

```js
new Intl.NumberFormat('en-IN').format(1234567)
// → '12,34,567'

new Intl.NumberFormat('de-DE').format(1234567)
// → '1.234.567'
```
<!-- {: data-highlight="'en-IN'; 'de-DE'"} -->

**Uses the locale's grouping.** Indian English groups the last three digits first, then pairs; see [locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
