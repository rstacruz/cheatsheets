---
title: How to format a date with Day.js
link_title: Day.js format
subtitle: Format dates as strings
logo: { set: icon-park-outline, name: time }
category: Date libraries
layout: snippet
last_verified_with: "Day.js 1.11.23, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Day.js format
    url: https://day.js.org/docs/en/display/format
---

## Formatting dates
<!-- {: .-snippets} -->

### Token string
<!-- {: .-snippet} -->

```js
dayjs('2014-06-09').format('YYYY-MM-DD')
// "2014-06-09"
```
<!-- {: data-highlight="'YYYY-MM-DD'"} -->

**Renders the date with a token string.** Tokens are case-sensitive: `MM` is the month and `mm` is the minute; see [Format](https://day.js.org/docs/en/display/format).

### Month and day names
<!-- {: .-snippet} -->

```js
dayjs('2014-06-09').format('dddd, MMMM D')
// "Monday, June 9"
```
<!-- {: data-highlight="'dddd, MMMM D'"} -->

**Spells out names from the active locale.** `ddd` and `MMM` shorten them; see [Format](https://day.js.org/docs/en/display/format).

### Named formats
<!-- {: .-snippet} -->

```js
import lf from 'dayjs/plugin/localizedFormat.js'
dayjs.extend(lf)

dayjs('2014-06-09').format('LL')
// "June 9, 2014"
```
<!-- {: data-highlight="'LL'"} -->

**Uses locale-aware `L` tokens.** They follow the active locale's date order; see [Localized format](https://day.js.org/docs/en/plugin/localized-format).

### Ordinal and quarter
<!-- {: .-snippet} -->

```js
import af from 'dayjs/plugin/advancedFormat.js'
dayjs.extend(af)

dayjs('2014-06-09').format('Do MMMM YYYY')
// "9th June 2014"
```
<!-- {: data-highlight="'Do MMMM YYYY'"} -->

**Adds the ordinal suffix with `Do`.** The `Q` token gives the quarter; see [Advanced format](https://day.js.org/docs/en/plugin/advanced-format).

### Literal text
<!-- {: .-snippet} -->

```js
dayjs('2014-06-09').format('[on] YYYY-MM-DD')
// "on 2014-06-09"
```
<!-- {: data-highlight="'[on] YYYY-MM-DD'"} -->

**Square brackets escape literal words.** Without them, `on` would be read as tokens; see [Format](https://day.js.org/docs/en/display/format).
