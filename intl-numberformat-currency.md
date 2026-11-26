---
title: How to format a number as currency in JavaScript
link_title: Format currency
subtitle: Dollar amounts per locale
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: Intl.NumberFormat currency style
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency
---

## Formatting currency
<!-- {: .-snippets} -->

### Format a price
<!-- {: .-snippet} -->

```js
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

usd.format(1234.5)  // → '$1,234.50'
usd.format(9.99)    // → '$9.99'
```
<!-- {: data-highlight="style: 'currency'; currency: 'USD'"} -->

**Sets `style: 'currency'`.** The locale decides symbol placement, grouping, and decimal digits. See [currency](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency).

### Choose the display
<!-- {: .-snippet} -->

```js
const usd = (currencyDisplay) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay
  })

usd('code').format(1234.5)
// → 'USD 1,234.50'
usd('name').format(1234.5)
// → '1,234.50 US dollars'
```
<!-- {: data-highlight="'code'; 'name'"} -->

**Switches `currencyDisplay` to the ISO code or a spelled-out name.** The default is `'symbol'`; see [currencyDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencydisplay).

### Accounting negatives
<!-- {: .-snippet} -->

```js
const acct = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencySign: 'accounting'
})

acct.format(-1234.5)
// → '($1,234.50)'
```
<!-- {: data-highlight="currencySign: 'accounting'"} -->

**Wraps negative amounts in parentheses.** `'standard'` (the default) prints `-$1,234.50`; see [currencySign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencysign).
