---
title: JavaScript Numbers
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Parsing, checking, and formatting JavaScript numbers, plus common Math
  operations.
---

### Introduction
{: .-intro}

JavaScript numbers are 64-bit floats (IEEE 754), so `0.1 + 0.2` is not exactly
`0.3`; use BigInt beyond 2^53.

- [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) _(developer.mozilla.org)_
- [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) _(developer.mozilla.org)_

### Literals

```js
42          // → 42
3.14        // → 3.14
0xff        // → 255 (hex)
0b1010      // → 10 (binary)
0o755       // → 493 (octal)
1_000_000   // → 1000000 (numeric separators)
1e3         // → 1000 (exponent)
```

```js
Infinity     // → Infinity
-Infinity    // → -Infinity
NaN          // → NaN (Not a Number)
```

`Infinity` and `NaN` are numbers too: `typeof Infinity === 'number'`.

See: [Number literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_literals), [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) _(developer.mozilla.org)_

### Parsing

```js
Number('42')           // → 42
Number('')             // → 0
Number('42px')         // → NaN
Number('3.14')         // → 3.14
parseInt('42px', 10)   // → 42
parseInt('08', 10)     // → 8
parseFloat('3.14abc')  // → 3.14
+'42'                  // → 42 (unary plus)
```
{: data-line="5"}

`Number()` rejects trailing junk, while `parseInt()` and `parseFloat()` stop at
it. Always pass a radix to `parseInt()`.

See: [parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt), [parseFloat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat), [Number()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number) _(developer.mozilla.org)_

### Checking

```js
Number.isInteger(2)              // → true
Number.isInteger(2.5)            // → false
Number.isFinite(Infinity)        // → false
Number.isNaN('x')                // → false
Number.isSafeInteger(2 ** 53)    // → false
Number.MAX_SAFE_INTEGER          // → 9007199254740991
Number.EPSILON                   // → 2.220446049250313e-16
```
{: data-line="4"}

The global `isNaN('x')` coerces its argument and returns `true`;
`Number.isNaN('x')` is `false`.

See: [Number.isInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger), [Number.isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN), [Number.isSafeInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) _(developer.mozilla.org)_

### Rounding

```js
Math.round(4.5)     // → 5
Math.round(-4.5)    // → -4
Math.floor(4.7)     // → 4
Math.floor(-4.7)    // → -5
Math.ceil(4.2)      // → 5
Math.trunc(4.7)     // → 4 (drop the fraction)
```

```js
(2.5).toFixed(0)            // → "3"
(0.1 + 0.2).toFixed(2)      // → "0.30"
(1.005).toFixed(2)          // → "1.00" (really 1.00499...)
```

`toFixed()` returns a string, and binary floats can make decimal rounding
surprising.

See: [Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round), [Math.trunc()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc), [toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) _(developer.mozilla.org)_

### Math

```js
Math.abs(-3)          // → 3
Math.min(1, 2, 3)     // → 1
Math.max(1, 2, 3)     // → 3
Math.pow(2, 10)       // → 1024
Math.sqrt(16)         // → 4
Math.cbrt(27)         // → 3
Math.sign(-3)         // → -1
Math.hypot(3, 4)      // → 5
Math.PI               // → 3.141592653589793
```

```js
Math.random()        // → 0 <= n < 1
Math.random() * 10   // → 0 <= n < 10
```

`Math.random()` is not cryptographically secure; use `crypto.getRandomValues()`
for tokens and keys.

See: [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math), [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random), [Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) _(developer.mozilla.org)_

### Formatting

```js
const n = 1234567.891

n.toLocaleString('en-US')   // → "1,234,567.891"
```

```js
const fmt = (opts) => new Intl.NumberFormat('en-US', opts)

fmt({ style: 'currency', currency: 'USD' }).format(1234.5)
// → "$1,234.50"
fmt({ style: 'percent' }).format(0.25)      // → "25%"
fmt({ notation: 'compact' }).format(12345)  // → "12K"
fmt({ style: 'unit', unit: 'kilometer' }).format(5)  // → "5 km"
```

```js
(3.14159).toPrecision(3)   // → "3.14"
(12345).toExponential(2)   // → "1.23e+4"
```

`toPrecision()` and `toExponential()` return strings; locale output varies by
runtime and locale.

See: [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat), [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString), [toPrecision()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) _(developer.mozilla.org)_

### BigInt

```js
123n             // → 123n
typeof 1n        // → 'bigint'
BigInt('123')    // → 123n
BigInt(123)      // → 123n
10n + 3n         // → 13n
10n / 3n         // → 3n (truncates)
1n < 2           // → true
```

```js
1n + 1           // TypeError: Cannot mix BigInt and other types
```

`BigInt` holds arbitrarily large integers. Comparisons work across types, but
mixing a BigInt and a Number in arithmetic throws.

See: [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) _(developer.mozilla.org)_
