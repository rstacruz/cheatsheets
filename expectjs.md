---
title: expect.js
category: JavaScript libraries
---

```js
expect(x).toBe(y)
  .toBe(val)
  .toEqual(val)
  .toThrow(err)
  .toExist /* aka: toBeTruthy */
  .toNotExist /* aka: toBeFalsy */
  .toBeA(constructor)
  .toBeA('string')
  .toMatch(/expr/)
  .toBeLessThan(n)
  .toBeGreaterThan(n)
  .toInclude(val) /* aka: toContain */
  .toExclude(val)

/* also: toNotBe, toNotEqual, etc */
```

### Spies

```js
spy = expect.spyOn(video, 'play')

spy = expect.spyOn(...)
  .andCallThrough() /* pass through */
  .andCall(fn)
  .andThrow(exception)
  .andReturn(value)

expect(spy.calls.length).toEqual(1)
expect(spy.calls[0].context).toBe(video)
expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
expect(spy.getLastCall().arguments).toEqual(...)

expect(spy).toHaveBeenCalled()
expect(spy).toHaveBeenCalledWith('some', 'args')
```

https://www.npmjs.com/package/expect
