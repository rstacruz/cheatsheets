---
title: minimist
category: JavaScript libraries
---

```js
var minimist = require('minimist')

var args = minimist(process.argv.slice(2), {
  string: 'lang',
  boolean: 'pager',
  alias: { h: 'help', v: 'version' },
  default: { lang: 'en' },
  '--': true,
  stopEarly: true, /* populate _ with first non-option */
  unknown: function () { ... } /* invoked on unknown param */
});

// --lang xml --no-pager -h index.js package.json
args == {
  lang: 'xml',
  pager: false,
  h: true,
  help: true,
  _: [ 'index.js', 'package.json' ]
}
```

### Help and version

Use [meow](https://www.npmjs.com/package/meow).

```js
meow(`
    Usage:
        $0 FILES [options]

    Options:
        -h, --help         print usage information
        -v, --version      show version info and exit
`, {
  /* options */
})
```

### Reference

 * https://www.npmjs.org/package/minimist
 * https://github.com/substack/minimist
