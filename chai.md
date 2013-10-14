---
title: Chai.js
layout: default
---

### Assert

    assert(val)
    assert.fail(actual, expected)
    assert.ok(val) // is truthy
    assert.equal(actual, expected) // 'compare with =='
    assert.strictEqual
    assert.deepEqual

    assert.isTrue
    assert.isFalse

    assert.isNull
    assert.isNotNull
    assert.isUndefined
    assert.isDefined
    assert.isFunction
    assert.isObject
    assert.isArray
    assert.isString
    assert.isNumber
    assert.isBoolean

    assert.typeOf(/tea/, 'regexp') // Object.prototype.toString()
    assert.instanceOf(chai, Tea)
    assert.include([ a,b,c ], a)
    assert.match(val, /regexp/)
    assert.property(obj, 'tea') // 'tea' in object
    assert.deepProperty(obj, 'tea.green')
    assert.propertyVal(person, 'name', 'John')
    assert.deepPropertyVal(post, 'author.name', 'John')

    assert.lengthOf(object, 3)
    assert.throws(function() { ... })
    assert.throws(function() { ... }, /reference error/)
    assert.doesNotThrow

    assert.operator(1, '<', 2)
    assert.closeTo(actual, expected)

### Should: chains

    .to .be .been .is .that .and .have .with .at .of .same

### Should not

    expect(object).not.equal('x')

### Expectations

    expect(object)
      .equal(expected)
      .eql // deepequal
      .deep.equal(expected)
      .be.a('string')
      .include(val)

      .be.ok(val)
      .be.true
      .be.false

      .be.null
      .be.undefined
      .be.empty
      .be.arguments
      .be.function

      .exist
      expect(10).above(5)


### References

 * http://chaijs.com/api/assert/




