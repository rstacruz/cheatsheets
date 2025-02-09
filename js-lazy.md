---
title: JavaScript lazy shortcuts
category: JavaScript
---

## Shortcuts
{: .-left-reference}

### Examples

```js
n = +'4096'    // n === 4096
s = '' + 200   // s === '200'
```

```js
now = +new Date()
isPublished = !!post.publishedAt
```

### Shortcuts

| What | Lazy mode | "The right way" |
| --- | --- | --- |
| String to number | `+str` | `parseInt(str, 10)` _or_ `parseFloat()` |
| Math floor | `num | 0` | `Math.floor(num)` |
| Number to string | `'' + num` | `num.toString()` |
| Date to UNIX timestamp | `+new Date()` | `new Date().getTime()` |
| Any to boolean | `!!value` | `Boolean(value)` |
| Check array contents | `if (~arr.indexOf(v))` | `if (arr.includes(v))` |
{: .-left-align.-headers}

`.includes` is ES6-only, otherwise use `.indexOf(val) !== -1` if you don't polyfill.
