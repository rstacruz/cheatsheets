---
title: Yargs
created_at: 2015-04-05
subtitle: Node CLI option parser
category: Hidden
# Documents the yargs singleton, removed in yargs 18 (2025).
tags: [Archived]
archived: |
  Yargs 18 (2025) is ESM-only and exposes a factory; the
  `require('yargs').argv` singleton is gone. See
  [yargs.js.org](https://yargs.js.org/).
---

### Basic usage

```js
var argv = require('yargs').argv;

argv._         // [ ... ]
argv.$0        // "node bin/mybin"
argv.verbose   // --verbose
```

### Help and version

```js
var argv = require('yargs')

  // version
  .alias('v', 'version')
  .version(function() { return require('../package').version; })
  .describe('v', 'show version information')

  // help text
  .alias('h', 'help')
  .help('help')
  .usage('Usage: $0 -x [num]')
  .showHelpOnFail(false, "Specify --help for available options")
```

### Options

```js
  .option('f', {
      alias : 'file',
      describe: 'x marks the spot',
      type: 'string', /* array | boolean | string */
      nargs: 1,
      demand: true,
      demand: 'file is required',
      default: '/etc/passwd'
      // also: count:true, requiresArg:true
  })

  .options({
    f: { ... }
  })
```

### Examples and more help stuff

```js
  // more help
  .example('...')
  .epilog('copyright 2015')
  .command('start', 'start a server')
```

### Stacking

```js
  .count('verbose')

argv.verbose // -vvv => 3
```

### Reject non explicits

```js
  .strict()
```

### Methods

```
yargs.showHelp()
yargs.help() //=>string
```
