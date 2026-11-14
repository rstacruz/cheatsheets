---
title: Shell.js
category: JavaScript libraries
updated: 2017-10-27
weight: -1
intro: |
  [ShellJS](https://github.com/shelljs/shelljs) is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API. 
---

### Example

```js
var shell = require('shelljs')
```

```js
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
```

```js
// Copy files to release dir
shell.rm('-rf', 'out/Release')
shell.cp('-R', 'stuff/', 'out/Release')
```

```js
// Replace macros in each .js file
shell.cd('lib')
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file)
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file)
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file)
})
shell.cd('..')
```

```js
// Run external tool synchronously
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
```

Taken from the [Readme](https://github.com/shelljs/shelljs).

### Require

```js
const sh = require('shelljs')
```

### Paths

```js
sh.cd('dir')
```

```js
sh.mkdir('dir')
sh.mkdir('-p', 'dir')
```

### File manipulation

```js
sh.cp('src', 'dest')
sh.cp('-rf', 'src', 'dest')
```

```js
sh.rm('file')
sh.rm('-rf', 'file')
```

```js
sh.mv('src', 'dest')
sh.mv(['src1','src2'], 'dest')
```

```js
sh.chmod('644', 'file')
sh.chmod(755, 'file')
sh.chmod('u+x', 'file')
```

### Tests

```js
sh.test('-b', 'path')  // block device
sh.test('-d', 'path')  // dir
sh.test('-e', 'path')  // exists
sh.test('-f', 'path')  // file
sh.test('-L', 'path')  // symlink
```

### Cat and output

```js
src = sh.cat('file*.txt')
```

```js
'hello'.to('output.txt')
'hello'.toEnd('append.txt')
```

```js
sh.cat('input.txt').to('output.txt')
```

### Utils

```js
sh.which('x')
sh.pwd()
```

```js
sh.echo('hi')
```

```js
sh.exec('node --version').code
sh.exec('node --version').output
sh.exec('node --version', { silent: true }).output
```

```js
sh.exec('node --version', (code, output) => {
  sh.echo(`exit code ${code}`)
})
```

```js
sh.tempdir()
```

```js
sh.error()  // null if no error
```

## Also see

* <https://github.com/shelljs/shelljs>
