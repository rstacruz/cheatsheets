---
title: Vows
category: JavaScript libraries
---

### About vows

  * [Vowsjs.org](http://vowsjs.org/)

### CoffeeScript usage

    vows = require "vows"
    assert = require "assert"

    vows
      .describe('My tests')
      .addBatch
        'context':
          topic: ->
            100
          'should work': (number) ->
            assert.equal number, 100

      .export(module)

### Running

    vows test/*-test.* --spec

### Assertions

    assert.equal a, b
    assert.notEqual a, b
    assert.strictEqual a, b

    assert.isNaN(number)
    assert.instanceOf(object, klass)
    assert.isUndefined(object)
    assert.isFunction(func)
    assert.isNull(object)
    assert.isNotZero(object)
    assert.isObject(object)
    assert.isString(object)

### Async

    .addBatch
      topic: ->
        doStuff()
        @callback 2
      'check things': (n) ->
        assert.equal 2, n
