---
title: How to handle zero when pluralizing
link_title: Zero plurals
subtitle: English has no zero form
category: Browser APIs
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
updated: 2026-11-26
links:
  - title: CLDR plural rules
    url: https://cldr.unicode.org/index/cldr-spec/plural-rules
---

## Handling zero
<!-- {: .-snippets} -->

### Branch before selecting
<!-- {: .-snippet} -->

```js
const pr = new Intl.PluralRules('en')
const forms = { one: 'item', other: 'items' }

const count = (n) =>
  n === 0
    ? 'No items'
    : `${n} ${forms[pr.select(n)]}`

count(0)  // → 'No items'
count(1)  // → '1 item'
```
<!-- {: data-highlight="n === 0"} -->

**Branches on zero before selecting.** English has no `zero` category, so `select(0)` returns `other` and the generic form would print "0 items". See [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules).

### Use the zero category
<!-- {: .-snippet} -->

```js
const ar = new Intl.PluralRules('ar')

ar.select(0)  // → 'zero'
ar.select(1)  // → 'one'
```
<!-- {: data-highlight="ar.select(0)"} -->

**Uses the built-in `zero` category.** Arabic, Welsh, and Latvian define a `zero` form, so their maps need a `zero` key. See [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules).
