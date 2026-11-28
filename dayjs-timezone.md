---
title: How to convert time zones with Day.js
link_title: Day.js time zones
subtitle: utc and timezone plugins
logo: { set: icon-park-outline, name: time }
category: Date libraries
layout: snippet
last_verified_with: "Day.js 1.11.23, Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Day.js timezone plugin
    url: https://day.js.org/docs/en/plugin/timezone
  - title: Day.js UTC plugin
    url: https://day.js.org/docs/en/plugin/utc
---

## Converting zones
<!-- {: .-snippets} -->

### Extend the plugins
<!-- {: .-snippet} -->

```js
import utc from 'dayjs/plugin/utc.js'
import tz from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(tz)
```
<!-- {: data-highlight="dayjs.extend(utc)"} -->

**Extends the plugins.** It enables UTC and IANA zone support. Extend `utc` first, because the timezone plugin calls it; see [Time zone](https://day.js.org/docs/en/plugin/timezone).

### Convert an instant
<!-- {: .-snippet} -->

```js
dayjs.utc('2014-06-09T13:32Z')
  .tz('America/New_York')
  .format()
// "2014-06-09T09:32:00-04:00"
```
<!-- {: data-highlight=".tz('America/New_York')"} -->

**Shows another zone.** It moves the clock while keeping the instant. Use it to display a stored moment in a chosen zone; see [Time zone](https://day.js.org/docs/en/plugin/timezone).

### Create in a zone
<!-- {: .-snippet} -->

```js
dayjs.tz('2026-03-08 09:00', 'America/New_York')
  .format()
// "2026-03-08T09:00:00-04:00"
```
<!-- {: data-highlight="dayjs.tz("} -->

**Reads wall time.** Naive input is read as wall time in that zone. Plain `dayjs()` would read it in the system zone instead; see [Time zone](https://day.js.org/docs/en/plugin/timezone).

### Guess the system zone
<!-- {: .-snippet} -->

```js
dayjs.tz.guess()   // "America/New_York"
```
<!-- {: data-highlight="tz.guess()"} -->

**Guesses the zone.** It asks `Intl` for the system zone. It needs the timezone plugin and full ICU data; see [Guessing](https://day.js.org/docs/en/plugin/timezone).

### Fixed offsets
<!-- {: .-snippet} -->

```js
dayjs.utc('2014-06-09T13:32Z')
  .utcOffset(-300)
  .format()
// "2014-06-09T08:32:00-05:00"
```
<!-- {: data-highlight=".utcOffset(-300)"} -->

**Sets a fixed offset.** The value is in minutes. It ignores DST, so prefer `tz()` for real places; see [UTC offset](https://day.js.org/docs/en/plugin/utc).
