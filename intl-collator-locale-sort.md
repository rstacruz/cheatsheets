---
title: How to sort strings by locale in JavaScript
link_title: Locale sort
subtitle: Swedish, German, and Spanish order
category: String sorting
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: locales argument
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
  - title: Intl.Collator
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
---

## Locale-aware sorting
<!-- {: .-snippets} -->

### Swedish order
<!-- {: .-snippet} -->

```js
const swedish = new Intl.Collator('sv')
const words = ['z', 'ä', 'å', 'ö', 'a']

words.sort(swedish.compare)
// → ['a', 'z', 'å', 'ä', 'ö']
```
<!-- {: data-highlight="Intl.Collator('sv')"} -->

**Puts `å`, `ä`, and `ö` after `z`.** Swedish treats them as separate letters, not accented a and o; see [locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

### German order
<!-- {: .-snippet} -->

```js
const german = new Intl.Collator('de')

['z', 'ä', 'a'].sort(german.compare)
// → ['a', 'ä', 'z']
```
<!-- {: data-highlight="Intl.Collator('de')"} -->

**Keeps `ä` next to `a`.** German sorts umlauts with their base letter, unlike Swedish; see [locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

### Spanish order
<!-- {: .-snippet} -->

```js
const spanish = new Intl.Collator('es')

['o', 'n', 'ñ'].sort(spanish.compare)
// → ['n', 'ñ', 'o']
```
<!-- {: data-highlight="Intl.Collator('es')"} -->

**Places `ñ` between `n` and `o`.** Spanish gives the letter its own alphabet slot; see [locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
