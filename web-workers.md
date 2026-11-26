---
title: Web workers
subtitle: Browser background threads
category: Browser APIs
keywords:
  - Worker
  - postMessage
  - Structured clone
  - Transferable objects
  - Background thread
intro: |
  Web workers run JavaScript on a background thread.
links:
  - title: MDN Web Workers API
    url: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
  - title: Using Web Workers
    url: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
  - title: HTML specification, workers
    url: https://html.spec.whatwg.org/multipage/workers.html
tier: t3
last_verified_with: "HTML Living Standard, Web Workers."
updated: 2026-11-26
---

## Creating a worker

### Classic and module workers
<!-- {: .-prime} -->

```js
// Classic script: the default
const worker = new Worker('worker.js')

// Module worker: supports import statements
const moduleWorker = new Worker('worker.js', {
  type: 'module'
})
```

Classic workers load dependencies with `importScripts`; module workers use `import`, are fetched with CORS, and run in strict mode. The script URL must be same-origin, or a `blob:` or `data:` URL.

See: [Worker()](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)

### Constructor options

| Option | Default | Effect |
| --- | --- | --- |
| `type` | `'classic'` | Classic script or `'module'` |
| `name` | `''` | Debugger name for the worker scope |
| `credentials` | `'same-origin'` | Module imports: `'omit'`, `'include'` |

<!-- {: .-headers} -->

`credentials` only applies to module workers; it controls whether imports send cookies.

See: [Worker() options](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker#options)

### Inline worker

```js
const source = 'onmessage = (e) => postMessage(e.data * 2)'
const url = URL.createObjectURL(
  new Blob([source], { type: 'text/javascript' })
)
const worker = new Worker(url)
```

A `blob:` URL inherits the page's origin, so the worker stays same-origin. Useful for demos and code built at runtime.

See: [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

### Worker kinds

| Constructor | Kind | Reached from |
| --- | --- | --- |
| `new Worker(url)` | Dedicated | The creating script only |
| `new SharedWorker(url)` | Shared | Many contexts, via `.port` |
| `navigator.serviceWorker.register(url)` | Service | Pages it controls |

<!-- {: .-headers} -->

This sheet covers dedicated workers. A shared worker talks through a `MessagePort`; a service worker intercepts network requests.

See: [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

## Messaging

### Send from the page

```js
const worker = new Worker('worker.js')

worker.onmessage = ({ data }) => console.log(data)
worker.postMessage({ task: 'parse', text: 'a,b,c' })
```

`postMessage()` takes one value, so send an object for several fields. Payloads are copied with structured clone, which supports cyclic references but not functions or DOM nodes.

See: [Worker.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage)

### Send from the worker

#### worker.js

```js
self.onmessage = ({ data }) => {
  self.postMessage(data.text.split(','))
}
```

`self` is the worker's global scope, so `postMessage` and `onmessage` work without the prefix.

See: [DedicatedWorkerGlobalScope.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage)

### Message event fields

| Field | Value |
| --- | --- |
| `data` | The cloned payload |
| `origin` | `''` for dedicated workers |
| `source` | `null` for dedicated workers |
| `ports` | `MessagePort`s transferred with the message |
| `lastEventId` | `''` for worker messages |

<!-- {: .-headers} -->

Destructure `data` for the payload. `origin` and `source` are empty for dedicated workers; use a `MessageChannel` when you need to identify senders.

See: [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent)

### Direct channels

```js
const worker = new Worker('worker.js')
const { port1, port2 } = new MessageChannel()

worker.postMessage({ port: port2 }, [port2])
port1.onmessage = ({ data }) => console.log(data)
```

Transferring a port into the worker gives you a private pipe, alongside the shared `onmessage` handler. Each side posts on its own port.

See: [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)

## Transferables

### Move a buffer

#### Main thread

```js
const worker = new Worker('worker.js')
const buffer = new ArrayBuffer(1024 * 1024)

worker.postMessage(buffer, [buffer])
console.log(buffer.byteLength) // 0, detached
```

#### In the worker

```js
self.onmessage = ({ data }) => {
  self.postMessage(data, [data]) // move it back
}
```

The second argument lists resources to move rather than copy. Ownership passes to the receiver, and the sender's copy is detached. Typed arrays are cloned, so transfer their buffer instead.

See: [Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

### What can be transferred

| Object | Use |
| --- | --- |
| `ArrayBuffer` | Raw memory; moves without copying |
| `MessagePort` | Either end of a `MessageChannel` |
| `ImageBitmap` | Decoded image for canvas work |
| `OffscreenCanvas` | Canvas rendered off the DOM thread |
| `ReadableStream` | Streams, with their locks |
| `MediaStreamTrack` | One track from a media stream |
| `RTCDataChannel` | A WebRTC data connection |

<!-- {: .-headers} -->

Plain objects, arrays, and typed arrays are cloned; only these handles move.

See: [Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## Loading code

### importScripts

```js
// worker.js (classic only)
importScripts('utils.js', 'parsers.js')

self.onmessage = ({ data }) => self.postMessage(parse(data))
```

`importScripts()` loads and runs scripts synchronously, in order, before the next statement. It throws a `TypeError` in module workers.

See: [importScripts()](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)

### Module imports

```js
// worker.js (type: 'module')
import { parse } from './parse.js'

self.onmessage = ({ data }) => self.postMessage(parse(data))
```

Module workers use `import` statements, resolved before any code runs. Dependencies are fetched with CORS, so cross-origin files need `Access-Control-Allow-Origin`.

See: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## Lifecycle

### Catch errors

```js
const worker = new Worker('worker.js')

worker.addEventListener('error', (event) => {
  console.error(event.message, event.filename, event.lineno)
})
```

The `error` event fires for uncaught exceptions in the worker. It carries `message`, `filename`, `lineno`, and `colno`.

See: [error event](https://developer.mozilla.org/en-US/docs/Web/API/Worker/error_event)

### Message errors

```js
worker.addEventListener('messageerror', () => {
  console.error('could not deserialize a message')
})
```

`messageerror` fires when a received message cannot be deserialized. It is not cancellable.

See: [messageerror event](https://developer.mozilla.org/en-US/docs/Web/API/Worker/messageerror_event)

### Terminate

```js
const worker = new Worker('worker.js')

worker.terminate()
```

`terminate()` stops the worker at once; queued work is dropped and no cleanup hook runs.

See: [terminate()](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate)

### Close from inside

```js
self.onmessage = ({ data }) => {
  if (data === 'stop') return self.close()
  self.postMessage(handle(data))
}
```

`self.close()` ends the worker from its own thread and discards queued tasks. `close()` and `self.close()` are equivalent here.

See: [close()](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/close)
