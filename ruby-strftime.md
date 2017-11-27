---
title: Ruby strftime
category: Ruby
layout: 2017/sheet
updated: 2017-11-08
---

Strftime
--------
{: .-two-column}

### Date

```ruby
%Y  - Year with century (can be negative, 4 digits at least)
          -0001, 0000, 1995, 2009, 14292, etc.
%C  - year / 100 (round down.  20 in 2009)
%y  - year % 100 (00..99)
%m  - Month of the year, zero-padded (01..12)
%_m - blank-padded ( 1..12)
%-m - no-padded (1..12)
%B  - The full month name ('January')
%^B - uppercased ('JANUARY')
%b  - The abbreviated month name ('Jan')
%^b - uppercased ('JAN')
%h  - Equivalent to %b
%d  - Day of the month, zero-padded (01..31)
%-d - no-padded (1..31)
%e  - Day of the month, blank-padded ( 1..31)
%j  - Day of the year (001..366)
```

### Time

```ruby
%H   - Hour of the day, 24-hour clock, zero-padded (00..23)
%k   - Hour of the day, 24-hour clock, blank-padded ( 0..23)
%I   - Hour of the day, 12-hour clock, zero-padded (01..12)
%l   - Hour of the day, 12-hour clock, blank-padded ( 1..12)
%P   - Meridian indicator, lowercase ('am' or 'pm')
%p   - Meridian indicator, uppercase ('AM' or 'PM')
%M   - Minute of the hour (00..59)
%S   - Second of the minute (00..59)
%L   - Millisecond of the second (000..999)
%N   - Fractional seconds digits, default is 9 digits (nanosecond)
%3N  - millisecond (3 digits)
%6N  - microsecond (6 digits)
%9N  - nanosecond (9 digits)
%12N - picosecond (12 digits)
```

### Time zone

```ruby
%z    - Time zone as hour and minute offset from UTC (e.g. +0900)
%:z   - hour and minute offset from UTC with a colon (e.g. +09:00)
%::z  - hour, minute and second offset from UTC (e.g. +09:00:00)
%:::z - hour, minute and second offset from UTC (e.g. +09, +09:30, +09:30:30)
%Z    - Time zone abbreviation name
```

### Weekday

```ruby
%A  - The full weekday name ('Sunday')
%^A - uppercased ('SUNDAY')
%a  - The abbreviated name ('Sun')
%^a - uppercased ('SUN')
%u  - Day of the week (Monday is 1, 1..7)
%w  - Day of the week (Sunday is 0, 0..6)
```
