---
title: Luxon
seo_title: Luxon cheatsheet — format, diff, time zones
description: "Luxon reference: DateTime, Duration and Interval, with formatting, time zones and DST."
subtitle: Date and time library
category: Date libraries
tier: t2
fragments:
  - "DateTime.now()"
  - "fromISO('...')"
  - ".plus({days:1})"
  - "toFormat('yyyy')"
  - ".setZone(zone)"
  - ".toUTC()"
  - "toLocaleString"
  - ".toRelative()"
  - "Duration.from()"
  - "Interval.from()"
  - ".diff(d, 'days')"
  - ".startOf('day')"
  - ".isValid"
  - "Info.months()"
  - ".toISODate()"
  - "invalidReason"
updated: 2026-11-26
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
intro: |
  [Luxon](https://moment.github.io/luxon/) is a date and time library built on `Intl`. This reference covers parsing, formatting, arithmetic, time zones, intervals and durations.
links:
  - title: Luxon documentation
    url: https://moment.github.io/luxon/#/
  - title: API reference
    url: https://moment.github.io/luxon/api-docs/
  - title: GitHub repository
    url: https://github.com/moment/luxon
---

## Getting started

### Create a DateTime

```js
import { DateTime } from 'luxon'

DateTime.now()
DateTime.fromISO('2014-06-09T09:32:00Z')
DateTime.fromObject({ year: 2014, month: 6, day: 9 })
DateTime.fromFormat('09-06-2014', 'dd-MM-yyyy')
DateTime.fromMillis(1402306320000)
```
<!-- {: data-highlight="DateTime.fromISO("} -->

Every factory returns an immutable `DateTime` that carries both an instant and a zone. With no zone option, the local zone applies.

See: [Creating DateTimes](https://moment.github.io/luxon/#/tour)

### Invalid DateTimes

```js
const bad = DateTime.fromISO('2014-13-01')

bad.isValid        // false
bad.invalidReason  // "unit out of range"
```
<!-- {: data-highlight="isValid"} -->

Unlike Day.js, Luxon refuses a bad value instead of rolling it into a nearby date. Check `isValid` before formatting or storing.

See: [Validity](https://moment.github.io/luxon/#/validity)

### Chain operations

```js
const start = DateTime.fromISO('2014-06-09', { zone: 'utc' })
const next = start.plus({ days: 1 })

start.toISODate()   // "2014-06-09"
next.toISODate()    // "2014-06-10"
```
<!-- {: data-highlight="start.plus({ days: 1 })"} -->

No method mutates in place; assign the result or chain from it.

See: [Math](https://moment.github.io/luxon/#/math)

## Formatting

### Format tokens

#### Date

| Token  | Output   |
| ------ | -------- |
| `yyyy` | `2014`   |
| `yy`   | `14`     |
| `LLLL` | `June`   |
| `LLL`  | `Jun`    |
| `MM`   | `06`     |
| `M`    | `6`      |
| --- | --- |
| `dd`   | `09`     |
| `d`    | `9`      |
| `cccc` | `Monday` |
| `ccc`  | `Mon`    |
<!-- {: .-headers} -->

#### Time

| Token | Output  |
| ----- | ------- |
| `HH`  | `09`    |
| `H`   | `9`     |
| `hh`  | `09`    |
| `h`   | `9`     |
| `mm`  | `32`    |
| --- | --- |
| `ss`  | `05`    |
| `SSS` | `123`   |
| `a`   | `AM`    |
<!-- {: .-headers} -->

#### Zone and epoch

| Token  | Output   |
| ------ | -------- |
| `ZZZZ` | `UTC`    |
| `ZZ`   | `+00:00` |
| `Z`    | `+0`     |
| `X`    | `1402306325` |
| `x`    | `1402306325123` |
<!-- {: .-headers} -->

Luxon tokens are case-sensitive and mostly unpunctuated: `yyyy` is a year, `YYYY` is not. The `X` and `x` tokens emit seconds and milliseconds. The outputs assume a UTC instance.

See: [Formatting](https://moment.github.io/luxon/#/formatting)

### Locale presets

```js
const d = DateTime.fromISO('2014-06-09T09:32:05Z', { zone: 'utc' })

d.toLocaleString(DateTime.DATE_FULL)
// "June 9, 2014"
d.toLocaleString(DateTime.DATETIME_MED)
// "Jun 9, 2014, 9:32 AM"
d.toLocaleString(DateTime.TIME_24_SIMPLE)
// "09:32"
```
<!-- {: data-highlight="DATE_FULL"} -->

Presets render through `Intl`, so they adapt to the locale and to the runtime's ICU data.

See: [Locale strings](https://moment.github.io/luxon/#/formatting?id=presets)

### Custom locale

```js
const d = DateTime.fromISO('2014-06-09T09:32:05Z', { zone: 'utc' })

d.setLocale('fr').toLocaleString(DateTime.DATE_FULL)
// "9 juin 2014"
d.setLocale('fr').toFormat('cccc d LLLL yyyy')
// "lundi 9 juin 2014"
```
<!-- {: data-highlight="setLocale('fr')"} -->

`setLocale()` affects only that instance's output, not the global default.

See: [Locales](https://moment.github.io/luxon/#/intl?id=how-locales-work)

### Escaping text

```js
DateTime.fromISO('2014-06-09').toFormat("'week' W")
// "week 24"
```
<!-- {: data-highlight="'week'"} -->

Single quotes protect literal words from being read as tokens.

See: [Escaping](https://moment.github.io/luxon/#/formatting?id=escaping)

### ISO output

```js
const d = DateTime.fromISO('2014-06-09T09:32:05.123Z',
  { zone: 'Asia/Tokyo' })

d.toISO()          // "2014-06-09T18:32:05.123+09:00"
d.toUTC().toISO()  // "2014-06-09T09:32:05.123Z"
d.toISODate()      // "2014-06-09"
d.toISOWeekDate()  // "2014-W24-1"
```
<!-- {: data-highlight="toUTC().toISO()"} -->

`toISO()` keeps the current zone; `toUTC()` is what adds the trailing `Z`.

See: [ISO](https://moment.github.io/luxon/#/formatting?id=iso-8601)

### Relative time

#### Exact

```js
const d = DateTime.fromISO('2014-06-09T09:32Z', { zone: 'utc' })
const base = DateTime.fromISO('2014-06-19T09:32Z', { zone: 'utc' })

d.toRelative({ base })
// "10 days ago"
```

#### Calendar

```js
DateTime.fromISO('2026-11-24T10:00', { zone: 'utc' })
  .toRelativeCalendar({
    base: DateTime.fromISO('2026-11-26T10:00', { zone: 'utc' })
  })
// "2 days ago"
```
<!-- {: data-highlight="toRelativeCalendar("} -->

`toRelative()` counts elapsed time; `toRelativeCalendar()` names the calendar day. Both need `Intl.RelativeTimeFormat`.

See: [Relative time](https://moment.github.io/luxon/api-docs/index.html)

## Math

### Add and subtract

#### Days and months

```js
import { DateTime, Duration } from 'luxon'

const d = DateTime.fromISO('2014-06-09T09:32', { zone: 'utc' })

d.plus({ days: 3 }).toISODate()    // "2014-06-12"
d.minus({ months: 1 }).toISODate() // "2014-05-09"
d.plus(Duration.fromObject({ hours: 2 })).toISO()
// "2014-06-09T11:32:00.000Z"
```

#### Month ends

```js
DateTime.fromISO('2014-01-31', { zone: 'utc' })
  .plus({ months: 1 }).toISODate()   // "2014-02-28"
```
<!-- {: data-highlight="{ months: 1 }"} -->

Plain objects and `Duration` both work. Months clamp to the last valid day instead of spilling into the next month.

See: [Math](https://moment.github.io/luxon/#/math)

### DST changes calendar days

```js
const d = DateTime.fromISO('2026-03-07T09:00',
  { zone: 'America/New_York' })

d.plus({ days: 1 }).toISO()
// "2026-03-08T09:00:00.000-04:00"
d.plus({ hours: 24 }).toISO()
// "2026-03-08T10:00:00.000-04:00"
```
<!-- {: data-highlight="{ hours: 24 }"} -->

`days` keep the wall clock across a DST change; `hours` are exact elapsed time.

See: [DST and math](https://moment.github.io/luxon/#/zones?id=math-across-dsts)

### Start and end of unit

```js
const d = DateTime.fromISO('2014-06-11T09:32', { zone: 'utc' })

d.startOf('day').toISO()
// "2014-06-11T00:00:00.000Z"
d.endOf('month').toISO()
// "2014-06-30T23:59:59.999Z"
d.startOf('week').toISODate()   // "2014-06-09"
```
<!-- {: data-highlight="startOf('week')"} -->

`startOf('week')` follows ISO weeks and begins on Monday. `endOf()` lands on the last millisecond.

See: [Start and end](https://moment.github.io/luxon/#/tour?id=math)

### Set fields

```js
const d = DateTime.fromISO('2014-06-11T09:32', { zone: 'utc' })

d.set({ month: 1, day: 15 }).toISODate()  // "2014-01-15"
d.set({ hour: 0, minute: 0 }).toISO()
// "2014-06-11T00:00:00.000Z"
```
<!-- {: data-highlight="{ month: 1, day: 15 }"} -->

`set()` replaces fields; use `plus()` or `minus()` to move by an amount.

See: [Set](https://moment.github.io/luxon/#/tour?id=set)

### Differences

#### Fractional

```js
const start = DateTime.fromISO('2014-06-09T00:00', { zone: 'utc' })
const end = DateTime.fromISO('2014-06-10T12:00', { zone: 'utc' })

end.diff(start, 'days').days    // 1.5
end.diff(start, 'hours').hours  // 36
```

#### Breakdown

```js
DateTime.fromISO('2014-06-19T12:30', { zone: 'utc' })
  .diff(DateTime.fromISO('2014-06-09T09:32', { zone: 'utc' }),
    ['days', 'hours', 'minutes'])
  .toObject()
// { days: 10, hours: 2, minutes: 58 }
```
<!-- {: data-highlight="'days', 'hours', 'minutes'"} -->

`diff()` returns a `Duration`. A single unit gives a fractional count; an array gives whole calendar units.

See: [Diff](https://moment.github.io/luxon/#/math?id=diffs)

## Time zones

### Parse in a zone

```js
DateTime.fromISO('2026-03-08T09:00',
  { zone: 'America/New_York' }).toISO()
// "2026-03-08T09:00:00.000-04:00"
```
<!-- {: data-highlight="{ zone: 'America/New_York' }"} -->

The zone option reads a naive string as wall time in that zone. It also applies to `fromObject()` and `fromFormat()`.

See: [Zones](https://moment.github.io/luxon/#/zones)

### Convert a zone

```js
const d = DateTime.fromISO('2014-06-09T09:32:00Z')

d.setZone('America/New_York').toISO()
// "2014-06-09T05:32:00.000-04:00"
d.toUTC().toISO()            // "2014-06-09T09:32:00.000Z"
d.toLocal().toISO()          // system zone
```
<!-- {: data-highlight="setZone("} -->

`setZone()` keeps the instant and changes the clock; do not use `set()` for this.

See: [Changing zones](https://moment.github.io/luxon/#/zones?id=changing-zones)

### Keep the wall clock

```js
const d = DateTime.fromISO('2014-06-09T09:32:00Z')

d.setZone('America/New_York').toISO()
// "2014-06-09T05:32:00.000-04:00"
d.setZone('America/New_York', { keepLocalTime: true }).toISO()
// "2014-06-09T09:32:00.000-04:00"
```
<!-- {: data-highlight="keepLocalTime: true"} -->

`keepLocalTime` reinterprets the clock time in the new zone, which suits reminders and wall-clock schedules.

See: [keepLocalTime](https://moment.github.io/luxon/#/zones?id=changing-zones)

### Default zone

```js
import { Settings } from 'luxon'

Settings.defaultZone = 'Asia/Tokyo'

DateTime.fromISO('2026-06-01T12:00').toISO()
// "2026-06-01T12:00:00.000+09:00"
```
<!-- {: data-highlight="Settings.defaultZone"} -->

`Settings.defaultZone` replaces the system zone for new DateTimes. Use `Settings.now` to freeze the clock in tests.

See: [Settings](https://moment.github.io/luxon/#/zones?id=changing-the-default-zone)

### Zone info

```js
const ny = DateTime.fromISO('2026-03-08T09:00',
  { zone: 'America/New_York' })

ny.zoneName        // "America/New_York"
ny.offset          // -240
ny.isInDST         // true
ny.offsetNameShort // "EDT"
```
<!-- {: data-highlight="isInDST"} -->

Offsets are minutes east of UTC, so `-240` means UTC−4.

See: [Zone API](https://moment.github.io/luxon/api-docs/index.html)

### Fixed offsets

```js
DateTime.fromISO('2026-06-01T12:00', { zone: 'UTC+5:30' })
  .toISO()
// "2026-06-01T12:00:00.000+05:30"
```
<!-- {: data-highlight="'UTC+5:30'"} -->

A fixed offset never follows DST. Prefer an IANA zone for real places.

See: [Fixed offset zones](https://moment.github.io/luxon/#/zones?id=specifying-a-zone)

## Intervals

### Create an interval

```js
import { DateTime, Interval } from 'luxon'

const start = DateTime.fromISO('2026-01-01T09:00',
  { zone: 'America/New_York' })
const end = DateTime.fromISO('2026-01-15T17:30',
  { zone: 'America/New_York' })

const range = Interval.fromDateTimes(start, end)
range.toISODate()   // "2026-01-01/2026-01-15"
```
<!-- {: data-highlight="Interval.fromDateTimes"} -->

An interval is an ordered pair of DateTimes. `fromDateTimes()` returns an invalid interval when the end is before the start.

See: [Intervals](https://moment.github.io/luxon/#/tour?id=intervals)

### Measure an interval

```js
range.length('hours')   // 344.5
range.count('days')     // 15
range.toDuration(['days', 'hours', 'minutes']).toObject()
// { days: 14, hours: 8, minutes: 30 }
```
<!-- {: data-highlight="count('days')"} -->

`length()` is exact elapsed time; `count()` counts calendar units the interval touches.

See: [Interval length](https://moment.github.io/luxon/api-docs/index.html)

### Split into weeks

```js
range.splitBy({ days: 7 })
  .map((part) => part.toISODate())
// ["2026-01-01/2026-01-08",
//  "2026-01-08/2026-01-15",
//  "2026-01-15/2026-01-15"]
```
<!-- {: data-highlight="splitBy({ days: 7 })"} -->

`splitBy()` fills the range with evenly sized pieces. The final slice can be shorter than the step, and `toISODate()` hides its time when it lands on the same date.

See: [Split](https://moment.github.io/luxon/api-docs/index.html)

### Contains

```js
range.contains(DateTime.fromISO('2026-01-10T00:00',
  { zone: 'America/New_York' }))   // true

range.contains(end)                        // false
range.contains(end.minus({ seconds: 1 }))  // true
```
<!-- {: data-highlight="end.minus("} -->

The end is exclusive; test the last instant with `minus()`.

See: [Contains](https://moment.github.io/luxon/api-docs/index.html)

## Durations

### Create a duration

```js
import { Duration } from 'luxon'

Duration.fromObject({ hours: 2, minutes: 30 }).toISO()
// "PT2H30M"
Duration.fromISO('PT1H30M').as('minutes')       // 90
Duration.fromMillis(5400000).toFormat('hh:mm')  // "01:30"
```
<!-- {: data-highlight="Duration.fromObject"} -->

A duration is a bag of units with no zone. It records the units you gave it, not a span of time.

See: [Durations](https://moment.github.io/luxon/#/tour?id=durations)

### Format a duration

```js
Duration.fromObject({ days: 2, hours: 3, minutes: 4 })
  .toFormat("d'd' h'h' m'm'")   // "2d 3h 4m"
```
<!-- {: data-highlight="toFormat("} -->

Quote literal letters so they are not read as units.

See: [Duration format](https://moment.github.io/luxon/api-docs/index.html)

### Human readable

```js
Duration.fromObject({ hours: 2, minutes: 30 }).toHuman()
// "2 hours, 30 minutes"
Duration.fromObject({ hours: 2, minutes: 30 })
  .toHuman({ listStyle: 'long' })
// "2 hours and 30 minutes"
```
<!-- {: data-highlight="toHuman("} -->

`toHuman()` formats each unit with `Intl.NumberFormat` and joins them with `Intl.ListFormat`.

See: [Duration human](https://moment.github.io/luxon/api-docs/index.html)

### Convert units

```js
Duration.fromObject({ hours: 25 }).as('days')
// 1.0416666666666667
Duration.fromObject({ minutes: 150 })
  .shiftTo('hours', 'minutes').toObject()
// { hours: 2, minutes: 30 }
```
<!-- {: data-highlight="shiftTo("} -->

`as()` returns a fraction; `shiftTo()` moves whole units into the units you name.

See: [Duration units](https://moment.github.io/luxon/api-docs/index.html)

## Locales and info

### Locale data

```js
import { Info } from 'luxon'

Info.months('short')[0]                        // "Jan"
Info.months('long', { locale: 'fr' })[0]       // "janvier"
Info.weekdays('long', { locale: 'fr' })[0]     // "lundi"
```
<!-- {: data-highlight="Info.months"} -->

`Info` reads names from `Intl` instead of bundling locale tables.

See: [Info](https://moment.github.io/luxon/api-docs/index.html)

### Week numbers

```js
const d = DateTime.fromISO('2026-11-26', { zone: 'utc' })
  .setLocale('en-US')

d.weekNumber       // 48 (ISO)
d.localWeekNumber  // 47 (US)
Info.getStartOfWeek({ locale: 'en-US' })   // 7
Info.getStartOfWeek({ locale: 'fr' })      // 1
```
<!-- {: data-highlight="localWeekNumber"} -->

ISO weeks start on Monday; the locale week can start on Sunday, which shifts the week number.

See: [Week numbers](https://moment.github.io/luxon/#/intl?id=locale-based-weeks)

### DST support

```js
Info.hasDST('America/New_York')   // true
Info.hasDST('Asia/Tokyo')         // false
```
<!-- {: data-highlight="hasDST"} -->

`hasDST()` reports whether a zone uses daylight saving at all.

See: [Info API](https://moment.github.io/luxon/api-docs/index.html)

## References
<!-- {: .-one-column} -->

* [Luxon documentation](https://moment.github.io/luxon/#/) _(moment.github.io)_
* [API reference](https://moment.github.io/luxon/api-docs/) _(moment.github.io)_
* [GitHub repository](https://github.com/moment/luxon) _(github.com)_
* [Day.js cheatsheet](./dayjs) _(devhints.io)_
* [Moment.js cheatsheet](./moment) _(devhints.io)_

<!-- {: .-also-see} -->
