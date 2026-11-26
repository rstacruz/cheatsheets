---
title: How to get the difference between two dates in Day.js
link_title: Day.js date difference
subtitle: Days, hours and months
category: Date libraries
layout: snippet
last_verified_with: "Day.js 1.11.23, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Day.js difference
    url: https://day.js.org/docs/en/display/difference
---

## Comparing dates
<!-- {: .-snippets} -->

### Whole days
<!-- {: .-snippet} -->

```js
const start = dayjs('2014-06-09')
const end = dayjs('2014-06-19')

end.diff(start, 'days')   // 10
```
<!-- {: data-highlight=".diff(start, 'days')"} -->

**Counts whole days between two dates.** The result truncates toward zero, so a partial day is dropped; see [Difference](https://day.js.org/docs/en/display/difference).

### Fractional days
<!-- {: .-snippet} -->

```js
const start = dayjs('2014-06-09T00:00')
const end = dayjs('2014-06-19T12:00')

end.diff(start, 'days', true)   // 10.5
```
<!-- {: data-highlight=", true"} -->

**Returns a float with the third argument.** Without it the result is truncated; see [Difference](https://day.js.org/docs/en/display/difference).

### Hours and minutes
<!-- {: .-snippet} -->

```js
const start = dayjs('2014-06-09T00:00')
const end = dayjs('2014-06-19T12:00')

end.diff(start, 'hours')     // 252
end.diff(start, 'minutes')   // 15120
```
<!-- {: data-highlight="'hours'"} -->

**Converts the gap to another unit.** `seconds` and `weeks` work too; see [Difference](https://day.js.org/docs/en/display/difference).

### Months truncate
<!-- {: .-snippet} -->

```js
const start = dayjs('2014-06-09T09:32')
const end = dayjs('2014-10-09')

end.diff(start, 'months')   // 3
```
<!-- {: data-highlight="'months'"} -->

**Counts whole month boundaries.** The end lands 9½ hours short of four months, so this stays at 3; see [Difference](https://day.js.org/docs/en/display/difference).

### Humanize the gap
<!-- {: .-snippet} -->

```js
import dur from 'dayjs/plugin/duration.js'
import rt from 'dayjs/plugin/relativeTime.js'

dayjs.extend(dur)
dayjs.extend(rt)

const start = dayjs('2014-06-09')
const end = dayjs('2014-06-19')

dayjs.duration(end.diff(start)).humanize()
// "10 days"
```
<!-- {: data-highlight="humanize()"} -->

**Turns the milliseconds into a readable span.** `diff()` already returns milliseconds; see [Duration](https://day.js.org/docs/en/durations/humanize).
