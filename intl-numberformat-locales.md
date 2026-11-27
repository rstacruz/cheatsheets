---
title: How to format numbers for a locale in JavaScript
link_title: Locale number formats
subtitle: Decimal marks and grouping
logo: { set: icon-park-outline, name: list-numbers }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: Intl locales argument
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
---

## Locale differences
<!-- {: .-snippets} -->

### Pass a locale tag
<!-- {: .-snippet} -->

```js
const de = new Intl.NumberFormat('de-DE')
const en = new Intl.NumberFormat('en-US')

de.format(1234567.891)
// → '1.234.567,891'

en.format(1234567.891)
// → '1,234,567.891'
```
<!-- {: data-highlight="'de-DE'; 'en-US'"} -->

**Swaps separators to match the locale.** German uses `.` for groups and `,` for the decimal mark; see [locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

### Format a local currency
<!-- {: .-snippet} -->

```js
new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
}).format(1234.5)
// → '1.234,50 €'
```
<!-- {: data-highlight="currency: 'EUR'"} -->

**Places the euro sign after the amount in German.** Symbol placement comes from the locale, not the currency code; see [currency](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency).

### Use another numbering system
<!-- {: .-snippet} -->

```js
new Intl.NumberFormat('ar-EG').format(1234.5)
// → '١٬٢٣٤٫٥'

new Intl.NumberFormat('ar-EG', {
  numberingSystem: 'latn'
}).format(1234.5)
// → '1,234.5'
```
<!-- {: data-highlight="numberingSystem: 'latn'"} -->

**Forces Western digits with `numberingSystem: 'latn'`.** Egyptian Arabic otherwise uses Arabic-Indic digits; see [numberingSystem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#numberingsystem).
