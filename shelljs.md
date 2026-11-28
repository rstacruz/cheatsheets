---
title: Shell.js
subtitle: Unix commands for Node
logo: { set: icon-park-outline, name: keyboard }
category: Node.js
tier: t3
last_verified_with: "ShellJS 0.10.0."
created_at: 2013-08-29
updated: 2026-11-26
weight: -1
intro: |
  ShellJS is a portable (Windows/Linux/macOS) implementation of Unix shell commands on top of the Node.js API.
links:
  - title: ShellJS
    url: https://github.com/shelljs/shelljs
---

## Getting started

### Example

```js
var shell = require('shelljs')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
```

#### Copy files

```js
// Copy files to release dir
shell.rm('-rf', 'out/Release')
shell.cp('-R', 'stuff/', 'out/Release')
```

#### Replace macros

```js
// Replace macros in each .js file
shell.cd('lib')
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file)
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file)
  shell.sed(
    '-i', /.*REPLACE_LINE_WITH_MACRO.*\n/,
    shell.cat('macro.js'), file
  )
})
shell.cd('..')
```

#### Run a command

```js
// Run external tool synchronously
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
```

Taken from the [ShellJS README](https://github.com/shelljs/shelljs#examples).

### Require

```js
const sh = require('shelljs')
```
<!-- {: data-highlight="require"} -->

See: [Global vs. local](https://github.com/shelljs/shelljs#global-vs-local)

## Commands

### Paths

```js
sh.cd('dir')
sh.mkdir('dir')
sh.mkdir('-p', 'dir')
```
<!-- {: data-highlight="cd; mkdir"} -->

See: [ShellJS command reference](https://github.com/shelljs/shelljs#command-reference)

### File manipulation

```js
sh.cp('src', 'dest')
sh.cp('-rf', 'src', 'dest')
sh.rm('file')
sh.rm('-rf', 'file')
sh.mv('src', 'dest')
sh.mv(['src1', 'src2'], 'dest')
sh.chmod('644', 'file')
sh.chmod(755, 'file')
sh.chmod('u+x', 'file')
```
<!-- {: data-highlight="cp; rm; mv; chmod"} -->

See: [ShellJS command reference](https://github.com/shelljs/shelljs#command-reference)

### Tests

```js
sh.test('-b', 'path')  // block device
sh.test('-d', 'path')  // dir
sh.test('-e', 'path')  // exists
sh.test('-f', 'path')  // file
sh.test('-L', 'path')  // symlink
```
<!-- {: data-highlight="test"} -->

See: [ShellJS command reference](https://github.com/shelljs/shelljs#command-reference)

### Cat and output

```js
src = sh.cat('file*.txt')
'hello'.to('output.txt')
'hello'.toEnd('append.txt')
sh.cat('input.txt').to('output.txt')
```
<!-- {: data-highlight="cat; .to; .toEnd"} -->

See: [ShellJS command reference](https://github.com/shelljs/shelljs#command-reference)

### Utils

#### Paths and output

```js
sh.which('x')
sh.pwd()
sh.echo('hi')
```

#### Commands

```js
sh.exec('node --version').code
sh.exec('node --version').output
sh.exec('node --version', { silent: true }).output

sh.exec('node --version', (code, output) => {
  sh.echo(`exit code ${code}`)
})
```
<!-- {: data-highlight="exec"} -->

#### Housekeeping

```js
sh.tempdir()
sh.error()  // null if no error
```

See: [ShellJS command reference](https://github.com/shelljs/shelljs#command-reference)

## Also see

* <https://github.com/shelljs/shelljs>
