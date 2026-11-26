---
title: How to format a date in another time zone in JavaScript
link_title: Date in another time zone
subtitle: Display dates in another zone
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: timeZone option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone
  - title: Intl.supportedValuesOf()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
---

## Time zones
<!-- {: .-snippets} -->

### Set the time zone
<!-- {: .-snippet} -->

```js
const date = new Date('2026-11-26T15:30:00Z')

new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  dateStyle: 'medium',
  timeStyle: 'short'
}).format(date)
// → 'Nov 27, 2026, 12:30 AM'
```
<!-- {: .-wrap data-highlight="timeZone: 'Asia/Tokyo'"} -->

**Prints the same instant as wall-clock time in Tokyo.** `timeZone` takes an IANA zone name and never changes the underlying `Date`; see [timeZone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone).

### Read the visitor's zone
<!-- {: .-snippet} -->

```js
Intl.DateTimeFormat().resolvedOptions().timeZone
// → 'America/Los_Angeles'
```
<!-- {: .-wrap data-highlight="resolvedOptions().timeZone"} -->

**Reports the browser's own zone.** Store the result and reuse it as `timeZone` so a later formatter prints the same day; see [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions).

### Show the zone name
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  timeZoneName: 'shortOffset'
}).format(new Date('2026-11-26T15:30:00Z'))
// → '11/27/2026, GMT+9'
```
<!-- {: .-wrap data-highlight="timeZoneName: 'shortOffset'"} -->

**Appends the offset instead of a region name.** `'short'` uses an abbreviation when the zone has one; `'longGeneric'` drops daylight saving; see [timeZoneName](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezonename).

### List the known zones
<!-- {: .-snippet} -->

```js
Intl.supportedValuesOf('timeZone')
  .includes('Asia/Tokyo')
// → true
```
<!-- {: .-wrap data-highlight="supportedValuesOf"} -->

**Checks a zone before passing it through.** An unknown name throws a `RangeError` when the formatter is built; see [Intl.supportedValuesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf).
