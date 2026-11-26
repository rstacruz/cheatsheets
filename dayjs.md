---
title: Day.js
seo_title: Day.js cheatsheet — format, diff, time zones
description: "Day.js reference: parsing, formatting, diff, plugins, UTC, time zones and durations."
subtitle: Lightweight date library
category: Date libraries
tier: t2
fragments:
  - "dayjs()"
  - "dayjs.utc()"
  - ".format('YYYY')"
  - ".add(1, 'day')"
  - ".diff(d, 'days')"
  - ".tz(zone)"
  - ".toISOString()"
  - ".unix()"
  - "dayjs.extend()"
  - "plugin/utc"
  - "plugin/timezone"
  - ".startOf('day')"
  - ".isBefore(d)"
  - "duration(2)"
  - ".fromNow()"
  - ".locale('fr')"
updated: 2026-11-26
last_verified_with: "Day.js 1.11.23, Node 26.13.1."
intro: |
  [Day.js](https://day.js.org/) is a small date library with a Moment-compatible API. This reference covers parsing, formatting, math, time zones, locales and durations.
links:
  - title: Day.js documentation
    url: https://day.js.org/docs/en/parse/parse
  - title: Plugin list
    url: https://day.js.org/docs/en/plugin/plugin
  - title: GitHub repository
    url: https://github.com/iamkun/dayjs
---

## Getting started

### Create a date

```js
dayjs()                        // now
dayjs('2014-06-09')            // date
dayjs('2014-06-09T09:32:00Z')  // with time
dayjs(1402306320000)           // ms since epoch
dayjs.unix(1402306320)         // seconds
```
<!-- {: data-highlight="dayjs()"} -->

Strings without an offset are read in the local zone. `dayjs.unix()` takes seconds, while the constructor takes milliseconds.

See: [Parsing](https://day.js.org/docs/en/parse/parse)

### Chained calls stay immutable

```js
const start = dayjs('2014-06-09')
const next = start.add(1, 'day')

start.format('YYYY-MM-DD')   // "2014-06-09"
next.format('YYYY-MM-DD')    // "2014-06-10"
```
<!-- {: data-highlight="start.add(1, 'day')"} -->

Every method returns a new instance, so the original is safe to share.

See: [Immutability](https://day.js.org/docs/en/parse/parse)

## Parsing

### ISO strings

```js
dayjs('2014-06-09')                  // local midnight
dayjs('2014-06-09T09:32:00Z')        // UTC instant
dayjs('2014-06-09T09:32:00+02:00')   // fixed offset
```
<!-- {: data-highlight="T09:32:00Z"} -->

An offset pins the moment; without one, the string is local time.

See: [Parsing ISO 8601](https://day.js.org/docs/en/parse/string)

### Custom formats

```js
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(customParseFormat)

dayjs('09-06-2014', 'DD-MM-YYYY')        // 2014-06-09
dayjs('09-06-2014', 'DD-MM-YYYY', true)  // strict
```
<!-- {: data-highlight="'DD-MM-YYYY', true"} -->

Without a format, Day.js falls back to `Date` parsing, which is lenient: `dayjs('2014-13-01')` rolls over to 2015-01-01. Pass `true` for strict parsing.

See: [Custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format)

### Invalid dates

```js
const bad = dayjs('not a date')

bad.isValid()   // false
bad.format()    // "Invalid Date"
```
<!-- {: data-highlight="isValid"} -->

Comparisons and math on an invalid date quietly return wrong results, so check `isValid()` at the edge.

See: [Validation](https://day.js.org/docs/en/parse/is-valid)

### Output

```js
const d = dayjs('2014-06-09T09:32:05.123Z')

d.toISOString()   // "2014-06-09T09:32:05.123Z"
d.toDate()        // Date object
d.valueOf()       // 1402306325123
d.unix()          // 1402306325
```
<!-- {: data-highlight="toISOString"} -->

`toISOString()` always writes UTC; `format()` writes local time with its offset.

See: [Conversion](https://day.js.org/docs/en/display/as-iso-string)

## Tokens
<!-- {: .-three-column} -->

### Date tokens

| Token  | Meaning                 | Output   |
| ------ | ----------------------- | -------- |
| `YYYY` | Year, four digits       | `2014`   |
| `YY`   | Year, two digits        | `14`     |
| `MMMM` | Month name, full        | `June`   |
| `MMM`  | Month name, short       | `Jun`    |
| `MM`   | Month, two digits       | `06`     |
| --- | --- | --- |
| `M`    | Month, no leading zero  | `6`      |
| `DD`   | Day of month, two digits | `09`    |
| `D`    | Day of month            | `9`      |
| `dddd` | Weekday name, full      | `Monday` |
| `ddd`  | Weekday name, short     | `Mon`    |
<!-- {: .-headers} -->

See: [Format](https://day.js.org/docs/en/display/format)

### Time tokens

| Token | Meaning                  | Output     |
| ----- | ------------------------ | ---------- |
| `HH`  | Hour, 24-hour, two digits | `09`      |
| `H`   | Hour, 24-hour            | `9`        |
| `hh`  | Hour, 12-hour, two digits | `09`      |
| `h`   | Hour, 12-hour            | `9`        |
| `mm`  | Minute, two digits       | `32`       |
| `m`   | Minute                   | `32`       |
| `ss`  | Second, two digits       | `05`       |
| --- | --- | --- |
| `SSS` | Millisecond, three digits | `123`     |
| `A`   | Meridiem, uppercase      | `AM`       |
| `a`   | Meridiem, lowercase      | `am`       |
| `Z`   | Offset, with colon       | `+00:00`   |
| `ZZ`  | Offset, without colon    | `+0000`    |
<!-- {: .-headers} -->

See: [Format](https://day.js.org/docs/en/display/format)

### Advanced tokens

#### Ordinal

```js
import advancedFormat
  from 'dayjs/plugin/advancedFormat.js'

dayjs.extend(advancedFormat)

dayjs('2014-06-09')
  .format('Do MMM YY')  // "9th Jun 14"
dayjs('2014-06-09').format('Q')
// 2
```
<!-- {: data-highlight="'Do MMM YY'"} -->

#### Epoch

```js
dayjs('2014-06-09T09:32:05Z')
  .format('X')  // "1402306325"
dayjs('2014-06-09T09:32:05Z')
  .format('x')  // "1402306325123"
```
<!-- {: data-highlight="format('X')"} -->

#### Tokens

| Token | Meaning                      | Output          |
| ----- | ---------------------------- | --------------- |
| `Do`  | Day of month, ordinal        | `9th`           |
| `Q`   | Quarter                      | `2`             |
| `X`   | Unix timestamp, seconds      | `1402306325`    |
| `x`   | Unix timestamp, milliseconds | `1402306325123` |
<!-- {: .-headers} -->

`Do` adds the ordinal suffix, `Q` emits the quarter, and `X`/`x` emit Unix seconds and milliseconds.

See: [Advanced format](https://day.js.org/docs/en/plugin/advanced-format)

## Formatting

### Named formats

```js
import localizedFormat from 'dayjs/plugin/localizedFormat.js'

dayjs.extend(localizedFormat)

dayjs('2014-06-09').format('L')     // "06/09/2014"
dayjs('2014-06-09').format('LL')    // "June 9, 2014"
dayjs('2014-06-09').format('LLL')   // "June 9, 2014 12:00 AM"
dayjs('2014-06-09').format('LLLL')  // "Monday, June 9, 2014 12:00 AM"
dayjs('2014-06-09').format('LT')    // "12:00 AM"
```
<!-- {: data-highlight="'LLLL'"} -->

The `L` family follows the active locale, so date order adapts per language.

See: [Localized format](https://day.js.org/docs/en/plugin/localized-format)

### Relative time

```js
import relativeTime from 'dayjs/plugin/relativeTime.js'

dayjs.extend(relativeTime)

const now = dayjs('2014-06-19')

now.subtract(3, 'days').from(now)   // "3 days ago"
now.add(2, 'hours').from(now)       // "in 2 hours"
```
<!-- {: data-highlight=".from(now)"} -->

`fromNow()` compares against the clock; `from(other)` keeps output stable.

See: [Relative time](https://day.js.org/docs/en/plugin/relative-time)

### Calendar time

```js
import calendar from 'dayjs/plugin/calendar.js'

dayjs.extend(calendar)

const now = dayjs('2014-06-10T09:00')

now.subtract(1, 'day').calendar(now)  // "Yesterday at 9:00 AM"
```
<!-- {: data-highlight="calendar(now)"} -->

`calendar()` replaces the date with a label such as `Yesterday` or `Last Tuesday` when the date is close to the reference.

See: [Calendar](https://day.js.org/docs/en/plugin/calendar)

## Math

### Add and subtract

```js
const d = dayjs('2014-06-09')

d.add(1, 'day').format('YYYY-MM-DD')        // "2014-06-10"
d.subtract(1, 'month').format('YYYY-MM-DD') // "2014-05-09"
```
<!-- {: data-highlight=".add(1, 'day')"} -->

Units accept both long names and shorthands such as `'d'`, `'M'` and `'y'`.

See: [Add and subtract](https://day.js.org/docs/en/manipulate/add)

### Month-end clamping

```js
dayjs('2014-01-31').add(1, 'month')
  .format('YYYY-MM-DD')   // "2014-02-28"
```
<!-- {: data-highlight="add(1, 'month')"} -->

Adding months clamps to the last valid day instead of rolling into March.

See: [Add](https://day.js.org/docs/en/manipulate/add)

### Start and end of unit

```js
const d = dayjs('2014-06-09T09:32')

d.startOf('day').format('YYYY-MM-DD HH:mm:ss')
// "2014-06-09 00:00:00"

d.endOf('month').format('YYYY-MM-DD HH:mm:ss')
// "2014-06-30 23:59:59"
```
<!-- {: data-highlight=".startOf('day'); .endOf('month')"} -->

`endOf()` lands on the last millisecond but `format()` here drops it.

See: [Start of time](https://day.js.org/docs/en/manipulate/start-of)

### Set fields

```js
const d = dayjs('2014-06-09T09:32')

d.set('month', 0).format('YYYY-MM-DD')   // "2014-01-09"
d.set('year', 2024).format('YYYY-MM-DD') // "2024-06-09"
```
<!-- {: data-highlight=".set('month', 0)"} -->

`set()` takes the same unit names as `add()`, and also accepts `'date'` for the day of the month.

See: [Set](https://day.js.org/docs/en/get-set/set)

### Differences

```js
const start = dayjs('2014-06-09T09:32')
const end = dayjs('2014-06-19T21:32')

end.diff(start, 'days')         // 10
end.diff(start, 'days', true)   // 10.5
end.diff(start, 'hours')        // 252
```
<!-- {: data-highlight="'days', true"} -->

`diff()` truncates toward zero; the third argument returns a float. Month and year differences count whole boundaries only.

See: [Difference](https://day.js.org/docs/en/display/difference)

## Querying

### Comparisons

```js
const d = dayjs('2014-06-09')

d.isBefore('2014-07-01')             // true
d.isAfter('2014-06-09')              // false
d.isSame('2014-06-09T10:00')         // false
d.isSame('2014-06-09T10:00', 'day')  // true
```
<!-- {: data-highlight="isSame"} -->

`isSame()` compares milliseconds unless you pass a unit.

See: [Query](https://day.js.org/docs/en/query/is-before)

### Ranges

```js
import isBetween from 'dayjs/plugin/isBetween.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

const d = dayjs('2014-06-10')

d.isBetween('2014-06-01', '2014-06-15')   // true
d.isBetween('2014-06-10', '2014-06-15',
  'day', '[]')                            // true
d.isSameOrBefore('2014-06-10', 'day')     // true
```
<!-- {: data-highlight=".isBetween("} -->

Bounds are exclusive by default; `'[]'` includes both ends.

See: [Is between](https://day.js.org/docs/en/plugin/is-between)

### Today and yesterday

```js
import isToday from 'dayjs/plugin/isToday.js'
import isYesterday from 'dayjs/plugin/isYesterday.js'

dayjs.extend(isToday)
dayjs.extend(isYesterday)

dayjs().isToday()                       // true
dayjs().subtract(1, 'day').isYesterday() // true
```
<!-- {: data-highlight=".isToday(); .isYesterday()"} -->

Each check ships as its own plugin.

See: [Is today](https://day.js.org/docs/en/plugin/is-today)

### Min and max

```js
import minMax from 'dayjs/plugin/minMax.js'

dayjs.extend(minMax)

dayjs.min(dayjs('2014-01-01'), dayjs('2012-01-01'))
  .format('YYYY-MM-DD')   // "2012-01-01"
dayjs.max(dayjs('2014-01-01'), dayjs('2012-01-01'))
  .format('YYYY-MM-DD')   // "2014-01-01"
```
<!-- {: data-highlight="dayjs.min; dayjs.max"} -->

Both accept instances as arguments or as one array.

See: [Min max](https://day.js.org/docs/en/plugin/min-max)

## Time zones

### UTC mode

```js
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

const d = dayjs.utc('2014-06-09T09:32Z')

d.format('YYYY-MM-DDTHH:mm:ssZ')
// "2014-06-09T09:32:00+00:00"

d.isUTC()      // true
d.utcOffset()  // 0
```
<!-- {: data-highlight="dayjs.utc("} -->

`dayjs.utc()` reads and prints in UTC. Plain `dayjs()` reads local time; calling `.utc()` on it keeps the instant.

See: [UTC](https://day.js.org/docs/en/plugin/utc)

### Convert between zones

```js
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.utc('2014-06-09T13:32Z')
  .tz('America/New_York')
  .format()   // "2014-06-09T09:32:00-04:00"
```
<!-- {: data-highlight=".tz('America/New_York')"} -->

The timezone plugin needs the UTC plugin extended first, or `tz()` throws.

See: [Time zone](https://day.js.org/docs/en/plugin/timezone)

### Create in a zone

```js
dayjs.tz('2026-03-08 09:00', 'America/New_York')
  .format()   // "2026-03-08T09:00:00-04:00"

dayjs.utc('2026-03-08 09:00')
  .tz('America/New_York')
  .format()   // "2026-03-08T05:00:00-04:00"
```
<!-- {: data-highlight="dayjs.tz("} -->

`dayjs.tz()` reads naive input as wall time in that zone. `dayjs.utc()` reads it as UTC, so the same string becomes a different instant.

See: [Time zone](https://day.js.org/docs/en/plugin/timezone)

### Keep the wall clock

```js
const d = dayjs.utc('2026-03-08T09:00Z')

d.tz('America/New_York').format()
// "2026-03-08T05:00:00-04:00"

d.tz('America/New_York', true).format()
// "2026-03-08T09:00:00-04:00"
```
<!-- {: data-highlight=", true)"} -->

The second argument keeps the clock time and moves the instant.

See: [Time zone](https://day.js.org/docs/en/plugin/timezone)

### Fixed offsets

```js
dayjs('2014-06-09T09:32Z').utcOffset(-300)
  .format()   // "2014-06-09T04:32:00-05:00"
```
<!-- {: data-highlight=".utcOffset(-300)"} -->

`utcOffset()` works in minutes and knows no DST rules. Use an IANA zone via `tz()` for real places.

See: [UTC offset](https://day.js.org/docs/en/plugin/utc)

### Detect the zone

```js
dayjs.tz.guess()   // "America/New_York"
```
<!-- {: data-highlight="tz.guess()"} -->

`guess()` asks `Intl` for the system zone, so it depends on the runtime's ICU data.

See: [Time zone guessing](https://day.js.org/docs/en/plugin/timezone)

## Locales

### Load a locale

```js
import 'dayjs/locale/fr.js'

dayjs.locale('fr')
```
<!-- {: data-highlight="'dayjs/locale/fr.js'"} -->

Only English ships in core. Node ESM imports the locale with its `.js` extension; bundlers accept it without one.

See: [Loading locale](https://day.js.org/docs/en/i18n/loading-into-nodejs)

### Switch for one instance

```js
dayjs('2014-06-09').locale('fr')
  .format('dddd D MMMM YYYY')   // "lundi 9 juin 2014"
```
<!-- {: data-highlight=".locale('fr')"} -->

`locale()` on an instance leaves the global default alone.

See: [Locale](https://day.js.org/docs/en/i18n/i18n)

### Switch globally

```js
dayjs.locale('fr')
dayjs('2014-06-09').format('MMMM')   // "juin"

dayjs.locale('en')                   // reset
```
<!-- {: data-highlight="dayjs.locale('fr')"} -->

The global locale applies to every instance created afterwards.

See: [Global locale](https://day.js.org/docs/en/i18n/i18n)

### Week start

```js
const d = dayjs('2014-06-09')

d.startOf('week').format('ddd')              // "Sun"
d.locale('fr').startOf('week').format('ddd') // "lun."
```
<!-- {: data-highlight="startOf('week')"} -->

Week boundaries follow the locale's week-start setting, so French weeks begin on Monday.

See: [Week start](https://day.js.org/docs/en/customization/customization)

## Durations

### Create a duration

```js
import duration from 'dayjs/plugin/duration.js'

dayjs.extend(duration)

dayjs.duration(2, 'days').asHours()   // 48
dayjs.duration({ hours: 2, minutes: 30 }).toISOString()
// "PT2H30M"

dayjs.duration(5400000).format('HH:mm')   // "01:30"
```
<!-- {: data-highlight="dayjs.duration(2, 'days')"} -->

Durations take a number plus unit, an object of units, or milliseconds.

See: [Duration](https://day.js.org/docs/en/plugin/duration)

### Format a duration

```js
dayjs.duration({ days: 2, hours: 3, minutes: 4 })
  .format('D[d] HH[h] mm[m]')   // "2d 03h 04m"
```
<!-- {: data-highlight="'D[d] HH[h] mm[m]'"} -->

Square brackets escape literal text. Tokens read the stored units only.

See: [Duration format](https://day.js.org/docs/en/durations/format)

### Normalize units

```js
dayjs.duration({ minutes: 150 }).format('HH:mm')
// "undefined:150"

dayjs.duration(150 * 60 * 1000).format('HH:mm')
// "02:30"
```
<!-- {: data-highlight="undefined:150"} -->

A duration of `{ minutes: 150 }` has no hours field, so `HH` prints `undefined`. Build it from milliseconds for a padded clock format; `.asMinutes()` returns a plain number instead.

See: [Duration](https://day.js.org/docs/en/plugin/duration)

### Humanize

```js
import duration from 'dayjs/plugin/duration.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'

dayjs.extend(duration)
dayjs.extend(relativeTime)

dayjs.duration({ minutes: 90 }).humanize()   // "2 hours"
dayjs.duration({ hours: 25 }).humanize()     // "a day"
```
<!-- {: data-highlight="humanize()"} -->

`humanize()` needs the relative time plugin too, and rounds to the largest unit.

See: [Duration humanize](https://day.js.org/docs/en/durations/humanize)

### From a difference

```js
const start = dayjs.utc('2014-06-09T09:32Z')
const end = dayjs.utc('2014-06-19T09:32Z')

dayjs.duration(end.diff(start)).asDays()    // 10
dayjs.duration(end.diff(start)).humanize()  // "10 days"
```
<!-- {: data-highlight="asDays()"} -->

`diff()` returns milliseconds, which is exactly what the duration constructor accepts.

See: [Duration](https://day.js.org/docs/en/plugin/duration)

## References
<!-- {: .-one-column} -->

* [Day.js documentation](https://day.js.org/docs/en/parse/parse) _(day.js.org)_
* [Plugin list](https://day.js.org/docs/en/plugin/plugin) _(day.js.org)_
* [GitHub repository](https://github.com/iamkun/dayjs) _(github.com)_
* [Moment.js cheatsheet](./moment) _(devhints.io)_
* [Luxon cheatsheet](./luxon) _(devhints.io)_

<!-- {: .-also-see} -->
