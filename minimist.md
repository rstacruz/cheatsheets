---
title: minimist
subtitle: CLI argument parser
category: Node.js
last_verified_with: "minimist 1.2.8."
updated: 2026-11-25
tier: t3
---

### Usage

#### Load

```js
var minimist = require('minimist')
```

#### Parse

```js
var args = minimist(process.argv.slice(2), {
  string: 'lang',           // --lang xml
  boolean: ['version'],     // --version
  alias: { v: 'version' }
})
```
<!-- {: data-highlight="string; boolean; alias"} -->

#### Inspect

```js
console.log(args)
```

Set `string` and `boolean` at least.

See: [minimist methods](https://github.com/minimistjs/minimist/blob/main/README.md#methods)

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
<!-- {: data-highlight="stopEarly; unknown; default"} -->

All options are optional.

See: [minimist methods](https://github.com/minimistjs/minimist/blob/main/README.md#methods)

### Result

```js
args == {
  lang: 'xml',
  version: false,
  h: true,
  help: true,
  _: [ 'index.js', 'package.json' ]
}
```

Result of `--lang xml --no-pager -h index.js package.json`:

See: [Parsing example](https://github.com/minimistjs/minimist/blob/main/README.md#example)

## Meow

### Help and version

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
<!-- {: data-highlight="meow; $0"} -->

Use [meow](https://www.npmjs.com/package/meow) to add `--help` and `--version`.

See: [meow](https://github.com/sindresorhus/meow)

### Reference

* [minimist on npm](https://www.npmjs.com/package/minimist)
* [minimist source](https://github.com/minimistjs/minimist)
