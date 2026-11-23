---
title: Intl.DurationFormat
subtitle: Locale-aware duration formatter
category: Browser APIs
tier: t2
updated: 2026-11-18
last_verified_with: "Node 26 (ICU)."
fragments:
  - "DurationFormat"
  - "{ hours: 1"
  - "minutes: 30 }"
  - "style: 'long'"
  - "style: 'short'"
  - "style: 'narrow'"
  - "style: 'digital'"
  - "'1:30:00'"
  - "format(duration)"
  - "formatToParts"
  - "resolvedOptions"
  - "fractionalDigits"
  - "hoursDisplay"
  - "'en-US'"
  - "'de-DE'"
  - "'ja-JP'"
  - "2-digit"
intro: |
  `Intl.DurationFormat` turns `{ hours: 1, minutes: 30 }` into locale-aware
  text like "1 hr, 30 min". This sheet covers styles, per-unit options,
  and output methods.
links:
  - title: Intl.DurationFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat
  - title: TC39 proposal
    url: https://github.com/tc39/proposal-intl-duration-format
---

## Formatting

### Duration records

```js
const duration = { hours: 1, minutes: 30 }

new Intl.DurationFormat('en-US').format(duration)
// → '1 hr, 30 min'
```
<!-- {: data-highlight="format(duration)"} -->

Pass a plain object, not a `Date` or a millisecond count. The ten fields (`years` through `nanoseconds`) are optional, but at least one is required; values must be integers that share the same sign.

See: [DurationFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat) _(developer.mozilla.org)_

### Styles

```js
const duration = { hours: 1, minutes: 30 }
const format = style =>
  new Intl.DurationFormat('en-US', { style })
    .format(duration)

format('long')    // → '1 hour, 30 minutes'
format('short')   // → '1 hr, 30 min'
format('narrow')  // → '1h 30m'
format('digital') // → '1:30:00'
```
<!-- {: data-highlight="style"} -->

`'short'` is the default. `'digital'` renders `h:mm:ss`, so seconds always appear; date units stay in prose, so `{ days: 2, hours: 3 }` becomes `'2 days, 3:00:00'`.

See: [style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat#style) _(developer.mozilla.org)_

### Locales

```js
const duration = { hours: 1, minutes: 30 }
const format = locale =>
  new Intl.DurationFormat(locale, { style: 'long' })
    .format(duration)

format('en-US') // → '1 hour, 30 minutes'
format('de-DE') // → '1 Stunde, 30 Minuten'
format('ja-JP') // → '1 時間 30 分'
```
<!-- {: data-highlight="locale"} -->

Word order, plural forms, and separators come from the locale. Output varies between ICU versions and engines, so never compare it to hardcoded strings.

See: [Intl.DurationFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat) _(developer.mozilla.org)_

## Options

### Per-unit styles

```js
const duration = { hours: 1, minutes: 46, seconds: 40 }
const df = new Intl.DurationFormat('en', {
  style: 'digital',
  hours: 'long'
})

df.format(duration)
// → '1 hour, 46:40'
```
<!-- {: data-highlight="hours: 'long'"} -->

#### Option values

| Option | Values |
| --- | --- |
| `style` | `'long'`, `'short'`, `'narrow'`, `'digital'` |
| `years`–`days` | `'long'`, `'short'`, `'narrow'` |
| `hours`–`seconds` | the above, plus `'numeric'`, `'2-digit'` |
| `milliseconds`–`nanoseconds` | the above, minus `'2-digit'` |
| `…Display` | `'always'`, `'auto'` |
| `fractionalDigits` | `0` to `9` |
<!-- {: .-headers} -->

Per-unit styles default to `style`; under `'digital'`, the date units fall back to `'short'`. Setting a unit's style makes it display even at zero unless its `…Display` is `'auto'`.

See: [DurationFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/DurationFormat) _(developer.mozilla.org)_

### Zero values

```js
const df = new Intl.DurationFormat('en-US', {
  hours: 'long',
  hoursDisplay: 'always'
})

df.format({ minutes: 45 })
// → '0 hours, 45 min'
```
<!-- {: data-highlight="hoursDisplay: 'always'"} -->

Zero-valued units are hidden by default. `'always'` keeps one on screen, which stops columns and timers from jumping as values change.

See: [Hide zero-value fields](https://github.com/tc39/proposal-intl-duration-format#hide-zero-value-fields) _(github.com)_

### Fractional seconds

```js
const duration = { seconds: 12, milliseconds: 345 }
const format = digits =>
  new Intl.DurationFormat('en', {
    style: 'digital',
    fractionalDigits: digits
  }).format(duration)

format()  // → '0:00:12.345'
format(2) // → '0:00:12.34'
format(5) // → '0:00:12.34500'
```
<!-- {: data-highlight="fractionalDigits"} -->

Digits are truncated toward zero, not rounded, and short values are padded with trailing zeros. Omit `fractionalDigits` to show as many digits as the input needs, up to nine.

See: [Display fractional values](https://github.com/tc39/proposal-intl-duration-format#display-fractional-values) _(github.com)_

## Reading output

### formatToParts

```js
const parts = new Intl.DurationFormat('en-US', {
  style: 'long'
}).formatToParts({ hours: 1, minutes: 30 })

parts.map(p => `${p.type}: ${p.value}`)
// → ['integer: 1', 'literal:  ', 'unit: hour',
//    'literal: , ', 'integer: 30', 'literal:  ',
//    'unit: minutes']
```
<!-- {: data-highlight="formatToParts"} -->

Numbers arrive as `integer` (or `decimal` and `fraction`), separators as `literal`, and unit names as `unit`, so each piece can be styled on its own.

See: [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/formatToParts) _(developer.mozilla.org)_

### resolvedOptions

```js
const df = new Intl.DurationFormat('de-DE', {
  style: 'narrow'
})
const { locale, style, hours } = df.resolvedOptions()

// locale: 'de-DE'
// style: 'narrow'
// hours: 'narrow'
```
<!-- {: data-highlight="resolvedOptions()"} -->

`resolvedOptions()` reports the locale and every unit style after defaults are applied, including the `…Display` values.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/resolvedOptions) _(developer.mozilla.org)_

## Support

### Browser support

| Runtime | Minimum version |
| --- | --- |
| Chrome, Edge | 129 |
| Firefox | 136 |
| Safari | 16.4 |
| Node.js | 23 |
| Deno | 1.46 |
| Bun | 1.0.3 |
<!-- {: .-headers} -->

The proposal reached Stage 4 in December 2024. Runtimes ship it with their bundled ICU data, so older versions have no `Intl.DurationFormat` at all.

See: [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat#browser_compatibility) _(developer.mozilla.org)_

### Feature detection

```js
const formatter = 'DurationFormat' in Intl
  ? new Intl.DurationFormat('en-US')
  : null
```
<!-- {: data-highlight="'DurationFormat' in Intl"} -->

Check for the constructor before using it, and load the FormatJS polyfill where it is missing.

See: [FormatJS polyfill](https://formatjs.github.io/docs/polyfills/intl-durationformat) _(formatjs.github.io)_

### Related formatters

#### Points in time

```js
new Intl.RelativeTimeFormat('en-US')
  .format(-3, 'days')
// → '3 days ago'
```
<!-- {: data-highlight="RelativeTimeFormat"} -->

#### Single quantities

```js
new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'hour',
  unitDisplay: 'long'
}).format(2)
// → '2 hours'
```
<!-- {: data-highlight="unit: 'hour'"} -->

Use `Intl.DurationFormat` for elapsed lengths, `Intl.RelativeTimeFormat` for points in time, and a `unit` `Intl.NumberFormat` for one standalone quantity.

See: [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) _(developer.mozilla.org)_
