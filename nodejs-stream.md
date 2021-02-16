---
title: Node.js streams
category: Node.js
layout: 2017/sheet
weight: -1
updated: 2017-08-30
---

### Types

| Stream      | Description                        |
| ---         | ---                                |
| `Readable`  | Data emitter                       |
| `Writable`  | Data receiver                      |
| `Transform` | Emitter and receiver               |
| `Duplex`    | Emitter and receiver (independent) |

See: [Stream](https://nodejs.org/api/stream.html#stream_stream) _(nodejs.org)_

### Streams

```js
const Readable = require('stream').Readable
const Writable = require('stream').Writable
const Transform = require('stream').Transform
```

### Piping

```js
clock()              // Readable stream
  .pipe(xformer())   // Transform stream
  .pipe(renderer())  // Writable stream
```

### Methods

```js
stream.push(/*...*/)         // Emit a chunk
stream.emit('error', error)  // Raise an error
stream.push(null)            // Close a stream
```

### Events

```js
const st = source()
st.on('data', (data) => { console.log('<-', data) })
st.on('error', (err) => { console.log('!', err.message) })
st.on('close', () => { console.log('** bye') })
st.on('finish', () => { console.log('** bye') })
```

Assuming `source()` is a readable stream.

### Flowing mode

```js
// Toggle flowing mode
st.resume()
st.pause()
```

```js
// Automatically turns on flowing mode
st.on('data', /*...*/)
```

Stream types
------------
{: .-three-column}

### Readable

```js
function clock () {
  const stream = new Readable({
    objectMode: true,
    read() {}
  })

  setInterval(() => {
    stream.push({ time: new Date() })
  }, 1000)

  return stream
}

// Implement read() if you
// need on-demand reading.
```

Readable streams are generators of data. Write data using `stream.push()`.

### Transform

```js
function xformer () {
  let count = 0

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      done(null, { ...data, index: count++ })
    }
  })
}
```

Pass the updated chunk to `done(null, chunk)`.

### Writable

```js
function renderer () {
  return new Writable({
    objectMode: true,
    write: (data, _, done) => {
      console.log('<-', data)
      done()
    }
  })
}
```

### All together now

```js
clock()              // Readable stream
  .pipe(xformer())   // Transform stream
  .pipe(renderer())  // Writable stream
```

## Also see
{: .-one-column}

- <https://nodejs.org/api/stream.html>
- <https://github.com/substack/stream-handbook>
