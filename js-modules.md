---
title: JavaScript Modules
subtitle: Syntax for ES modules
category: JavaScript
weight: -3
updated: 2026-11-25
last_verified_with: "ECMAScript 2026, Node.js 26.13.1."
tier: t3
intro: |
  ES modules (ESM) use `import` and `export`; each module is its own file.
links:
  - title: JavaScript modules
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
---

## ES modules

### Exporting

```js
export const x = 1              // named export
export function fn() {}         // named export
export { a, b }                 // named exports
export { x as y }               // renamed export
export default function () {}   // default export (one per module)
```
<!-- {: data-highlight="export"} -->

#### Re-exporting

```js
export { x } from './x.js'      // re-export named
export * from './x.js'          // re-export all named
```
<!-- {: data-highlight="export { x } from; export * from"} -->

A module has many named exports but only one default.

See: [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) _(developer.mozilla.org)_

### Importing

```js
import def from './mod.js'            // default export
import { a, b as c } from './mod.js'  // named exports
import * as ns from './mod.js'        // namespace object
import './setup.js'                   // side effects only
import def, { a } from './mod.js'     // default + named
```
<!-- {: data-highlight="import"} -->

Static imports are hoisted and must be top-level. Named imports are live
bindings, reflecting later changes in the exporting module.

See: [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) _(developer.mozilla.org)_

### Dynamic imports

#### Import on demand

```js
const mod = await import('./mod.js')
mod.default                        // the default export
```
<!-- {: data-highlight="await import('./mod.js')"} -->

#### Inside a condition

```js
if (needsChart) {
  const { Chart } = await import('./chart.js')
}
```
<!-- {: data-highlight="await import('./chart.js')"} -->

#### Module URL

```js
import.meta.url                    // → URL of this module
```
<!-- {: data-highlight="import.meta.url"} -->

`import()` returns a promise, so it works inside conditions. `import.meta.url`
is the module's own URL.

See: [import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import), [import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) _(developer.mozilla.org)_

## Browser

### Importing

#### index.html

```html
<script type="module" src="main.js"></script>
```
<!-- {: data-highlight='type="module"'} -->

Browser modules are deferred by default, and relative specifiers need the file
extension.

See: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) _(developer.mozilla.org)_

### Import maps

#### index.html

```html
<script type="importmap">
{ "imports": { "lodash": "/vendor/lodash.js" } }
</script>
```
<!-- {: data-highlight='type="importmap"'} -->

Bare specifiers (eg `import 'lodash'`) need an import map.

See: [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) _(developer.mozilla.org)_

## Node.js

### Module formats

| Extension | Module system                 |
| ---       | ---                           |
| `.mjs`    | Always ESM                    |
| `.cjs`    | Always CommonJS               |
| `.js`     | From `"type"` in package.json |

`.mjs` and `.cjs` set the format by extension; `.js` follows the nearest
package.json.

See: [Node.js: determining module system](https://nodejs.org/api/packages.html#determining-module-system) _(nodejs.org)_

### "type": "module"

#### package.json

```json
{ "type": "module" }
```
<!-- {: data-highlight='"type": "module"'} -->

With `"type": "module"`, `.js` files load as ES modules. Without it, they
default to CommonJS.

See: [Node.js: "type"](https://nodejs.org/api/packages.html#type) _(nodejs.org)_

### createRequire()

```js
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const legacy = require('./legacy.cjs')
```
<!-- {: data-highlight="createRequire"} -->

In ESM use `import`, not `require`. `createRequire()` builds a `require()` for
CommonJS packages.

A CJS `module.exports` becomes the default export when imported. Node 22.12+
can `require()` ESM that avoids top-level await.

See: [createRequire()](https://nodejs.org/api/module.html#modulecreaterequirefilename) _(nodejs.org)_
