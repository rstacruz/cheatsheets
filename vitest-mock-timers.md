---
title: How to mock timers in Vitest
link_title: Mock Vitest timers
subtitle: Control time in tests
logo: { src: /assets/logos/vitest.svg }
category: JavaScript testing
layout: snippet
last_verified_with: "Vitest 5.1.2."
created_at: 2026-11-26
updated: 2026-11-28
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

**Runs the due timers.** `useFakeTimers()` replaces the global timer APIs; the call runs those due in the next second. See [`advanceTimersByTime`](https://vitest.dev/api/vi#vi-advancetimersbytime).

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

**Flushes every queued timer.** It also runs ones scheduled along the way. See [`runAllTimers`](https://vitest.dev/api/vi#vi-runalltimers).

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

**Runs queued timers once.** Use it when a timer reschedules itself; only those queued so far run. See [`runOnlyPendingTimers`](https://vitest.dev/api/vi#vi-runonlypendingtimers).

### Await async work
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
let done = false
setTimeout(async () => {
  await Promise.resolve()
  done = true
}, 100)

await vi.advanceTimersByTimeAsync(100)
expect(done).toBe(true)
```
<!-- {: data-highlight="vi.advanceTimersByTimeAsync"} -->

**Advances time and settles promises.** The plain `advanceTimersByTime` call leaves pending promises unresolved. See [`advanceTimersByTimeAsync`](https://vitest.dev/api/vi#vi-advancetimersbytimeasync).

### Freeze the clock
<!-- {: .-snippet} -->

```js
vi.useFakeTimers()
vi.setSystemTime(new Date(2026, 0, 1))

expect(new Date().getFullYear()).toBe(2026)
```
<!-- {: data-highlight="vi.setSystemTime"} -->

**Pins `Date` to one moment.** The numeric constructor uses local time; fake timers cover `Date` too. See [`setSystemTime`](https://vitest.dev/api/vi#vi-setsystemtime).

### Restore real timers
<!-- {: .-snippet} -->

```js
afterEach(() => {
  vi.useRealTimers()
})
```
<!-- {: data-highlight="vi.useRealTimers"} -->

**Undoes fake timers after tests.** Pass `toFake: ['setTimeout']` to `useFakeTimers()` to fake fewer APIs; the reset runs after each test. See [`useRealTimers`](https://vitest.dev/api/vi#vi-userealtimers).
