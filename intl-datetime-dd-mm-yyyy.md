---
title: How to format a date as DD/MM/YYYY in JavaScript
link_title: Date as DD/MM/YYYY
subtitle: Day-first date output
logo: { set: icon-park-outline, name: globe }
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
  - title: formatToParts()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts
---

## Formatting
<!-- {: .-snippets} -->

### Use a day-first locale
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(2026, 10, 26, 15, 30))
// → '26/11/2026'
```
<!-- {: .-wrap data-highlight="'en-GB'"} -->

**Uses a day-first locale.** `en-GB` orders fields day, month, year; `Intl` has no pattern strings, so the order comes from the locale. See [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

### Use a two-digit year
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-GB', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit'
}).format(new Date(2026, 10, 26))
// → '26/11/26'
```
<!-- {: .-wrap data-highlight="year: '2-digit'"} -->

**Shortens the year.** Use two digits for display only: ISO 8601 interchange dates require a four-digit year. See [year](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#year).

### Build the string by hand
<!-- {: .-snippet} -->

```js
const pad = (n) => String(n).padStart(2, '0')
const d = new Date(2026, 10, 26)

const out = [
  pad(d.getDate()),
  pad(d.getMonth() + 1),
  d.getFullYear()
].join('/')

out // → '26/11/2026'
```
<!-- {: data-highlight="pad(d.getDate())"} -->

**Controls the field order.** Hand-building gives full control; `getMonth()` is zero-based, so add one, but this skips locale rules such as Arabic-Indic digits. See [getDate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate).

### Mind the time zone
<!-- {: .-snippet} -->

#### Browser zone

```js
new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: '2-digit'
}).format(new Date('2026-11-26T02:30:00Z'))
// → '25/11'
```
<!-- {: .-wrap data-highlight="'25/11'"} -->

#### UTC

```js
new Intl.DateTimeFormat('en-GB', {
  day: '2-digit', month: '2-digit',
  timeZone: 'UTC'
}).format(new Date('2026-11-26T02:30:00Z'))
// → '26/11'
```
<!-- {: .-wrap data-highlight="timeZone: 'UTC'"} -->

**Sets the time zone.** Without `timeZone`, the browser's zone decides the day: the same instant falls on the 25th in Los Angeles and the 26th in UTC. See [timeZone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone).
