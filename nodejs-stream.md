---
title: Node.js streams
subtitle: Streaming data API
category: Node.js
weight: -1
intro: |
  Streams handle data incrementally through [Node's stream APIs](https://nodejs.org/api/stream.html). Examples use ESM imports.
links:
  - title: Stream API documentation
    url: https://nodejs.org/api/stream.html
updated: 2026-11-22
---

## Stream types

### Core types

| Type          | Role                      |
| ---           | ---                       |
| `Readable`    | Source of data            |
| `Writable`    | Destination for data      |
| `Duplex`      | Both, independently       |
| `Transform`   | Duplex that modifies data |
| `PassThrough` | Transform that echoes     |

See: [types of streams](https://nodejs.org/api/stream.html#types-of-streams)

### Object mode

```js
import { Readable } from 'node:stream'

const objects = new Readable({ objectMode: true, read() {} })
const bytes = new Readable({ read() {} })

console.log(objects.readableHighWaterMark)  // → 16
console.log(bytes.readableHighWaterMark)    // → 65536
```

Object-mode high-water marks count objects; others count bytes.

See: [object mode](https://nodejs.org/api/stream.html#object-mode)

## Reading streams

### Async iteration

```js
import { Readable } from 'node:stream'

for await (const chunk of Readable.from(['a', 'b', 'c'])) {
  console.log(chunk)
}
// → a
// → b
// → c
```

Async iterators install an error handler and end with the stream.

See: [async iterators](https://nodejs.org/api/stream.html#streams-compatibility-with-async-generators-and-async-iterators)

### Events

```js
import { Readable } from 'node:stream'

const source = Readable.from(['a', 'b'])
source.on('data', (chunk) => console.log('data:', chunk))
source.on('end', () => console.log('end'))
source.on('error', (err) => console.error(err))
// → data: a
// → data: b
// → end
```

A `data` listener switches the stream to flowing mode.

See: [event: 'data'](https://nodejs.org/api/stream.html#event-data)

### Flowing and paused

```js
import { Readable } from 'node:stream'

const source = Readable.from(['a', 'b'])
console.log(source.readableFlowing)  // → null
console.log(source.read())           // → a

source.on('data', (chunk) => console.log(chunk))
// → b
source.pause()   // stop emitting data
source.resume()  // resume emitting data
```

Streams start paused. `data`, `pipe()`, and `resume()` switch to flowing mode.

See: [two reading modes](https://nodejs.org/api/stream.html#two-reading-modes)

## Writing streams

### Writable

```js
import { Writable } from 'node:stream'

const sink = new Writable({
  write(chunk, _, done) {
    console.log('write:', chunk.toString())
    done()  // call done(err) to fail
  }
})
sink.on('finish', () => console.log('finish'))
sink.write('hello')
sink.end(' world')
// → write: hello
// → write:  world
// → finish
```

Call `done()` once per chunk; `end()` flushes and emits `finish`.

See: [implementing a writable stream](https://nodejs.org/api/stream.html#implementing-a-writable-stream)

### Backpressure

```js
import { Writable } from 'node:stream'

const slow = new Writable({
  highWaterMark: 2,
  write(chunk, _, done) {
    setTimeout(done, 10)
  }
})
console.log(slow.write('a'))  // → true
console.log(slow.write('b'))  // → false
slow.on('drain', () => {
  console.log('drain')
  slow.end()
})
```

Wait for `drain` after `write()` returns `false`. `pipeline()` handles this for you.

See: [buffering](https://nodejs.org/api/stream.html#buffering)

## Pipelines

### Promise pipeline

```js
import { Readable, Transform, Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const upper = new Transform({
  transform(chunk, _, done) {
    done(null, chunk.toString().toUpperCase())
  }
})
const sink = new Writable({
  write(chunk, _, done) {
    console.log(chunk.toString())
    done()
  }
})

await pipeline(Readable.from(['hi', 'there']), upper, sink)
// → HI
// → THERE
```

`pipeline()` forwards errors, destroys streams on failure, and awaits completion.

See: [pipeline promises API](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options)

### Callback pipeline

```js
import { Readable, Writable, pipeline } from 'node:stream'

const out = new Writable({
  write(chunk, _, done) {
    console.log(chunk.toString())
    done()
  }
})
pipeline(Readable.from(['a', 'b']), out, (err) => {
  console.log(err ? err.message : 'done')
})
// → a
// → b
// → done
```

The callback version is exported from `node:stream` itself.

See: [pipeline callback API](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-callback)

### Transform

```js
import { Readable, Transform, Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

class Indexed extends Transform {
  constructor() {
    super({ objectMode: true })
    this.count = 0
  }
  _transform(chunk, _, done) {
    done(null, { ...chunk, index: this.count++ })
  }
  _flush(done) {
    this.push({ total: this.count })
    done()
  }
}

const sink = new Writable({
  objectMode: true,
  write(chunk, _, done) {
    console.log(chunk)
    done()
  }
})
await pipeline(Readable.from([{ name: 'a' }, { name: 'b' }]),
  new Indexed(), sink)
// → { name: 'a', index: 0 }
// → { name: 'b', index: 1 }
// → { total: 2 }
```

`_transform()` emits one chunk per input; `_flush()` emits a final chunk.

See: [implementing a transform stream](https://nodejs.org/api/stream.html#implementing-a-transform-stream)

### Finished

```js
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'

const source = Readable.from(['a', 'b'])
source.resume()
await finished(source, { cleanup: true })
console.log('finished')
// → finished
```

`cleanup: true` removes listeners after settling; the default keeps them.

See: [finished](https://nodejs.org/api/stream.html#streamfinishedstream-options)

### Errors and abort

```js
import { Readable, Writable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const ac = new AbortController()
setTimeout(() => ac.abort(), 10)
const source = Readable.from(async function* () {
  await new Promise((resolve) => setTimeout(resolve, 50))
  yield 'x'
}())

try {
  await pipeline(source, new Writable({
    write(chunk, _, done) { done() }
  }), { signal: ac.signal })
} catch (err) {
  console.log(err.name)  // → AbortError
}
```

Aborting destroys the pipeline. `stream.destroy(err)` also emits `error`, then `close`.

See: [addAbortSignal()](https://nodejs.org/api/stream.html#streamaddabortsignalsignal-stream)

### Web streams

#### To web

```js
import { Readable } from 'node:stream'

const web = Readable.toWeb(Readable.from(['a', 'b']))
for await (const chunk of web) {
  console.log(chunk)
}
// → a
// → b
```

#### From web

```js
import { Writable } from 'node:stream'

const node = Writable.fromWeb(new WritableStream({
  write(chunk) { console.log(chunk.toString()) }
}))
node.end('hi')
// → hi
```

`Readable.fromWeb()` and `Writable.toWeb()` convert in the other direction.

See: [web stream interoperability](https://nodejs.org/api/stream.html#streamreadablefromwebreadablestream-options)

## Creating streams

### Readable

```js
import { Readable } from 'node:stream'

class Counter extends Readable {
  constructor(max) {
    super({ objectMode: true })
    this.n = 0
    this.max = max
  }
  _read() {
    this.n < this.max ? this.push(this.n++) : this.push(null)
  }
}

for await (const n of new Counter(3)) {
  console.log(n)
}
// → 0
// → 1
// → 2
```

`push(null)` ends the stream; `objectMode` allows non-Buffer values.

See: [implementing a readable stream](https://nodejs.org/api/stream.html#implementing-a-readable-stream)

### Async generators

```js
import { Readable } from 'node:stream'

async function* ticks() {
  for (const n of [1, 2, 3]) yield n
}

for await (const n of Readable.from(ticks())) {
  console.log(n)
}
// → 1
// → 2
// → 3
```

`Readable.from()` also accepts plain iterables such as arrays.

See: [creating streams from async generators](https://nodejs.org/api/stream.html#creating-readable-streams-with-async-generators)

### Duplex and PassThrough

```js
import { PassThrough } from 'node:stream'

const pass = new PassThrough()
pass.on('data', (chunk) => console.log('echo:', chunk.toString()))
pass.end('ping')
// → echo: ping
```

`Duplex` reads and writes independently; `PassThrough` echoes what you write.

See: [PassThrough](https://nodejs.org/api/stream.html#class-streampassthrough)

## Also see

<!-- {: .-one-column} -->

- <https://nodejs.org/api/stream.html>
- <https://nodejs.org/api/webstreams.html>
