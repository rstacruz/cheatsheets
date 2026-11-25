---
title: Jest
subtitle: JavaScript test runner
category: JavaScript testing
updated: 2026-11-25
last_verified_with: "Jest 30.5.2."
tier: t3
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

#### Install

```bash
npm install --save-dev jest babel-jest
```

<!-- {: data-highlight="--save-dev"} -->

#### Add a script

```js
/* Add to package.json */
"scripts": {
  "test": "jest"
}
```
<!-- {: data-highlight='"test": "jest"'} -->

#### Run tests

```bash
# Run your tests
npm test -- --watch
```
<!-- {: data-highlight="--watch"} -->

See: [Getting started](https://jestjs.io/docs/getting-started)

### Writing tests

```js
describe('My work', () => {
  test('works', () => {
    expect(2).toEqual(2)
  })
})
```
<!-- {: data-highlight="toEqual"} -->

See: [describe()](https://jestjs.io/docs/api#describename-fn), [test()](https://jestjs.io/docs/api#testname-fn-timeout), [expect()](https://jestjs.io/docs/expect#expectvalue)

### BDD syntax

```js
describe('My work', () => {
  it('works', () => {
    ···
  })
})
```
<!-- {: data-highlight="it('works'"} -->

`it` is an alias for `test`.
See: [test()](https://jestjs.io/docs/api#testname-fn-timeout)

### Setup

#### Per test

```js
beforeEach(() => { ... })
afterEach(() => { ... })
```
<!-- {: data-highlight="beforeEach"} -->

#### Once

```js
beforeAll(() => { ... })
afterAll(() => { ... })
```
<!-- {: data-highlight="beforeAll"} -->

See: [afterAll() and more](https://jestjs.io/docs/api#afterallfn-timeout)

### Focusing tests

```js
describe.only(···)
it.only(···) // alias: fit()
```
<!-- {: data-highlight="describe.only"} -->

See: [test.only](https://jestjs.io/docs/api#testonlyname-fn-timeout)


### Skipping tests

```js
describe.skip(···)
it.skip(···) // alias: xit()
```
<!-- {: data-highlight="describe.skip"} -->

See: [test.skip](https://jestjs.io/docs/api#testskipname-fn)


### Optional flags

| Flag                  | Description                              |
| --------------------- | ---------------------------------------- |
| `--coverage`          | See a summary of test coverage           |
| `--detectOpenHandles` | See a summary of ports that didn't close |
| `--runInBand`         | Run all tests one after the other        |

See: [CLI options](https://jestjs.io/docs/cli#options)

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
<!-- {: data-highlight=".toBe"} -->

Note that `toEqual` is a deep equality check.
See: [expect()](https://jestjs.io/docs/expect#expectvalue)

### Snapshots

```js
expect(value)
  .toMatchSnapshot()
  .toMatchInlineSnapshot()
```
<!-- {: data-highlight="toMatchInlineSnapshot"} -->

Note that `toMatchInlineSnapshot()` requires Prettier to be set up for the project.
See: [Inline snapshots](https://jestjs.io/docs/snapshot-testing#inline-snapshots)

### Errors

```js
expect(value)
  .toThrow(error)
  .toThrowErrorMatchingSnapshot()
```
<!-- {: data-highlight=".toThrow"} -->

See: [toThrow()](https://jestjs.io/docs/expect#tothrowerror), [toThrowErrorMatchingSnapshot()](https://jestjs.io/docs/expect#tothrowerrormatchingsnapshothint)

### Booleans

```js
expect(value)
  .toBeFalsy()
  .toBeNull()
  .toBeTruthy()
  .toBeUndefined()
  .toBeDefined()
```
<!-- {: data-highlight=".toBeFalsy"} -->

See: [toBeFalsy()](https://jestjs.io/docs/expect#tobefalsy), [toBeNull()](https://jestjs.io/docs/expect#tobenull), [toBeTruthy()](https://jestjs.io/docs/expect#tobetruthy)

### Numbers

```js
expect(value)
  .toBeCloseTo(number, numDigits)
  .toBeGreaterThan(number)
  .toBeGreaterThanOrEqual(number)
  .toBeLessThan(number)
  .toBeLessThanOrEqual(number)
```
<!-- {: data-highlight=".toBeCloseTo"} -->

See: [toBeCloseTo()](https://jestjs.io/docs/expect#tobeclosetonumber-numdigits), [toBeGreaterThan()](https://jestjs.io/docs/expect#tobegreaterthannumber--bigint)

### Objects

```js
expect(value)
  .toBeInstanceOf(Class)
  .toMatchObject(object)
  .toHaveProperty(keyPath, value)
```
<!-- {: data-highlight=".toHaveProperty"} -->

See: [toHaveProperty()](https://jestjs.io/docs/expect#tohavepropertykeypath-value), [toMatchObject()](https://jestjs.io/docs/expect#tomatchobjectobject)

### Arrays

```js
expect(value)
  .toContain(item)
  .toContainEqual(item)
  .toHaveLength(number)
```
<!-- {: data-highlight=".toContainEqual"} -->

See: [toContain()](https://jestjs.io/docs/expect#tocontainitem), [toHaveLength()](https://jestjs.io/docs/expect#tohavelengthnumber)

### Strings

```js
expect(value)
  .toMatch(regexpOrString)
```
<!-- {: data-highlight=".toMatch"} -->

See: [toMatch()](https://jestjs.io/docs/expect#tomatchregexp--string)

### Others

```js
expect.extend(matchers)
expect.any(constructor)
expect.addSnapshotSerializer(serializer)

expect.assertions(1)
```
<!-- {: data-highlight="expect.extend"} -->

See: [expect.extend()](https://jestjs.io/docs/expect#expectextendmatchers), [expect.any()](https://jestjs.io/docs/expect#expectanyconstructor)

More features
-------------

### Asynchronous tests

#### Return a promise

```js
test('works with promises', () => {
  return new Promise((resolve, reject) => {
    ···
  })
})
```

<!-- {: data-highlight="=>"} -->

#### async/await

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

#### Import the renderer

```jsx
import renderer from 'react-test-renderer'
```
<!-- {: data-highlight="react-test-renderer"} -->

#### Snapshot a tree

```jsx
it('works', () => {
  const tree = renderer.create(
    <Link page="https://www.facebook.com">Facebook</Link>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
```

<!-- {: data-highlight="renderer.create"} -->

React's test renderer can be used for Jest snapshots.
See: [Snapshot test](https://jestjs.io/docs/tutorial-react-native#snapshot-test)

### Timers

#### Enable fake timers

```js
jest.useFakeTimers()
```
<!-- {: data-highlight="jest.useFakeTimers"} -->

#### Advance time

```js
it('works', () => {
  jest.runOnlyPendingTimers()
  jest.advanceTimersByTime(1000)
  jest.runAllTimers()
})
```
<!-- {: data-highlight="advanceTimersByTime"} -->

See: [Timer Mocks](https://jestjs.io/docs/timer-mocks)

## Mock functions

### Mock functions

#### Empty mock

```js
const fn = jest.fn()
```
<!-- {: data-highlight="jest.fn()"} -->

#### With implementation

```js
const fn = jest.fn(n => n * n)
```
<!-- {: data-highlight="jest.fn(n => n * n)"} -->

See: [Mock functions](https://jestjs.io/docs/mock-function-api#jestfnimplementation)

### Assertions

#### Call assertions

```js
expect(fn)
  .toHaveBeenCalled()
  .toHaveBeenCalledTimes(number)
  .toHaveBeenCalledWith(arg1, arg2, ...)
  .toHaveBeenLastCalledWith(arg1, arg2, ...)
```
<!-- {: data-highlight=".toHaveBeenCalledTimes"} -->

#### Argument matchers

```js
expect(fn)
  .toHaveBeenCalledWith(expect.anything())
  .toHaveBeenCalledWith(expect.any(constructor))
  .toHaveBeenCalledWith(expect.arrayContaining([ values ]))
  .toHaveBeenCalledWith(expect.objectContaining({ props }))
  .toHaveBeenCalledWith(expect.stringContaining(string))
  .toHaveBeenCalledWith(expect.stringMatching(regexp))
```
<!-- {: data-highlight="expect.anything()"} -->

See: [Mock function assertions](https://jestjs.io/docs/expect#tohavebeencalled)

### Instances

#### Create instances

```js
const Fn = jest.fn()

a = new Fn()
b = new Fn()
```
<!-- {: data-highlight="new Fn()"} -->

#### Read instances

```js
Fn.mock.instances
// → [a, b]
```

<!-- {: data-highlight="instances"} -->

See: [.mock property](https://jestjs.io/docs/mock-function-api#mockfnmockinstances)

### Calls

#### Call the mock

```js
const fn = jest.fn()
fn(123)
fn(456)
```
<!-- {: data-highlight="fn(123)"} -->

#### Read calls

```js
fn.mock.calls.length   // → 2
fn.mock.calls[0][0]    // → 123
fn.mock.calls[1][0]    // → 456
```

<!-- {: data-highlight="calls"} -->

See: [.mock property](https://jestjs.io/docs/mock-function-api#mockfnmockcalls)

### Return values

#### From implementation

```js
const fn = jest.fn(() => 'hello')
```
<!-- {: data-highlight="() => 'hello'"} -->

#### From mock methods

```js
jest.fn().mockReturnValue('hello')
jest.fn().mockReturnValueOnce('hello')
```
<!-- {: data-highlight="mockReturnValueOnce"} -->

See: [mockReturnValue()](https://jestjs.io/docs/mock-function-api#mockfnmockreturnvaluevalue), [mockReturnValueOnce()](https://jestjs.io/docs/mock-function-api#mockfnmockreturnvalueoncevalue)

### Mock implementations

#### Queue implementations

```js
const fn = jest.fn()
  .mockImplementationOnce(() => 1)
  .mockImplementationOnce(() => 2)
```

<!-- {: data-highlight="mockImplementationOnce"} -->

#### Call the mock

```js
fn()    // → 1
fn()    // → 2
```

See: [mockImplementationOnce()](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationoncefn)

## References

<!-- {: .-one-column} -->

- <https://jestjs.io/>

<!-- {: .-also-see} -->
