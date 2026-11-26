---
title: Day.js vs Moment.js differences
link_title: Day.js vs Moment
subtitle: API and plugin differences
category: Date libraries
layout: snippet
last_verified_with: "Day.js 1.11.23, Moment 2.30.1."
updated: 2026-11-26
links:
  - title: Day.js documentation
    url: https://day.js.org/docs/en/parse/parse
  - title: Moment.js docs
    url: https://momentjs.com/docs/
---

## Choosing between them
<!-- {: .-snippets} -->

### Mutation
<!-- {: .-snippet} -->

#### Moment

```js
const d = moment('2014-06-09')

d.add(1, 'day')
d.format('YYYY-MM-DD') // "2014-06-10"
```

#### Day.js

```js
const d = dayjs('2014-06-09')

d.add(1, 'day').format('YYYY-MM-DD')
// "2014-06-10"

d.format('YYYY-MM-DD') // "2014-06-09"
```

**Moment mutates; Day.js returns a new object.** Code that reuses the value behaves differently in Moment; see [Immutability](https://day.js.org/docs/en/parse/parse).

### Plugins
<!-- {: .-snippet} -->

#### Moment

```js
moment().fromNow()
```

#### Day.js

```js
import rt from 'dayjs/plugin/relativeTime.js'
dayjs.extend(rt)

dayjs().fromNow()
```
<!-- {: data-highlight="dayjs.extend(rt)"} -->

**Day.js moves extras into plugins.** `fromNow`, `isBetween`, duration and UTC each need one; see [Plugin list](https://day.js.org/docs/en/plugin/plugin).

### Named formats
<!-- {: .-snippet} -->

#### Moment

```js
moment('2014-06-09').format('LL')
// "June 9, 2014"
```

#### Day.js

```js
import lf from 'dayjs/plugin/localizedFormat.js'

dayjs.extend(lf)

dayjs('2014-06-09').format('LL')
// "June 9, 2014"
```
<!-- {: data-highlight="dayjs.extend(lf)"} -->

**Moment's `L` formats are in core; Day.js needs the `localizedFormat` plugin.** Both load one locale file per language; see [Localized format](https://day.js.org/docs/en/plugin/localized-format).

### Time zones
<!-- {: .-snippet} -->

#### Moment

```js
import moment from 'moment-timezone'

moment('2014-06-09T13:32Z')
  .tz('America/New_York')
  .format()
// "2014-06-09T09:32:00-04:00"
```
<!-- {: data-highlight="tz('America/New_York')"} -->

#### Day.js

```js
import utc from 'dayjs/plugin/utc.js'
import tz from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(tz)

dayjs.utc('2014-06-09T13:32Z')
  .tz('America/New_York')
  .format()
// "2014-06-09T09:32:00-04:00"
```
<!-- {: data-highlight=".tz('America/New_York')"} -->

**Moment ships zones in `moment-timezone`.** Day.js uses `Intl` plus the `utc` and `timezone` plugins; see [Time zone](https://day.js.org/docs/en/plugin/timezone).
