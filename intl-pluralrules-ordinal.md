---
title: How to format ordinal numbers in JavaScript
link_title: Ordinal numbers
subtitle: 1st, 2nd, and 3rd
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: Intl.PluralRules type option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#type
---

## Formatting ordinals
<!-- {: .-snippets} -->

### Build the suffix
<!-- {: .-snippet} -->

```js
const ord = new Intl.PluralRules('en', {
  type: 'ordinal'
})
const suffixes = {
  one: 'st', two: 'nd',
  few: 'rd', other: 'th'
}

const nth = (n) =>
  `${n}${suffixes[ord.select(n)]}`

nth(1)   // → '1st'
nth(2)   // → '2nd'
nth(11)  // → '11th'
nth(23)  // → '23rd'
```
<!-- {: data-highlight="suffixes"} -->

**Maps ordinal categories to suffixes.** Set `type: 'ordinal'` so 2nd and 3rd get their own categories; 11–13 take `th`. See [type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules#type).

### Check locale coverage
<!-- {: .-snippet} -->

```js
const ja = new Intl.PluralRules('ja', {
  type: 'ordinal'
})

ja.resolvedOptions().pluralCategories
// → ['other']
```
<!-- {: data-highlight="pluralCategories"} -->

**Checks the locale's ordinal categories.** Some locales, such as Japanese, have only `other`; use a single label there. See [resolvedOptions()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions).
