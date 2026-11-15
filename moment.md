---
title: Moment.js
category: JavaScript libraries
updated: 2026-11-14
intro: |
  [Moment.js](https://momentjs.com/docs/) parses, formats, and manipulates dates. It is a legacy project in maintenance mode: fine for existing code, discouraged for new projects.
links:
  - title: Moment.js documentation
    url: https://momentjs.com/docs/
  - title: Project status
    url: https://momentjs.com/news/
---

## Getting started

### Maintenance status

Moment 2.31.0 is the current release. The project adds no new user-facing features, keeps the mutable API, and prioritizes compatibility over bug fixes. The maintainers recommend other libraries for new code.

See: [Project status](https://momentjs.com/news/)

### Moving off Moment

| Library | Notes |
| --- | --- |
| [Day.js](https://day.js.org/) | ~2 kB, Moment-compatible API |
| [date-fns](https://date-fns.org/) | Functions, tree-shakeable, immutable |
| [Luxon](https://moment.github.io/luxon/) | `Intl` zones and locales |
| [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) | Built into the language |

Temporal is Stage 4 (ES2026) and ships in Chrome and Edge 144+, Firefox 139+, and Node 26; Safari needs a polyfill.

See: [You don't need Moment.js](https://github.com/you-dont-need/You-Dont-Need-Momentjs)

## Core API

### Parsing

```js
moment()                                   // now
moment('2013-03-01')                       // ISO 8601
moment('2013-03-01', 'YYYY-MM-DD')         // with a format
moment('2013-03-01', 'YYYY-MM-DD', true)   // strict
moment.unix(1362096000)                    // seconds
moment.utc('2013-03-01T00:00:00Z')         // UTC mode
```

Pass `true` for strict parsing of user input. Without a format, non-ISO strings fall back to `Date` and warn.

See: [Parsing](https://momentjs.com/docs/#/parsing/)

### Display

```js
m.format()              // ISO 8601 with offset
m.format('dddd')        // "Friday"
m.format('MMM Do YY')   // "Mar 1st 13"
m.fromNow()             // "7 years ago"
m.calendar()            // "03/01/2013"
m.diff(other, 'days')   // whole days
m.unix()                // seconds
m.valueOf()             // milliseconds
```

`diff()` truncates toward zero; add `true` as a third argument for a float.

See: [Format](https://momentjs.com/docs/#/displaying/format/)

### Manipulating

```js
m.add(1, 'day')
m.subtract(2, 'days')
m.startOf('day')
m.endOf('month')
```

Moment objects are mutable: `add()` and `startOf()` return the same instance. Call `m.clone()` before branching.

See: [Manipulating](https://momentjs.com/docs/#/manipulating/add/)

### Querying

```js
m.isValid()
m.isBefore(other)
m.isAfter(other)
m.isSame(other, 'day')
m.isBetween(from, to, 'day')
m.isSameOrBefore(other)
```

`isSame()` and `isBetween()` take a unit to pin the comparison to that granularity.

See: [Query](https://momentjs.com/docs/#/query/)

### Durations

```js
const d = moment.duration(2, 'days')
d.asHours()                                  // 48
d.humanize()                                 // "2 days"
moment.duration(90, 'minutes').humanize()    // "an hour"
```

Durations convert units, and can be passed to `m.add(d)` or `m.subtract(d)`.

See: [Durations](https://momentjs.com/docs/#/durations/)

## Internationalization

### Locale formats

```js
.format('L')      // 06/09/2014
.format('l')      // 6/9/2014
.format('LL')     // June 9 2014
.format('ll')     // Jun 9 2014
.format('LLL')    // June 9 2014 9:32 PM
.format('lll')    // Jun 9 2014 9:32 PM
.format('LLLL')   // Monday, June 9 2014 9:32 PM
.format('llll')   // Mon, Jun 9 2014 9:32 PM
```

The `L` tokens follow the active locale, so date order adapts to each language.

See: [Format](https://momentjs.com/docs/#/displaying/format/)

### Locales

```js
import 'moment/locale/fr'   // registers French
moment.locale('fr')         // switches globally
m.locale('de')              // switches one instance
```

Locales are not bundled by default in Node; import each one you need. Bundlers include all of them unless filtered.

See: [i18n](https://momentjs.com/docs/#/i18n/)

### Time zones

```js
import moment from 'moment-timezone'

moment.tz('2024-06-01 12:00', 'America/New_York')
moment.tz.guess()
moment.utc().tz('Europe/Paris')
```

Time zones live in the separate `moment-timezone` package, which bundles IANA data.

See: [Moment Timezone](https://momentjs.com/timezone/docs/)

{% include common/moment_format.md title="Formatting" %}

## References
<!-- {: .-one-column} -->

* [Moment.js docs](https://momentjs.com/docs/) _(momentjs.com)_
* [Moment Timezone docs](https://momentjs.com/timezone/docs/) _(momentjs.com)_
* [Project status](https://momentjs.com/news/) _(momentjs.com)_
* [Datetime cheatsheet](./datetime) _(devhints.io)_

<!-- {: .-also-see} -->
