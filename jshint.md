---
title: JSHint
subtitle: JavaScript linter
logo: { set: icon-park-outline, name: code }
category: Build tools
last_verified_with: "JSHint 2.13.6."
updated: 2026-11-25
tier: t3
intro: |
  JSHint is configured with inline `/* jshint ... */` directives.

links:
  - title: JSHint options
    url: https://jshint.com/docs/options/
---

### Relaxing

```js
/* jshint asi: true */
allow()
missing_semicolons()
```
<!-- {: data-highlight="asi"} -->

```js
/* jshint boss: true */
if (m = str.match(/.../))
```
<!-- {: data-highlight="boss"} -->

```js
/* jshint debug: true */
debugger;
```
<!-- {: data-highlight="debug"} -->

```js
/* jshint eqnull: true */
if (x == null)
```
<!-- {: data-highlight="eqnull"} -->

```js
/* jshint evil: true */
eval('...')
```
<!-- {: data-highlight="evil"} -->

```js
/* jshint expr: true */
production && minify = true;
div.innerWidth;
expect(x).be.true;
```
<!-- {: data-highlight="expr"} -->

```js
/* jshint laxcomma: true */     // (deprecated)
var one = 1
  , two = 2;
```
<!-- {: data-highlight="laxcomma"} -->

```js
/* jshint sub: true */          // (deprecated)
process.env['name_here']
```
<!-- {: data-highlight="sub"} -->

```js
/* jshint loopfunc: true */
for (i = 0; i < 10; i++) {
  (function(i) { ... })(i);
}
```
<!-- {: data-highlight="loopfunc"} -->

```js
/* jshint strict: "global" */
"use strict";
```
<!-- {: data-highlight="global"} -->

These options suppress the errors shown above.

See: [JSHint options](https://jshint.com/docs/options/)

### Enforcing

```js
/* jshint curly: true */
while (day)                     // err: use { }'s
  shuffle();
```
<!-- {: data-highlight="curly"} -->

```js
/* jshint eqeqeq: true */
if (a == null)                  // err: use ===
```
<!-- {: data-highlight="eqeqeq"} -->

```js
/* jshint esversion: 3 */
// ...for legacy IE compatibility
a.default = function() { ... }; // err: reserved word
array = [ 1, 2, 3, ];           // err: extra comma
```
<!-- {: data-highlight="esversion: 3"} -->

```js
/* jshint forin: true */
for (key in obj) { ... }        // err: check obj.hasOwnProperty(key)
```
<!-- {: data-highlight="forin"} -->

```js
/* jshint freeze: true */
Array.prototype.count = ...;    // err: don't modify native prototypes
```
<!-- {: data-highlight="freeze"} -->

```js
/* jshint esversion: 6 */
const sum = (a, b) => a + b     // allow ES6 syntax
```
<!-- {: data-highlight="esversion: 6"} -->

```js
/* jshint quotmark: single */   // (deprecated)
/* jshint quotmark: double */
alert("hi");                    // err: only single allowed
```
<!-- {: data-highlight="quotmark"} -->

```js
/* jshint strict: true */
function() { ... }              // err: need "use strict"
```
<!-- {: data-highlight="strict: true"} -->

```js
/* jshint indent: 4, maxlen: 80 */  // (deprecated)
/* jshint maxdepth: 2 */
/* jshint maxparams: 3 */
/* jshint maxstatements: 4 */
/* jshint maxcomplexity: 5 */
```
<!-- {: data-highlight="maxdepth; maxparams; maxstatements; maxcomplexity"} -->

These options flag more cases as errors.

See: [JSHint options](https://jshint.com/docs/options/)

### Ignore

```js
/* jshint ignore:start */
/* jshint ignore:end */
```
<!-- {: data-highlight="ignore:start; ignore:end"} -->

See: [Inline configuration](https://jshint.com/docs/#inline-configuration)

### Globals and environments

```js
/* jshint undef: true */
/* globals jQuery */
/* globals -BAD_LIB */
```
<!-- {: data-highlight="undef; globals"} -->

```js
/* jshint devel: true */   console, alert, ...
/* jshint browser: true */ window, document, location, ...
/* jshint node: true */    module, exports, console, process, ...
/* jshint jquery: true */  jQuery, $
```
<!-- {: data-highlight="devel; browser; node; jquery"} -->

See: [globals option](https://jshint.com/docs/options/#globals)

### Also see

* [JSHint options](https://jshint.com/docs/options/)
* [JSHint options gist](https://gist.github.com/haschek/2595796)
