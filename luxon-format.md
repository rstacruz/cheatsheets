---
title: How to format a date with Luxon
link_title: Luxon format
subtitle: Tokens and locale presets
logo: { src: /assets/logos/luxon.svg }
category: Date libraries
layout: snippet
last_verified_with: "Luxon 3.7.2, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Luxon formatting
    url: https://moment.github.io/luxon/#/formatting
---

## Formatting dates
<!-- {: .-snippets} -->

### Token string
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO('2014-06-09T09:32')
d.toFormat('yyyy-MM-dd HH:mm')
// "2014-06-09 09:32"
```
<!-- {: data-highlight="'yyyy-MM-dd HH:mm'"} -->

**Formats with case-sensitive tokens.** `yyyy` is a year and `YYYY` is not a token; see [Formatting](https://moment.github.io/luxon/#/formatting).

### Names
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO('2014-06-09T09:32')
d.toFormat('cccc, LLLL d')
// "Monday, June 9"
```
<!-- {: data-highlight="'cccc, LLLL d'"} -->

**Spells out weekday and month names.** `ccc` and `LLL` shorten them; see [Tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).

### Presets
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32Z', { zone: 'utc' })

d.toLocaleString(DateTime.DATE_FULL)
// "June 9, 2014"

d.toLocaleString(DateTime.TIME_24_SIMPLE)
// "09:32"
```
<!-- {: data-highlight="TIME_24_SIMPLE"} -->

**Uses built-in `Intl` presets.** They follow the locale and the runtime's ICU data; see [Locale strings](https://moment.github.io/luxon/#/formatting?id=presets).

### Another locale
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32Z', { zone: 'utc' })

d.setLocale('fr')
  .toLocaleString(DateTime.DATE_FULL)
// "9 juin 2014"
```
<!-- {: data-highlight="setLocale('fr')"} -->

**Renders in another locale for one instance.** No locale files are needed; see [Locales](https://moment.github.io/luxon/#/intl?id=how-locales-work).

### ISO output
<!-- {: .-snippet} -->

```js
const d = DateTime.fromISO(
  '2014-06-09T09:32:05.123Z',
  { zone: 'Asia/Tokyo' })

d.toISO()
// "2014-06-09T18:32:05.123+09:00"

d.toUTC().toISO()
// "2014-06-09T09:32:05.123Z"
```
<!-- {: data-highlight="toUTC().toISO()"} -->

**Keeps the zone in `toISO()`.** Call `toUTC()` first for a trailing `Z`; see [ISO](https://moment.github.io/luxon/#/formatting?id=iso-8601).

### Literal text
<!-- {: .-snippet} -->

```js
DateTime.fromISO('2014-06-09')
  .toFormat("'on' cccc")
// "on Monday"
```
<!-- {: data-highlight="'on'"} -->

**Quotes protect literal words.** Unquoted letters may read as tokens; see [Escaping](https://moment.github.io/luxon/#/formatting?id=escaping).
