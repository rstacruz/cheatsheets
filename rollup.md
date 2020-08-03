---
title: Rollup.js
category: JavaScript libraries
layout: 2017/sheet
updated: 2020-01-29
authors:
  - github: ryanSN
keywords:
  - rollup.watch
  - bundle
  - rollup.config.js
intro: |
  [Rollup](https://rollupjs.org/) Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.
---

### Basic config

#### rollup.config.js

```js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
}
```
#### Terminal

```bash
npm install -D rollup
```

| Command                                | Description         |
| ---                                    | ---                 |
| `rollup -c -o bundle.js`               | bundle using config |
| `rollup main.js --o bundle.js --f cjs` | bundle              |
| `rollup --watch`                       | bundle continuously |

You may need to use `./node_modules/.bin/rollup` as a command if you did not install rollup globally.

### Multiple outputs

#### rollup.config.js

```js
export default [
  {
    input: 'src/main.js',
    output: {
      file: __dirname + '/public/main.js',
      format: 'cjs',
      name: 'main'
    }
  },
  {
    input: 'src/vendor.js',
    output: {
      file: __dirname + 'public/vendor.js',
      format: 'cjs',
      name: 'vendor'
    }
  }
]
```

This creates `main.js` and `vendor.js`.

## Using plugins

### Plugins

#### Terminal

```bash
npm install -D @rollup/plugin-json
```

#### rollup.config.js

```js
import json from '@rollup/plugin-json'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ json() ]
}

```

### npm packages

#### Terminal
```bash
npm install -D @rollup/plugin-node-resolve
```

#### rollup.config.js
```js
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ resolve() ]
}
```

When you run a npm run build, no warning is emitted and contains the imported modules.

### Peer dependencies

#### Terminal

```bash
npm install -D @rollup/plugin-node-resolve
```

#### rollup.config.js

```js
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [resolve({
    // pass custom options to the resolve plugin
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  })],
  // indicate which modules should be treated as external
  external: ['lodash']
}
```

### Babel

#### Terminal

```bash
npm install -D rollup-plugin-babel
```

#### rollup.config.js

```js
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}
```

#### src/.babelrc

```js
{
  "presets": [
    ["latest", {
      "es2015": {
        "modules": false
      }
    }]
  ],
  "plugins": ["external-helpers"]
}
```
