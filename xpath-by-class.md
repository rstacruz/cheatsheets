---
title: How to select elements by class in XPath
link_title: XPath select by class
subtitle: Match class tokens
category: HTML
layout: snippet
last_verified_with: "XPath 1.0."
updated: 2026-11-26
links:
  - title: XPath string functions
    url: https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions
  - title: XPath 1.0 specification
    url: https://www.w3.org/TR/1999/REC-xpath-19991116/#section-String-Functions
---

## Selecting by class
<!-- {: .-snippets} -->

### One exact class
<!-- {: .-snippet} -->

```bash
//div[contains(
  concat(' ', normalize-space(@class), ' '),
  ' card '
)]
```
<!-- {: data-highlight="normalize-space(@class)"} -->

**Matches `card` as one class token.** The padding stops `card` from matching `discarded`; see [normalize-space()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#normalize-space).

### Several classes
<!-- {: .-snippet} -->

```bash
//div[contains(
  concat(' ', normalize-space(@class), ' '),
  ' card '
)][contains(
  concat(' ', normalize-space(@class), ' '),
  ' active '
)]
```
<!-- {: data-highlight="card; active"} -->

**Requires both tokens in any order.** Chained predicates each perform a token test; see [predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates).

### Partial class text
<!-- {: .-snippet} -->

```bash
//div[contains(@class, 'card')]
```
<!-- {: data-highlight="contains(@class, 'card')"} -->

**Matches a substring of the class attribute.** A class like `card-header` also matches, so use the token form for exact classes; see [contains()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#contains).

### Starts with
<!-- {: .-snippet} -->

```bash
//div[starts-with(@class, 'card-')]
```
<!-- {: data-highlight="starts-with(@class,"} -->

**Matches when the class attribute starts with `card-`.** Useful for BEM-style prefixes; see [starts-with()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#starts-with).

### Class plus position
<!-- {: .-snippet} -->

```bash
//li[contains(@class, 'active')][1]
```
<!-- {: data-highlight="[1]"} -->

**Takes the first active item per parent.** Predicates apply left to right, so `[1]` comes after the class test; see [predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates).
