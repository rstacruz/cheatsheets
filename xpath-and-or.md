---
title: How to combine conditions with and/or in XPath
link_title: XPath and / or
subtitle: Combine predicates
logo: { set: icon-park-outline, name: code }
category: HTML
layout: snippet
last_verified_with: "XPath 1.0."
updated: 2026-11-28
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

**Requires an `href`.** The blank target is required too: both sides of `and` must be true. See [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Either condition
<!-- {: .-snippet} -->

```bash
//input[@type='submit' or @type='button']
```
<!-- {: data-highlight="or"} -->

**Keeps matching nodes.** Either side of `or` may be true; one matching test is enough. See [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

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

**Parentheses group the tests.** Both ids then share the `not()` test; without them, `and` groups first. See [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Negate a condition
<!-- {: .-snippet} -->

```bash
//button[not(@disabled)]
```
<!-- {: data-highlight="not(@disabled)"} -->

**Keeps enabled buttons.** Buttons without a `disabled` attribute match, because `not()` flips a boolean. See [not()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#not).

### Several predicates
<!-- {: .-snippet} -->

```bash
//a[@href='/help'][@role='button']
```
<!-- {: data-highlight="][@role="} -->

**Predicates apply left to right.** Chained predicates act like `and`: `//a[1][@href]` picks the first `a` then tests it, while `//a[@href][1]` tests then picks. See [predicates](https://www.w3.org/TR/1999/REC-xpath-19991116/#predicates).
