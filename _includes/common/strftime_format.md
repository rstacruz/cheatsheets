## {{ include.title }}

<!-- {: .-three-column} -->

### Presets

#### Date

| Example         | Output                    |
| ---             | ---                       |
| `%m/%d/%Y`      | `06/05/2013`              |
| `%A, %B %e, %Y` | `Wednesday, June 5, 2013` |
| `%F`            | `2013-06-05`              |
| `%b %e %a`      | `Jun 5 Wed`               |

<!-- {: .-shortcuts} -->

#### Time

| Example    | Output     |
| ---        | ---        |
| `%H:%M`    | `23:05`    |
| `%I:%M %p` | `11:05 PM` |
| `%T`       | `23:05:00` |

<!-- {: .-shortcuts} -->

Used by Ruby, UNIX `date`, and many more.

See: [strftime](https://pubs.opengroup.org/onlinepubs/9799919799/functions/strftime.html)

### Date

| Symbol | Example                  | Area        |
| ---    | ---                      | ---         |
| `%a`   | `Sun`                    | **Weekday** |
| `%A`   | `Sunday`                 |             |
| `%w`   | `0`..`6` _(Sunday is 0)_ |             |
| ---    | ---                      | ---         |
| `%y`   | `13`                     | **Year**    |
| `%Y`   | `2013`                   |             |
| ---    | ---                      | ---         |
| `%b`   | `Jan`                    | **Month**   |
| `%B`   | `January`                |             |
| `%m`   | `01`..`12`               |             |
| ---    | ---                      | ---         |
| `%d`   | `01`..`31`               | **Day**     |
| `%e`   | `1`..`31`                |             |

<!-- {: .-shortcuts} -->

See: [strftime](https://pubs.opengroup.org/onlinepubs/9799919799/functions/strftime.html)

### Time

| Symbol | Example      | Area                |
| ---    | ---          | ---                 |
| `%l`   | `1`          | Hour                |
| `%H`   | `00`..`23`   | 24h hour            |
| `%I`   | `01`..`12`   | 12h hour            |
| ---    | ---          | ---                 |
| `%M`   | `00`..`59`   | Minute              |
| `%S`   | `00`..`60`   | Second              |
| ---    | ---          | ---                 |
| `%p`   | `AM`         | AM or PM            |
| `%Z`   | `UTC`        | Zone name           |
| `%z`   | `+0000`      | Numeric offset      |
| ---    | ---          | ---                 |
| `%j`   | `001`..`366` | Day of the year     |
| `%s`   | `1370473500` | Epoch seconds       |
| `%%`   | `%`          | Literal % character |

<!-- {: .-shortcuts} -->

See: [strftime](https://pubs.opengroup.org/onlinepubs/9799919799/functions/strftime.html)
