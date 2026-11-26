---
title: Qunit
subtitle: JavaScript test framework
category: JavaScript testing
intro: |
  A quick reference for the [QUnit](https://qunitjs.com/) testing library in JavaScript.
links:
  - title: QUnit documentation
    url: https://qunitjs.com/
tier: t3
last_verified_with: "QUnit 3.0.0."
updated: 2026-11-26
---

### Basics

```js
QUnit.module('a')
QUnit.test('ok', function (t) {
  /* ... */
})
```
<!-- {: data-highlight="QUnit.module; QUnit.test"} -->

See: [QUnit.test](https://qunitjs.com/api/QUnit/test/), [QUnit.module](https://qunitjs.com/api/QUnit/module/)

### Hooks

#### Test callbacks

```js
QUnit.testStart(function)
QUnit.testEnd(function)
```
<!-- {: data-highlight="QUnit.testStart; QUnit.testEnd"} -->

#### Module callbacks

```js
QUnit.moduleStart(function)
QUnit.moduleEnd(function)
```
<!-- {: data-highlight="QUnit.moduleStart; QUnit.moduleEnd"} -->

#### Run callbacks

```js
QUnit.begin(function)
QUnit.done(function)
```
<!-- {: data-highlight="QUnit.begin; QUnit.done"} -->

See: [Callbacks](https://qunitjs.com/api/callbacks/)

### Assertions

```js
t.equal(actual, expected)
t.deepEqual(actual, expected)
t.strictEqual(actual, expected)
t.propEqual(actual, expected)
t.notEqual(actual, expected)
t.expect(amount)
```
<!-- {: data-highlight="t.equal; t.deepEqual; t.propEqual"} -->

See: [Assertions](https://qunitjs.com/api/assert/)
