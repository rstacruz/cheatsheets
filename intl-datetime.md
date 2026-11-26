---
title: Intl.DateTimeFormat
subtitle: Locale-aware date formatter
category: Browser APIs
tier: t2
updated: 2026-11-26
last_verified_with: "Node 26.13.1 (full ICU)."
fragments:
  - "DateTimeFormat"
  - "format(date)"
  - "dateStyle"
  - "timeStyle"
  - "'en-GB'"
  - "'de-DE'"
  - "timeZone: 'UTC'"
  - "hour: 'numeric'"
  - "weekday: 'long'"
  - "month: 'short'"
  - "clock('h23')"
  - "year: 'numeric'"
  - "formatToParts"
  - "resolvedOptions"
  - "'Asia/Tokyo'"
  - "toLocaleDateStr"
intro: |
  `Intl.DateTimeFormat` formats a date for a locale, time zone, and calendar.
  This sheet covers the options, the output parts, and the parsing traps.
links:
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  - title: ECMA-402 DateTimeFormat objects
    url: https://tc39.es/ecma402/#datetimeformat-objects
  - title: DateTimeFormat() constructor
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
---

## Formatting a date

### Basic usage

```js
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))

new Intl.DateTimeFormat().format(date)
// → '12/19/2012'
```
<!-- {: data-highlight="format(date)"} -->

Examples assume a browser in America/Los_Angeles with the en-US locale, and later cards reuse this `date`. `format()` takes a `Date` or a timestamp; build one formatter and reuse it in loops.

See: [format()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format)

### Locales

```js
const format = (locale) => new Intl.DateTimeFormat(locale, {
  timeZone: 'UTC'
}).format(date)

format('en-US')  // → '12/20/2012'
format('en-GB')  // → '20/12/2012'
format('de-DE')  // → '20.12.2012'
format('ja-JP')  // → '2012/12/20'
```
<!-- {: data-highlight="'en-US'; 'en-GB'; 'de-DE'; 'ja-JP'"} -->

Field order, separators, and digits come from CLDR data, so the same `Date` prints differently per locale. Unsupported tags fall back to the runtime default.

See: [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

### Locale arrays

```js
new Intl.DateTimeFormat(['xx-YY', 'en-US'], {
  dateStyle: 'long',
  timeZone: 'UTC'
}).format(date)
// → 'December 20, 2012'
```
<!-- {: data-highlight="['xx-YY', 'en-US']"} -->

The first supported tag wins, so pass the visitor's preferences in order.

See: [locale negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)

### Options without a locale

```js
const opts = { dateStyle: 'long', timeZone: 'UTC' }

new Intl.DateTimeFormat('default', opts).format(date)
// → 'December 20, 2012'
new Intl.DateTimeFormat(undefined, opts).format(date)
// → 'December 20, 2012'
```
<!-- {: data-highlight="'default'; undefined"} -->

`undefined` means the runtime's locale; `'default'` lands on the same locale because it is an unsupported tag that negotiation drops.

See: [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

### Preset styles

#### Formatter

```js
const style = (dateStyle, timeStyle) => (
  new Intl.DateTimeFormat('en-US', {
    dateStyle,
    timeStyle,
    timeZone: 'UTC'
  }).format(date)
)
```
<!-- {: .-wrap data-highlight="dateStyle; timeStyle"} -->

#### Output

```js
style('full')             // → 'Thursday, December 20, 2012'
style('long')             // → 'December 20, 2012'
style('medium')           // → 'Dec 20, 2012'
style('short')            // → '12/20/12'
style('medium', 'short')  // → 'Dec 20, 2012, 3:00 AM'
```
<!-- {: .-wrap} -->

`dateStyle` and `timeStyle` cover the common shapes; combining either with an individual field option throws a `TypeError`.

See: [dateStyle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#datestyle)

## Date fields

### Weekday and month names

```js
const fmt = (options) => new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC', ...options
}).format(date)

fmt({ weekday: 'long' })   // → 'Thursday'
fmt({ month: 'long' })     // → 'December'
fmt({ month: 'short' })    // → 'Dec'
fmt({ month: 'narrow' })   // → 'D'
```
<!-- {: data-highlight="weekday: 'long'; month: 'short'"} -->

Names take `'narrow'`, `'short'`, or `'long'`; the widths differ per locale.

See: [month](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month)

### Numeric dates

#### Long form

```js
new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
  timeZone: 'UTC'
}).format(date)
// → 'December 20, 2012'
```

#### Two-digit

```js
new Intl.DateTimeFormat('en-US', {
  year: '2-digit', month: '2-digit', day: '2-digit',
  timeZone: 'UTC'
}).format(date)
// → '12/20/12'
```
<!-- {: data-highlight="'2-digit'"} -->

`year` takes `'numeric'` or `'2-digit'`; `month` and `day` also take a width.

See: [year](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#year)

### Time of day

```js
const time = (options) => new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC', ...options
}).format(date)

time({ hour: 'numeric', minute: '2-digit' })
// → '3:00 AM'
```
<!-- {: data-highlight="hour: 'numeric'"} -->

Add `second` and `fractionalSecondDigits` for finer output; fields combine freely, but not with `timeStyle`.

See: [hour](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hour)

### 12- and 24-hour clocks

#### Formatter

```js
const midnight = new Date(Date.UTC(2012, 11, 20, 0, 0))
const clock = (hourCycle) => new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: '2-digit', hourCycle, timeZone: 'UTC'
}).format(midnight)
```
<!-- {: data-highlight="hourCycle"} -->

#### Output

```js
clock('h11')  // → '0:00 AM'
clock('h12')  // → '12:00 AM'
clock('h23')  // → '00:00'
clock('h24')  // → '24:00'
```
<!-- {: .-wrap} -->

`h11` and `h12` are 12-hour, `h23` and `h24` are 24-hour. `hour12` overrides `hourCycle`, and `h24` prints midnight as `24:00`.

See: [hourCycle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hourcycle)

## Time zones

### Format in another zone

```js
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Tokyo'
}).format(date)
// → 'Dec 20, 2012, 12:00 PM'
```
<!-- {: data-highlight="timeZone: 'Asia/Tokyo'"} -->

`timeZone` takes an IANA zone name. The `Date` itself stays the same; only the displayed wall clock changes.

See: [timeZone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone)

### Visitor's zone

```js
Intl.DateTimeFormat().resolvedOptions().timeZone
// → 'America/Los_Angeles'
```
<!-- {: data-highlight="resolvedOptions().timeZone"} -->

Read once, then pass the result as `timeZone` wherever output must match a second formatter.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions)

### Zone names and offsets

```js
const zone = (timeZoneName) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric',
  timeZone: 'Australia/Sydney',
  timeZoneName
}).format(date)

zone('short')        // → 'Dec 20, GMT+11'
zone('longOffset')   // → 'Dec 20, GMT+11:00'
zone('shortGeneric') // → 'Dec 20, Sydney Time'
```
<!-- {: .-wrap data-highlight="timeZoneName"} -->

`short` prefers the local abbreviation, `…Offset` always prints GMT, and `…Generic` drops daylight saving.

See: [timeZoneName](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezonename)

### Available zones

```js
Intl.supportedValuesOf('timeZone').slice(0, 3)
// → ['Africa/Abidjan', 'Africa/Accra',
//    'Africa/Addis_Ababa']
```
<!-- {: .-wrap data-highlight="supportedValuesOf('timeZone')"} -->

Lists the primary IANA names the runtime knows. It omits `UTC` and aliases such as `US/Pacific`, which `timeZone` still accepts, so catch the constructor error instead of testing membership.

See: [Intl.supportedValuesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf)

## Working with output

### formatToParts()

```js
const parts = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC'
}).formatToParts(date)

parts.map(({ type, value }) => `${type}: ${value}`)
// → ['day: 20', 'literal: /', 'month: 12',
//    'literal: /', 'year: 2012']
```
<!-- {: .-wrap data-highlight="formatToParts"} -->

Joining every `value` reproduces `format()`. Use the parts to style numbers without parsing the string back.

See: [formatToParts()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)

### No custom patterns

#### Locale order

```js
new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC'
}).format(date)
// → '20/12/2012'
```

#### ISO output

```js
date.toISOString()
// → '2012-12-20T03:00:00.000Z'
```
<!-- {: data-highlight="toISOString"} -->

There are no `YYYY-MM-DD` pattern tokens. Pick a locale whose order matches, or use `toISOString()` for machine-readable UTC.

See: [DateTimeFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)

### Parsing is separate

#### Date-only string

```js
new Date('2012-12-20').toLocaleDateString('en-US')
// → '12/19/2012'
```
<!-- {: data-highlight="'2012-12-20'"} -->

#### With a time

```js
new Date('2012-12-20T00:00:00').toLocaleDateString('en-US')
// → '12/20/2012'
```
<!-- {: data-highlight="'2012-12-20T00:00:00'"} -->

A date-only string parses as UTC midnight, so it can land on the previous day locally. Add a time to parse it in the browser's zone.

See: [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

### toLocaleDateString()

```js
date.toLocaleDateString('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC'
})
// → '20/12/2012'
```
<!-- {: data-highlight="toLocaleDateString"} -->

Shorthand for a one-off formatter. It builds a new one per call, so hoist `Intl.DateTimeFormat` out of loops.

See: [toLocaleDateString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

## Options reference

### Date options

| Option | Values |
| --- | --- |
| `weekday` | `'narrow'`, `'short'`, `'long'` |
| `era` | `'narrow'`, `'short'`, `'long'` |
| `year` | `'numeric'`, `'2-digit'` |
| `month` | `'numeric'`, `'2-digit'`, `'narrow'`, `'short'`, `'long'` |
| `day` | `'numeric'`, `'2-digit'` |
| --- | --- |
| `dateStyle` | `'full'`, `'long'`, `'medium'`, `'short'` |
| `calendar` | e.g. `'gregory'`, `'buddhist'`, `'japanese'` |
<!-- {: .-headers} -->

See: [DateTimeFormat options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)

### Time options

| Option | Values |
| --- | --- |
| `hour` | `'numeric'`, `'2-digit'` |
| `minute` | `'numeric'`, `'2-digit'` |
| `second` | `'numeric'`, `'2-digit'` |
| `fractionalSecondDigits` | `1` to `3` |
| `dayPeriod` | `'narrow'`, `'short'`, `'long'` |
| `timeStyle` | `'full'`, `'long'`, `'medium'`, `'short'` |
| --- | --- |
| `hour12` | `true`, `false` |
| `hourCycle` | `'h11'`, `'h12'`, `'h23'`, `'h24'` |
| `timeZoneName` | `'short'`, `'long'`, `'shortOffset'`, `'longOffset'`, `'shortGeneric'`, `'longGeneric'` |
<!-- {: .-headers} -->

See: [DateTimeFormat options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)

### Locale options

| Option | Values |
| --- | --- |
| `timeZone` | IANA name, e.g. `'Asia/Tokyo'` |
| `numberingSystem` | e.g. `'latn'`, `'arab'`, `'hanidec'` |
| `calendar` | e.g. `'gregory'`, `'iso8601'` |
| `localeMatcher` | `'best fit'` (default), `'lookup'` |
| `formatMatcher` | `'best fit'` (default), `'basic'` |
<!-- {: .-headers} -->

See: [DateTimeFormat options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)

### Errors

#### Unknown zone

```js
new Intl.DateTimeFormat('en-US', { timeZone: 'Mars/Olympus' })
// RangeError: Invalid time zone specified: Mars/Olympus
```
<!-- {: .-wrap} -->

#### Invalid date

```js
new Intl.DateTimeFormat('en-US').format(new Date('nope'))
// RangeError: Invalid time value
```

Bad zones throw when the formatter is built; invalid dates throw on `format()`. Check `Number.isNaN(date.getTime())` for untrusted input.

See: [Exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#exceptions)

## Also see

<!-- {: .-one-column} -->

- [Date as YYYY-MM-DD](./intl-datetime-iso)
- [Date as DD/MM/YYYY](./intl-datetime-dd-mm-yyyy)
- [Date in another time zone](./intl-datetime-timezone)
- [24-hour time](./intl-datetime-24-hour)
- [Date in the user's locale](./intl-datetime-visitor-locale)
- [Get the month name](./intl-datetime-month-name)
- [Parse a date string](./intl-datetime-parse)
