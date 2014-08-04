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

### Reference

 * https://www.npmjs.org/package/minimist
 * https://github.com/substack/minimist
