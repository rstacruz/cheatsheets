---
title: expect.js
---

```js
expect(x).toBe(y)
  .toBe(val)
  .toEqual(val)
  .toThrow(err)
  .toExist
  .toBeA(constructor)
  .toBeA('string')
  .toMatch(/expr/)
  .toBeLessThan(n)
  .toBeGreaterThan(n)
  .toInclude(val)
  .toExclude(val)
```

```js
spy = expect.spyOn(video, 'play')
expect(spy.calls.length).toEqual(1);
expect(spy.calls[0].context).toBe(video);
expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ]);
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith('some', 'args');
```

https://www.npmjs.com/package/expect
