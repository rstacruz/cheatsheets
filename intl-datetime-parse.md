---
title: How to parse a date string in JavaScript
link_title: Parse a date string
subtitle: ISO strings without surprises
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: Date.parse()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  - title: ISO 8601 date and time format
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
---

## Parsing
<!-- {: .-snippets} -->

### Date-only strings are UTC
<!-- {: .-snippet} -->

```js
new Date('2026-11-26').toISOString()
// → '2026-11-26T00:00:00.000Z'
```
<!-- {: .-wrap data-highlight="'2026-11-26'"} -->

**A bare date parses as UTC midnight.** West of Greenwich it displays as the previous day, so `getDate()` returns `25` in Los Angeles; see [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).

### Add a time for local dates
<!-- {: .-snippet} -->

```js
new Date('2026-11-26T00:00:00').toISOString()
// → '2026-11-26T08:00:00.000Z'
```
<!-- {: .-wrap data-highlight="'2026-11-26T00:00:00'"} -->

**A missing zone means local time.** Adding `T00:00:00` gives local midnight, which is 08:00 UTC in Los Angeles; see [date time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format).

### Build a UTC date
<!-- {: .-snippet} -->

```js
new Date(Date.UTC(2026, 10, 26)).toISOString()
// → '2026-11-26T00:00:00.000Z'
```
<!-- {: .-wrap data-highlight="Date.UTC"} -->

**Skips string parsing entirely.** `Date.UTC()` takes zero-based months and returns a timestamp, so no zone guessing happens; see [Date.UTC()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC).

### Parse the parts yourself
<!-- {: .-snippet} -->

```js
const [y, m, d] = '2026-11-26'.split('-')

new Date(Number(y), Number(m) - 1, Number(d))
```
<!-- {: .-wrap data-highlight="split('-')"} -->

**Keeps the date in the local zone.** The numeric constructor treats fields as local time and the month as zero-based; see [Date() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date).

### Detect a failed parse
<!-- {: .-snippet} -->

```js
const date = new Date('26/11/2026')

Number.isNaN(date.getTime())
// → true
```
<!-- {: .-wrap data-highlight="Number.isNaN(date.getTime())"} -->

**An invalid date never throws on construction.** Check the timestamp before formatting, because `format()` throws a `RangeError` on an invalid date; see [Date.getTime()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime).
