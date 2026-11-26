---
title: How to change the locale in Day.js
link_title: Day.js locale
subtitle: Load and switch locales
category: JavaScript libraries
layout: snippet
last_verified_with: "Day.js 1.11.23, Node 26.13.1."
updated: 2026-11-26
links:
  - title: Day.js i18n
    url: https://day.js.org/docs/en/i18n/i18n
  - title: Loading locales in Node.js
    url: https://day.js.org/docs/en/i18n/loading-into-nodejs
---

## Changing locale
<!-- {: .-snippets} -->

### Import a locale
<!-- {: .-snippet} -->

```js
import 'dayjs/locale/fr.js'

dayjs.locale('fr')
```
<!-- {: data-highlight="'dayjs/locale/fr.js'"} -->

**Registers French as the global default.** Only English ships in core, so each locale is a separate file; see [Loading locale](https://day.js.org/docs/en/i18n/loading-into-nodejs).

### Format with the locale
<!-- {: .-snippet} -->

```js
dayjs('2014-06-09').format('MMMM dddd')
// "juin lundi"
```
<!-- {: data-highlight="'MMMM dddd'"} -->

**Uses the active locale for names.** The global default is French from the previous step; see [i18n](https://day.js.org/docs/en/i18n/i18n).

### One instance only
<!-- {: .-snippet} -->

```js
dayjs('2014-06-09').locale('fr')
  .format('dddd D MMMM YYYY')
// "lundi 9 juin 2014"
```
<!-- {: data-highlight=".locale('fr')"} -->

**Switches the locale for one instance.** The global default stays as it was; see [Locale](https://day.js.org/docs/en/i18n/i18n).

### Reset the default
<!-- {: .-snippet} -->

```js
dayjs.locale('fr')
dayjs('2014-06-09').format('MMMM')   // "juin"

dayjs.locale('en')
dayjs('2014-06-09').format('MMMM')   // "June"
```
<!-- {: data-highlight="dayjs.locale('en')"} -->

**Restores English for new instances.** Call `dayjs.locale()` with no argument to read the current default; see [i18n](https://day.js.org/docs/en/i18n/i18n).

### Week starts
<!-- {: .-snippet} -->

```js
const d = dayjs('2014-06-09')

d.startOf('week').format('ddd')   // "Sun"
d.locale('fr').startOf('week')
  .format('ddd')                  // "lun."
```
<!-- {: data-highlight="startOf('week')"} -->

**Divides weeks by locale rules.** French weeks start Monday and US weeks start Sunday; see [Week start](https://day.js.org/docs/en/i18n/i18n).

### Node ESM paths
<!-- {: .-snippet} -->

```js
import utc from 'dayjs/plugin/utc.js'
import 'dayjs/locale/fr.js'
```
<!-- {: data-highlight="plugin/utc.js"} -->

**Keeps the `.js` extension in Node ESM.** Extensionless subpaths fail outside a bundler; see [Loading into Node.js](https://day.js.org/docs/en/i18n/loading-into-nodejs).
