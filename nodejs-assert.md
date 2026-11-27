---
title: assert
subtitle: Assertion testing module
logo: { src: /assets/logos/nodejs.svg }
category: Node.js
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-24
tier: t3
intro: |
  Assertion methods for equality, matching, throwing, and rejecting errors, plus strict mode.
links:
  - title: Node.js assert documentation
    url: https://nodejs.org/api/assert.html
  - title: Node.js strict assertion mode
    url: https://nodejs.org/api/assert.html#strict-assertion-mode
---

## Assertions

### Strict equality

```js
const assert = require('node:assert')

assert.strictEqual(id, 7)
assert.notStrictEqual(id, '7')
assert.deepStrictEqual(user, { id: 7 })
```

`strictEqual` compares with `Object.is`; `deepStrictEqual` also checks prototypes.

See: [assert.strictEqual](https://nodejs.org/api/assert.html#assertstrictequalactual-expected-message)

### Strict mode

```js
const assert = require('node:assert/strict')

assert.equal(id, 7)               // strictEqual
assert.deepEqual(user, { id: 7 }) // deepStrictEqual
```

Importing `node:assert/strict` makes the loose methods behave strictly.

See: [Strict assertion mode](https://nodejs.org/api/assert.html#strict-assertion-mode)

### Truthiness and matching

```js
assert.ok(list.length)
assert.match(version, /^26\./)
assert.doesNotMatch(version, /-rc/)
assert.ifError(err)
```

See: [assert.match](https://nodejs.org/api/assert.html#assertmatchstring-regexp-message)

### Throws and rejects

```js
assert.throws(() => JSON.parse(''), SyntaxError)
assert.rejects(readFile('missing.txt'), /ENOENT/)
```

A constructor, RegExp, or validation object describes the expected error.

See: [assert.throws](https://nodejs.org/api/assert.html#assertthrowsfn-error-message)

### Legacy comparisons

```js
const assert = require('node:assert')

assert.equal('1', 1)         // passes, uses ==
assert.deepEqual([1], ['1']) // passes, uses ==
```

The legacy methods are loose only when imported from `node:assert`.

See: [assert.equal](https://nodejs.org/api/assert.html#assertequalactual-expected-message)

## References

- [Node.js assert docs](https://nodejs.org/api/assert.html)
