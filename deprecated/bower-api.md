---
title: Bower API
category: JavaScript libraries
layout: 2017/sheet
---

```js
require('bower').config
```

```js
{ cwd: '/Users/rsc',
  directory: 'bower_components',
  registry:
   { search: [ 'https://bower.herokuapp.com' ],
     register: 'https://bower.herokuapp.com',
     publish: 'https://bower.herokuapp.com' },
  shorthandResolver: 'git://github.com/{{owner}}/{{package}}.git',
  tmp: '/var/folders/5y/190gjd_j2c5bfkn563dk2xdr0000gn/T/rsc/bower',
  timeout: 30000,
  ca: { search: [] },
  strictSsl: true,
  userAgent: 'node/v0.10.33 darwin x64',
  color: true,
  storage:
   { packages: '/Users/rsc/.cache/bower/packages',
     links: '/Users/rsc/.local/share/bower/links',
     completion: '/Users/rsc/.local/share/bower/completion',
     registry: '/Users/rsc/.cache/bower/registry',
     empty: '/Users/rsc/.local/share/bower/empty' },
  interactive: false,
  argv: { remain: [], cooked: [], original: [] } }
```
