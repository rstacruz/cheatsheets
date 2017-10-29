---
title: Meow
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-10-30
weight: -1
intro: |
  [meow](https://npmjs.com/package/meow) is the easiest way to write command line apps for Node.js.
---

### Typical settings

```js
const cli = require('meow')(`
  Usage: appname [options]

  Options:
        --lang LANG    set the language

  Other options:
    -h, --help         show usage information
    -v, --version      print version info and exit
`, {
  string: ['lang'],
  boolean: ['help', 'version'],
  alias: { h: 'help', v: 'version' }
})
```

`string` and `boolean` lets meow/minimist know which flags expect arguments (`string`) and which don't (`boolean`).

### Using the result

```js
cli.flags   // { lang: 'en' }
cli.input   // []
```

Yes, flags are automatically camelCased!

### Lesser-used settings

```js
meow(`...`, {
  // Default values if flags are not specified
  default: { lang: 'en' },

  // allow using -- to stop processing flags
  '--': true,

  // Populate `_` with first non-option
  stopEarly: true,

  // Invoked on unknown param
  unknown: function () { ... }
})
```

Also see [minimist](minimist.html).
