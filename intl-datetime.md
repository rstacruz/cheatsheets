---
title: Intl.DateTimeFormat
subtitle: Locale-aware date formatter
category: Internationalization
tags: [Featured]
updated: 2026-11-25
tier: t3
last_verified_with: "ECMA-402 13th edition."
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
  `Intl.DateTimeFormat` is used to format date strings in JavaScript. Examples use a UTC `date`, formatted in America/Los_Angeles with the `en-US` locale.
links:
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  - title: ECMA-402 DateTimeFormat objects
    url: https://tc39.es/ecma402/#datetimeformat-objects
  - title: DateTimeFormat() constructor
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
---

## Usage

### Parsing

#### As local time

```js
const date = new Date(2012, 11, 20, 3, 0, 0)
```
<!-- {: data-highlight="new Date"} -->

#### As UTC time

```js
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
```
<!-- {: data-highlight="Date.UTC"} -->

new Intl.DateTimeFormat().format(date)
// → '12/19/2012'
```
<!-- {: data-highlight="format(date)"} -->

Examples assume the en-US locale in America/Los_Angeles, so the UTC date above prints as the 19th. Later cards reuse `date`; `format()` takes a `Date` or a timestamp, so build one formatter and reuse it in loops.

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
<!-- {: data-highlight="'2018-04-20T12:00:00Z'"} -->

Field order, separators, and digits come from CLDR data, so the same `Date` prints differently per locale. Unsupported tags fall back to the runtime default.

See: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Formatting dates

#### Default formatting

```js
new Intl.DateTimeFormat(['xx-YY', 'en-US'], {
  dateStyle: 'long',
  timeZone: 'UTC'
}).format(date)
// → 'December 20, 2012'
```
<!-- {: data-highlight="new Intl.DateTimeFormat()"} -->

The first supported tag wins, so pass the visitor's preferences in order.

See: [locale negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)

### Options without a locale

```js
console.log(new Intl.DateTimeFormat('en-GB').format(date))
// → '19/12/2012' (date-first)
```
<!-- {: data-highlight="'en-GB'"} -->

new Intl.DateTimeFormat('default', opts).format(date)
// → 'December 20, 2012'

new Intl.DateTimeFormat(undefined, opts).format(date)
// → 'December 20, 2012'
```
<!-- {: data-highlight="'default'; undefined"} -->

`'default'` and `undefined` both fall back to the runtime's locale; `'default'` is not a special value, it is an unsupported tag that negotiation drops.

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

## Date and time fields

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
<!-- {: .-wrap data-highlight="'h11'; 'h12'; 'h23'; 'h24'"} -->

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
<!-- {: .-wrap data-highlight="zone('short'); zone('longOffset'); zone('shortGeneric')"} -->

`short` uses a local abbreviation when the locale has one and falls back to GMT otherwise; `…Offset` always prints GMT, and `…Generic` drops daylight saving.

See: [timeZoneName](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezonename)

### Available zones

```js
Intl.supportedValuesOf('timeZone').slice(0, 3)
// → ['Africa/Abidjan', 'Africa/Accra',
//    'Africa/Addis_Ababa']
```
<!-- {: .-wrap data-highlight="supportedValuesOf('timeZone')"} -->

Lists the primary IANA names the runtime knows. V8 leaves out `UTC` and aliases such as `US/Pacific`, which `timeZone` still accepts, so catch the constructor error instead of testing membership.

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
<!-- {: data-highlight="timeZone"} -->

See: [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

#### ISO output

```js
date.toISOString()
// → '2012-12-20T03:00:00.000Z'
```
<!-- {: data-highlight="hour: 'numeric'; minute: 'numeric'; second: 'numeric'"} -->

There are no `YYYY-MM-DD` pattern tokens. Pick a locale whose order matches, or use `toISOString()` for machine-readable UTC.

See: [DateTimeFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)

### Parsing is separate

#### Date-only string

```js
new Date('2012-12-20').toLocaleDateString('en-US')
// → '12/19/2012'
```
<!-- {: data-highlight="year: 'numeric'; month: 'numeric'; day: 'numeric'"} -->

To specify options without a locale, use `'default'` as a locale.

See: [Using options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)

### All options

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

See: [DateTimeFormat components table](https://tc39.es/ecma402/#table-datetimeformat-components)

See: [Exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#exceptions)

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat>
