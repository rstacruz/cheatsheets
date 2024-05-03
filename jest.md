---
title: Jest
category: JavaScript libraries
updated: 2020-06-17
weight: -3
tags: [Featurable]
intro: |
  A quick overview to [Jest](https://facebook.github.io/jest/), a test framework for Node.js. This guide targets Jest v20.
---

Testing
-------
{: .-three-column}

### Quick start
{: .-prime}

```bash
npm install --save-dev jest babel-jest
```
{: data-line="1"}

```js
/* Add to package.json */
"scripts": {
  "test": "jest"
}
```

```bash
# Run your tests
npm test -- --watch
```

See: [Getting started](https://facebook.github.io/jest/docs/en/getting-started.html)

### Writing tests

```js
describe('My work', () => {
  test('works', () => {
    expect(2).toEqual(2)
  })
})
```

See: [describe()](https://facebook.github.io/jest/docs/en/api.html#describename-fn), [test()](https://facebook.github.io/jest/docs/en/api.html#testname-fn), [expect()](https://facebook.github.io/jest/docs/en/expect.html#content)

### BDD syntax

```js
describe('My work', () => {
  it('works', () => {
    ···
  })
})
```

`it` is an alias for `test`.
See: [test()](https://facebook.github.io/jest/docs/en/api.html#testname-fn)

### Setup

```js
beforeEach(() => { ... })
afterEach(() => { ... })
```

```js
beforeAll(() => { ... })
afterAll(() => { ... })
```

See: [afterAll() and more](https://facebook.github.io/jest/docs/en/api.html#afterallfn)

### Focusing tests

```js
describe.only(···)
it.only(···) // alias: fit()
```

See: [test.only](https://facebook.github.io/jest/docs/en/api.html#testonlyname-fn)


### Skipping tests

```js
describe.skip(···)
it.skip(···) // alias: xit()
```

See: [test.skip](https://facebook.github.io/jest/docs/en/api.html#testskipname-fn)


### Optional flags

| Flag                  | Description                              |
| --------------------- | ---------------------------------------- |
| `--coverage`          | See a summary of test coverage           |
| `--detectOpenHandles` | See a summary of ports that didn't close |
| `--runInBand`         | Run all tests one after the other        |

Expect
------
{: .-three-column}

### Basic expectations

```js
expect(value)
  .not
  .toBe(value)
  .toEqual(value)
  .toBeTruthy()
```

Note that `toEqual` is a deep equality check.
See: [expect()](https://facebook.github.io/jest/docs/en/expect.html#expectvalue)

### Snapshots

```js
expect(value)
  .toMatchSnapshot()
  .toMatchInlineSnapshot()
```

Note that `toMatchInlineSnapshot()` requires Prettier to be set up for the project.
See: [Inline snapshots](https://jestjs.io/docs/en/snapshot-testing#inline-snapshots)

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

### Asynchronous tests

```js
test('works with promises', () => {
  return new Promise((resolve, reject) => {
    ···
  })
})
```
{: data-line="2"}

```js
test('works with async/await', async () => {
  const hello = await foo()
  ···
})
```
{: data-line="2"}

Return promises, or use async/await.
See: [Async tutorial](https://facebook.github.io/jest/docs/en/tutorial-async.html)

### Snapshots

```jsx
it('works', () => {
  const output = something()
  expect(output).toMatchSnapshot()
})
```
{: data-line="3"}

First run creates a snapshot. Subsequent runs match the saved snapshot.
See: [Snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html)

### React test renderer

```jsx
import renderer from 'react-test-renderer'
```
{: .-setup}

```jsx
it('works', () => {
  const tree = renderer.create(
    <Link page="https://www.facebook.com">Facebook</Link>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
```
{: data-line="2,3,4"}

React's test renderer can be used for Jest snapshots.
See: [Snapshot test](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#snapshot-test)

### Timers

```js
jest.useFakeTimers()
```

```js
it('works', () => {
  jest.runOnlyPendingTimers()
  jest.runTimersToTime(1000)
  jest.runAllTimers()
})
```

See: [Timer Mocks](https://facebook.github.io/jest/docs/en/timer-mocks.html)

## Mock functions

### Mock functions

```js
const fn = jest.fn()
```

```js
const fn = jest.fn(n => n * n)
```

See: [Mock functions](https://facebook.github.io/jest/docs/en/mock-functions.html#using-a-mock-function)

### Assertions

```js
expect(fn)
  .toHaveBeenCalled()
  .toHaveBeenCalledTimes(number)
  .toHaveBeenCalledWith(arg1, arg2, ...)
  .toHaveBeenLastCalledWith(arg1, arg2, ...)
```

```js
expect(fn)
  .toHaveBeenCalledWith(expect.anything())
  .toHaveBeenCalledWith(expect.any(constructor))
  .toHaveBeenCalledWith(expect.arrayContaining([ values ]))
  .toHaveBeenCalledWith(expect.objectContaining({ props }))
  .toHaveBeenCalledWith(expect.stringContaining(string))
  .toHaveBeenCalledWith(expect.stringMatching(regexp))
```

### Instances

```js
const Fn = jest.fn()

a = new Fn()
b = new Fn()
```

```js
Fn.mock.instances
// → [a, b]
```
{: data-line="1"}

See: [.mock property](https://facebook.github.io/jest/docs/en/mock-functions.html#mock-property)

### Calls

```js
const fn = jest.fn()
fn(123)
fn(456)
```

```js
fn.mock.calls.length   // → 2
fn.mock.calls[0][0]    // → 123
fn.mock.calls[1][0]    // → 456
```
{: data-line="1,2,3"}

See: [.mock property](https://facebook.github.io/jest/docs/en/mock-functions.html#mock-property)

### Return values

```js
const fn = jest.fn(() => 'hello')
```

#### or:

```js
jest.fn().mockReturnValue('hello')
jest.fn().mockReturnValueOnce('hello')
```

### Mock implementations

```js
const fn = jest.fn()
  .mockImplementationOnce(() => 1)
  .mockImplementationOnce(() => 2)
```
{: data-line="2,3"}

```js
fn()    // → 1
fn()    // → 2
```

## References
{: .-one-column}

- <https://facebook.github.io/jest/>
{: .-also-see}
