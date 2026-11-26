---
title: How to list a locale's plural categories
link_title: Plural categories
subtitle: Forms each locale needs
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: Intl.PluralRules resolvedOptions()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions
---

## Listing categories
<!-- {: .-snippets} -->

### Read pluralCategories
<!-- {: .-snippet} -->

```js
const pr = new Intl.PluralRules('ar')
const opts = pr.resolvedOptions()

opts.pluralCategories
// → ['zero', 'one', 'two', 'few',
//    'many', 'other']
```
<!-- {: data-highlight="pluralCategories"} -->

**Lists the categories a locale uses.** Build translation keys from this list instead of assuming `one` and `other`. See [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions).

### Compare locales
<!-- {: .-snippet} -->

```js
const categories = (locale) =>
  new Intl.PluralRules(locale)
    .resolvedOptions().pluralCategories

categories('en')
// → ['one', 'other']

categories('ja')
// → ['other']

categories('ru')
// → ['one', 'few', 'many', 'other']
```
<!-- {: data-highlight="resolvedOptions"} -->

**Compares locales with one helper.** The list drives how many forms a translation needs. See [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules).

### Check locale support
<!-- {: .-snippet} -->

```js
Intl.PluralRules.supportedLocalesOf([
  'en', 'fr', 'xx'
])
// → ['en', 'fr']
```
<!-- {: data-highlight="supportedLocalesOf"} -->

**Drops unsupported tags.** Invalid language tags throw a `RangeError`; well-formed but unsupported tags are filtered out. See [supportedLocalesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf).
