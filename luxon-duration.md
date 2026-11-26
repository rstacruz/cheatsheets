---
title: How to format a duration in Luxon
link_title: Luxon duration
subtitle: Build, format and humanize
category: Date libraries
layout: snippet
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Luxon durations
    url: https://moment.github.io/luxon/#/tour?id=durations
---

## Working with durations
<!-- {: .-snippets} -->

### Create
<!-- {: .-snippet} -->

```js
import { Duration } from 'luxon'

Duration.fromObject({ hours: 2, minutes: 30 })
  .toISO()
// "PT2H30M"

Duration.fromISO('PT1H30M').as('minutes')
// 90
```
<!-- {: data-highlight="Duration.fromObject"} -->

**Builds a duration from units or ISO 8601.** It stays a unit bag, not an instant; see [Durations](https://moment.github.io/luxon/#/tour?id=durations).

### Format tokens
<!-- {: .-snippet} -->

```js
const d = Duration.fromObject(
  { days: 2, hours: 3 })

d.toFormat("d'd' h'h' m'm'")
// "2d 3h 0m"
```
<!-- {: data-highlight="toFormat("} -->

**Formats with duration tokens.** Missing units print as zero, and quoted letters stay literal; see [Duration format](https://moment.github.io/luxon/api-docs/index.html).

### Human readable
<!-- {: .-snippet} -->

```js
Duration.fromObject({ hours: 2, minutes: 30 })
  .toHuman()
// "2 hours, 30 minutes"

Duration.fromObject({ hours: 2, minutes: 30 })
  .toHuman({ listStyle: 'long' })
// "2 hours and 30 minutes"
```
<!-- {: data-highlight="toHuman("} -->

**Renders through `Intl`.** `toHuman()` uses `Intl.NumberFormat` and `Intl.ListFormat`; see [toHuman](https://moment.github.io/luxon/api-docs/index.html).

### Shift units
<!-- {: .-snippet} -->

```js
Duration.fromObject({ minutes: 150 })
  .shiftTo('hours', 'minutes').toObject()
// { hours: 2, minutes: 30 }
```
<!-- {: data-highlight="shiftTo("} -->

**Carries whole units into the named ones.** `as()` returns a fraction instead; see [shiftTo](https://moment.github.io/luxon/api-docs/index.html).

### From two dates
<!-- {: .-snippet} -->

```js
const start = DateTime.fromISO(
  '2014-06-09T09:32', { zone: 'utc' })
const end = DateTime.fromISO(
  '2014-06-19T12:30', { zone: 'utc' })

const span = end.diff(start,
  ['days', 'hours', 'minutes'])
span.toObject()
// { days: 10, hours: 2, minutes: 58 }
```
<!-- {: data-highlight="end.diff("} -->

**A `diff()` already returns a duration.** Pass units to break it down; see [Diff](https://moment.github.io/luxon/#/math?id=diffs).
