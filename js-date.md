---
title: JavaScript Date
category: JavaScript
---

### Constructor

```js
new Date()
new Date(1419785527580)
new Date("December 17, 1995 03:24:00")
new Date("2013-03-01T01:10:00")
new Date(2014, 2,     1,   13,  0,     59, 0)
      // year  month* day  hour minute sec milli
      // * = zero-indexed
```

### Getters

```js
.getDate()     //=> 1..31
.getDay()      //=> 0..6 (sun..sat)
.getFullYear() //=> 2014
.getMonth()    //=> 0..11

.getHours()
.getMinutes()
.getSeconds()
.getMilliseconds()

.getTime()     //=> ms since epoch
.getTimezoneOffset()
```

### Conversion

```js
.toString()           //=> "Mon Dec 29 2014 00:58:28 GMT+0800 (PHT)"
.toTimeString()       //=> "00:58:46 GMT+0800 (PHT)"
.toUTCString()        //=> ""Sun, 28 Dec 2014 16:58:59 GMT"

.toDateString()       //=> "Thu Jan 10 2013"
.toISOString()        //=> "2013-01-09T16:00:00.000Z"
.toLocaleString()     //=> "12/29/2014, 12:57:31 AM"
.toLocaleTimeString() //=> "12:57:31 AM"
```
### Setters

```js
.setDate()
.setFullYear()
.setHours()
// ...etc; see getters
```

### UTC getters

```js
.getUTCDate()
.getUTCDay()
.getUTCMonth()
// ...etc; see getters
```
