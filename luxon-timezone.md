---
title: How to work with time zones in Luxon
link_title: Luxon time zones
subtitle: Convert, parse and inspect zones
category: JavaScript libraries
layout: snippet
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Luxon zones
    url: https://moment.github.io/luxon/#/zones
---

## Handling zones
<!-- {: .-snippets} -->

### Convert an instant
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32:00Z')

d.setZone('America/New_York').toISO()
// "2014-06-09T05:32:00.000-04:00"
```
<!-- {: data-highlight="setZone("} -->

**Moves the clock to another zone.** The instant stays the same; see [Zones](https://moment.github.io/luxon/#/zones).

### Parse in a zone
<!-- {: .-snippet} -->

```js
DateTime.fromISO('2026-03-08T09:00',
  { zone: 'America/New_York' }).toISO()
// "2026-03-08T09:00:00.000-04:00"
```
<!-- {: data-highlight="{ zone: 'America/New_York' }"} -->

**Reads naive input as wall time in that zone.** Without the option the system zone applies; see [Zones](https://moment.github.io/luxon/#/zones).

### Keep the clock time
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32:00Z')

d.setZone('America/New_York',
  { keepLocalTime: true }).toISO()
// "2014-06-09T09:32:00.000-04:00"
```
<!-- {: data-highlight="keepLocalTime: true"} -->

**Reinterprets the clock instead of converting it.** Suits meetings and wall-clock schedules; see [Changing zones](https://moment.github.io/luxon/#/zones?id=changing-zones).

### Default zone
<!-- {: .-snippet} -->

```js
import { Settings } from 'luxon'

Settings.defaultZone = 'Asia/Tokyo'

DateTime.fromISO('2026-06-01T12:00').toISO()
// "2026-06-01T12:00:00.000+09:00"
```
<!-- {: data-highlight="Settings.defaultZone"} -->

**Sets the zone for new DateTimes.** Existing instances keep their zone; see [Settings](https://moment.github.io/luxon/#/zones?id=default-zone).

### Inspect a zone
<!-- {: .-snippet} -->

```js
const ny = DateTime.fromISO('2026-03-08T09:00',
  { zone: 'America/New_York' })

ny.zoneName   // "America/New_York"
ny.offset     // -240
ny.isInDST    // true
```
<!-- {: data-highlight="isInDST"} -->

**Reports the offset in minutes east of UTC.** `-240` means UTC−4; see [Zone API](https://moment.github.io/luxon/api-docs/classes/datetime.html#zoneName).

### Fixed offsets
<!-- {: .-snippet} -->

```js
DateTime.fromISO('2026-06-01T12:00',
  { zone: 'UTC+5:30' }).toISO()
// "2026-06-01T12:00:00.000+05:30"
```
<!-- {: data-highlight="'UTC+5:30'"} -->

**Pins a fixed offset.** It ignores DST, so prefer an IANA zone; see [Fixed offsets](https://moment.github.io/luxon/#/zones?id=fixed-offset-zones).
