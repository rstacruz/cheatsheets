---
title: minimist
layout: default
---

```js
var args = require('minimist')(process.argv.slice(2), {
  string: 'lang',
  boolean: 'pager',
  alias: { h: 'help', v: 'version' }
});

// --lang xml --no-pager -h index.js package.json
args == {
  lang: 'xml', pager: false,
  h: true, help: true,
  _: [ 'index.js', 'package.json' ]
}
```

```js
if (args.help || args._.length === 0) {
  var cmd = require('path').basename(process.argv[1]);
  console.log(
    require('fs')
      .readFileSync(__dirname+'/../help.txt','utf-8')
      .replace(/\$0/g, cmd)
      .trim());
  process.exit();
}

if (args.version) {
  console.log(require('../package.json').version);
  process.exit();
}
```

### Help.txt

```
Usage:
    $0 FILES [options]

Options:
    -h, --help         print usage information
    -v, --version      show version info and exit
```

### Reference

 * https://www.npmjs.org/package/minimist
 * https://github.com/substack/minimist
