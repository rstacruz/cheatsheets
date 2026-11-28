---
title: How to pluralize Russian nouns in JavaScript
link_title: Russian plurals
subtitle: One, few, and many
logo: { set: icon-park-outline, name: translate }
category: Internationalization
layout: snippet
last_verified_with: "Node 26.13.1 (full ICU)."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: CLDR plural rules
    url: https://cldr.unicode.org/index/cldr-spec/plural-rules
---

## Russian forms
<!-- {: .-snippets} -->

### Choose the form
<!-- {: .-snippet} -->

```js
const ru = new Intl.PluralRules('ru')

const forms = {
  one: 'товар',
  few: 'товара',
  many: 'товаров',
  other: 'товара'
}

const count = (n) =>
  `${n} ${forms[ru.select(n)]}`

count(1) // → '1 товар'
count(2) // → '2 товара'
count(5) // → '5 товаров'
count(21) // → '21 товар'
```
<!-- {: data-highlight="forms[ru.select(n)]"} -->

**Maps all four Russian categories.** Russian uses `one` for numbers ending in 1 but not 11, `few` for 2–4 but not 12–14, `many` for 0 and 5–20, and `other` for fractions. See [select()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select).

### Send fractions to other
<!-- {: .-snippet} -->

```js
const ru = new Intl.PluralRules('ru')

ru.select(1.5) // → 'other'
ru.select(2.5) // → 'other'
```
<!-- {: data-highlight="ru.select(1.5); ru.select(2.5)"} -->

**Sends fractions to `other`.** Russian uses the genitive singular for 1.5 (`1.5 товара`), so `other` and `few` can share a string. See [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules).

### Zero takes many
<!-- {: .-snippet} -->

```js
const ru = new Intl.PluralRules('ru')

ru.select(0) // → 'many'
```
<!-- {: data-highlight="ru.select(0)"} -->

**Uses `many` for zero.** Russian says `0 товаров`, not `0 товар`. See [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules).
