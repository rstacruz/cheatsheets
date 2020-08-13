## {{ include.title }}
{: .-three-column}

### Examples

#### Date

| Example                   | Output                 |
| ------------------------- | ---------------------- |
| `YYYY-MM-DD`              | 2014-01-01             |
| `dddd, MMMM Do YYYY`      | Friday, May 16th 2014  |
| `dddd [the] Do [of] MMMM` | Friday the 16th of May |

#### Time

| Example   | Output   |
| --------- | -------- |
| `hh:mm a` | 12:30 pm |

Used by [Moment.js](http://momentjs.com/docs/#/displaying/) and [date-fns/format](https://date-fns.org/v1.28.5/docs/format). Similar to Java [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html).

### Date

| Symbol | Example                 | Area             |
| ---    | ---                     | ---              |
| `d`    | `0`..`6`                | **Weekday**      |
| `dd`   | `Su`                    |                  |
| `ddd`  | `Sun`                   |                  |
| `dddd` | `Sunday`                |                  |
| ---    | ---                     | ---              |
| `YY`   | `13`                    | **Year**         |
| `YYYY` | `2013`                  |                  |
| ---    | ---                     | ---              |
| `M`    | `1`..`12` _(Jan is 1)_  | **Month**        |
| `Mo`   | `1st`..`12th`           |                  |
| `MM`   | `01`..`12` _(Jan is 1)_ |                  |
| `MMM`  | `Jan`                   |                  |
| `MMMM` | `January`               |                  |
| ---    | ---                     | ---              |
| `Q`    | `1`..`4`                | **Quarter**      |
| `Qo`   | `1st`..`4th`            |                  |
| ---    | ---                     | ---              |
| `D`    | `1`..`31`               | **Day**          |
| `Do`   | `1st`..`31st`           |                  |
| `DD`   | `01`..`31`              |                  |
| ---    | ---                     | ---              |
| `DDD`  | `1`..`365`              | **Day of year**  |
| `DDDo` | `1st`..`365th`          |                  |
| `DDDD` | `001`..`365`            |                  |
| ---    | ---                     | ---              |
| `w`    | `1`..`53`               | **Week of year** |
| `wo`   | `1st`..`53rd`           |                  |
| `ww`   | `01`..`53`              |                  |
{: .-shortcuts}

### Time

| Symbol | Example      | Area                       |
| ---    | ---          | ---                        |
| `H`    | `0`..`23`    | **24h hour**               |
| `HH`   | `00`..`23`   |                            |
| ---    | ---          | ---                        |
| `h`    | `1`..`12`    | **12h hour**               |
| `hh`   | `01`..`12`   |                            |
| ---    | ---          | ---                        |
| `m`    | `0`..`59`    | **Minutes**                |
| `mm`   | `00`..`59`   |                            |
| ---    | ---          | ---                        |
| `s`    | `0`..`59`    | **Seconds**                |
| `ss`   | `00`..`59`   |                            |
| ---    | ---          | ---                        |
| `a`    | `am`         | **AM/PM**                  |
| `A`    | `AM`         |                            |
| ---    | ---          | ---                        |
| `Z`    | `+07:00`     | **Timezone offset**        |
| `ZZ`   | `+0730`      |                            |
| ---    | ---          | ---                        |
| `S`    | `0`..`9`     | Deciseconds                |
| `SS`   | `00`..`99`   | Centiseconds               |
| `SSS`  | `000`..`999` | Milliseconds               |
| ---    | ---          | ---                        |
| `X`    |              | Unix timestamp             |
| `x`    |              | Millisecond Unix timestamp |
{: .-shortcuts}

### Presets

| Example | Output                           |
| ------- | -------------------------------- |
| `LT`    | 8:30 PM                          |
| `LTS`   | 8:30:25 PM                       |
| ---     | ---                              |
| `LL`    | August 2 1985                    |
| `ll`    | Aug 2 1985                       |
| ---     | ---                              |
| `LLL`   | August 2 1985 08:30 PM           |
| `lll`   | Aug 2 1985 08:30 PM              |
| ---     | ---                              |
| `LLLL`  | Thursday, August 2 1985 08:30 PM |
| `llll`  | Thu, Aug 2 1985 08:30 PM         |
