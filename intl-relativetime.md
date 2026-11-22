---
title: Intl.RelativeTimeFormat
subtitle: Locale-aware relative time
category: Browser APIs
tier: t2
updated: 2026-11-18
last_verified_with: "Node 26.13 (full ICU), Chromium 157."
fragments:
  - "Intl.Relative"
  - "RelativeTime"
  - "format(1, 'day')"
  - "numeric: 'auto'"
  - "'yesterday'"
  - "'tomorrow'"
  - "rtf('narrow')"
  - "formatToParts"
  - "resolvedOptions"
  - "quarter"
  - "'de-DE'"
  - "'ja-JP'"
  - "vor 2 Tagen"
  - "timeAgo()"
  - "1 hr. ago"
  - "localeMatcher"
intro: |
  `Intl.RelativeTimeFormat` turns a signed number and unit into phrases
  like "3 days ago". This sheet covers options, the "time ago" pattern,
  and Node 26 examples.
links:
  - title: Intl.RelativeTimeFormat on MDN
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
  - title: ECMA-402 specification
    url: https://tc39.es/ecma402/#relativetimeformat-objects
---

## Creating a formatter

### Constructor

#### Syntax

```js
new Intl.RelativeTimeFormat()
new Intl.RelativeTimeFormat(locales)
new Intl.RelativeTimeFormat(locales, options)
```
<!-- {: .-wrap} -->

#### Formatter

```js
const rtf = new Intl.RelativeTimeFormat('en-US')
const de = new Intl.RelativeTimeFormat('de-DE', {
  numeric: 'auto'
})
```
<!-- {: .-wrap} -->

`locales` is a BCP 47 tag or an array of tags; the first supported one wins.
Call the constructor with `new` — a plain call throws `TypeError`. Options
also accept `localeMatcher` (default `'best fit'`) and `numberingSystem`.

See: [Intl.RelativeTimeFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat)

### Options without a locale

#### Formatter

```js
const opts = { numeric: 'auto', style: 'short' }
const rtf = new Intl.RelativeTimeFormat('default', opts)
```
<!-- {: .-wrap} -->

#### Output

```js
rtf.resolvedOptions().locale  // → 'en-US'
```

Pass `'default'` to mean the runtime's own locale when you still have options
to send. Leaving the argument out works the same:
`new Intl.RelativeTimeFormat(undefined, opts)`.

See: [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

## Formatting a value

### Values and units

#### Formatter

```js
const rtf = new Intl.RelativeTimeFormat('en-US')
```
<!-- {: .-wrap} -->

#### Output

```js
rtf.format(-1, 'day')     // → '1 day ago'
rtf.format(2, 'day')      // → 'in 2 days'
rtf.format(1, 'year')     // → 'in 1 year'
rtf.format(-3, 'month')   // → '3 months ago'
```
<!-- {: .-wrap} -->

#### Units

| Unit | `format(-1, unit)` | `format(2, unit)` |
| --- | --- | --- |
| `year` | `1 year ago` | `in 2 years` |
| `quarter` | `1 quarter ago` | `in 2 quarters` |
| `month` | `1 month ago` | `in 2 months` |
| `week` | `1 week ago` | `in 2 weeks` |
| --- | --- | --- |
| `day` | `1 day ago` | `in 2 days` |
| `hour` | `1 hour ago` | `in 2 hours` |
| `minute` | `1 minute ago` | `in 2 minutes` |
| `second` | `1 second ago` | `in 2 seconds` |
<!-- {: .-headers} -->

Negative is the past, positive the future; zero counts as future
(`'in 0 days'`). Unit names stay singular: `'day'`, never `'days'`. Values
aren't rounded, so `-1.5` renders as `'1.5 days ago'`. An unknown unit throws
`RangeError`.

See: [format()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format)

### Numeric option

#### Formatter

```js
const rtf = new Intl.RelativeTimeFormat('en-US', {
  numeric: 'auto'
})
```
<!-- {: .-wrap} -->

#### Output

```js
rtf.format(-1, 'day')     // → 'yesterday'
rtf.format(1, 'day')      // → 'tomorrow'
rtf.format(0, 'day')      // → 'today'
rtf.format(0, 'second')   // → 'now'
rtf.format(-2, 'day')     // → '2 days ago'
rtf.format(-1, 'week')    // → 'last week'
```
<!-- {: .-wrap} -->

`'auto'` uses a wording only where the locale has one for that value and
unit; `2` stays numeric. The default, `'always'`, prints `'1 day ago'` and
`'in 0 days'`.

See: [numeric option](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#numeric)

### Style option

#### Formatter

```js
const rtf = (style) => (
  new Intl.RelativeTimeFormat('en-US', { style })
)
```

#### Output

```js
rtf('short').format(-1, 'hour')   // → '1 hr. ago'
rtf('narrow').format(-1, 'hour')  // → '1h ago'
rtf('narrow').format(2, 'day')    // → 'in 2d'
```
<!-- {: .-wrap} -->

`'long'` is the default; `'narrow'` is the most compact. `numeric: 'auto'`
wordings such as `'yesterday'` survive both styles.

See: [style option](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#style)

## Inspecting output

### formatToParts()

#### Formatter

```js
const rtf = new Intl.RelativeTimeFormat('en-US')
```
<!-- {: .-wrap} -->

#### Output

```js
rtf.formatToParts(-2, 'day')
// → [
//   { type: 'integer', value: '2', unit: 'day' },
//   { type: 'literal', value: ' days ago' }
// ]
```
<!-- {: .-wrap} -->

#### Without a number

```js
new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' })
  .formatToParts(-1, 'day')
// → [{ type: 'literal', value: 'yesterday' }]
```
<!-- {: .-wrap} -->

Parts are `literal`, `integer`, `decimal` or `fraction`. A phrase with no
number at all is a single `literal` part.

See: [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts)

### resolvedOptions()

#### Formatter

```js
const rtf = new Intl.RelativeTimeFormat('de-DE', {
  numeric: 'auto',
  style: 'short'
})
```
<!-- {: .-wrap} -->

#### Output

```js
rtf.resolvedOptions()
// → {
//   locale: 'de-DE',
//   style: 'short',
//   numeric: 'auto',
//   numberingSystem: 'latn'
// }
```

It reports the locale that matched, plus the default for every option you
left out.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions)

## Locales

### Locale differences

#### Formatter

```js
const rtf = (locale, style) => (
  new Intl.RelativeTimeFormat(locale, { style })
)
```

#### Output

```js
rtf('en-US', 'short').format(-1, 'hour')  // → '1 hr. ago'
rtf('en-GB', 'short').format(-1, 'hour')  // → '1 hr ago'
```
<!-- {: .-wrap} -->

#### Long style

```js
rtf('de-DE').format(-2, 'day')  // → 'vor 2 Tagen'
rtf('ja-JP').format(-2, 'day')  // → '2 日前'
```
<!-- {: .-wrap} -->

You supply the number and the unit; word order, prepositions and plural
endings come from the locale data. At long style `en-US` and `en-GB` agree on
`'1 day ago'`; the abbreviation is where they part.

See: [ECMA-402 RelativeTimeFormat objects](https://tc39.es/ecma402/#relativetimeformat-objects)

### Plural forms

| Value | `en-US` | `de-DE` | `ru-RU` |
| --- | --- | --- | --- |
| `-1` | `1 day ago` | `vor 1 Tag` | `1 день назад` |
| `-2` | `2 days ago` | `vor 2 Tagen` | `2 дня назад` |
| `-5` | `5 days ago` | `vor 5 Tagen` | `5 дней назад` |
<!-- {: .-headers} -->

Plural selection belongs to the locale, so `-1`, `-2` and `-5` each get their
own form without extra work. `ja-JP` has no count agreement: `1 日前`,
`2 日前`.

See: [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)

## Time ago

### Computing the delta

#### Setup

```js
const rtf = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto'
})
const now = new Date('2026-11-18T12:00:00Z')
const then = new Date('2026-11-16T12:00:00Z')
```
<!-- {: .-wrap} -->

#### Output

```js
rtf.format((then - now) / 86_400_000, 'day')
// → '2 days ago'
```
<!-- {: .-wrap} -->

The formatter never reads a clock. Subtract the dates yourself, divide down
to the unit you want, and keep the sign.

See: [format()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format)

### A timeAgo() helper

#### Helper

```js
const rtf = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto'
})

const timeAgo = (date, now = Date.now()) => {
  const s = Math.round((date.getTime() - now) / 1000)
  if (Math.abs(s) < 60) return rtf.format(s, 'second')
  if (Math.abs(s) < 3600) {
    return rtf.format(Math.round(s / 60), 'minute')
  }
  if (Math.abs(s) < 86_400) {
    return rtf.format(Math.round(s / 3600), 'hour')
  }
  return rtf.format(Math.round(s / 86_400), 'day')
}
```
<!-- {: .-wrap} -->

#### Usage

```js
const now = new Date('2026-11-18T12:00:00Z').getTime()

timeAgo(new Date('2026-11-18T11:59:30Z'), now)  // '30 seconds ago'
timeAgo(new Date('2026-11-18T09:00:00Z'), now)  // '3 hours ago'
timeAgo(new Date('2026-11-16T12:00:00Z'), now)  // '2 days ago'
```
<!-- {: .-wrap} -->

`Math.round()` picks a whole unit, and the sign is kept so past values stay
negative. Add month and year branches when you need coarser output.

See: [Date.now()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
