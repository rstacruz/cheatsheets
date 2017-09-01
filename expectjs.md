---
title: expect.js
category: JavaScript libraries
layout: 2017/sheet
---

### Expectations

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
spy = expect.spyOn(video, 'play')
```

```js
spy = expect.spyOn(...)
  .andCallThrough() /* pass through */
  .andCall(fn)
  .andThrow(exception)
  .andReturn(value)
```

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
