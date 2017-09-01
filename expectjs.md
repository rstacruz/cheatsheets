---
title: expect.js
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-09-02
weight: -1
---

### Using

```
npm install --save-dev expect
```
{: .-setup}

```js
// using ES6 modules
import expect, { createSpy, spyOn, isSpy } from 'expect'
```

```js
// using CommonJS modules
var expect = require('expect')
var createSpy = expect.createSpy
var spyOn = expect.spyOn
var isSpy = expect.isSpy
```

Expect is a library for assertions in tests.
See: [mjackson/expect](https://github.com/mjackson/expect)

### Assertions

```js
expect(x).toBe(y)
  .toBe(val)
  .toEqual(val)
  .toThrow(err)
  .toExist()          // aka: toBeTruthy()
  .toNotExist()       // aka: toBeFalsy()
  .toBeA(constructor)
  .toBeA('string')
  .toMatch(/expr/)
  .toBeLessThan(n)
  .toBeGreaterThan(n)
  .toBeLessThanOrEqualTo(n)
  .toBeGreaterThanOrEqualTo(n)
  .toInclude(val)     // aka: toContain(val)
  .toExclude(val)
  .toIncludeKey(key)
  .toExcludeKey(key)
```

Also: `toNotBe`, `toNotEqual`, etc for negatives.

### Chaining assertions

```js
expect(3.14)
  .toExist()
  .toBeLessThan(4)
  .toBeGreaterThan(3)
```

Assertions can be chained.

### Spies

```js
const video = {
  play: function () { ··· }
}
```
{: .-setup}

```js
spy = expect.spyOn(video, 'play')
```

```js
spy = expect.spyOn(···)
  .andCallThrough()      // pass through
  .andCall(fn)
  .andThrow(exception)
  .andReturn(value)
```

### Assertions on spies

```js
expect(spy.calls.length).toEqual(1)
expect(spy.calls[0].context).toBe(video)
expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
expect(spy.getLastCall().arguments).toEqual(...)
```

```js
expect(spy).toHaveBeenCalled()
expect(spy).toHaveBeenCalledWith('some', 'args')
```

### References

- <https://www.npmjs.com/package/expect>
- <https://github.com/mjackson/expect>
