---
title: How to format numbers with units in JavaScript
link_title: Format units
subtitle: Values with measurement units
logo: { set: icon-park-outline, name: list-numbers }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Intl.NumberFormat unit style
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2
---

## Formatting units
<!-- {: .-snippets} -->

### Format a measurement
<!-- {: .-snippet} -->

```js
const speed = new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'kilometer-per-hour'
})

speed.format(50)   // → '50 km/h'
```
<!-- {: data-highlight="unit: 'kilometer-per-hour'"} -->

**Sets the unit style.** `unit` takes a fixed identifier such as `kilometer-per-hour`, not free text. See [unit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2).

### Choose the unit label
<!-- {: .-snippet} -->

```js
const liter = (unitDisplay) =>
  new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'liter',
    unitDisplay
  })

liter('narrow').format(2.5)  // → '2.5L'
liter('long').format(2.5)    // → '2.5 liters'
```
<!-- {: data-highlight="'narrow'; 'long'"} -->

**Switches `unitDisplay`.** Choose an abbreviation or a phrase; the default `'short'` prints `2.5 L`. See [unitDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unitdisplay).

### File sizes
<!-- {: .-snippet} -->

```js
new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'megabyte'
}).format(1.5)
// → '1.5 MB'
```
<!-- {: data-highlight="unit: 'megabyte'"} -->

**Labels megabytes.** It does not convert the value: convert bytes to megabytes yourself before formatting. See [unit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2).
