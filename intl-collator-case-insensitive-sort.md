---
title: How to sort strings case-insensitively in JavaScript
link_title: Case-insensitive sort
subtitle: Ignore case while sorting
logo: { set: icon-park-outline, name: sort }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
updated: 2026-11-28
links:
  - title: sensitivity option
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity
---

## Case-insensitive sorting
<!-- {: .-snippets} -->

### Keep accents, ignore case
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  sensitivity: 'accent'
})

collator.compare('a', 'A')
// → 0

collator.compare('a', 'á')
// → negative
```
<!-- {: data-highlight="sensitivity: 'accent'"} -->

**Distinguishes accents but not case.** Use it when `cafe` and `café` are different words; see [sensitivity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity).

### Ignore case and accents
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  sensitivity: 'base'
})

['b', 'A', 'a', 'B'].sort(collator.compare)
// → ['A', 'a', 'b', 'B']
```
<!-- {: data-highlight="sensitivity: 'base'"} -->

**Collapses to base letters.** It ignores case and accents; ties keep their original order because `sort()` is stable. See [sensitivity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity).

### Compare one pair
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  sensitivity: 'base'
})

collator.compare('HELLO', 'hello')
// → 0
```
<!-- {: data-highlight="compare('HELLO', 'hello')" } -->

**Returns zero for equal keys.** Compare with `=== 0` instead of checking for a specific number; see [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).
