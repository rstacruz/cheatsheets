---
title: minimist
category: JavaScript libraries
layout: 2017/sheet
---

### Usage

```js
var minimist = require('minimist')
```
{: .-setup}

```js
var args = minimist(process.argv.slice(2), {
  string: 'lang',           // --lang xml
  boolean: ['version'],     // --version
  alias: { v: 'version' }
})
```

```js
console.log(args)
```

All options are optional, but it's recommended you set `string` and `boolean` at least.

### All options

```js
var args = minimist(process.argv.slice(2), {
  string: [ 'lang' ],
  boolean: [ 'pager' ],
  alias: { h: 'help', v: 'version' },
  default: { lang: 'en' },
  '--': true,
  stopEarly: true, /* populate _ with first non-option */
  unknown: function () { ... } /* invoked on unknown param */
})
```

All options are optional.

### Result

With `--lang xml --no-pager -h index.js package.json`, you get:
{: .-setup}

```
args == {
  lang: 'xml',
  version: false,
  h: true,
  help: true,
  _: [ 'index.js', 'package.json' ]
}
```

## Meow

### Help and version

Use [meow](https://www.npmjs.com/package/meow) to automatically add support for `--help`, `--version` and more.
{: .-setup}

```js
meow(`
    Usage:
        $0 FILES [options]

    Options:
        -h, --help         print usage information
        -v, --version      show version info and exit
`, {
  alias: { h: 'help', v: 'version' }
  /* minimist options */
})
```

### Reference

 * <https://www.npmjs.org/package/minimist>
 * <https://github.com/substack/minimist>
