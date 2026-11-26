---
title: When to use Day.js vs Moment.js
link_title: Day.js vs Moment
subtitle: API and bundle differences
category: JavaScript libraries
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
d.format('YYYY-MM-DD')   // "2014-06-10"
```

#### Day.js

```js
const d = dayjs('2014-06-09')
d.add(1, 'day').format('YYYY-MM-DD')
// "2014-06-10"
d.format('YYYY-MM-DD')   // "2014-06-09"
```
<!-- {: data-highlight=".add(1, 'day')"} -->

**Moment mutates; Day.js returns a new object.** Code that keeps reusing a Moment value behaves differently after a migration; see [Immutability](https://day.js.org/docs/en/parse/parse).

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

### Locales
<!-- {: .-snippet} -->

#### Moment

```js
moment.locale('fr')
moment('2014-06-09').format('MMMM')
// "juin"
```

#### Day.js

```js
import 'dayjs/locale/fr.js'

dayjs.locale('fr')
dayjs('2014-06-09').format('MMMM')
// "juin"
```
<!-- {: data-highlight="'dayjs/locale/fr.js'"} -->

**Moment bundles every locale; Day.js loads one file per language.** That keeps the default bundle small; see [Locale](https://day.js.org/docs/en/i18n/i18n).

### Time zones
<!-- {: .-snippet} -->

#### Moment

```js
moment('2014-06-09T13:32Z')
  .tz('America/New_York')
  .format()
// "2014-06-09T09:32:00-04:00"
```

#### Day.js

```js
dayjs.utc('2014-06-09T13:32Z')
  .tz('America/New_York')
  .format()
// "2014-06-09T09:32:00-04:00"
```
<!-- {: data-highlight="dayjs.utc("} -->

**Moment ships zones in `moment-timezone`.** Day.js uses `Intl` plus the `utc` and `timezone` plugins; see [Time zone](https://day.js.org/docs/en/plugin/timezone).

### Migrating a file
<!-- {: .-snippet} -->

#### Moment

```js
moment()
moment.utc()
moment.duration(2, 'days')
```

#### Day.js

```js
dayjs()
dayjs.utc()
dayjs.duration(2, 'days')
```
<!-- {: data-highlight="dayjs.duration("} -->

**Most calls rename one-to-one.** Load the matching plugin before calling the Day.js version; see [Day.js docs](https://day.js.org/docs/en/parse/parse).
