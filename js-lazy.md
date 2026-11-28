---
title: JavaScript lazy shortcuts
subtitle: Type coercion shorthand
logo: { set: icon-park-outline, name: hourglass }
category: JavaScript
created_at: 2017-03-07
updated: 2026-11-25
last_verified_with: "ECMAScript 2026."
tier: t3
intro: |
  Shorthand idioms for coercing values in JavaScript, and the explicit calls
  they replace.

links:
  - title: Operator reference
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
---

## Shortcuts

### Examples

#### Coercions

```js
n = +'4096'    // n === 4096
s = '' + 200   // s === '200'
```
<!-- {: data-highlight="+'4096'; '' + 200"} -->

#### Shortcuts

```js
now = +new Date()
isPublished = !!post.publishedAt
```
<!-- {: data-highlight="+new Date(); !!post.publishedAt"} -->

See: [Unary plus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus) _(developer.mozilla.org)_

### Comparison

| Lazy mode | "The right way" | What |
| --- | --- | --- |
| `+str` | `parseInt(str, 10)` _or_ `parseFloat()` | String to number |
| `num \| 0` | `Math.floor(num)` (ES6) | Math floor |
| `'' + num` | `num.toString()` | Number to string |
| `+new Date()` | `new Date().getTime()` | Date to UNIX timestamp |
| `!!value` | `Boolean(value)` | Any to boolean |
| `if (~arr.indexOf(v))` | `if (arr.includes(v))` | Check array contents |

<!-- {: .-left-align.-headers} -->

`.includes` is ES2016-only; otherwise use `indexOf(val) !== -1`.
`num | 0` rounds toward zero and wraps at 32 bits, unlike `Math.floor()`.

See: [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), [Boolean()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean) _(developer.mozilla.org)_
