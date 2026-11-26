---
title: How to format a date as YYYY-MM-DD in JavaScript
link_title: Date as YYYY-MM-DD
subtitle: ISO date output
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: toISOString()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
---

## Formatting
<!-- {: .-snippets} -->

### Format a UTC date
<!-- {: .-snippet} -->

```js
new Date('2026-11-26T15:30:00Z')
  .toISOString().slice(0, 10)
// → '2026-11-26'
```
<!-- {: .-wrap data-highlight="slice(0, 10)"} -->

**Cuts the ISO string to ten characters.** `toISOString()` prints UTC, so a local evening can show the next day; see [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

### Format the local date
<!-- {: .-snippet} -->

```js
const pad = (n) => String(n).padStart(2, '0')
const d = new Date(2026, 10, 26)

const iso = [
  d.getFullYear(),
  pad(d.getMonth() + 1),
  pad(d.getDate())
].join('-')

iso // → '2026-11-26'
```
<!-- {: data-highlight="pad(d.getMonth() + 1)"} -->

**Builds the string from local fields.** `getMonth()` is zero-based, so add one before padding; see [getDate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate).

### Keep the time
<!-- {: .-snippet} -->

```js
new Date(2026, 10, 26, 15, 30).toISOString()
// → '2026-11-26T23:30:00.000Z' (UTC-8)
```
<!-- {: .-wrap data-highlight="toISOString"} -->

**Returns the full ISO timestamp.** Drop `slice(0, 10)` when the time matters; the trailing `Z` marks it as UTC; see [Date.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

