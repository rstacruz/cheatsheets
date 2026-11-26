---
title: How to show 24-hour time in JavaScript
link_title: 24-hour time
subtitle: Force a 24-hour clock
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: hourCycle option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hourcycle
  - title: hour12 option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hour12
---

## Clocks
<!-- {: .-snippets} -->

### Set hourCycle
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
}).format(new Date(2026, 10, 26, 14, 5))
// → '14:05'
```
<!-- {: .-wrap data-highlight="hourCycle: 'h23'"} -->

**Forces a 24-hour clock regardless of locale.** `h23` counts 0-23; see [hourCycle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hourcycle).

### Prefer h23 over h24
<!-- {: .-snippet} -->

```js
const clock = (hourCycle) => (
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hourCycle
  }).format(new Date(2026, 10, 26, 0, 0))
)

clock('h23') // → '00'
clock('h24') // → '24'
```
<!-- {: .-wrap data-highlight="clock('h24')"} -->

**`h24` prints midnight as `24:00`.** `h23` prints `00:00` instead, which is what sorters and parsers expect; see [hourCycle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hourcycle).

### Use hour12: false
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}).format(new Date(2026, 10, 26, 14, 5))
// → '14:05'
```
<!-- {: .-wrap data-highlight="hour12: false"} -->

**The older switch for a 24-hour clock.** `hour12` wins when both options are set, and `hourCycle` adds the `h11`/`h12` and `h23`/`h24` distinctions; see [hour12](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#hour12).

### Pick a 24-hour locale
<!-- {: .-snippet} -->

```js
new Intl.DateTimeFormat('de-DE', {
  timeStyle: 'short'
}).format(new Date(2026, 10, 26, 14, 5))
// → '14:05'
```
<!-- {: .-wrap data-highlight="'de-DE'"} -->

**Most of Europe already defaults to 24-hour time.** Locale defaults make no exception explicit, so force the clock when the design needs it; see [timeStyle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timestyle).
