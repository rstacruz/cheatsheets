---
title: How to format units in JavaScript
link_title: Format units
subtitle: Values with measurement units
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
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

**Sets `style: 'unit'` with a unit identifier.** The identifier is a sanctioned string such as `kilometer-per-hour`, not free text; see [unit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2).

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

**Switches `unitDisplay` between an abbreviation and a phrase.** The default is `'short'`, which prints `2.5 L`; see [unitDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unitdisplay).

### Data sizes
<!-- {: .-snippet} -->

```js
new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'megabyte'
}).format(1.5)
// → '1.5 MB'
```
<!-- {: data-highlight="unit: 'megabyte'"} -->

**Formats a file size as `1.5 MB`.** The formatter labels the value but never converts it; see [unit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#unit_2).
