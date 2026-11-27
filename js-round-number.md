---
title: How to round a number
link_title: Round a number
subtitle: Nearest, floor, ceil, decimals
logo: { src: /assets/logos/javascript.svg }
category: JavaScript
layout: snippet
tier: t3
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-28
intro: |
  Use `Math.round`, `Math.floor`, `Math.ceil`, or `Math.trunc`; `toFixed` formats decimals as a string.
links:
  - title: Math.round
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
  - title: Intl.NumberFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
---

## Rounding
<!-- {: .-snippets} -->

### Nearest integer
<!-- {: .-snippet} -->

```js
Math.round(4.6)  // → 5
Math.round(4.4)  // → 4
```
<!-- {: data-highlight="Math.round"} -->

**Rounds to the nearest integer.** Halfway values round toward positive infinity; see [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round).

### Always up or down
<!-- {: .-snippet} -->

```js
Math.ceil(4.1)   // 5
Math.floor(4.9)  // 4
Math.trunc(4.9)  // 4
Math.trunc(-4.9) // -4
```
<!-- {: data-highlight="Math.ceil; Math.floor; Math.trunc"} -->

**Picks a direction instead of the nearest value.** `trunc` simply drops the fraction; see [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

### Two decimal places
<!-- {: .-snippet} -->

```js
const n = 4.567
Math.round((n + Number.EPSILON) * 100) / 100
// 4.57

n.toFixed(2)
// '4.57'
```
<!-- {: data-highlight="toFixed"} -->

**Returns a number or a formatted string.** `toFixed` returns a string; the `Math.round` form still uses binary floats; see [toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed).

### Display formatting
<!-- {: .-snippet} -->

```js
new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2
}).format(4.5)
// '4.50'
```
<!-- {: data-highlight="Intl.NumberFormat"} -->

**Formats numbers for display.** Use `Intl.NumberFormat` when trailing zeros or locale separators matter; see [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
