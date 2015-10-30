---
title: Time formats
---

### Ruby

    Date presets
      %m/%d/%Y      - 06/05/2013
      %A, %B %e, %Y - Sunday, January 5, 2013
      %b %e %a      - Jan 5 Sun

    Time presets
      %H:%M    - 23:05
      %I:%M%p - 11:05PM

    Weekday
      %a - Sun
      %A - Sunday
      %w - 0..6 (Sunday is 0)
    Year
      %y - 13
      %Y - 2013
    Month
      %b - Jan
      %B - January
      %m - 01..12
    Day
      %d - 01..31
      %e - 1..31
    Time
      %H - Hour, 24-hour clock (00..23)
      %I - Hour, 12-hour clock (01..12)
      %l - Hour
      %M - Minute (00..59)
      %p - AM or PM
      %S - Second (00..60)
      %Z - Time zone name
    Misc
      %j - Day of the year (001..366)
      %% - Literal % character

### Moment.js

    Weekday
      d         - 4
      dd        - Su
      ddd       - Sun
      dddd      - Sunday
    Year
      YY        - 13
      YYYY      - 2013
    Month
      M         - 1..12 (Jan is 1)
      MM        - 01..12 (Jan is 1)
      MMM       - Jan
      MMMM      - January
    Day
      D         - 6..31
      DD        - 06..31
    Time
      H, HH     - Hour, 24-hour clock
      h, hh     - Hour, 12-hour clock
      m, mm     - Minutes
      s, ss     - Seconds
      S         - Deciseconds (1/10th of a second)
      SS        - Centiseconds (1/100th of a second)
      SSS       - Milliseconds (1/1000th of a second)
      Z, ZZ     - Timezone offset as `+0700` or `+07:30`
      X         - Unix timestamp
      a, A      - AM/PM
    Misc
      DDD, DDDD - Day of year

Examples:

    YYYY-MM-DD         - 2014-01-01
    dddd, MMMM Do YYYY - Friday, May 16th 2014
    hh:mm a            - 12:30 pm
