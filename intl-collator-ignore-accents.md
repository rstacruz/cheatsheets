---
title: How to compare strings ignoring accents in JavaScript
link_title: Ignore accents
subtitle: Compare résumé with resume
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-26
links:
  - title: sensitivity option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity
  - title: String.prototype.normalize()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
---

## Comparing without accents
<!-- {: .-snippets} -->

### Compare with a collator
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  sensitivity: 'base'
})

collator.compare('résumé', 'resume')  // → 0
```
<!-- {: data-highlight="sensitivity: 'base'"} -->

**Treats accented letters as their base letter.** `base` also ignores case; use it for search matching rather than display; see [sensitivity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity).

### Strip accents for exact comparison
<!-- {: .-snippet} -->

```js
const strip = (text) => text
  .normalize('NFD')
  .replace(/\p{M}/gu, '')

strip('résumé')  // → 'resume'
```
<!-- {: data-highlight="normalize('NFD')" } -->

**Removes combining marks from the string.** Keep the original for display; the stripped copy is only for comparing or indexing; see [normalize()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize).

### Sort by base letters
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  sensitivity: 'base'
})
const words = ['zebra', 'árbol', 'Apple']

words.sort(collator.compare)
// → ['Apple', 'árbol', 'zebra']
```
<!-- {: data-highlight="words.sort(collator.compare)" } -->

**Groups `árbol` with the a-words.** Accents do not move a word to the end of the list; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).
