---
title: Intl.Collator vs localeCompare
link_title: Collator vs localeCompare
subtitle: When to use each
logo: { set: icon-park-outline, name: sort }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: Intl.Collator
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
  - title: String.prototype.localeCompare()
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
---

## Choosing an API
<!-- {: .-snippets} -->

### Compare one pair
<!-- {: .-snippet} -->

```js
'a'.localeCompare('b', 'en')
// → negative
```
<!-- {: data-highlight="localeCompare"} -->

**Reads best for one comparison.** It applies the same collation rules without reusing a collator instance. See [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).

### Reuse a collator
<!-- {: .-snippet} -->

```js
const collator = new Intl.Collator('en', {
  numeric: true
})
const list = ['item10', 'item2']

list.toSorted(collator.compare)
// → ['item2', 'item10']
```
<!-- {: data-highlight="toSorted(collator.compare)"} -->

**Builds one reusable collator.** A collator avoids constructing options inside every comparison during repeated sorts. See [compare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare).

### Pass the same options
<!-- {: .-snippet} -->

```js
'a'.localeCompare('A', 'en', {
  sensitivity: 'base'
})
// → 0
```
<!-- {: data-highlight="sensitivity: 'base'"} -->

**Uses the collator options unchanged.** `localeCompare` accepts the same option object as the constructor; see [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options).
