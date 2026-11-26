---
title: Intl.DateTimeFormat
subtitle: Locale-aware date formatter
category: Browser APIs
tags: [Featured]
updated: 2026-11-25
tier: t3
last_verified_with: "ECMA-402 13th edition."
fragments:
  - "DateTimeFormat"
  - "new Date"
  - "format(date)"
  - "'en-GB'"
  - "timeZone"
  - "hour12"
  - "weekday"
  - "month: 'numeric'"
  - "year: 'numeric'"
  - "hour: 'numeric'"
  - "'en-US'"
  - "'en-AU'"
  - "hourCycle"
  - "timeZoneName"
intro: |
  `Intl.DateTimeFormat` is used to format date strings in JavaScript. Examples use a UTC `date`, formatted in America/Los_Angeles with the `en-US` locale.
links:
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
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

#### From ISO strings

```js
const date = new Date('2018-04-20T12:00:00Z')
```
<!-- {: data-highlight="'2018-04-20T12:00:00Z'"} -->

Note that JavaScript doesn't "store" timezones in a date object. All these date objects, when expressed via `.toString()` or similar, will show the local timezone of the browser, regardless if you parsed UTC dates.

See: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Formatting dates

#### Default formatting

```js
console.log(new Intl.DateTimeFormat().format(date))
// → '12/19/2012' (assuming America/Los_Angeles)
```
<!-- {: data-highlight="new Intl.DateTimeFormat()"} -->

#### Custom locale

```js
console.log(new Intl.DateTimeFormat('en-GB').format(date))
// → '19/12/2012' (date-first)
```
<!-- {: data-highlight="'en-GB'"} -->

#### Custom timezone

```js
console.log(new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney'
}).format(date))
// → '20/12/2012'
```
<!-- {: data-highlight="timeZone"} -->

See: [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

### Custom formats

#### Time

```js
console.log(new Intl.DateTimeFormat('default', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}).format(date))
// → '7:00:00 PM'
```
<!-- {: data-highlight="hour: 'numeric'; minute: 'numeric'; second: 'numeric'"} -->

#### Date

```js
console.log(new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).format(date))
// → '12/19/2012'
```
<!-- {: data-highlight="year: 'numeric'; month: 'numeric'; day: 'numeric'"} -->

To specify options without a locale, use `'default'` as a locale.

See: [Using options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)

### All options

```js
{
  weekday: 'narrow' | 'short' | 'long',
  era: 'narrow' | 'short' | 'long',
  year: 'numeric' | '2-digit',
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
  day: 'numeric' | '2-digit',
  hour: 'numeric' | '2-digit',
  minute: 'numeric' | '2-digit',
  second: 'numeric' | '2-digit',
  timeZoneName: 'short' | 'long',

  // Time zone to express it in
  timeZone: 'Asia/Shanghai',
  // Force 12-hour or 24-hour
  hour12: true | false,

  // Rarely-used options
  hourCycle: 'h11' | 'h12' | 'h23' | 'h24',
  formatMatcher: 'basic' | 'best fit'
}
```

See: [DateTimeFormat components table](https://tc39.es/ecma402/#table-datetimeformat-components)

## References

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat>
