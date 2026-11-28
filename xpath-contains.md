---
title: How to use contains() in XPath
link_title: XPath contains()
subtitle: Match text and attributes
logo: { set: icon-park-outline, name: code }
category: HTML
layout: snippet
last_verified_with: "XPath 1.0."
created_at: 2026-11-26
updated: 2026-11-28
links:
  - title: XPath string functions
    url: https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#contains
  - title: XPath 1.0 specification
    url: https://www.w3.org/TR/1999/REC-xpath-19991116/#section-String-Functions
---

## Matching with contains()
<!-- {: .-snippets} -->

### Text
<!-- {: .-snippet} -->

```bash
//button[contains(text(), 'Go')]
```
<!-- {: data-highlight="contains(text(),"} -->

**Finds `Go` in text.** It matches buttons whose first direct text node contains `Go`. For nested or split text, use `contains(., 'Go')`; see [contains()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#contains).

### Attribute
<!-- {: .-snippet} -->

```bash
//a[contains(@href, 'docs')]
```
<!-- {: data-highlight="contains(@href,"} -->

**Matches attribute parts.** It matches part of an attribute value. The test is case-sensitive; see [contains()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#contains).

### Multiple values
<!-- {: .-snippet} -->

```bash
//a[contains(@href, 'docs') or
    contains(@href, 'blog')]
```
<!-- {: data-highlight="or"} -->

**Accepts either substring.** Chain more `or` tests in the same predicate; see [booleans](https://www.w3.org/TR/1999/REC-xpath-19991116/#booleans).

### Ignore case
<!-- {: .-snippet} -->

```bash
//button[contains(
  translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
               'abcdefghijklmnopqrstuvwxyz'),
  'go'
)]
```
<!-- {: data-highlight="translate("} -->

**Lowercases the text before matching.** XPath 1.0 has no case-insensitive flag, so `translate()` maps the alphabet first; see [translate()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#translate).

### Text vs class
<!-- {: .-snippet} -->

#### Text

```bash
//button[contains(., 'Save')]
```
<!-- {: data-highlight="contains(.,"} -->

#### Class

```bash
//button[contains(@class, 'save')]
```
<!-- {: data-highlight="contains(@class,"} -->

**Reads text and class.** `.` reads all descendant text; `@class` reads the attribute. Partial class matching also hits `save-outline`; for exact tokens see [select by class](./xpath-by-class).
