---
title: Rollup.js
subtitle: JavaScript module bundler with tree-shaking
logo: { src: /assets/logos/rollup.svg }
category: Build tools
updated: 2026-11-18
last_verified_at: 2026-11-18
authors:
  - github: ryanSN
tier: t2
last_verified_with: "rollup 4.68.8."
fragments:
  - "rollup -c"
  - "rollup -c -w"
  - "npx rollup"
  - "-o bundle.js"
  - "-f es"
  - "input:"
  - "output:"
  - "output.dir"
  - "format: 'es'"
  - "dist/cjs"
  - "external:"
  - "globals:"
  - "treeshake:"
  - "watch:"
  - "nodeResolve()"
  - "commonjs()"
  - "babelHelpers"
  - "terser()"
intro: |
  Rollup bundles ES modules into a single file or chunks. It tree-shakes
  unused code and uses plugins for JSON, CommonJS, Babel, and minification.
links:
  - title: Rollup documentation
    url: https://rollupjs.org/
  - title: CLI reference
    url: https://rollupjs.org/command-line-interface/
  - title: Configuration options
    url: https://rollupjs.org/configuration-options/
  - title: Official plugins
    url: https://github.com/rollup/plugins
keywords:
  - rollup
  - rollup.config.js
  - module bundler
  - tree-shaking
  - rollup plugins
---

## Getting started

### Install locally

```bash
npm install --save-dev rollup
```
<!-- {: data-highlight="--save-dev"} -->

See: [Installing Rollup locally](https://rollupjs.org/tutorial/#installing-rollup-locally)

### Check version

```bash
npx rollup --version
```
<!-- {: data-highlight="--version"} -->

Use `npx` for local commands without a global install.

See: [CLI reference](https://rollupjs.org/command-line-interface/)

### Bundle from the CLI

```bash
rollup src/main.js -o bundle.js -f es
```
<!-- {: data-highlight="-o bundle.js; -f es"} -->

`-o` sets the output file; `-f` selects the format.

See: [Quick start](https://rollupjs.org/introduction/#quick-start)

### Use a config file

#### rollup.config.mjs

```js
export default {
  input: 'src/main.js',
  output: { file: 'dist/bundle.js', format: 'es' }
}
```

#### Terminal

```bash
rollup -c
rollup --config rollup.config.prod.mjs
```
<!-- {: data-highlight="-c; --config"} -->

`rollup -c` reads `rollup.config.mjs`; `--config` selects another file.

See: [Configuration files](https://rollupjs.org/command-line-interface/#configuration-files)

### Watch files

```bash
rollup -c -w
```
<!-- {: data-highlight="-w"} -->

Rebuild on source changes while the process runs.

See: [Command line flags](https://rollupjs.org/command-line-interface/#command-line-flags)

## Output

### Single file

```js
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true
  }
}
```
<!-- {: data-highlight="file"} -->

`file` names one bundle; `sourcemap` emits a `.map` beside it.

See: [output.file](https://rollupjs.org/configuration-options/#output-file)

### Multiple outputs

```js
export default {
  input: 'src/main.js',
  output: [
    { dir: 'dist/es', format: 'es' },
    { dir: 'dist/cjs', format: 'cjs' }
  ]
}
```
<!-- {: data-highlight="dir"} -->

Rollup needs `output.dir` when it writes more than one chunk.

See: [output.dir](https://rollupjs.org/configuration-options/#output-dir)

### Multiple entries

```js
export default {
  input: {
    main: 'src/main.js',
    admin: 'src/admin.js'
  },
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="input"} -->

Each entry name becomes a chunk in `dist/`.

See: [input](https://rollupjs.org/configuration-options/#input)

### Output formats

| Format | Description |
| --- | --- |
| `es` | ES modules (default) |
| `cjs` | CommonJS |
| `iife` | Browser script |
| `umd` | Universal modules |
| `amd` | AMD modules |
| `system` | SystemJS modules |

See: [output.format](https://rollupjs.org/configuration-options/#output-format)

## Dependencies

### Keep packages external

```js
export default {
  input: 'src/main.js',
  external: ['lodash'],
  output: { file: 'dist/bundle.js', format: 'es' }
}
```
<!-- {: data-highlight="external"} -->

`external` leaves matching imports out of the bundle.

See: [external](https://rollupjs.org/configuration-options/#external)

### Map externals to globals

```js
export default {
  input: 'src/main.js',
  external: ['jquery'],
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'app',
    globals: { jquery: '$' }
  }
}
```
<!-- {: data-highlight="globals"} -->

`globals` maps external IDs to browser globals for `iife` builds.

See: [output.globals](https://rollupjs.org/configuration-options/#output-globals)

## Build behaviour

### Tree-shaking

```js
export default {
  input: 'src/main.js',
  treeshake: 'smallest',
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="smallest"} -->

`smallest` drops more code but assumes no side effects.

See: [treeshake](https://rollupjs.org/configuration-options/#treeshake)

### Watch config

```js
export default {
  input: 'src/main.js',
  output: { dir: 'dist', format: 'es' },
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
    buildDelay: 300,
    clearScreen: false
  }
}
```
<!-- {: data-highlight="watch"} -->

Apply with `rollup -c -w`.

See: [watch](https://rollupjs.org/configuration-options/#watch)

## Plugins

### JSON files

```js
import json from '@rollup/plugin-json'

export default {
  input: 'src/main.js',
  plugins: [json()],
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="json()"} -->

Import `.json` files as modules.

See: [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)

### Node modules

```js
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/main.js',
  plugins: [nodeResolve()],
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="nodeResolve()"} -->

Resolve bare imports from `node_modules`.

See: [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)

### CommonJS modules

```js
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  plugins: [nodeResolve(), commonjs()],
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="commonjs()"} -->

Put `commonjs()` before Babel when both plugins are used.

See: [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)

### Babel

```js
import { babel } from '@rollup/plugin-babel'

export default {
  input: 'src/main.js',
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    })
  ],
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="babelHelpers"} -->

Set `babelHelpers` explicitly; `bundled` inlines helpers.

See: [@rollup/plugin-babel](https://github.com/rollup/plugins/tree/master/packages/babel)

### Minify with terser

```js
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/main.js',
  plugins: [terser()],
  output: { dir: 'dist', format: 'es' }
}
```
<!-- {: data-highlight="terser()"} -->

Run `terser()` last so it minifies the finished bundle.

See: [@rollup/plugin-terser](https://github.com/rollup/plugins/tree/master/packages/terser)

## Also see

- [Rollup](https://rollupjs.org/)
- [CLI reference](https://rollupjs.org/command-line-interface/)
- [Configuration options](https://rollupjs.org/configuration-options/)
- [Official plugins](https://github.com/rollup/plugins)
- [Awesome Rollup](https://github.com/rollup/awesome)
