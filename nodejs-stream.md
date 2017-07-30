---
title: Stream
category: Node.js
---

```js
const Readable = require('stream').Readable
const Writable = require('stream').Writable
const Transform = require('stream').Transform
```

### Piping

```js
clock()                 // Readable stream
  .pipe(xformer())      // Transform stream
  .pipe(renderer())     // Writable stream
```

### Readable streams

Readable streams are generators of data. Write data using `stream.push()`.

```js
function clock () {
  const stream = new Readable({
    objectMode: true,
    read: () => {} // implement this if you need on-demand reading
  })

  setInterval(() => {
    stream.push({ time: new Date() })

    if (error) return stream.emit('error', error)
    if (eof) return stream.push(null)
  }, 1000)

  return stream
}
```

### Transform streams

Pass the updated chunk to `done(null, chunk)`.

```js
function xformer () {
  let count = 0

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      done(null, { time: data.time, index: count++ })
    }
  })
}
```

### Writable streams

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

### Reading

```js
const st = source()
st.on('data', (data) => { console.log('<-', data) })
st.on('close', () => { console.log('** bye') })
```

## Also see

- <https://github.com/substack/stream-handbook>
