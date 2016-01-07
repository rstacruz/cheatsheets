---
title: Meow
category: JavaScript libraries
---

```js
const cli = require('meow')(`
  Usage: appname [options]

  Options:
    -h, --help       show usage information
    -v, --version    print version info and exit
`, {
  alias: { h: 'help', v: 'version', x: 'excludeTag' },
  string: ['lang'],
  boolean: ['pager'],
  default: { lang: 'en' },
  '--': true,
  stopEarly: true, /* populate _ with first non-option */
  unknown: function () { ... } /* invoked on unknown param */
})

cli.flags   // { excludeTag: true }
cli.input   // []

// yes, flags are camelCased
```

Also see [minimist](minimist.html).
