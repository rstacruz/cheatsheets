---
title: Node.js API
category: Node.js
---

## Globals

    __filename
    __dirname

### exec

    var exec = require('child_process').exec,

    var child = exec('cat *.js bad_file | wc -l',
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });

## Snippets

    info = require('../package.json')
    info.version

    process.stdout.write(util.inspect(objekt, false, Infinity, true) + '\n');

## Spawn - passthru the in/out

    var spawn = require('child_process').spawn;
    var proc = spawn(bin, argv, { stdio: 'inherit' });
    proc.on('error', function(err) {
      if (err.code == "ENOENT") { "does not exist" }
      if (err.code == "EACCES") { "not executable" }
    });
    proc.on('exit', function(code) { ... });

    // also { stdio: ['pipe', 'pipe', process.stdout] }
    // also { stdio: [process.stdin, process.stderr, process.stdout] }

    proc.stdout.on('data', function (data) {
    });
    proc.stderr.on('data', function (data) {
    });

[all]: http://nodejs.org/api/all.html
---
title: fs
category: Node.js
---

### Reading

    fs.readFile('file.txt', function(err, data) { .. });
    fs.readFile('file.txt', {encoding: 'utf-8'}, function(err, data) { .. });

### Writing

    fs.writeFile('output.txt', function(err) { .. });
    fs.appendFile('output.txt', function(err) { .. });

### Watch

    fs.watch('dir OR file.txt', { persistent: true }, function(event, file) {
      event; /* rename | change */
    });

### Getting info

    fs.exists('file.txt', function(exists /*bool*/) { ... });

    fs.stat('file.txt', function(stats) {
      stats.isFile();
      stats.isDirectory();
      stats.isSymbolicLink();
    });

### File operations

    fs.rename('old.txt', 'new.txt', function(){});
    fs.chown('file.txt', uid, gid, function(){});
    fs.symlink('src', 'dest', function(){});
    fs.unlink('path', function(){});
    fs.rmdir('path', function(){});

    fs.readdir('path', function(err, files) { .. }); /* `files` = array of names */

### Path

    fs.realpath('/etc/passwd', function(err, path) { /* "/private/etc/passwd" */ });

### Sync

    data = fs.readFileSync('input.txt');
    fs.writeFileSync('output.txt', data);
    fs.appendFileSync('output.txt', data);
    fs.existsSync('file.txt');

### References

- http://nodejs.org/api/fs.html
---
title: path
category: Node.js
---

    fs.realpath('/etc/passwd', function(err, path) { /* "/private/etc/passwd" */ 
    });

    dir = path.join('etc', 'passwd');
    dir = path.resolve('/etc', 'passwd', '..', 'var');

    path.dirname('/etc/passwd')       //=> "/etc"
    path.basename('/etc/passwd')      //=> "passwd"
    path.basename('/etc/rc.d', '.d')  //=> "rc"

### References

- http://nodejs.org/api/path.html
---
title: process
category: Node.js
---

### Streams

    process.stdout.write('...');
    process.stderr.write('...');

    function stdin(fn) {
      var data = '';

      process.stdin.setEncoding('utf8');
      process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if (chunk !== null) data += chunk;
      });

      process.stdin.on('end', function() {
        fn(null, data);
      });
    }

### stuff

    process.argv; //=> ['node', 'file.js', 'one', 'two']
    process.env; //=> {TERM: 'screen-256color', SHELL: '/bin/bash', ...}

    process.exit();
    process.exit(1);

### Directories
    
    process.cwd(); //=> "/tmp"
    process.chdir('dir');

### References

- http://nodejs.org/api/process.html
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
---
title: assert
category: Node.js
---

    assert(val)
    assert.equal(actual, expected)
    assert.notEqual(a, e)

    assert.deepEqual(a, e)
    assert.notDeepEqual(a, e)

    assert.throws(fn)

### References

- http://nodejs.org/api/assert.html
