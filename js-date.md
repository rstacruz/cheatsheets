---
title: JavaScript Date
category: JavaScript
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

### Constructor

| `new Date(` | `2014,` | `2,`  | `1,` | `13,` | `0,` | `59,` | `0)`  |
| Date        | Year    | Month | Day  | Hour  | Min  | Sec   | Milli |
{: .-css-breakdown}

Months are zero-indexed (eg, January is `0`).

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
