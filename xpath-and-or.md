---
title: How to combine conditions with and/or in XPath
link_title: XPath and / or
subtitle: Combine predicates
category: HTML
layout: snippet
last_verified_with: "XPath 1.0."
updated: 2026-11-26
links:
  - title: XPath booleans
    url: https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans
  - title: XPath predicates
    url: https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates
---

## Combining predicates
<!-- {: .-snippets} -->

### Both conditions
<!-- {: .-snippet} -->

```bash
//a[@href and @target='_blank']
```
<!-- {: data-highlight="and"} -->

**Requires an `href` and a blank target.** Both sides of `and` must be true; see [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Either condition
<!-- {: .-snippet} -->

```bash
//input[@type='submit' or @type='button']
```
<!-- {: data-highlight="or"} -->

**Keeps nodes where either test is true.** One matching side is enough for `or`; see [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Precedence
<!-- {: .-snippet} -->

```bash
//div[@id='a' or @id='b' and @hidden]
```
<!-- {: data-highlight="@id='b' and @hidden"} -->

**`and` binds tighter than `or`.** This reads as `@id='a' or (@id='b' and @hidden)`; see [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Group conditions
<!-- {: .-snippet} -->

```bash
//div[(@id='a' or @id='b') and
      not(@hidden)]
```
<!-- {: data-highlight="(@id='a' or @id='b')"} -->

**Parentheses make both ids share the `not()` test.** Without them, `and` groups first; see [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Negate a condition
<!-- {: .-snippet} -->

```bash
//button[not(@disabled)]
```
<!-- {: data-highlight="not(@disabled)"} -->

**Keeps buttons without a `disabled` attribute.** `not()` flips a boolean; see [not()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#not).

### Several predicates
<!-- {: .-snippet} -->

```bash
//a[@href='/help'][@role='button']
```
<!-- {: data-highlight="][@role="} -->

**Chained predicates act like `and` and apply left to right.** `//a[1][@href]` picks the first `a` then tests it; `//a[@href][1]` tests then picks; see [predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates).
