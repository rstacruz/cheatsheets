---
title: Jest
category: JavaScript libraries
---

## Testing

```js
beforeEach(() => { ... })
afterEach(() => { ... })

beforeAll(() => { ... })
afterAll(() => { ... })

describe('My work', () => {
  test('works', () => {
    expect(2).toEqual(2)
  })

  test('works asynchonously', () => {
    return new Promise((resolve, reject) => { ... })
  })

  test('works asynchonously', async () => {
    const hello = await foo()
    ...
  })
})
```

## Expect

```js
expect(value)
  .not
  .toBe(value)
  .toEqual(value)

  // Snapshots
  .toMatchSnapshot()

  // Errors
  .toThrow(error)
  .toThrowErrorMatchingSnapshot()

  // Booleans
  .toBeFalsy()
  .toBeNull()
  .toBeTruthy()
  .toBeUndefined()
  .toBeDefined()

  // Numbers
  .toBeCloseTo(number, numDigits)
  .toBeGreaterThan(number)
  .toBeGreaterThanOrEqual(number)
  .toBeLessThan(number)
  .toBeLessThanOrEqual(number)

  // Objects
  .toBeInstanceOf(Class)
  .toMatchObject(object)
  .toHaveProperty(keyPath, value)

  // Arrays
  .toContain(item)
  .toContainEqual(item)
  .toHaveLength(number)

  // String
  .toMatch(regexpOrString)
```

```js
expect.extend(matchers)
expect.any(constructor)
expect.addSnapshotSerializer(serializer)

expect.assertions(1)
```

## Snapshots

```
const tree = renderer.create(
<Link page="http://www.facebook.com">Facebook</Link>
).toJSON()

// First run creates a snapshot; subsequent runs match it
expect(tree).toMatchSnapshot()

// To update snapshots: jest --updateSnapshot
```

## Mocks

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

## References

Based on Jest v19. <http://facebook.github.io/jest/>
