---
title: Jest
subtitle: JavaScript test runner
category: JavaScript testing
updated: 2020-06-17
weight: -3
intro: |
  A quick overview to [Jest](https://jestjs.io/), a test framework for Node.js.
links:
  - title: Jest documentation
    url: https://jestjs.io/docs/getting-started
---

Testing
-------

<!-- {: .-three-column} -->

### Quick start

<!-- {: .-prime} -->

```bash
npm install --save-dev jest babel-jest
```

<!-- {: data-highlight="--save-dev"} -->

```js
/* Add to package.json */
"scripts": {
  "test": "jest"
}
```

### Optional Flags
```
**--coverage** : See a summary of test coverage.
**--detectOpenHandles**: See a summary of open handles that stopped jest from exiting cleanly.
**--runInBand**: Run all tests one after the other.
npm test + [flag]
```

```bash
# Run your tests
npm test -- --watch

# Run a specific test block
npm test -- -t 'test block string'

# Run a specific test file
npm test testfile.spec.js
```

See: [Getting started](https://jestjs.io/docs/getting-started)

### Writing tests

```js
describe('My work', () => {
  test('works', () => {
    expect(2).toEqual(2)
  })
})
```

See: [describe()](https://jestjs.io/docs/api#describename-fn), [test()](https://jestjs.io/docs/api#testname-fn-timeout), [expect()](https://jestjs.io/docs/expect#expectvalue)

### BDD syntax

```js
describe('My work', () => {
  it('works', () => {
    ···
  })
})
```

`it` is an alias for `test`.
See: [test()](https://jestjs.io/docs/api#testname-fn-timeout)

### Setup

```js
beforeEach(() => { ... })
afterEach(() => { ... })
```

```js
beforeAll(() => { ... })
afterAll(() => { ... })
```

See: [afterAll() and more](https://jestjs.io/docs/api#afterallfn-timeout)

### Focusing tests

```js
describe.only(···)
it.only(···) // alias: fit()
```

See: [test.only](https://jestjs.io/docs/api#testonlyname-fn)


### Skipping tests

```js
describe.skip(···)
it.skip(···) // alias: xit()
```

See: [test.skip](https://jestjs.io/docs/api#testskipname-fn)


### Optional flags

| Flag                  | Description                              |
| --------------------- | ---------------------------------------- |
| `--coverage`          | See a summary of test coverage           |
| `--detectOpenHandles` | See a summary of ports that didn't close |
| `--runInBand`         | Run all tests one after the other        |

Expect
------

<!-- {: .-three-column} -->

### Basic expectations

```js
expect(value)
  .not
  .toBe(value)
  .toEqual(value)
  .toBeTruthy()
```

Note that `toEqual` is a deep equality check.
See: [expect()](https://jestjs.io/docs/expect#expectvalue)

### Snapshots

```js
expect(value)
  .toMatchSnapshot()
  .toMatchInlineSnapshot()
```

Note that `toMatchInlineSnapshot()` requires Prettier to be set up for the project.
See: [Inline snapshots](https://jestjs.io/docs/snapshot-testing#inline-snapshots)

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

<!-- {: data-highlight="=>"} -->

```js
test('works with async/await', async () => {
  const hello = await foo()
  ···
})
```

<!-- {: data-highlight="hello"} -->

Return promises, or use async/await.
See: [Async tutorial](https://jestjs.io/docs/tutorial-async)

### Snapshots

```jsx
it('works', () => {
  const output = something()
  expect(output).toMatchSnapshot()
})
```

<!-- {: data-highlight="toMatchSnapshot"} -->

First run creates a snapshot. Subsequent runs match the saved snapshot.
See: [Snapshot testing](https://jestjs.io/docs/snapshot-testing)

### React test renderer

```jsx
import renderer from 'react-test-renderer'
```

<!-- {: .-setup} -->

```jsx
it('works', () => {
  const tree = renderer.create(
    <Link page="https://www.facebook.com">Facebook</Link>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
```

<!-- {: data-highlight="renderer"} -->

React's test renderer can be used for Jest snapshots.
See: [Snapshot test](https://jestjs.io/docs/tutorial-react-native#snapshot-test)

### Timers

```js
jest.useFakeTimers()
```

```js
it('works', () => {
  jest.runOnlyPendingTimers()
  jest.advanceTimersByTime(1000)
  jest.runAllTimers()
})
```

See: [Timer Mocks](https://jestjs.io/docs/timer-mocks)

## Mock functions

### Mock functions

```js
const fn = jest.fn()
```

```js
const fn = jest.fn(n => n * n)
```

See: [Mock functions](https://jestjs.io/docs/mock-function-api#jestfnimplementation)

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

<!-- {: data-highlight="instances"} -->

See: [.mock property](https://jestjs.io/docs/mock-function-api#mockfnmockinstances)

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

<!-- {: data-highlight="calls"} -->

See: [.mock property](https://jestjs.io/docs/mock-function-api#mockfnmockcalls)

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

<!-- {: data-highlight="mockImplementationOnce"} -->

```js
fn()    // → 1
fn()    // → 2
```

## References

<!-- {: .-one-column} -->

- <https://jestjs.io/>

<!-- {: .-also-see} -->
