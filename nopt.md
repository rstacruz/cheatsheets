---
title: Nopt
subtitle: Option parsing library
category: Node.js
last_verified_with: "nopt 10.0.1."
updated: 2026-11-25
tier: t3
links:
  - title: https://www.npmjs.org/package/nopt
    url: https://www.npmjs.org/package/nopt
---

### Example

#### Parsing arguments

```js
var args = require('nopt')({
  foo: [String, null],
  size: ['big', 'medium', 'small'],
  many: [String, Array],
  debug: Boolean,
  version: Boolean,
  help: Boolean
}, {
  h: '--help',
  v: '--version'
}, process.argv);

args == {
  debug: true,
  version: true,
  size: 'big',
  argv: {
    remain: ['...', '...'],
    cooked: ...,
    original: ...
  }
}
```
<!-- {: data-highlight="foo; size; many"} -->

#### Handling help flags

```js
if (args.help) {
  console.log([
      'Usage:',
      '  hicat [options] [file]',
      '',
      'Options:',
      '  -h, --help         print usage information',
      '  -v, --version      show version info and exit',
  ].join('\n'));
  process.exit(0);
}

if (args.version) {
  console.log(require('../package.json').version);
  process.exit(0);
}
```
<!-- {: data-highlight="args.help; args.version"} -->

See: [nopt README](https://github.com/npm/nopt#readme)
