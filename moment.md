---
title: Moment.js
category: JavaScript libraries
layout: 2017/sheet
updated: 2018-09-15
tags: [Featurable]
---

### Parsing

```js
m = moment('2013-03-01', 'YYYY-MM-DD')
```

This parses the given date using the given format. Returns a moment object.

### Formatting

```js
m.format()            // "2013-03-01T00:00:00+01:00"
m.format('dddd')      // "Friday"
m.format('MMM Do YY') // "Mar 1st 13"
m.fromNow()           // "7 years ago"
m.calendar()          // "03/01/2013"
```

### Add

```js
m.add(1, 'day')
m.subtract(2, 'days')
```

```js
m.startOf('day')
m.endOf('day')
m.startOf('hour')
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
