---
title: Node.js API
subtitle: Server-side JavaScript API
category: Node.js
updated: 2026-11-24
last_verified_with: "Node.js 26.13.1."
tier: t3
intro: |
  Node.js runtime APIs for module globals, child processes, and ES modules, with copy-paste examples.
links:
  - title: Node.js globals documentation
    url: https://nodejs.org/api/globals.html
  - title: Node.js child process documentation
    url: https://nodejs.org/api/child_process.html
  - title: Node.js ES modules documentation
    url: https://nodejs.org/api/esm.html
---

## Globals

### Module globals

| Global | Availability |
| --- | --- |
| `__dirname` | CommonJS only |
| `__filename` | CommonJS only |
| `require` | CommonJS only |
| `module` | CommonJS only |
| `import.meta.dirname` | ESM only, Node 20.11+ |
| `import.meta.filename` | ESM only, Node 20.11+ |
| `import.meta.url` | ESM only, a `file://` URL |

CommonJS scripts get `__dirname`; ESM modules use `import.meta.dirname` instead.

See: [Node.js modules](https://nodejs.org/api/modules.html#__dirname)

### Process

```js
process.env.NODE_ENV   // 'production'
process.argv           // [node, script, '--flag']
process.exitCode = 1   // let the event loop drain
process.stdout.write('hi\n')
```

`process.exit()` skips pending work; prefer setting `exitCode`.

See: [process](https://nodejs.org/api/process.html#processexitcode)

## Child processes

### exec

```js
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const { stdout } = await promisify(exec)('ls -1')

console.log(stdout)
```

`exec` runs a shell command and buffers output, up to 1 MiB by default.

See: [child_process.exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback)

### spawn

```js
import { spawn } from 'node:child_process'

const child = spawn('git', ['status'], { stdio: 'inherit' })

child.on('error', (err) => {
  console.error(err.code)  // 'ENOENT' when not installed
})

child.on('exit', (code, signal) => {
  console.log(code, signal)
})
```

Pass arguments as an array; `stdio: 'inherit'` wires the child to your terminal.

See: [child_process.spawn](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options)

### Pipe to a child

```js
import { spawn } from 'node:child_process'

const child = spawn('grep', ['foo'], {
  stdio: ['pipe', 'pipe', 'inherit']
})

child.stdout.on('data', (chunk) => process.stdout.write(chunk))
child.stdin.end('foo\nbar\n')
```

See: [spawn options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options)

### Run and wait

```js
import { spawnSync } from 'node:child_process'

const { status, error } = spawnSync('definitely-not-installed', [])

status      // null
error.code  // 'ENOENT'
```

`spawnSync` blocks until the child exits; `status` is non-zero on failure.

See: [child_process.spawnSync](https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options)

## Modules

### Read package.json

```js
import pkg from './package.json' with { type: 'json' }

console.log(pkg.version)
```

ESM needs the `with { type: 'json' }` attribute; CommonJS can `require` JSON directly.

See: [JSON modules](https://nodejs.org/api/esm.html#json-modules)

### Inspect values

```js
import { inspect } from 'node:util'

console.log(inspect({ a: { b: { c: 1 } } }, { depth: Infinity }))
// { a: { b: { c: 1 } } }
```

`inspect` keeps nested objects readable; `console.log` uses it by default.

See: [util.inspect](https://nodejs.org/api/util.html#utilinspectobject-options)

## References

- <https://nodejs.org/docs/latest-v26.x/api/globals.html>
- <https://nodejs.org/docs/latest-v26.x/api/child_process.html>
- <https://nodejs.org/docs/latest-v26.x/api/esm.html>
