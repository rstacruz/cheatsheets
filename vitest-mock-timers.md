---
title: How to mock timers in Vitest
link_title: Mock Vitest timers
subtitle: Control time in tests
category: JavaScript testing
layout: snippet
last_verified_with: "Vitest 5.1.2."
updated: 2026-11-26
links:
  - title: Mocking timers
    url: https://vitest.dev/guide/mocking/timers
  - title: Fake timers config
    url: https://vitest.dev/config/faketimers
---

## Mocking timers
<!-- {: .-snippets} -->

### Advance by time
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
const save = vi.fn()
setTimeout(save, 1000)

vi.advanceTimersByTime(1000)
expect(save).toHaveBeenCalledOnce()
```
<!-- {: data-highlight="vi.advanceTimersByTime"} -->

**Runs the timers due in the next second.** `useFakeTimers()` replaces the global timer APIs; see [`advanceTimersByTime`](https://vitest.dev/api/vi#vi-advancetimersbytime).

### Run all timers
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
const tick = vi.fn()
setTimeout(tick, 100)
setTimeout(tick, 500)

vi.runAllTimers()
expect(tick).toHaveBeenCalledTimes(2)
```
<!-- {: data-highlight="vi.runAllTimers"} -->

**Flushes every queued timer, including ones scheduled along the way.** See [`runAllTimers`](https://vitest.dev/api/vi#vi-runalltimers).

### One round only
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
const tick = vi.fn(() => setTimeout(tick, 100))
setTimeout(tick, 100)

vi.runOnlyPendingTimers()
expect(tick).toHaveBeenCalledOnce()
```
<!-- {: data-highlight="vi.runOnlyPendingTimers"} -->

**Runs only the timers queued so far.** Use it when a timer reschedules itself; see [`runOnlyPendingTimers`](https://vitest.dev/api/vi#vi-runonlypendingtimers).

### Await async work
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
let done = false
setTimeout(async () => { done = true }, 100)

await vi.advanceTimersByTimeAsync(100)
expect(done).toBe(true)
```
<!-- {: data-highlight="vi.advanceTimersByTimeAsync"} -->

**Advances time and lets pending promises settle.** The plain `advanceTimersByTime` call leaves them unresolved; see [`advanceTimersByTimeAsync`](https://vitest.dev/api/vi#vi-advancetimersbytimeasync).

### Freeze the clock
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
vi.setSystemTime(new Date('2026-01-01'))

expect(new Date().getFullYear()).toBe(2026)
```
<!-- {: data-highlight="vi.setSystemTime"} -->

**Pins `Date` to a fixed moment.** Fake timers cover `Date` as well as timers; see [`setSystemTime`](https://vitest.dev/api/vi#vi-setsystemtime).

### Restore real timers
<!-- {: .-snippet} -->

```js
afterEach(() => {
  vi.useRealTimers()
})
```
<!-- {: data-highlight="vi.useRealTimers"} -->

**Undoes the fake timers after each test.** Pass `toFake: ['setTimeout']` to `useFakeTimers()` to fake fewer APIs; see [`useRealTimers`](https://vitest.dev/api/vi#vi-userealtimers).
