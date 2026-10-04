---
title: JavaScript Date
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Constructing and reading JavaScript dates, and converting them to strings
  and timestamps.
---

## Date

### Introduction
{: .-intro}

JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) represents a moment in time.

- [Date reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) _(developer.mozilla.org)_

### Constructor

```js
// Now
new Date()
```

```js
// ms since epoch
new Date(1393678859000)
```

```js
// Date format
new Date("March 1, 2014 13:00:59")
```

```js
// ISO date format
new Date("2014-03-01T13:00:59")
```

```js
new Date(2014, 2, 1, 13, 0, 59, 0)
```

See: [Date() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) _(developer.mozilla.org)_

### Arguments

| Date | Year | Month | Day | Hour | Min | Sec | Milli |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `new Date(` | `2014,` | `2,`  | `1,` | `13,` | `0,` | `59,` | `0)`  |
| Date        | Year    | Month | Day  | Hour  | Min  | Sec   | Milli |
{: .-css-breakdown}

Months are zero-indexed (eg, January is `0`).

See: [Date() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) _(developer.mozilla.org)_

### Conversion

| Method                   | Result                                      |
| ---                      | ---                                         |
| `d.toString()`           | `"Sat Mar 01 2014 13:00:59 GMT+0000 (GMT)"` |
| `d.toTimeString()`       | `"13:00:59 GMT+0000 (GMT)"`                 |
| `d.toUTCString()`        | `"Sat, 01 Mar 2014 13:00:59 GMT"`           |
| ---                      | ---                                         |
| `d.toDateString()`       | `"Sat Mar 01 2014"`                         |
| `d.toISOString()`        | `"2014-03-01T13:00:59.000Z"`                |
| `d.toLocaleString()`     | `"3/1/2014, 1:00:59 PM"`                    |
| `d.toLocaleTimeString()` | `"1:00:59 PM"`                              |
| ---                      | ---                                         |
| `d.getTime()`            | `1393678859000`                             |

String results depend on the timezone and locale.

See: [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString), [toUTCString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString), [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) _(developer.mozilla.org)_

## Accessing

### Getters

| Method                 | Result            |
| ---                    | ---               |
| `.getDate()`           | `1..31`           |
| `.getDay()`            | `0..6` (sun..sat) |
| `.getFullYear()`       | `2014`            |
| `.getMonth()`          | `0..11`           |
| ---                    | ---               |
| `.getHours()`          | `0..23`           |
| `.getMinutes()`        | `0..59`           |
| `.getSeconds()`        | `0..59`           |
| `.getMilliseconds()`   | `0..999`          |
| ---                    | ---               |
| `.getTime()`           | ms since epoch    |
| `.getTimezoneOffset()` | minutes           |

See: [getTime()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime), [getTimezoneOffset()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) _(developer.mozilla.org)_

### Setters

| Method                     | Result         |
| ---                        | ---            |
| `.setDate` _(val)_         | ms since epoch |
| `.setFullYear` _(val)_     | ms since epoch |
| `.setMonth` _(val)_        | ms since epoch |
| ---                        | ---            |
| `.setHours` _(val)_        | ms since epoch |
| `.setMinutes` _(val)_      | ms since epoch |
| `.setSeconds` _(val)_      | ms since epoch |
| `.setMilliseconds` _(val)_ | ms since epoch |
| ---                        | ---            |
| `.setTime` _(val)_         | ms since epoch |

UTC versions are also available (eg, `.getUTCDate()`, `.setUTCDate()`, etc).

See: [setTime()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) _(developer.mozilla.org)_
