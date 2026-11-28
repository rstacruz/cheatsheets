---
title: How to format a date in another time zone in JavaScript
link_title: Date in another time zone
subtitle: Display dates in another zone
logo: { set: icon-park-outline, name: globe }
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-28
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

**Prints Tokyo wall time.** It shows the same instant in Tokyo; `timeZone` takes an IANA zone name and never changes the underlying `Date`. See [timeZone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone).

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

**Appends the offset.** It adds an offset rather than a region name; `'short'` uses an abbreviation when the zone has one, while `'longGeneric'` drops daylight saving. See [timeZoneName](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezonename).

### Catch an unknown zone
<!-- {: .-snippet} -->

```js
try {
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Mars/Base'
  })
} catch (error) {
  error.name // → 'RangeError'
}
```
<!-- {: .-wrap data-highlight="catch"} -->

**Unknown zones throw.** The error comes when the formatter is built; membership in `Intl.supportedValuesOf('timeZone')` is not a substitute, since V8 leaves out `UTC` and aliases such as `US/Pacific`. See [timeZone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timezone).
