---
title: JavaScript Strings
category: JavaScript
weight: -3
updated: 2026-10-04
intro: |
  Working with JavaScript strings: creating, extracting, transforming, and
  splitting text.
---

## Basics

### Introduction
{: .-intro}

Strings are immutable sequences of UTF-16 code units.

- [String reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) _(developer.mozilla.org)_
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) _(developer.mozilla.org)_

### Creating

```js
const a = 'single'
const b = "double"
const c = `template ${a}`    // → "template single"
```

```js
const multi = `line one
line two`
```

```js
String(42)     // → "42"
String(null)   // → "null"
```

See: [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), [String()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String) _(developer.mozilla.org)_

### Accessing characters

```js
'hello'.length         // → 5
'hello'[1]             // → 'e'
'hello'.at(-1)         // → 'o'
'hello'.charAt(1)      // → 'e'
'hello'.charCodeAt(1)  // → 101
```

```js
for (const ch of 'hi') {
  console.log(ch)    // → "h", then "i"
}
```

Strings are immutable: methods return new strings, never change the original.

See: [charAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt), [String.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at) _(developer.mozilla.org)_

### Searching

```js
'hello'.includes('ell')     // → true
'hello'.startsWith('he')    // → true
'hello'.endsWith('lo')      // → true
'hello'.indexOf('l')        // → 2
'hello'.lastIndexOf('l')    // → 3
'hello'.indexOf('z')        // → -1
```
{: data-line="6"}

Searches return `-1` (or `false`) when the substring is absent.

See: [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes), [startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), [indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) _(developer.mozilla.org)_

### Extracting

```js
'hamburger'.slice(3, 6)      // → "bur"
'hamburger'.slice(-3)        // → "ger"
'hamburger'.substring(6, 3)  // → "bur"  (args swapped)
'hamburger'.substr(3, 3)     // → "bur"  (deprecated)
```

`slice()` takes negative indexes; `substring()` clamps them to `0`.

See: [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice), [substring()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring), [substr()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) _(developer.mozilla.org)_

## Operations

### Transforming

```js
'Hi'.toUpperCase()        // → "HI"
'Hi'.toLowerCase()        // → "hi"
'  pad  '.trim()          // → "pad"
'  pad  '.trimStart()     // → "pad  "
'  pad  '.trimEnd()       // → "  pad"
'ab'.repeat(3)            // → "ababab"
'5'.padStart(3, '0')      // → "005"
'5'.padEnd(3, '0')        // → "500"
```
{: data-line="7,8"}

```js
'e\u0301'.normalize('NFC')   // → "é" (one code point)
```

See: [toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), [trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim), [padStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) _(developer.mozilla.org)_

### Replacing

```js
'a-b-c'.replace('-', '+')      // → "a+b-c"
'a-b-c'.replaceAll('-', '+')   // → "a+b+c"
'a-b-c'.replaceAll(/-/g, '+')  // → "a+b+c"
'm-d'.replace(/(\w+)/, '[$1]') // → "[m]-d"
```

`replace()` changes the first match only; a regex given to `replaceAll()` must
have the `g` flag.

See: [replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [replaceAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) _(developer.mozilla.org)_

### Splitting and joining

```js
'a,b,c'.split(',')     // → ["a", "b", "c"]
'foo'.concat('bar')    // → "foobar"
['a', 'b'].join('-')   // → "a-b"
```

```js
'\u{1F600}'.split('').length  // → 2  (UTF-16 units)
[...'\u{1F600}'].length       // → 1  (code points)
```

`split('')` cuts code units, so surrogate pairs break; `[...str]` keeps them.

See: [split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), [join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join), [concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) _(developer.mozilla.org)_

### Comparing

```js
'a' === 'a'                // → true (compares by value)
'a' < 'b'                  // → true (code units)
'a'.localeCompare('b')     // → -1
'B'.localeCompare('a')     // → 1
'ABC'.toLowerCase()        // → "abc"
```
{: data-line="3"}

`localeCompare()` returns a negative, zero, or positive number for sorting.

See: [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) _(developer.mozilla.org)_
