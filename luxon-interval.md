---
title: How to split and measure date ranges in Luxon
link_title: Luxon intervals
subtitle: Split and measure date ranges
logo: { src: /assets/logos/luxon.svg }
category: Date libraries
layout: snippet
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Luxon intervals
    url: https://moment.github.io/luxon/#/tour?id=intervals
---

## Working with intervals
<!-- {: .-snippets} -->

### Create a range
<!-- {: .-snippet} -->

```js
import { DateTime, Interval } from 'luxon'

const start = DateTime.fromISO(
  '2026-01-01T09:00', { zone: 'utc' })
const end = DateTime.fromISO(
  '2026-01-15T17:30', { zone: 'utc' })

Interval.fromDateTimes(start, end).toISODate()
// "2026-01-01/2026-01-15"
```
<!-- {: data-highlight="Interval.fromDateTimes"} -->

**Builds an interval from two DateTimes.** Reversed endpoints produce an invalid interval; see [Intervals](https://moment.github.io/luxon/#/tour?id=intervals).

### Measure
<!-- {: .-snippet} -->

```js
const range = Interval.fromISO(
  '2026-01-01T09:00Z/2026-01-15T17:30Z')

range.length('hours')   // 344.5
range.count('days')     // 15
```
<!-- {: data-highlight="count('days')"} -->

**`length()` is elapsed time; `count()` counts calendar units.** This range touches 15 days; see [length](https://moment.github.io/luxon/api-docs/index.html).

### Split into weeks
<!-- {: .-snippet} -->

```js
const range = Interval.fromISO(
  '2026-01-01T09:00Z/2026-01-15T17:30Z')

range.splitBy({ days: 7 })
  .map((part) => part.toISODate())
// ["2026-01-01/2026-01-08",
//  "2026-01-08/2026-01-15",
//  "2026-01-15/2026-01-15"]
```
<!-- {: data-highlight="splitBy({ days: 7 })"} -->

**Splits into evenly sized pieces.** The final slice can be shorter than the step, and `toISODate()` hides its time when it lands on the same date; see [splitBy](https://moment.github.io/luxon/api-docs/index.html).

### Contains a moment
<!-- {: .-snippet} -->

```js
const range = Interval.fromISO(
  '2026-01-01T09:00Z/2026-01-15T17:30Z')
const noon = DateTime.fromISO('2026-01-10T12:00',
  { zone: 'utc' })

range.contains(noon)      // true
range.contains(range.end) // false
range.contains(range.end.minus({ seconds: 1 }))
// true
```
<!-- {: data-highlight="minus("} -->

**The end is exclusive.** Test the last instant with `minus()`; see [contains](https://moment.github.io/luxon/api-docs/index.html).

### Overlaps
<!-- {: .-snippet} -->

```js
const range = Interval.fromISO(
  '2026-01-01T09:00Z/2026-01-15T17:30Z')

const next = Interval.fromDateTimes(
  range.start.plus({ days: 5 }),
  range.end
)

range.overlaps(next)      // true
range.intersection(next).toISODate()
// "2026-01-06/2026-01-15"
```
<!-- {: data-highlight="overlaps"} -->

**Tests whether two ranges share time.** `intersection()` returns the overlap; see [overlaps](https://moment.github.io/luxon/api-docs/index.html).
