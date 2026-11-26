---
title: How to read a file in Node.js
link_title: Node.js read file
subtitle: Read text, JSON, and streams
category: Node.js
layout: snippet
last_verified_with: "Node.js 26.13.1."
updated: 2026-11-23
tier: t3
links:
  - title: Node.js fs
    url: https://nodejs.org/api/fs.html
  - title: Node.js readline
    url: https://nodejs.org/api/readline.html
intro: |
  Read files in Node.js with `fs` promises, callbacks, synchronous helpers, or streams. This sheet covers text, JSON, and line-by-line reads.
---

## Reading
<!-- {: .-snippets} -->

### Read text asynchronously
<!-- {: .-snippet} -->

```js
import { readFile } from 'node:fs/promises'

const text = await readFile('file.txt', 'utf8')
```
<!-- {: data-highlight="readFile"} -->

**Reads a text file asynchronously.** `readFile` returns a promise and avoids blocking the event loop. See [fs.readFile](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options).

### Read text synchronously
<!-- {: .-snippet} -->

```js
import { readFileSync } from 'node:fs'

const buffer = readFileSync('file.txt')
const text = buffer.toString('utf8')
```
<!-- {: data-highlight="readFileSync"} -->

**Reads a file synchronously.** Use this only at startup or in scripts where blocking is acceptable. See [fs.readFileSync](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options).

### Read JSON
<!-- {: .-snippet} -->

```js
import { readFile } from 'node:fs/promises'

const raw = await readFile('data.json', 'utf8')
const data = JSON.parse(raw)
```
<!-- {: data-highlight="JSON.parse"} -->

**Reads and parses JSON.** Read the file as UTF-8, then hand the string to `JSON.parse`. See [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

### Stream lines
<!-- {: .-snippet} -->

```js
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'

const input = createReadStream('file.txt')
const lines = createInterface({ input })

for await (const line of lines) {
  console.log(line)
}
```
<!-- {: data-highlight="for await"} -->

**Streams a file line by line.** Use this for large files or logs instead of loading everything at once. See [readline](https://nodejs.org/api/readline.html).
