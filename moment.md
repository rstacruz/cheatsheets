---
title: Moment.js
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-10-10
tags: [Featurable]
---

### Parsing

```js
m = moment('2013-03-01', 'YYYY-MM-DD')
```

This parses the given date using the given format. Returns a moment object.

### Formatting

```js
m
  .format()
  .format('dddd')
  .format('MMM Do YY')   // → "Sep 2nd 07"
  .fromNow()             // → "31 minutes ago"
  .toNow()               // → "in 31 minutes"
  .calendar()            // → "Last Friday at 9:32PM"
  .toISOString()         // → "2014-06-09T04:00:00.000Z"
  .toJSON()              // → "2014-06-09T04:00:00.000Z"
  .local().format('lll') // → "Feb 25, 2015 8:02 AM" // EST if you're in EST
  .utc().format('lll')   // → "Feb 25, 2015 1:02 PM" // UTC no matter where you're at
```

### Converting

```js
d = m.toDate()  // → javascript Date() class
d = new Date(m) // → javascript Date() class
m = moment(d)   // → new moment object
d == m          // → false
m.valueOf()     // → 1402286400000
d.valueOf() == m.valueOf() // true
```

### Add

```js
m.add(1, 'day')
m.add(1, 'days')
m.subtract(2, 'days')
m.subtract(2, 'day')
m.startOf('day')
m.endOf('day')
```

```js
// Units Available
'millisecond' + 's'
'second' + 's'
'minute' + 's'
'hour' + 's'
'day' + 's'
'week' + 's'
'month' + 's'
'quarter' + 's'
'year' + 's'
//Alternatively
'ms','s','m','h','d','w','M','Q','y'
```

### Internationalization

```js
.format('L')      // 06/09/2014
.format('l')      // 6/9/2014
.format('LL')     // June 9 2014
.format('ll')     // Jun 9 2014
.format('LLL')    // June 9 2014 9:32 PM
.format('lll')    // Jun 9 2014 9:32 PM
.format('LLLL')   // Monday, June 9 2014 9:32 PM
.format('llll')   // Mon, Jun 9 2014 9:32 PM

.toISOString()    // 2014-06-09T04:00:00.000Z
```

See [datetime](./datetime) for more.

{% include common/moment_format.md title="Formatting" %}

## References

### Alternatives

* [You don't need Moment.js](https://github.com/you-dont-need/You-Dont-Need-Momentjs) _(github.com)_

### Also see

* [Datetime cheatsheet](./datetime) _(devhints.io)_
* [Moment website](http://momentjs.com/) _(momentjs.com)_
* [Moment docs](http://momentjs.com/docs/) _(momentjs.com)_
