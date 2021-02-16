---
title: Qunit
category: JavaScript libraries
layout: 2017/sheet
intro: |
  A quick reference for the [QUnit](https://yarnpkg.com/package/qunit) testing library in JavaScript.
---

```js
QUnit.module('a')
QUnit.test('ok', function (t) {
  /* ... */
})
```

### Hooks

#### Each test

```js
// each test
QUnit.testStart(function)
QUnit.testEnd(function)
```

```js
// each module
QUnit.moduleStart(function)
QUnit.moduleEnd(function)
```

```js
// all
QUnit.begin(function)
QUnit.done(function)
```

### Assertions

```js
t.equal(actual, expected)
t.deepEqual(actual, expected)
t.strictEqual(actual, expected)
t.propEqual(actual, expected)
t.notEqual(actual, expected)
t.expect(amount)
```
