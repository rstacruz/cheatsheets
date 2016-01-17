---
title: Moment.js
category: JavaScript libraries
---

### Formatting

    moment()
      .format('dddd')
      .format("MMM Do YY")
      .format()

      .fromNow() //=> "31 minutes ago"
      .calendar() //=> "Last Friday at 9:32PM
  
### Parsing

    moment("2013-03-01")
    moment("2013-03-01", "YYYY-MM-DD")
    moment(+new Date())

### Add

    .add(1, 'day')
    .subtract(2, 'days')

    .startOf('day')
    .endOf('day')
    .startOf('hour')

### Internationalization

    .format('L')      // 06/09/2014
    .format('l')      // 6/9/2014
    .format('LL')     // June 9 2014
    .format('ll')     // Jun 9 2014
    .format('LLL')    // June 9 2014 9:32 PM
    .format('lll')    // Jun 9 2014 9:32 PM
    .format('LLLL')   // Monday, June 9 2014 9:32 PM
    .format('llll')   // Mon, Jun 9 2014 9:32 PM

See [datetime](datetime.html) for more.

### Reference

 * http://momentjs.com/
 * http://momentjs.com/docs/
