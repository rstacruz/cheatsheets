---
title: Qunit
layout: default
---

    QUnit.module('a');
    QUnit.test('ok', function (t) { ... });
    QUnit.moduleStart(function)
    QUnit.moduleEnd(function)

### Assertions

    t.equal(actual, expected)
    t.deepEqual(actual, expected)
    t.strictEqual(actual, expected)
    t.propEqual(actual, expected)

    t.notEqual

    t.expect(amount)

### Setup and teardown

    QUnit.begin(function (details) {
    });

    QUnit.done(function (details) {
    });
