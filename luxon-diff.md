---
title: How to get the difference between two dates in Luxon
link_title: Luxon date difference
subtitle: Days, hours and months
logo: { src: /assets/logos/luxon.svg }
category: Date libraries
layout: snippet
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
updated: 2026-11-28
links:
  - title: Luxon math
    url: https://moment.github.io/luxon/#/math?id=diffs
---

## Comparing dates
<!-- {: .-snippets} -->

### Fractional days
<!-- {: .-snippet} -->

```js
const start = DateTime.fromISO(
  '2014-06-09T00:00', { zone: 'utc' })
const end = DateTime.fromISO(
  '2014-06-10T12:00', { zone: 'utc' })

end.diff(start, 'days').days   // 1.5
```
<!-- {: data-highlight="'days'"} -->

**Returns a `Duration`.** Read `.days` or another unit from it; See [Diff](https://moment.github.io/luxon/#/math?id=diffs).

### Multi-unit
<!-- {: .-snippet} -->

```js
const a = DateTime.fromISO(
  '2014-06-09T09:32', { zone: 'utc' })
const b = DateTime.fromISO(
  '2014-06-19T12:30', { zone: 'utc' })

b.diff(a, ['days', 'hours', 'minutes'])
  .toObject()
// { days: 10, hours: 2, minutes: 58 }
```
<!-- {: data-highlight="toObject()"} -->

**Breaks the gap into units.** Calendar values are whole numbers; See [Diff](https://moment.github.io/luxon/#/math?id=diffs).

### Hours across DST
<!-- {: .-snippet} -->

```js
const a = DateTime.fromISO('2026-03-07T12:00',
  { zone: 'America/New_York' })
const b = DateTime.fromISO('2026-03-08T12:00',
  { zone: 'America/New_York' })

a.diff(b, 'hours').hours   // -23
```
<!-- {: data-highlight="'hours'"} -->

**Counts exact elapsed hours.** A spring-forward day has 23 hours, so the two noon dates are not 24 apart; see [DST and math](https://moment.github.io/luxon/#/zones?id=math-across-dsts).

### Fractional months
<!-- {: .-snippet} -->

```js
const a = DateTime.fromISO(
  '2014-06-09T09:32', { zone: 'utc' })
const b = DateTime.fromISO(
  '2014-10-09', { zone: 'utc' })

b.diff(a, 'months').months   // 3.986...
```
<!-- {: data-highlight="'months'"} -->

**Months come back fractional.** The end lands 9½ hours short of four months, so floor the result or pass `['months', 'days']`; see [Diff](https://moment.github.io/luxon/#/math?id=diffs).
