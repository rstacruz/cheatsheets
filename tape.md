---
title: Tape
subtitle: TAP test harness
logo: { set: icon-park-outline, name: test-tube }
category: JavaScript testing
last_verified_with: "tape 5.11.0, Node.js 26.13.1."
updated: 2026-11-24
tier: t3
intro: |
  TAP test harness for Node.js and browsers, covering tests, assertions, and timeouts.
links:
  - title: Tape repository and documentation
    url: https://github.com/tape-testing/tape
  - title: Tape methods reference
    url: https://github.com/tape-testing/tape#methods
  - title: TAP specification
    url: https://testanything.org/
---

## Tests

### Basic test

```js
const test = require('tape')

test('push adds an item', (t) => {
  t.plan(1)

  const list = []
  list.push('a')
  t.deepEqual(list, ['a'])
})
```

`t.plan(n)` ends the test after the nth assertion; otherwise call `t.end()`.

See: [test()](https://github.com/tape-testing/tape#testname-opts-cb)

### Async tests

```js
const test = require('tape')
const { readFile } = require('node:fs/promises')

test('reads a file', async (t) => {
  const body = await readFile('x.txt', 'utf8')
  t.match(body, /hello/)
})
```

Returning a promise ends the test; do not also call `t.end()`.

See: [Async tests](https://github.com/tape-testing/tape#testname-opts-cb)

### Skip and only

```js
test.skip('not ready', (t) => {
  t.end()
})

test.only('focused', (t) => {
  t.end()
})
```

`--no-only` fails the run when `test.only` is left in.

See: [--no-only](https://github.com/tape-testing/tape#--no-only)

## Assertions

### Values

```js
t.ok(list.length, 'list is not empty')
t.notOk(flag, 'flag is off')
t.equal(count, 3, 'count is 3')
t.notEqual(count, 4)
t.error(err, 'no error')
```

`equal` compares with `Object.is`; `error` fails when `err` is truthy.

See: [Assertion methods](https://github.com/tape-testing/tape#methods)

### Deep comparison

```js
t.deepEqual(actual, expected, 'deeply equal')
t.notDeepEqual(actual, expected)
t.looseEqual(actual, expected, 'loosely equal')
t.deepLooseEqual(actual, expected)
```

`deepEqual` compares leaves with `===`; `deepLooseEqual` uses `==`.

See: [t.deepEqual](https://github.com/tape-testing/tape#tdeepequalactual-expected-msg)

### Throws

```js
t.throws(fn, /FooError/)
t.throws(fn, FooError)
t.throws(fn, { code: 'ENOENT' })
t.doesNotThrow(fn)
```

The second argument can be a RegExp, constructor, or validation object.

See: [t.throws](https://github.com/tape-testing/tape#tthrowsfn-expected-msg)

### Messages and skips

```js
t.pass('ok')
t.fail('not ok')
t.comment('note in the TAP output')
t.skip('not ready yet')
```

See: [t.pass and friends](https://github.com/tape-testing/tape#tpassmsg)

### Timeouts

```js
t.timeoutAfter(2000)
```

Fails the test if it has not ended within the given milliseconds.

See: [t.timeoutAfter](https://github.com/tape-testing/tape#ttimeoutafterms)
