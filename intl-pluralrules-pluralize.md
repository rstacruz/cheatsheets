---
title: How to pluralize a word in JavaScript
link_title: Pluralize a word
subtitle: Count-aware word forms
logo: { set: icon-park-outline, name: translate }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: Intl.PluralRules select()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select
---

## Pluralizing counts
<!-- {: .-snippets} -->

### Map categories to words
<!-- {: .-snippet} -->

```js
const pr = new Intl.PluralRules('en')

const forms = {
  one: 'item',
  other: 'items'
}

forms[pr.select(1)] // → 'item'
forms[pr.select(3)] // → 'items'
```
<!-- {: data-highlight="forms[pr.select(1)]"} -->

**Picks a word form from the category.** For English, `select()` returns `one` or `other`; use it as the map key. See [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select).

### Wrap the lookup
<!-- {: .-snippet} -->

```js
const pr = new Intl.PluralRules('en')

const plural = (n, forms) =>
  forms[pr.select(n)]

plural(1, { one: 'day', other: 'days' })
// → 'day'

plural(2, { one: 'day', other: 'days' })
// → 'days'
```
<!-- {: data-highlight="plural"} -->

**Wraps the lookup in a helper.** Pass one form map per noun, with every category the locale uses. See [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select).

### Fall back to other
<!-- {: .-snippet} -->

```js
const pr = new Intl.PluralRules('fr')
const forms = {
  one: 'article',
  other: 'articles'
}

const label = (n) =>
  forms[pr.select(n)] ?? forms.other

label(1) // → 'article'
label(1000000) // → 'articles'
```
<!-- {: data-highlight="?? forms.other"} -->

**Falls back to `other`.** Every locale has an `other` form, so it covers categories a translation leaves out; French `many` falls back here. See [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules).
