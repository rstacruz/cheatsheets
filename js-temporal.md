---
title: JavaScript Temporal
subtitle: Modern date and time API
logo: { set: icon-park-outline, name: calendar }
category: JavaScript
weight: -2
updated: 2026-11-24
last_verified_with: "Temporal, Node 26.13, Bun 1.4.5."
tier: t2
fragments:
  - "Temporal.Now"
  - "PlainDate.from"
  - "ZonedDateTime"
  - "[Asia/Tokyo]"
  - "Instant"
  - "add({ days: 1 })"
  - "until"
  - "Duration"
  - "toLocaleString"
  - "PT1H30M"
  - "round()"
  - "dayOfWeek"
  - "withTimeZone"
  - "+09:00"
  - "overflow"
  - "RFC 9557"
intro: |
  [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) is the built-in date and time API that replaces `Date`. It separates instants, zoned date-times, and wall-clock values.
links:
  - title: Temporal reference
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
  - title: Temporal cookbook
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times/Cookbook
  - title: TC39 proposal
    url: https://github.com/tc39/proposal-temporal
---

## Basics

### Current time

```js
Temporal.Now.instant()                       // UTC timestamp
Temporal.Now.plainDateISO()                  // today, local zone
Temporal.Now.zonedDateTimeISO("Asia/Tokyo")  // today in Tokyo
```

<!-- {: data-highlight="Temporal.Now"} -->

`Temporal.Now` also has `plainTimeISO()` and `plainDateTimeISO()`. Ships in Chrome 144+, Firefox 139+, Safari 27.3+, and Node 26.

See: [Temporal.Now](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Now)

### From strings

```js
Temporal.PlainDate.from("2026-11-24")
Temporal.PlainTime.from("13:45")
Temporal.PlainDateTime.from("2026-11-24T13:45")
Temporal.Instant.from("2026-11-24T10:00Z")
Temporal.ZonedDateTime.from(
  "2026-11-24T10:00[Asia/Tokyo]"
)
```

<!-- {: data-highlight="from"} -->

Strings are ISO 8601 (RFC 9557 when they carry a zone or calendar).

See: [Temporal.PlainDate.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/from), [Temporal.ZonedDateTime.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/from)

### From parts

```js
Temporal.PlainDate.from({ year: 2026, month: 11, day: 24 })
// 2026-11-24
```

Property bags match the shape of form values and JSON payloads.

See: [Temporal.PlainDate.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/from)

### From a Date

#### Date → Temporal

```js
const date = new Date("2026-11-24T10:00:00Z")

const instant = Temporal.Instant.fromEpochMilliseconds(
  date.getTime()
)
```

<!-- {: data-highlight="fromEpochMilliseconds"} -->

#### Temporal → Date

```js
const back = new Date(instant.epochMilliseconds)
```

<!-- {: data-highlight="epochMilliseconds"} -->

`Date` converts through epoch milliseconds; there is no direct cast.

See: [Temporal.Instant.fromEpochMilliseconds()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/fromEpochMilliseconds)

### Types

| Class | Represents |
| --- | --- |
| `Temporal.Instant` | Point in time, in UTC |
| `Temporal.ZonedDateTime` | Instant plus a time zone |
| --- | --- |
| `Temporal.PlainDateTime` | Wall-clock date and time |
| `Temporal.PlainDate` | Calendar date |
| `Temporal.PlainTime` | Wall-clock time |
| --- | --- |
| `Temporal.PlainYearMonth` | Year and month |
| `Temporal.PlainMonthDay` | Month and day |
| --- | --- |
| `Temporal.Duration` | Amount of time |

<!-- {: .-headers} -->

Plain types have no zone, so they never shift with daylight saving.

See: [Temporal objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#api_overview)

## Fields and arithmetic

### Read fields

```js
const date = Temporal.PlainDate.from("2026-11-24")

date.year         // 2026
date.month        // 11
date.day          // 24
date.dayOfWeek    // 2 (Monday is 1)
date.daysInMonth  // 30
```

<!-- {: data-highlight="dayOfWeek"} -->

Months are 1-indexed, unlike `Date`.

See: [Temporal.PlainDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate#instance_properties)

### Update fields

```js
const date = Temporal.PlainDate.from("2026-11-24")

date.with({ month: 1 })  // 2026-01-24
date.with({ day: 31 })   // 2026-11-30
```

<!-- {: data-highlight="with"} -->

Values clamp by default; pass `{ overflow: "reject" }` to throw.

See: [with()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/with)

### Add and subtract

```js
const date = Temporal.PlainDate.from("2026-11-24")

date.add({ months: 1 })     // 2026-12-24
date.subtract({ days: 7 })  // 2026-11-17
```

<!-- {: data-highlight="add({ months: 1 }); subtract({ days: 7 })"} -->

Methods return new objects; nothing is mutated in place.

See: [add()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/add), [subtract()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/subtract)

### Compare and sort

```js
const dates = [
  Temporal.PlainDate.from("2026-12-01"),
  Temporal.PlainDate.from("2026-01-05")
]

dates.sort(Temporal.PlainDate.compare)  // Jan first
```

<!-- {: data-highlight="Temporal.PlainDate.compare"} -->

`compare()` returns -1, 0, or 1, so it sorts directly.

See: [Temporal.PlainDate.compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/compare)

### Round

```js
const time = Temporal.PlainTime.from("13:45:30")

time.round({ smallestUnit: "minute" })  // 13:46:00
time.round({ smallestUnit: "hour" })    // 14:00:00
```

<!-- {: data-highlight="round"} -->

Rounding defaults to `halfExpand`; pass `roundingMode: "trunc"` to drop the remainder.

See: [round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/round)

### Calendars

```js
const date = Temporal.PlainDate.from("2026-11-24")
const reiwa = date.withCalendar("japanese")

reiwa.toString()  // '2026-11-24[u-ca=japanese]'
reiwa.era         // 'reiwa'
reiwa.eraYear     // 8
```

<!-- {: data-highlight="withCalendar"} -->

`withCalendar()` keeps the day but changes how its fields read.

See: [withCalendar()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/withCalendar)

## Time zones

### Zoned date-time

```js
const zoned = Temporal.ZonedDateTime.from(
  "2026-11-24T10:00[Asia/Tokyo]"
)

zoned.toString()
// 2026-11-24T10:00:00+09:00[Asia/Tokyo]
zoned.offset       // +09:00
zoned.toInstant()  // 2026-11-24T01:00:00Z
```

<!-- {: data-highlight="[Asia/Tokyo]"} -->

The bracketed zone is part of the string, not an offset.

See: [Temporal.ZonedDateTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime)

### From an instant

```js
const instant = Temporal.Instant.from("2026-11-24T10:00+09:00")

instant.toZonedDateTimeISO("Asia/Tokyo")
// 2026-11-24T10:00:00+09:00[Asia/Tokyo]
```

<!-- {: data-highlight="toZonedDateTimeISO"} -->

`ZonedDateTime.from()` needs the `[Zone]` form, not a bare offset.

See: [toZonedDateTimeISO()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/toZonedDateTimeISO)

### Change time zone

```js
const tokyo = Temporal.ZonedDateTime.from(
  "2026-11-24T10:00[Asia/Tokyo]"
)

tokyo.withTimeZone("America/New_York")
// 2026-11-23T20:00:00-05:00[America/New_York]
```

<!-- {: data-highlight="withTimeZone"} -->

The instant stays the same; only the zone and clock fields change.

See: [withTimeZone()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/withTimeZone)

### Daylight saving

```js
const before = Temporal.ZonedDateTime.from(
  "2026-03-08T01:30[America/New_York]"
)

before.add({ hours: 1 })
// 2026-03-08T03:30:00-04:00[America/New_York]
before.add({ days: 1 })
// 2026-03-09T01:30:00-04:00[America/New_York]
before.hoursInDay  // 23

Temporal.ZonedDateTime.from("2026-03-08T02:30[America/New_York]")
// 2026-03-08T03:30:00-04:00[America/New_York]
```

<!-- {: data-highlight="hoursInDay"} -->

Day arithmetic follows the wall clock, so days can be 23 or 25 hours. Skipped and repeated times resolve by `disambiguation` (default `compatible`); pass `"reject"` to throw.

See: [ZonedDateTime and DST](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime#time_zones_and_offsets)

### Zone IDs

```js
Temporal.Now.timeZoneId()           // e.g. 'Asia/Tokyo'
Intl.supportedValuesOf("timeZone")  // ['Africa/Abidjan', ...]
```

<!-- {: data-highlight="timeZoneId"} -->

Zone IDs are IANA names; `Intl.supportedValuesOf("timeZone")` lists the set.

See: [timeZoneId](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Now/timeZoneId)

## Durations

### Create a duration

```js
const wait = Temporal.Duration.from({
  hours: 1,
  minutes: 30
})

wait.toString()  // 'PT1H30M'
```

<!-- {: data-highlight="Temporal.Duration.from"} -->

Units stay separate until you convert them.

See: [Temporal.Duration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration)

### Between dates

```js
const start = Temporal.PlainDate.from("2026-01-01")
const end = Temporal.PlainDate.from("2026-11-24")

start.until(end)                             // P327D
start.until(end, { largestUnit: "months" })  // P10M23D
```

<!-- {: data-highlight="largestUnit"} -->

`since()` is the reverse: `end.since(start)`.

See: [until()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/until)

### Convert units

```js
const wait = Temporal.Duration.from({
  hours: 1,
  minutes: 30
})

wait.total("minutes")  // 90
wait.total("seconds")  // 5400
```

<!-- {: data-highlight="total"} -->

Totals need `relativeTo` for weeks, months, or years.

See: [total()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/total)

### Format a duration

```js
const wait = Temporal.Duration.from({
  hours: 1,
  minutes: 30
})

new Intl.DurationFormat("en", { style: "long" })
  .format(wait)  // '1 hour, 30 minutes'
```

<!-- {: data-highlight="Intl.DurationFormat"} -->

See: [Intl.DurationFormat cheatsheet](./intl-duration)

## Formatting

### Locale strings

```js
const date = Temporal.PlainDate.from("2026-11-24")

date.toLocaleString("en-US", { dateStyle: "full" })
// 'Tuesday, November 24, 2026'
```

<!-- {: data-highlight="toLocaleString"} -->

Options match `Intl.DateTimeFormat`; a zoned value formats in its own zone.

See: [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toLocaleString)

### JSON

```js
const value = Temporal.PlainDate.from("2026-11-24")

JSON.stringify({ date: value })  // '{"date":"2026-11-24"}'
```

<!-- {: data-highlight="JSON.stringify"} -->

`from()` parses those strings back into Temporal values.

See: [Temporal.PlainDate.toJSON()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toJSON)
