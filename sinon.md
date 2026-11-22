---
title: Sinon
subtitle: Test double library for JavaScript
category: JavaScript testing
weight: -1
updated: 2026-11-22
intro: |
  [Sinon](https://sinonjs.org/) records calls, replaces functions, and fakes time in JavaScript tests. This sheet covers Sinon 22.
links:
  - title: Sinon documentation
    url: https://sinonjs.org/
  - title: Migration guide
    url: https://sinonjs.org/guides/migration
---

## Doubles

### Fakes

```js
const sinon = require('sinon')

const fake = sinon.fake.returns(42)
fake() // → 42
fake.callCount // → 1
```

Fakes are immutable; prefer them to spies and stubs for new code.

See: [Fakes](https://sinonjs.org/concepts/fakes/)

### Spies

```js
const spy = sinon.spy()
spy('Ada')

spy.calledOnce // → true
spy.firstCall.args // → [ 'Ada' ]
```

Use `sinon.spy(fn)` to wrap a function without changing its behavior.

See: [Spies](https://sinonjs.org/concepts/spies/)

### Stubs

```js
const stub = sinon.stub().returns(42)
stub() // → 42
stub.withArgs('x').returns('x')
stub('x') // → 'x'
stub('y') // → 42
```

Use `sinon.stub(obj, 'method')` to replace an existing method.

See: [Stubs](https://sinonjs.org/concepts/stubs/)

### Mocks

```js
const obj = { greet: () => {} }
const mock = sinon.mock(obj)
mock.expects('greet').once()
  .withArgs('Ada').returns('hi Ada')

obj.greet('Ada') // → 'hi Ada'
mock.verify() // → true
mock.restore()
```

Mocks couple tests to implementation details; prefer an explicit assertion.

See: [Mocks](https://sinonjs.org/concepts/mocks/)

## Call behavior

### Consecutive calls

```js
const stub = sinon.stub()
stub.onCall(0).returns('first')
stub.onCall(1).returns('second')

stub() // → 'first'
stub() // → 'second'
```

See: [onCall](https://sinonjs.org/concepts/stubs/api/on-call)

### Errors

```js
const stub = sinon.stub().throws(new TypeError('bad'))

try {
  stub()
} catch (error) {
  error.message // → 'bad'
}
```

See: [throws](https://sinonjs.org/concepts/stubs/api/throws)

### Async doubles

```js
const stub = sinon.stub().resolves({ ok: true })

await stub() // → { ok: true }
```

Use `rejects(error)` to return a rejected promise.

See: [resolves](https://sinonjs.org/concepts/stubs/api/resolves)

### Callbacks

```js
const callback = sinon.spy()
sinon.stub().callsArg(0)(callback)

callback.calledOnce // → true
```

See: [callsArg](https://sinonjs.org/concepts/stubs/api/calls-arg)

## Inspection

### Assertions

```js
const spy = sinon.spy()
spy({ url: '/x', method: 'GET' })

sinon.assert.calledOnce(spy)
sinon.assert.calledWithMatch(spy, { url: '/x' })
```

Assertions throw when they fail.

See: [Assertions](https://sinonjs.org/concepts/assertions/)

### Call data

```js
const spy = sinon.spy()
spy({ url: '/x' })

spy.args // → [ [ { url: '/x' } ] ]
spy.firstCall.args // → [ { url: '/x' } ]
spy.callCount // → 1
```

See: [Spy API](https://sinonjs.org/concepts/spies/api)

### Matchers

```js
const spy = sinon.spy()
spy({ url: '/x', method: 'GET' })

spy.calledWithMatch({ method: 'GET' }) // → true
sinon.match({ url: '/x' }).test({ url: '/x' }) // → true
```

See: [Matchers](https://sinonjs.org/concepts/matchers/)

## Time

### Fake timers

```js
const clock = sinon.useFakeTimers()
let done = false

setTimeout(() => { done = true }, 1000)
done // → false
clock.tick(1000)
done // → true

clock.restore()
```

See: [Fake timers](https://sinonjs.org/concepts/fake-timers/)

### Freeze the date

```js
const clock = sinon.useFakeTimers({
  now: new Date('2024-01-01T00:00:00Z'),
  toFake: ['Date']
})

new Date().toISOString()
// → '2024-01-01T00:00:00.000Z'

clock.restore()
```

Sinon 19+ fakes all timers by default; `toFake` limits the replacement.

See: [Migration guide](https://sinonjs.org/guides/migration)

## HTTP

### Fetch

```js
const fetchStub = sinon.stub(globalThis, 'fetch')
fetchStub.resolves({ ok: true })

const res = await fetch('/x')
res.ok // → true
fetchStub.calledWith('/x') // → true

fetchStub.restore()
```

See: [stub](https://sinonjs.org/concepts/sandboxes/api/stub)

### Fake XHR

```js
const nise = require('nise')
const server = nise.fakeServer.create()

const xhr = new XMLHttpRequest()
xhr.open('GET', '/file.json')
xhr.send()
server.requests[0].respond(200,
  { 'Content-Type': 'application/json' },
  '{"hello":"world"}')

xhr.responseText // → '{"hello":"world"}'
server.restore()
```

Sinon 20 removed its XHR fakes; nise fakes are not restored by `sinon.restore()`. In Node, define a global `XMLHttpRequest` before loading nise.

See: [Migration guide](https://sinonjs.org/guides/migration)

## Cleanup

### Default sandbox

```js
const obj = { hello: 'world' }
sinon.stub(obj, 'hello').value('Sinon')
obj.hello // → 'Sinon'

sinon.restore()
obj.hello // → 'world'
```

Since Sinon 5, `sinon` is a sandbox; call `sinon.restore()` in `afterEach`.

See: [Sandboxes](https://sinonjs.org/concepts/sandboxes/)

### Custom sandbox

```js
const sandbox = sinon.createSandbox()
const obj = { hello: 'world' }
sandbox.stub(obj, 'hello').value('Banana')
obj.hello // → 'Banana'

sandbox.restore()
obj.hello // → 'world'
```

Use `createSandbox()` only for divergent config; `sinon.sandbox.create()` is gone.

See: [Sandbox API](https://sinonjs.org/concepts/sandboxes/api)
