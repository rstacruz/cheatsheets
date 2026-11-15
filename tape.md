---
title: Tape
category: JavaScript libraries
---

### Example

```js
test('things', (t) => {
  t.plan(1)

  t.equal('actual', 'expected')
  t.equal('actual', 'expected', 'should be equal') // messages are optional

  t.end(err)
  t.fail('msg')
  t.pass('msg')
  t.timeoutAfter(2000)
  t.skip('msg')

  t.ok(value, 'is truthy')
  t.notOk(value, 'is falsy')
  t.error(err, 'is falsy (print err.message)')

  t.equal(actual, expected, 'is equal')
  t.notEqual

  t.deepEqual(actual, expected, 'is equal (use node's deepEqual)')
  t.notDeepEqual

  t.looseEqual(actual, expected, 'is equal (use node's deepEqual with ==)')
  t.notLooseEqual

  t.throws(fn, /FooError/)
  t.throws(fn, FooError /* class */)
  t.doesNotThrow

  t.comment('message')
})
```

```js
test.only((t) => { ... })
```
