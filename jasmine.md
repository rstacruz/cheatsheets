---
title: Jasmine
category: JavaScript libraries
layout: 2017/sheet
weight: -1
---

## Tests

### Writing tests

```js
describe('A suite', () => {
  it('works', () => {
    expect(true).toBe(true)
  })
})
```

Note: This cheatsheet may be a little outdated. Also see the [Jest cheatsheet](./jest). Jest uses Jasmine, and therefore has similar API.

### Expectations

```js
expect(true).toBe(true)
expect(true).not.toBe(true)
```

```js
expect(a).toEqual(bar)
```

```js
expect(message).toMatch(/bar/)
expect(message).toMatch('bar')
```

```js
expect(a.foo).toBeDefined()
expect(a.foo).toBeUndefined()
expect(a.foo).toBeNull()
```

```js
expect(a.foo).toBeTruthy()
expect(a.foo).toBeFalsy()
```

```js
expect(message).toContain('hello')
```

```js
expect(pi).toBeGreaterThan(3)
expect(pi).toBeLessThan(4)
expect(pi).toBeCloseTo(3.1415, 0.1)
```

```js
expect(func).toThrow()
```

### Hooks

```js
beforeEach(() => {
  ···
})
```

```js
afterEach(() => {
  ···
})
```

### Pending

```js
xit('this is a pending test', () => {
  ···
})
```

```js
xdescribe('this is a pending block', () => {
  ···
})
```

### Spies

```js
spyOn(foo, 'setBar')
spyOn(foo, 'setBar').andReturn(123)
spyOn(foo, 'getBar').andCallFake(function() { return 1001; })
foo.setBar(123)
```

```js
expect(foo.setBar).toHaveBeenCalled()
expect(foo.setBar).toHaveBeenCalledWith(123)
expect(foo.setBar.calls.length).toEqual(2)
expect(foo.setBar.calls[0].args[0]).toEqual(123)
```

### Creating spies

```js
stub = jasmine.createSpy('stub')
stub('hello')
```

```js
expect(stub.identity).toEqual('stub')
expect(stub).toHaveBeenCalled()
```

### Async

```js
test('works with promises', () => {
  return new Promise((resolve, reject) => {
    ···
  })
})
```

Make your test return a promise.

### HTML runner

```js
var jasmineEnv = jasmine.getEnv()
jasmineEnv.updateInterval = 250

var htmlReporter = new jasmine.HtmlReporter()
jasmineEnv.addReporter(htmlReporter)

$(function() { jasmineEnv.execute() })
```

Jasmine jQuery
--------------

### Expectations

```js
expect($('#id')).toBe('div')
expect($('input[type=checkbox]')).toBeChecked()
expect($('input[type=checkbox]')).toBeDisabled()
expect($('input[type=checkbox]')).toBeFocused()
expect($('#menu ul')).toBeEmpty()
```

```js
expect($('#toolbar')).toBeHidden()
expect($('#toolbar')).toBeVisible()
```

```js
expect($('#popup')).toHaveCss({ margin: "10px" })
expect($('option')).toBeSelected()
```

```js
expect($('.foo')).toExist()
```

```js
expect($('a')).toHaveAttr('rel')
expect($('a')).toHaveAttr('rel', 'nofollow')
```

```js
expect($('a')).toHaveClass('rel')
expect($('a')).toHaveId('home')
```

```js
expect($('a')).toHaveHtml('<span></span>')
expect($('a')).toContainHtml('<span></span>')
expect($('a')).toHaveText('hi')
```

```js
expect($form).toHandle('submit') // event
expect($form).toHandleWith('submit', onSumbit)
```

See: [jasmine-jquery](https://github.com/velesin/jasmine-jquery)

### Event spies

```js
spyOnEvent($('#some_element'), 'click')
$('#some_element').click()
expect('click').toHaveBeenPreventedOn($('#some_element'))
expect('click').toHaveBeenTriggeredOn($('#some_element'))
```

## References
{: .-one-column}

* Also see the [Jest cheatsheet](./jest). Jest uses Jasmine, and therefore has similar API.
* <https://jasmine.github.io>
