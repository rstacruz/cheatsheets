## {{ include.title }}
{: .-three-column}

### Presets

#### Date

| Example         | Output                 |
| ---             | ---                    |
| `%m/%d/%Y`      | `06/05/2013`           |
| `%A, %B %e, %Y` | `Sunday, June 5, 2013` |
| `%b %e %a`      | `Jun 5 Sun`            |
{: .-shortcuts}

#### Time

| Example         | Output                 |
| ---             | ---                    |
| `%H:%M`         | `23:05`                |
| `%I:%M %p`      | `11:05 PM`             |
{: .-shortcuts}

Used by Ruby, UNIX `date`, and many more.

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
{: .-shortcuts}

### Time

| Symbol | Example      | Area                |
| ---    | ---          | ---                 |
| `%l`   | `1`          | Hour                |
| `%H`   | `00`..`23`   | 24h Hour            |
| `%I`   | `01`..`12`   | 12h Hour            |
| --     | ---          | ---                 |
| `%M`   | `00`..`59`   | Minute              |
| `%S`   | `00`..`60`   | Second              |
| ---    | ---          | ---                 |
| `%p`   | `AM`         | AM or PM            |
| `%Z`   | `+08`        | Time zone           |
| ---    | ---          | ---                 |
| `%j`   | `001`..`366` | Day of the year     |
| `%%`   | `%`          | Literal % character |
{: .-shortcuts}
