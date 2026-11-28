---
title: How to change the locale in Day.js
link_title: Day.js locale
subtitle: Load and switch locales
logo: { set: icon-park-outline, name: time }
category: Date libraries
layout: snippet
last_verified_with: "Day.js 1.11.23, Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
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

**Registers a global locale.** French becomes the default; only English ships in core, so each locale is a separate file. See [Loading locale](https://day.js.org/docs/en/i18n/loading-into-nodejs).

### Format with the locale
<!-- {: .-snippet} -->

```js
dayjs.locale('fr')

dayjs('2014-06-09').format('MMMM dddd')
// "juin lundi"
```
<!-- {: data-highlight="'MMMM dddd'"} -->

**Uses the active locale.** Names and months follow the locale: after `dayjs.locale('fr')`, new instances format in French. See [i18n](https://day.js.org/docs/en/i18n/i18n).

### One instance only
<!-- {: .-snippet} -->

```js
dayjs('2014-06-09').locale('fr')
  .format('dddd D MMMM YYYY')
// "lundi 9 juin 2014"
```
<!-- {: data-highlight=".locale('fr')"} -->

**Switches one instance.** The locale applies only to that instance; the global default stays as it was. See [Locale](https://day.js.org/docs/en/i18n/i18n).

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

**Divides weeks by locale rules.** French weeks start Monday and US weeks start Sunday; see [Week start](https://day.js.org/docs/en/customization/customization).

### Node ESM paths
<!-- {: .-snippet} -->

```js
import utc from 'dayjs/plugin/utc.js'
import 'dayjs/locale/fr.js'
```
<!-- {: data-highlight="plugin/utc.js"} -->

**Keep the `.js` extension.** Node's ESM loader needs it for locale subpaths, which fail without an extension outside a bundler. See [Loading into Node.js](https://day.js.org/docs/en/i18n/loading-into-nodejs).
