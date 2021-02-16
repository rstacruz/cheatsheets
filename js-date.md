---
title: JavaScript Date
category: JavaScript
layout: 2017/sheet
weight: -3
---

## Date
{: .-left-reference}

### Constructor

```js
// Now
new Date()
```

```js
// ms since epoch
new Date(1419785527580)
```

```js
// Date format
new Date("May 17, 1995 03:24:00")
```

```js
// ISO date format
new Date("2013-03-01T01:10:00")
```

```js
new Date(2014, 2, 1, 13, 0, 59, 0)
```

### Constructor

| `new Date(` | `2014,` | `2,`  | `1,` | `13,` | `0,` | `59,` | `0)`  |
| Date        | Year    | Month | Day  | Hour  | Min  | Sec   | Milli |
{: .-css-breakdown}

Months are zero-indexed (eg, January is `0`).

### Conversion

| Method                   | Result                                      |
| ---                      | ---                                         |
| `d.toString()`           | `"Mon Dec 29 2014 00:58:28 GMT+0800 (PHT)"` |
| `d.toTimeString()`       | `"00:58:46 GMT+0800 (PHT)"`                 |
| `d.toUTCString()`        | `"Sun, 28 Dec 2014 16:58:59 GMT"`           |
| ---                      | ---                                         |
| `d.toDateString()`       | `"Thu Jan 10 2013"`                         |
| `d.toISOString()`        | `"2013-01-09T16:00:00.000Z"`                |
| `d.toLocaleString()`     | `"12/29/2014, 12:57:31 AM"`                 |
| `d.toLocaleTimeString()` | `"12:57:31 AM"`                             |
| ---                      | ---                                         |
| `d.getTime()`            | `1419785527580`                             |

Accessing
---------

### Getters

| Method                 | Result            |
| ---                    | ---               |
| `.getDate()`           | `1..31`           |
| `.getDay()`            | `0..6` (sun..sat) |
| `.getFullYear()`       | `2014`            |
| `.getMonth()`          | `0..11`           |
| ---                    | ---               |
| `.getHours()`          |                   |
| `.getMinutes()`        |                   |
| `.getSeconds()`        |                   |
| `.getMilliseconds()`   |                   |
| ---                    | ---               |
| `.getTime()`           | ms since epoch    |
| `.getTimezoneOffset()` |                   |

UTC versions are also available (eg, `.getUTCDate()`, `.getUTCDay()`, etc).

### Setters

| Method                       | Result |
| ---                          | ---    |
| `.setDate` _(val)_           |        |
| `.setDay` _(val)_            |        |
| `.setFullYear` _(val)_       |        |
| `.setMonth` _(val)_          |        |
| ---                          | ---    |
| `.setHours` _(val)_          |        |
| `.setMinutes` _(val)_        |        |
| `.setSeconds` _(val)_        |        |
| `.setMilliseconds` _(val)_   |        |
| ---                          | ---    |
| `.setTime` _(val)_           |        |
| `.setTimezoneOffset` _(val)_ |        |

See the getters list.
