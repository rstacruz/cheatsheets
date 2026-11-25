---
title: Vitest
subtitle: Vite-powered test runner
category: JavaScript testing
updated: 2026-11-26
last_verified_with: "Vitest 5.1.2, Node 26.13.1."
tier: t1
fragments:
  - "vitest run"
  - "vitest watch"
  - "vitest.config.ts"
  - "describe()"
  - "it.each()"
  - "expect()"
  - "vi.fn()"
  - "vi.mock()"
  - "vi.spyOn()"
  - "useFakeTimers"
  - "toMatchSnapshot"
  - "--coverage"
  - "--update"
  - "test.projects"
  - "environment"
  - "--reporter"
keywords:
  - vitest cli
  - vi.mock
  - vitest snapshots
  - vitest coverage
  - vitest config
intro: |
  [Vitest](https://vitest.dev) runs JavaScript and TypeScript tests through Vite: CLI, assertions, mocks, snapshots and coverage.
links:
  - title: Vitest documentation
    url: https://vitest.dev/guide/
  - title: Config reference
    url: https://vitest.dev/config/
  - title: GitHub repository
    url: https://github.com/vitest-dev/vitest
---

## Getting started
<!-- {: .-three-column} -->

### Setup

#### Install

```bash
pnpm add -D vitest
```
<!-- {: data-highlight="vitest"} -->

#### Scripts

```json
{
  "scripts": { "test": "vitest" }
}
```

Vitest reads `vite.config.ts` when no Vitest config exists.

See: [Installing Vitest](https://vitest.dev/guide/#installing-vitest)

### First test

```js
import { it, expect } from 'vitest'

it('adds numbers', () => {
  expect(1 + 1).toBe(2)
})
```
<!-- {: data-highlight="it"} -->

Test files match `**/*.{test,spec}.?(c|m)[jt]s?(x)` by default.

See: [expect()](https://vitest.dev/api/expect)

### Run and watch

```bash
vitest run       # one run, then exit
vitest           # watch mode
vitest run src/app.test.ts
```

Watch mode reruns affected tests on save and switches to a single run when stdin is not a TTY or `CI` is set.

See: [vitest watch](https://vitest.dev/guide/cli#vitest-watch)

## Writing tests

### Suites and tests

```js
import { describe, it, expect } from 'vitest'

describe('cart', () => {
  it('adds items', () => {
    expect(1 + 1).toBe(2)
  })
})
```
<!-- {: data-highlight="describe"} -->

`it` and `test` are the same function; `describe` only groups names.

See: [describe](https://vitest.dev/api/test#describe)

### Assertions

```js
expect(3).toBe(3)                       // Object.is
expect({ id: 1 }).toEqual({ id: 1 })    // deep
expect({ id: 1, a: 2 }).toMatchObject({ id: 1 })
expect(() => parse('')).toThrow('empty')

await expect(load(1)).resolves.toBe('ok')
await expect(load(0)).rejects.toThrow()
```
<!-- {: data-highlight="toBe; toEqual; toMatchObject; toThrow"} -->

`expect.soft()` records a failure and keeps the test running; `expect.poll()` retries until it passes.

See: [expect](https://vitest.dev/api/expect)

### Async tests

```js
it('loads a user', async () => {
  const user = await fetchUser(1)
  expect(user).toMatchObject({ id: 1 })
})
```
<!-- {: data-highlight="await"} -->

#### Polling

```js
await vi.waitFor(() => {
  expect(isReady()).toBe(true)
})
```
<!-- {: data-highlight="vi.waitFor"} -->

Return or await the promise; a floating one fails the test with an unhandled rejection.

See: [resolves and rejects](https://vitest.dev/api/expect#resolves)

### Setup and teardown

```js
import { beforeEach, afterAll } from 'vitest'

beforeEach(() => {
  db.reset()
})

afterAll(async () => {
  await db.close()
})
```
<!-- {: data-highlight="beforeEach; afterAll"} -->

Hooks run around each test, each file, or the whole run: `beforeEach`, `afterEach`, `beforeAll`, `afterAll`.

See: [Setup and teardown](https://vitest.dev/api/test#setup-and-teardown)

### Parameterised tests

```js
it.each([
  [1, 1, 2],
  [2, 3, 5],
])('adds %i + %i', (a, b, sum) => {
  expect(add(a, b)).toBe(sum)
})
```
<!-- {: data-highlight="it.each"} -->

`%i` and `%s` fill the test name; an object array plus `$name` also works.

See: [test.each](https://vitest.dev/api/test#test-each)

### Focusing and skipping

```js
it.only('runs alone', () => {})
it.skip('skipped', () => {})
it.todo('write more tests')
```
<!-- {: data-highlight="it.only; it.skip; it.todo"} -->

`.only` is rejected when `CI` is set unless you pass `--allowOnly`.

See: [test.only](https://vitest.dev/api/test#test-only)

## Mocking

### Functions

```js
const fn = vi.fn((n) => n * 2)
fn(2)

expect(fn).toHaveBeenCalledOnce()
expect(fn).toHaveReturnedWith(4)
expect(fn.mock.calls).toEqual([[2]])
```
<!-- {: data-highlight="vi.fn"} -->

`mockReturnValue()`, `mockResolvedValue()` and `mockImplementationOnce()` queue return values; `mock.calls` keeps every argument list.

See: [vi.fn](https://vitest.dev/api/vi#vi-fn)

### Modules

```js
import { vi, it, expect } from 'vitest'
import { fetchUser } from '../src/api.js'
import { getUserName } from '../src/user.js'

vi.mock('../src/api.js')

it('uses the mock', async () => {
  vi.mocked(fetchUser).mockResolvedValue({ name: 'ada' })
  await expect(getUserName(1)).resolves.toBe('ADA')
})
```
<!-- {: data-highlight="vi.mock"} -->

`vi.mock` is hoisted above the imports and auto-mocks every export. Pass a factory to replace them, and read outer variables through `vi.hoisted()`.

See: [Mocking modules](https://vitest.dev/guide/mocking/modules)

### Spies and globals

```js
const spy = vi.spyOn(cart, 'total')
spy.mockReturnValue(99)

vi.stubGlobal('fetch', vi.fn())

spy.mockRestore()
vi.unstubAllGlobals()
```
<!-- {: data-highlight="vi.spyOn; vi.stubGlobal"} -->

`spyOn` wraps the real method, so `mockRestore()` puts it back. `vi.stubEnv('NODE_ENV', 'test')` does the same for env vars.

See: [vi.spyOn](https://vitest.dev/api/vi#vi-spyon)

### Timers

```js
vi.useFakeTimers()
setTimeout(save, 500)

vi.advanceTimersByTime(500)
expect(save).toHaveBeenCalledOnce()

vi.useRealTimers()
```
<!-- {: data-highlight="vi.advanceTimersByTime"} -->

Fake timers also take over `Date`, so `vi.setSystemTime(new Date('2026-01-01'))` freezes the clock.

See: [Mocking timers](https://vitest.dev/guide/mocking/timers)

## Snapshots

### File snapshots

```js
it('renders a user', () => {
  expect({ id: 1, name: 'Ada' }).toMatchSnapshot()
})
```
<!-- {: data-highlight="toMatchSnapshot"} -->

Snapshots land in `__snapshots__/<file>.snap` next to the test; commit the file. A run fails on a missing snapshot, so create the first one with `-u`.

See: [Snapshot](https://vitest.dev/guide/snapshot)

### Inline snapshots

#### Before

```js
it('formats money', () => {
  expect(formatMoney(1200)).toMatchInlineSnapshot()
})
```

#### After

```js
it('formats money', () => {
  expect(formatMoney(1200)).toMatchInlineSnapshot(`"$1,200"`)
})
```
<!-- {: data-highlight="toMatchInlineSnapshot"} -->

`vitest run -u` writes the value into the test file, so reviews show the expected output next to the assertion.

See: [Inline snapshots](https://vitest.dev/guide/snapshot#inline-snapshots)

### Updating snapshots

```bash
vitest run -u          # write changed snapshots
vitest run -u new      # only add missing ones
```
<!-- {: data-highlight="-u new"} -->

CI runs never write snapshots and fail on missing or obsolete entries. In watch mode, press `u` to accept the current output.

See: [Updating snapshots](https://vitest.dev/guide/snapshot#updating-snapshots)

## Config

### Config file

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['src/**/*.test.ts'],
  },
})
```
<!-- {: data-highlight="defineConfig"} -->

Vitest reads `vitest.config.ts` from the root. `globals: true` exposes the API without imports, and TypeScript needs `vitest/globals` in `tsconfig.json` `types`.

See: [Configuring Vitest](https://vitest.dev/config/)

### Environment

```ts
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```
<!-- {: data-highlight="environment"} -->

`node` is the default; `jsdom`, `happy-dom` and `edge-runtime` come from packages you install. A `// @vitest-environment jsdom` comment at the top of a file overrides the choice.

See: [Test environment](https://vitest.dev/guide/environment)

### Projects

```ts
export default defineConfig({
  test: {
    projects: [
      'packages/*',
      { test: { name: 'unit', include: ['test/**'] } },
    ],
  },
})
```
<!-- {: data-highlight="projects"} -->

Each entry is a folder, a config file, or an inline config. Run one with `vitest --project unit`.

See: [Test projects](https://vitest.dev/guide/projects)

### Coverage

```ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: { lines: 80 },
    },
  },
})
```
<!-- {: data-highlight="thresholds"} -->

Install `@vitest/coverage-v8`, then run `vitest run --coverage`. A threshold shortfall prints `ERROR: Coverage for lines (50%) does not meet global threshold (80%)` and exits non-zero.

See: [Coverage](https://vitest.dev/guide/coverage)

## CLI

### Commands

| Command | Goal |
| --- | --- |
| `vitest` | Watch mode in a terminal |
| `vitest run` | One run, then exit |
| `vitest run src/app.test.ts` | Filter by path |
| `vitest run -t "adds"` | Filter by test name |
| `vitest related src/util.ts` | Tests importing those files |
| `vitest list` | Print test names |
| `vitest bench` | Run benchmark files |

`vitest run src/app.test.ts:20` runs one test by line number.

See: [CLI commands](https://vitest.dev/guide/cli#commands)

### Flags

| Flag | Description |
| --- | --- |
| `--coverage` | Coverage report |
| `--reporter=verbose` | One line per test |
| `--bail 1` | Stop after the first failure |
| `--shard 2/4` | Run one CI shard |
| `--changed` | Tests affected by git changes |
| `--update` | Rewrite snapshots |
| `--project unit` | One project only |

Flags work on every command, and `vitest --help` lists the rest.

See: [CLI options](https://vitest.dev/guide/cli#options)

[Jest cheatsheet](./jest)
<!-- {: .-crosslink} -->

[Vite cheatsheet](./vite)
<!-- {: .-crosslink} -->
