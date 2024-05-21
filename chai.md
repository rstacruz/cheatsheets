---
title: Chai.js
category: JavaScript libraries
weight: -3
updated: 2018-06-25
version: chai v4.x
description: |
  expect(x).to.be.equal(y) 〉 assert.equal(x, y) 〉 .to.be.true 〉 jQuery, assertions, TDD and BDD, and other Chai examples.
---

### Assert

```js
const { assert } = require('chai')
```
{: .-setup}

```js
assert(val)
assert.fail(actual, expected)
assert.ok(val)                        // is truthy
assert.equal(actual, expected)        // compare with ==
assert.strictEqual(actual, expected)  // compare with ===
assert.deepEqual(actual, expected)    // deep equal check
```

```js
assert.isTrue(val)
assert.isFalse(val)
```

```js
assert.isNull(val)
assert.isNotNull(val)
assert.isUndefined(val)
assert.isDefined(val)
assert.isFunction(val)
assert.isObject(val)
assert.isArray(val)
assert.isString(val)
assert.isNumber(val)
assert.isBoolean(val)
```

```js
assert.typeOf(/tea/, 'regexp') // Object.prototype.toString()
assert.instanceOf(chai, Tea)
assert.include([ a,b,c ], a)
assert.match(val, /regexp/)
assert.property(obj, 'tea') // 'tea' in object
assert.deepProperty(obj, 'tea.green')
assert.propertyVal(person, 'name', 'John')
assert.deepPropertyVal(post, 'author.name', 'John')
```

```js
assert.lengthOf(object, 3)
assert.throws(function() { ... })
assert.throws(function() { ... }, /reference error/)
assert.doesNotThrow
```

```js
assert.operator(1, '<', 2)
assert.closeTo(actual, expected)
```

See: [Assert API](http://chaijs.com/api/assert/) _(chaijs.com)_

### BDD syntax

```js
const { expect } = require('chai')
```
{: .-setup}

```js
expect(object)
  .to.equal(expected)
  .to.eql(expected)        // deep equality
  .to.deep.equal(expected) // same as .eql
  .to.be.a('string')
  .to.include(val)
```

```js
  .be.ok(val)
  .be.true
  .be.false
  .to.exist
```

```js
  .to.be.null
  .to.be.undefined
  .to.be.empty
  .to.be.arguments
  .to.be.function
  .to.be.instanceOf
```

```js
  .to.be.gt(5)  // aka: .above .greaterThan
  .to.be.gte(5) // aka: .at.least
  .to.be.lt(5)  // aka: .below
```

```js
  .to.respondTo('bar')
  .to.satisfy((n) => n > 0)
```

```js
  .to.have.members([2, 3, 4])
  .to.have.keys(['foo'])
  .to.have.key('foo')
  .to.have.lengthOf(3)
```

```js
expect(() => { ··· })
  .to.throw(/not a function/)
```

See: [BDD](http://chaijs.com/api/bdd/) _(chaijs.com)_

### Should: chains

    .to .be .been .is .that .and .have .with .at .of .same

These don't do anything and can be chained.

### Should not

```js
expect(object).not.equal('x')
```

## Chai with jQuery

### Using chai-jquery

```js
global.jQuery = ···
chai.use(require('chai-jquery'))
```
{: .-setup}

```js
expect($body)
  .have.attr('foo')
  .have.prop('disabled')
  .have.css('background')
  .have.css('background-color', '#ffffff')
  .have.data('foo')
```

```js
  .have.class('active')
  .have.id('id')
```

```js
  .have.html('<em>hi</em>')
  .have.text('hello')
  .have.value('2013')
```

### Continued

```js
expect($body)
```

```js
  .be.visible
  .be.hidden
```

```js
  .be.checked
  .be.selected
```

```js
  .be.enabled
  .be.disabled
```

```js
  .be.empty
  .to.exist
  .to.contain('text')
  .to.have('.selector')
```
