---
title: How to convert time zones in Luxon
link_title: Luxon time zones
subtitle: Convert, parse and inspect zones
logo: { src: /assets/logos/luxon.svg }
category: Date libraries
layout: snippet
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Luxon zones
    url: https://moment.github.io/luxon/#/zones
---

## Handling zones
<!-- {: .-snippets} -->

### Convert to a zone
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32:00Z')

d.setZone('America/New_York').toISO()
// "2014-06-09T05:32:00.000-04:00"
```
<!-- {: data-highlight="setZone("} -->

**Converts to another zone.** The clock moves; the instant stays the same; See [Zones](https://moment.github.io/luxon/#/zones).

### Parse in a zone
<!-- {: .-snippet} -->

```js
DateTime.fromISO('2026-03-08T09:00',
  { zone: 'America/New_York' }).toISO()
// "2026-03-08T09:00:00.000-04:00"
```
<!-- {: data-highlight="{ zone: 'America/New_York' }"} -->

**Reads input as wall time.** Uses the given zone; without it the system zone applies; See [Zones](https://moment.github.io/luxon/#/zones).

### Keep the wall clock
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32:00Z')

d.setZone('America/New_York',
  { keepLocalTime: true }).toISO()
// "2014-06-09T09:32:00.000-04:00"
```
<!-- {: data-highlight="keepLocalTime: true"} -->

**Reinterprets the clock.** No conversion happens; suits meetings and wall-clock schedules; See [Changing zones](https://moment.github.io/luxon/#/zones?id=changing-zones).

### Default zone
<!-- {: .-snippet} -->

```js
import { Settings } from 'luxon'

Settings.defaultZone = 'Asia/Tokyo'

DateTime.fromISO('2026-06-01T12:00').toISO()
// "2026-06-01T12:00:00.000+09:00"
```
<!-- {: data-highlight="Settings.defaultZone"} -->

**Sets the default zone.** Applies to new DateTimes; existing instances keep their zone; See [Settings](https://moment.github.io/luxon/#/zones?id=changing-the-default-zone).

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

**Reports the UTC offset.** Minutes east of UTC; `-240` means UTC−4; See [Zone API](https://moment.github.io/luxon/api-docs/index.html).

### Fixed offsets
<!-- {: .-snippet} -->

```js
DateTime.fromISO('2026-06-01T12:00',
  { zone: 'UTC+5:30' }).toISO()
// "2026-06-01T12:00:00.000+05:30"
```
<!-- {: data-highlight="'UTC+5:30'"} -->

**Pins a fixed offset.** It ignores DST, so prefer an IANA zone; see [Fixed offsets](https://moment.github.io/luxon/#/zones?id=specifying-a-zone).
