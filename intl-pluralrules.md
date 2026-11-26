---
title: Intl.PluralRules
subtitle: Locale-aware plural rules
category: Internationalization
tier: t2
updated: 2026-11-26
last_verified_with: "Node 26.13.1 (full ICU)."
fragments:
  - "PluralRules"
  - "select(3)"
  - "one / other"
  - "type: 'ordinal'"
  - "'zero'"
  - "'few'"
  - "'many'"
  - "pluralCategories"
  - "selectRange"
  - "select(-1)"
  - "'ar'"
  - "'ru'"
  - "'pl'"
  - "resolvedOptions"
  - "intl-pluralrules"
  - "CLDR"
  - "1st / 2nd"
  - "'ja'"
keywords:
  - Intl.PluralRules
  - pluralize JavaScript
  - CLDR plural rules
  - ordinal numbers
intro: |
  `Intl.PluralRules` returns the CLDR plural category for a number in a locale.
  Use it to choose word forms for counts and ordinals.
links:
  - title: Intl.PluralRules
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules
  - title: ECMA-402 PluralRules objects
    url: https://tc39.es/ecma402/#pluralrules-objects
  - title: CLDR plural rules
    url: https://cldr.unicode.org/index/cldr-spec/plural-rules
  - title: intl-pluralrules polyfill
    url: https://www.npmjs.com/package/intl-pluralrules
---

## Creating a formatter

### Pluralize a word

```js
const pr = new Intl.PluralRules('en-US')
const forms = {
  one: 'item',
  other: 'items'
}

const plural = (n) => forms[pr.select(n)]

plural(1) // → 'item'
plural(3) // → 'items'
```
<!-- {: data-highlight="new Intl.PluralRules"} -->

Create one formatter, then index a form map with the category. Keep a form for every category the locale uses, not only `one` and `other`.

See: [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

### Select a category

#### Constructor

```js
new Intl.PluralRules()
new Intl.PluralRules('en-US')
new Intl.PluralRules('ar', { type: 'ordinal' })
```

#### Select

```js
const pr = new Intl.PluralRules('en-US')

pr.select(1) // → 'one'
pr.select(2) // → 'other'
pr.select(1.5) // → 'other'
```
<!-- {: data-highlight="select"} -->

`select()` returns a CLDR category name, not a word or a suffix. Call the constructor with `new`; a plain call throws a `TypeError`.

See: [Intl.PluralRules() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules)

## Counts and formatting

### Format the count

```js
const pr = new Intl.PluralRules('en-US')
const nf = new Intl.NumberFormat('en-US')
const forms = {
  one: 'item',
  other: 'items'
}

const count = (n) =>
  `${nf.format(n)} ${forms[pr.select(n)]}`

count(1) // → '1 item'
count(1200) // → '1,200 items'
```
<!-- {: data-highlight="nf.format(n)"} -->

The category comes from the raw number; `NumberFormat` only changes the printed digits.

See: [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

### Round before selecting

```js
const pr = new Intl.PluralRules('en')

pr.select(1.4) // → 'other'
pr.select(Math.round(1.4)) // → 'one'
```
<!-- {: data-highlight="Math.round; pr.select"} -->

Rounding after `select()` can print "1 items". Round once, then pass the same value to both `select()` and `NumberFormat`.

See: [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

### Compact counts

```js
const pr = new Intl.PluralRules('fr', {
  notation: 'compact',
  compactDisplay: 'long'
})
const compact = new Intl.NumberFormat('fr', {
  notation: 'compact',
  compactDisplay: 'long'
})

compact.format(1100000)
// → '1,1 million'

pr.select(1100000) // → 'many'
```
<!-- {: data-highlight="notation: 'compact'"} -->

Compact notation can change the category: French prints 1,1 million and selects `many`, not `other`. Pass the same notation options to both formatters.

See: [notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#notation)

## Cardinal rules

### Zero

```js
const en = new Intl.PluralRules('en')
const fr = new Intl.PluralRules('fr')

en.select(0) // → 'other'
fr.select(0) // → 'one'
```
<!-- {: data-highlight="en.select(0); fr.select(0)"} -->

Zero is its own category in Arabic and Welsh, but English reuses `other` and French reuses `one`. Branch on zero explicitly when the copy needs "No items".

See: [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)

### Decimals

```js
const pr = new Intl.PluralRules('en')

pr.select(1) // → 'one'
pr.select(1.0) // → 'one'
pr.select(1.5) // → 'other'
```
<!-- {: data-highlight="select(1.5)"} -->

For English, only 1 is `one`; `1.0` still counts as 1, and other decimals such as 1.5 are `other`.

See: [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

### Fraction digits

```js
const pr = new Intl.PluralRules('en', {
  minimumFractionDigits: 1
})

pr.select(1) // → 'other'
```
<!-- {: data-highlight="minimumFractionDigits"} -->

Digit options are applied before the rules run, so `1` prints as `1.0` and selects `other`. Match these options to the ones on the `NumberFormat` that prints the count.

See: [digit options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#options)

### Negative numbers

```js
const pr = new Intl.PluralRules('en')

pr.select(-1) // → 'one'
pr.select(-2) // → 'other'
```
<!-- {: data-highlight="select(-1)"} -->

The sign is ignored; `-1` takes the same form as `1`.

See: [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

## Ordinal rules

### English ordinals

```js
const ord = new Intl.PluralRules('en', {
  type: 'ordinal'
})

ord.select(1) // → 'one'
ord.select(2) // → 'two'
ord.select(3) // → 'few'
ord.select(4) // → 'other'
```
<!-- {: data-highlight="type: 'ordinal'"} -->

Ordinal rules map to suffixes, not counts. English uses `one` for 1st/21st, `two` for 2nd/22nd, `few` for 3rd/23rd, and `other` for the rest.

See: [type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#type)

### Format an ordinal

```js
const ord = new Intl.PluralRules('en', {
  type: 'ordinal'
})
const suffixes = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th'
}

const nth = (n) => `${n}${suffixes[ord.select(n)]}`

nth(1)   // → '1st'
nth(2)   // → '2nd'
nth(11)  // → '11th'
nth(23)  // → '23rd'
```
<!-- {: data-highlight="suffixes[ord.select(n)]"} -->

A suffix map needs all four ordinal categories; 11, 12, and 13 take `other`.

See: [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select)

### Ordinal coverage

```js
new Intl.PluralRules('en', {
  type: 'ordinal'
}).resolvedOptions().pluralCategories
// → ['one', 'two', 'few', 'other']

new Intl.PluralRules('ja', {
  type: 'ordinal'
}).resolvedOptions().pluralCategories
// → ['other']
```
<!-- {: data-highlight="pluralCategories"} -->

Not every locale has ordinal-specific rules. Read `pluralCategories` before building a suffix table, or fall back to a single form.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions)

## Locale differences

### Categories by locale

| Locale | Categories |
| --- | --- |
| `en` | `one`, `other` |
| `fr` | `one`, `many`, `other` |
| `ar` | `zero`, `one`, `two`, `few`, `many`, `other` |
| `ru` | `one`, `few`, `many`, `other` |
| `pl` | `one`, `few`, `many`, `other` |
| `ja` | `other` |
| `cy` | `zero`, `one`, `two`, `few`, `many`, `other` |
<!-- {: .-headers} -->

Categories come from CLDR data bundled with the runtime, and each locale uses a different subset.

See: [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)

### Arabic six forms

```js
const ar = new Intl.PluralRules('ar')

ar.select(0) // → 'zero'
ar.select(1) // → 'one'
ar.select(2) // → 'two'
ar.select(3) // → 'few'
ar.select(11) // → 'many'
ar.select(100) // → 'other'
```
<!-- {: data-highlight="'ar'"} -->

Arabic distinguishes six categories, so every form needs its own translation.

See: [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)

### Russian few and many

```js
const ru = new Intl.PluralRules('ru')

ru.select(1) // → 'one'   (1 товар)
ru.select(2) // → 'few'   (2 товара)
ru.select(5) // → 'many'  (5 товаров)
ru.select(21) // → 'one'   (21 товар)
```
<!-- {: data-highlight="ru.select(2); ru.select(5)"} -->

Russian uses `one` for 1 and 21, `few` for 2–4 and 22–24, and `many` for 0 and 5–20. The noun in the message must match the chosen form.

See: [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)

### Japanese single form

```js
const ja = new Intl.PluralRules('ja')

ja.select(1) // → 'other'
ja.select(5) // → 'other'
```
<!-- {: data-highlight="ja.select(5)"} -->

Japanese has no plural distinction, so `other` is the only category. A single form covers every count.

See: [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)

## Plural ranges

### Select a range

```js
const pl = new Intl.PluralRules('pl')

pl.selectRange(1, 2) // → 'few'
pl.selectRange(2, 5) // → 'many'
pl.selectRange(5, 1) // → 'one'
```
<!-- {: data-highlight="selectRange"} -->

`selectRange()` picks a form for a span. In Polish, 5–1 switches to `one` because the range ends at 1.

See: [selectRange()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/selectRange)

### English ranges

```js
const en = new Intl.PluralRules('en')

en.selectRange(1, 1) // → 'other'
en.selectRange(1, 3) // → 'other'
```
<!-- {: data-highlight="selectRange(1, 1)"} -->

English uses `other` for every range, including 1–1. Select the form from the range, not from the start number.

See: [selectRange()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/selectRange)

### Fallback without selectRange

```js
const pr = new Intl.PluralRules('pl')

const range = (start, end) =>
  pr.selectRange
    ? pr.selectRange(start, end)
    : pr.select(end)

range(1, 2) // → 'few'
```
<!-- {: data-highlight="pr.selectRange"} -->

Older engines lack `selectRange()`, which needs Chrome 106+, Firefox 116+, Safari 15.4+, or Node 19+. Fall back to the end number or load the polyfill.

See: [selectRange()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/selectRange)

## Polyfills and support

### Install the polyfill

#### npm

```sh
npm install intl-pluralrules
```
<!-- {: data-highlight="npm install"} -->

#### Import

```js
import 'intl-pluralrules'
```
<!-- {: data-highlight="intl-pluralrules"} -->

The package loads only when the native API is incomplete, then fills in methods and locale data, including `selectRange()`.

See: [intl-pluralrules](https://www.npmjs.com/package/intl-pluralrules)

### React Native and Hermes

```js
// App.tsx, with Hermes
import 'intl-pluralrules'
```
<!-- {: data-highlight="Hermes"} -->

Hermes ships without full `Intl`, so i18next resolves only `_one` and `_other` keys and locales with more forms break. Import the polyfill once at the app entry point.

See: [React Native and Expo](https://www.i18next.com/react/react-native)

### Check locale support

```js
Intl.PluralRules.supportedLocalesOf([
  'en', 'fr', 'xx'
])
// → ['en', 'fr']
```
<!-- {: data-highlight="supportedLocalesOf"} -->

Returns the tags the runtime supports. Small-ICU builds silently fall back to the default locale, so check this before showing a localized count.

See: [supportedLocalesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf)

## Options reference

### Digit options

| Option | Values |
| --- | --- |
| `minimumIntegerDigits` | 1–21 |
| `minimumFractionDigits` | 0–100 |
| `maximumFractionDigits` | 0–100 |
| --- | --- |
| `minimumSignificantDigits` | 1–21 |
| `maximumSignificantDigits` | 1–21 |
| `roundingIncrement` | 1 (default), 2, 5, 10, 20, 25, 50, … |
| `roundingMode` | `'halfExpand'` (default), `'ceil'`, `'floor'`, `'trunc'`, `'expand'`, `'halfEven'`, … |
| `roundingPriority` | `'auto'` (default), `'morePrecision'`, `'lessPrecision'` |
| `trailingZeroDisplay` | `'auto'` (default), `'stripIfInteger'` |
<!-- {: .-headers} -->

These use the same names and defaults as `Intl.NumberFormat`. Increments above 1 need `maximumFractionDigits: 0`.

See: [digit options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#options)

### Notation options

| Option | Values |
| --- | --- |
| `notation` | `'standard'` (default), `'scientific'`, `'engineering'`, `'compact'` |
| `compactDisplay` | `'short'` (default), `'long'` |
<!-- {: .-headers} -->

See: [notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#notation)

### Type and locale options

| Option | Values |
| --- | --- |
| `type` | `'cardinal'` (default), `'ordinal'` |
| `localeMatcher` | `'best fit'` (default), `'lookup'` |
<!-- {: .-headers} -->

`localeMatcher` controls how a locale tag falls back.

See: [Intl.PluralRules() options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#options)

## Inspecting a formatter

### resolvedOptions()

```js
const pr = new Intl.PluralRules('ar', {
  type: 'ordinal'
})

pr.resolvedOptions().locale // → 'ar'

pr.resolvedOptions().pluralCategories
// → ['other']
```
<!-- {: data-highlight="resolvedOptions"} -->

Returns the locale after fallback, the type, digit options, and `pluralCategories`.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions)

### Errors and edge cases

#### Without new

```js
Intl.PluralRules('en')
// TypeError: Constructor Intl.PluralRules requires 'new'
```
<!-- {: data-highlight="requires 'new'"} -->

#### Special values

```js
new Intl.PluralRules('en').select(NaN)
// → 'other'
```
<!-- {: data-highlight="select(NaN)"} -->

`new` is required. `NaN` and `Infinity` fall into `other`, and numeric strings are coerced to numbers.

See: [Exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#exceptions)
