---
title: fs
subtitle: File system module
category: Node.js
updated: 2026-11-24
last_verified_with: "Node.js 26.13.1."
---

## Reading and writing

### Read a file

```js
import { readFile } from 'node:fs/promises'

const text = await readFile('file.txt', 'utf8')  // string
const bytes = await readFile('file.txt')         // Buffer
```

Pass an encoding to get a string; without one you get a `Buffer`.

### Write a file

```js
import { writeFile, appendFile } from 'node:fs/promises'

await writeFile('out.txt', 'hello\n')  // create or truncate
await appendFile('out.txt', 'more\n')  // create or append
```

### Sync calls

```js
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const config = JSON.parse(readFileSync('config.json', 'utf8'))

writeFileSync('cache.json', JSON.stringify(config))
existsSync('cache.json')  // true
```

Sync calls block the event loop, so use them at startup or in scripts.

### Callback style

```js
import { readFile } from 'node:fs'

readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err

  console.log(data)
})
```

The callback API passes `(err, data)`; prefer the promise API in new code.

## Inspect and list

### Stat and access

```js
import { stat, access } from 'node:fs/promises'

const stats = await stat('file.txt')

stats.isFile()       // true
stats.isDirectory()  // false
stats.size           // bytes

await access('file.txt')  // throws ENOENT when missing
```

`fs.exists` is deprecated; `access` and `stat` report errors instead.

### List a directory

```js
import { readdir } from 'node:fs/promises'

const names = await readdir('.')
const entries = await readdir('.', { withFileTypes: true })
const dirs = entries.filter((entry) => entry.isDirectory())
```

`readdir` returns names only; `withFileTypes` adds `isFile()` and friends.

### Resolve a path

```js
import { realpath } from 'node:fs/promises'

await realpath('link.txt')  // '/home/me/target.txt'
```

`realpath` follows symlinks and returns an absolute path.

## Change and remove

### Watch a directory

```js
import { watch } from 'node:fs/promises'

const watcher = watch('.', { recursive: true })

for await (const event of watcher) {
  console.log(event.eventType, event.filename)  // change | rename
}
```

`recursive` works on Linux from Node 19.1; close the watcher with `watcher.close()`.

### Move and delete

```js
import { mkdir, copyFile, rename, rm, unlink } from 'node:fs/promises'

await mkdir('build', { recursive: true })
await copyFile('a.txt', 'build/a.txt')
await rename('a.txt', 'b.txt')
await unlink('b.txt')  // one file
await rm('build', { recursive: true, force: true })
```

`rm` removes files and directories; `force` ignores missing paths.

## References

- <https://nodejs.org/api/fs.html>
- <https://nodejs.org/api/fs.html#promises-api>

## Also see

[Node.js read file cheatsheet](./nodejs-read-file)
<!-- {: .-crosslink} -->
