---
title: Nopt
category: JavaScript libraries
---

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

https://www.npmjs.org/package/nopt
