---
title: Jest
category: JavaScript libraries
layout: 2017/sheet
updated: 20170826
weight: -3
---

Testing
-------
{: .-three-column}

### Quick start
{: .-prime}

```bash
npm install --save-dev jest babel-jest
```

```js
/* Add to package.json */
"scripts": {
  "test": "jest"
}
```
{: .-setup}

```bash
# Run your tests
npm test -- --watch
```
{: .-setup}

See: [Getting started](http://facebook.github.io/jest/docs/en/getting-started.html)

### Writing tests

```js
describe('My work', () => {
  test('works', () => {
    expect(2).toEqual(2)
  })
})
```

### BDD syntax

```js
describe('My work', () => {
  it('works', () => {
    ···
  })
})
```

`it` is an alias for `test`.
See: [test()](http://facebook.github.io/jest/docs/en/api.html#testname-fn)

### Asynchronous tests

```js
test('works with promises', () => {
  return new Promise((resolve, reject) => {
    ···
  })
})
```

```js
test('works with async/await', async () => {
  const hello = await foo()
  ···
})
```

Return promises, or use async/await.
See: [Async tutorial](http://facebook.github.io/jest/docs/en/tutorial-async.html)

### Setup

```js
beforeEach(() => { ... })
afterEach(() => { ... })
```

```js
beforeAll(() => { ... })
afterAll(() => { ... })
```

See: [afterAll() and more](http://facebook.github.io/jest/docs/en/api.html#afterallfn)

### Focusing tests

```js
describe.only(···)
it.only(···) // alias: fit()
```

See: [test.only](http://facebook.github.io/jest/docs/en/api.html#testonlyname-fn)


### Skipping tests

```js
describe.skip(···)
it.skip(···) // alias: xit()
```

See: [test.skip](http://facebook.github.io/jest/docs/en/api.html#testskipname-fn)

Expect
------
{: .-three-column}

### Basic expectations

```js
expect(value)
  .not
  .toBe(value)
  .toEqual(value)
```

See: [expect()](http://facebook.github.io/jest/docs/en/expect.html#expectvalue)

### Snapshots

```js
expect(value)
  .toMatchSnapshot()
```

### Errors

```js
expect(value)
  .toThrow(error)
  .toThrowErrorMatchingSnapshot()
```

### Booleans

```js
expect(value)
  .toBeFalsy()
  .toBeNull()
  .toBeTruthy()
  .toBeUndefined()
  .toBeDefined()
```

### Numbers

```js
expect(value)
  .toBeCloseTo(number, numDigits)
  .toBeGreaterThan(number)
  .toBeGreaterThanOrEqual(number)
  .toBeLessThan(number)
  .toBeLessThanOrEqual(number)
```

### Objects

```js
expect(value)
  .toBeInstanceOf(Class)
  .toMatchObject(object)
  .toHaveProperty(keyPath, value)
```

### Objects

```js
expect(value)
  .toContain(item)
  .toContainEqual(item)
  .toHaveLength(number)
```

### Strings

```js
expect(value)
  .toMatch(regexpOrString)
```

### Others

```js
expect.extend(matchers)
expect.any(constructor)
expect.addSnapshotSerializer(serializer)

expect.assertions(1)
```

More features
-------------

### Snapshots

```jsx
const tree = renderer.create(
  <Link page="http://www.facebook.com">Facebook</Link>
).toJSON()
```

```jsx
// First run creates a snapshot; subsequent runs match it
expect(tree).toMatchSnapshot()
```

```bash
# To update snapshots
jest --updateSnapshot
```

### Mocks

```js
const fn = jest.fn()
const fn = jest.fn(n => n * n)
```

```js
expect(fn)
  // Functions
  .toHaveBeenCalled()
  .toHaveBeenCalledTimes(number)
  .toHaveBeenCalledWith(arg1, arg2, ...)
  .toHaveBeenLastCalledWith(arg1, arg2, ...)

  .toHaveBeenCalledWith(expect.anything())
  .toHaveBeenCalledWith(expect.any(constructor))
  .toHaveBeenCalledWith(expect.arrayContaining([ values ]))
  .toHaveBeenCalledWith(expect.objectContaining({ props }))
  .toHaveBeenCalledWith(expect.stringContaining(string))
  .toHaveBeenCalledWith(expect.stringMatching(regexp))
```

### Timers

```js
jest.useFakeTimers()

it('works', () => {
  jest.runOnlyPendingTimers()
  jest.runTimersToTime(1000)
  jest.runAllTimers()
})
```

See: [Timers](https://facebook.github.io/jest/docs/timer-mocks.html)

## References
{: .-one-column}

- Based on Jest v19.
- <http://facebook.github.io/jest/>
{: .-also-see}
