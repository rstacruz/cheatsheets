---
title: How to get the month name in JavaScript
link_title: Get the month name
subtitle: Month names by locale
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: month option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month
  - title: Intl.DateTimeFormat
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
---

## Month names
<!-- {: .-snippets} -->

### From a date
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-US', {
  month: 'long'
}).format(new Date(2026, 10, 26))
// → 'November'
```
<!-- {: .-wrap data-highlight="month: 'long'"} -->

**Prints only the month.** Leaving out `day` and `year` keeps the rest of the date out of the string; see [month](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month).

### From a month number
<!-- {: .-snippet} -->

```js
const monthName = (index) => (
  new Intl.DateTimeFormat('en-US', {
    month: 'long'
  }).format(new Date(2026, index, 1))
)

monthName(0)  // → 'January'
monthName(10) // → 'November'
```
<!-- {: .-wrap data-highlight="monthName(10)"} -->

**Turns a zero-based index into a name.** `getMonth()` and date libraries both count from zero, so `10` is November; see [getMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth).

### Choose a width
<!-- {: .-snippet} -->

```js
const widths = ['short', 'narrow']

widths.map((width) => (
  new Intl.DateTimeFormat('en-US', {
    month: width
  }).format(new Date(2026, 10, 1))
))
// → ['Nov', 'N']
```
<!-- {: .-wrap data-highlight="['short', 'narrow']"} -->

**Widths shorten the name; locale rules still apply.** `narrow` can collide across months (March and May are both `M`), so keep it for tight tables; see [month](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month).

### Add the year
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric'
}).format(new Date(2026, 10, 26))
// → 'November 2026'
```
<!-- {: .-wrap data-highlight="year: 'numeric'"} -->

**Pairs the name with a year.** Order follows the locale, so `fr-FR` prints `novembre 2026`; see [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

### Translate the name
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('fr-FR', {
  month: 'long'
}).format(new Date(2026, 10, 26))
// → 'novembre'
```
<!-- {: .-wrap data-highlight="'fr-FR'"} -->

**Ships the translations with the runtime.** You never maintain a month table; the locale tag alone picks the spelling; see [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
