---
title: JavaScript lazy shortcuts
category: JavaScript
updated: 2026-10-04
intro: |
  Shorthand idioms for coercing values in JavaScript, and the explicit calls
  they replace.
---

## Shortcuts
{: .-left-reference}

### Introduction
{: .-intro}

Common idioms for coercing values, compared with the explicit calls they replace.

- [Operator reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) _(developer.mozilla.org)_

### Examples

```js
n = +'4096'    // n === 4096
s = '' + 200   // s === '200'
```

```js
now = +new Date()
isPublished = !!post.publishedAt
```

See: [Unary plus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus) _(developer.mozilla.org)_

### Comparison

| What | Lazy mode | "The right way" |
| --- | --- | --- |
| String to number | `+str` | `parseInt(str, 10)` _or_ `parseFloat()` |
| Math floor | `num | 0` | `Math.floor(num)` |
| Number to string | `'' + num` | `num.toString()` |
| Date to UNIX timestamp | `+new Date()` | `new Date().getTime()` |
| Any to boolean | `!!value` | `Boolean(value)` |
| Check array contents | `if (~arr.indexOf(v))` | `if (arr.includes(v))` |
{: .-left-align.-headers}

`.includes` is ES6-only, otherwise use `.indexOf(val) !== -1` if you don't polyfill. `num | 0` rounds toward zero and wraps at 32 bits, unlike `Math.floor()`.

See: [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), [Boolean()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean) _(developer.mozilla.org)_
