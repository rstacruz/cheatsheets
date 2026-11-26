---
title: Intl.Collator
subtitle: Locale-aware string comparison
category: Internationalization
tier: t2
updated: 2026-11-26
last_verified_with: "Node 26.13.1."
fragments:
  - "Intl.Collator"
  - "compare(a, b)"
  - "sort(compare)"
  - "toSorted"
  - "'sv'"
  - "sensitivity"
  - "'base'"
  - "numeric: true"
  - "caseFirst"
  - "'upper'"
  - "collation"
  - "'pinyin'"
  - "-u-co-pinyin"
  - "localeCompare"
  - "resolvedOptions"
  - "RangeError"
keywords:
  - Intl.Collator
  - sort strings JavaScript
  - localeCompare
  - natural sort
  - case-insensitive sort
intro: |
  `Intl.Collator` compares strings by a locale's rules, so sorting respects
  accents, case, and language rules. The same rules power `localeCompare`.
links:
  - title: Intl.Collator
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
  - title: ECMA-402 Collator objects
    url: https://tc39.es/ecma402/#collator-objects
  - title: String.prototype.localeCompare
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
---

## Sorting
<!-- {: .-three-column} -->

### Basic sort

```js
const collator = new Intl.Collator('en')
const fruit = ['banana', 'apple',
  'Cherry']

fruit.sort(collator.compare)
// → ['apple', 'banana', 'Cherry']
```
<!-- {: data-highlight="sort(collator.compare)"} -->

Without a collator, `.sort()` compares UTF-16 code units, so `Cherry` comes before `apple` and accented letters after `z`. Only the sign of `compare()` is guaranteed; engines usually return `-1` and `1`.

See: [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

### Sort objects

```js
const collator = new Intl.Collator('en')
const users = [
  { name: 'bob' },
  { name: 'Alice' },
  { name: 'ábel' }
]
const byName = (a, b) => (
  collator.compare(a.name, b.name)
)

users.sort(byName).map((u) => u.name)
// → ['ábel', 'Alice', 'bob']
```
<!-- {: data-highlight="collator.compare(a.name, b.name)"} -->

Call `sort` with a comparator that extracts the key; passing `collator.compare` alone compares the objects' string forms.

See: [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

### Multi-key sort

```js
const collator = new Intl.Collator('en')
const people = [
  { last: 'Smith', first: 'bob' },
  { last: 'Smith', first: 'Ann' },
  { last: 'Adams', first: 'cal' }
]

people.sort((a, b) => (
  collator.compare(a.last, b.last) ||
  collator.compare(a.first, b.first)
))
```
<!-- {: data-highlight="compare(a.last, b.last); compare(a.first, b.first)"} -->

The next key runs only when the previous comparison returns `0`, because `||` short-circuits on any non-zero result.

See: [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

### Descending order

```js
const collator = new Intl.Collator('en')
const descending = (a, b) => (
  collator.compare(b, a)
)

['b', 'a', 'c'].sort(descending)
// → ['c', 'b', 'a']
```
<!-- {: data-highlight="compare(b, a)"} -->

Swapping the arguments negates the order without copying the array; `sort().reverse()` works too but mutates twice.

See: [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

## Comparison options

### Ignore case and accents

```js
const collator = new Intl.Collator('en', {
  sensitivity: 'base'
})

collator.compare('résumé', 'resume')  // → 0
collator.compare('Apple', 'apple')    // → 0
collator.compare('a', 'b')            // → negative
```
<!-- {: data-highlight="sensitivity: 'base'"} -->

#### Values

| Value | Distinguishes |
| --- | --- |
| `base` | Letters only |
| `accent` | Accents, not case |
| `case` | Case, not accents |
| `variant` | Accents and case (default) |
<!-- {: .-headers} -->

`base` is the usual choice for case- and accent-insensitive matching.

See: [sensitivity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity)

### Sort numbers naturally

```js
const collator = new Intl.Collator('en', {
  numeric: true
})
const files = ['file 10', 'file 2', 'file 1']

files.sort(collator.compare)
// → ['file 1', 'file 2', 'file 10']
```
<!-- {: data-highlight="numeric: true"} -->

Digit runs compare by value, so versions like `1.9` come before `1.10`. The minus sign is punctuation, so sort negative numeric strings with `(a, b) => Number(a) - Number(b)`.

See: [numeric](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#numeric)

### Ignore punctuation

```js
const collator = new Intl.Collator('en', {
  ignorePunctuation: true
})

collator.compare('foo-bar', 'foobar')  // → 0
collator.compare('co.op', 'coop')      // → 0
```
<!-- {: data-highlight="ignorePunctuation: true"} -->

Punctuation and spaces are skipped at every comparison level, so `foo bar` also equals `foobar`.

See: [ignorePunctuation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#ignorepunctuation)

### Case order

#### Upper first

```js
const upper = new Intl.Collator('en', {
  caseFirst: 'upper'
})

upper.compare('a', 'A')  // → positive
```
<!-- {: data-highlight="caseFirst: 'upper'"} -->

#### Lower first

```js
const lower = new Intl.Collator('en', {
  caseFirst: 'lower'
})

lower.compare('a', 'A')  // → negative
```
<!-- {: data-highlight="caseFirst: 'lower'"} -->

The default `'false'` follows the locale; English sorts lowercase first, so `caseFirst: 'upper'` flips the pair.

See: [caseFirst](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#casefirst)

## Locales
<!-- {: .-three-column} -->

### Locale sort order

```js
const swedish = new Intl.Collator('sv')
const words = ['z', 'ä', 'å', 'ö', 'a']

words.sort(swedish.compare)
// → ['a', 'z', 'å', 'ä', 'ö']
```
<!-- {: data-highlight="Intl.Collator('sv')"} -->

Swedish treats `å`, `ä`, and `ö` as letters after `z`; German sorts `ä` near `a`, and Spanish puts `ñ` after `n`.

See: [locales argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

### Collation variants

```js
const pinyin = new Intl.Collator(
  'zh-u-co-pinyin'
)

['张', '李', '王'].sort(pinyin.compare)
// → ['李', '王', '张']
```
<!-- {: data-highlight="zh-u-co-pinyin"} -->

The `-u-co-` extension picks a collation such as pinyin or phonebook; the `collation` option does the same. Unsupported values fall back silently.

See: [collation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#collation)

### Check support

```js
Intl.Collator.supportedLocalesOf(
  ['sv', 'xx']
)
// → ['sv']
```
<!-- {: data-highlight="supportedLocalesOf"} -->

This returns only the locales the runtime can collate; an absent locale still runs with a fallback.

See: [supportedLocalesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/supportedLocalesOf)

## Performance

### Reuse a collator

```js
const collator = new Intl.Collator('en')
const sorted = values.toSorted(collator.compare)
```
<!-- {: data-highlight="toSorted(collator.compare)"} -->

Build the collator once and reuse its `compare`; constructing one inside the comparator is far slower.

See: [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare)

### localeCompare

```js
['b', 'a', 'c'].sort((a, b) => a.localeCompare(b))
// → ['a', 'b', 'c']
```
<!-- {: data-highlight="localeCompare"} -->

`localeCompare` accepts the same options and applies the same rules; use it for one-off comparisons and a collator for repeated sorts.

See: [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

## Options reference

### All options

| Option | Values |
| --- | --- |
| `usage` | `'sort'` (default), `'search'` |
| `sensitivity` | `'variant'` (default), `'base'`, `'accent'`, `'case'` |
| `ignorePunctuation` | `false` (default; `true` for Thai), `true` |
| `numeric` | `false` (default), `true` |
| `caseFirst` | `'false'` (default), `'upper'`, `'lower'` |
| `collation` | e.g. `'phonebk'`, `'pinyin'`, `'emoji'` |
| `localeMatcher` | `'best fit'` (default), `'lookup'` |
<!-- {: .-headers} -->

`'search'` tunes comparisons for matching text, while `'sort'` orders a list.

See: [Collator()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator)

### Resolved defaults

```js
const collator = new Intl.Collator('en', {
  numeric: true
})

collator.resolvedOptions().numeric      // → true
collator.resolvedOptions().sensitivity  // → 'variant'
```
<!-- {: data-highlight="resolvedOptions"} -->

`resolvedOptions()` shows the options and locale after fallbacks, which helps confirm a locale was accepted.

See: [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions)

### Errors

#### Invalid locale

```js
new Intl.Collator('en_US')
// RangeError: Invalid language tag: en_US
```
<!-- {: data-highlight="'en_US'"} -->

#### Invalid option

```js
new Intl.Collator('en', { usage: 'nope' })
// RangeError: Value nope out of range for
// Intl.Collator options property usage
```
<!-- {: data-highlight="'nope'"} -->

Malformed tags and invalid enum values throw `RangeError`; unsupported locales or collations are not errors and fall back.

See: [Exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#exceptions)
