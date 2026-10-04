---
title: JSHint
category: JavaScript libraries
updated: 2026-10-04
intro: |
  JSHint is configured with inline `/* jshint ... */` directives.
---

### Introduction
{: .-intro}

JSHint is configured with inline `/* jshint ... */` directives.

- [JSHint options](https://jshint.com/docs/options/) _(jshint.com)_

### Relaxing

Enable these options to *not* throw errors in these conditions.
{: .-setup}

```js
/* jshint asi: true */
allow()
missing_semicolons()
```

```js
/* jshint boss: true */
if (m = str.match(/.../))
```

```js
/* jshint debug: true */
debugger;
```

```js
/* jshint eqnull: true */
if (x == null)
```

```js
/* jshint evil: true */
eval('...')
```

```js
/* jshint expr: true */
production && minify = true;
div.innerWidth;
expect(x).be.true;
```

```js
/* jshint laxcomma: true */     // (deprecated)
var one = 1
  , two = 2;
```

```js
/* jshint sub: true */          // (deprecated)
process.env['name_here']
```

```js
/* jshint loopfunc: true */
for (i = 0; i < 10; i++) {
  (function(i) { ... })(i);
}
```

```js
/* jshint strict: "global" */
"use strict";
```

See: [Relaxing options](https://jshint.com/docs/options/#relaxing-options) _(jshint.com)_

### Enforcing

Enable these options to catch more errors.
{: .-setup}

```js
/* jshint curly: true */
while (day)                     // err: use { }'s
  shuffle();
```

```js
/* jshint eqeqeq: true */
if (a == null)                  // err: use ===
```

```js
/* jshint esversion: 3 */
// ...for legacy IE compatibility
a.default = function() { ... }; // err: reserved word
array = [ 1, 2, 3, ];           // err: extra comma
```

```js
/* jshint forin: true */
for (key in obj) { ... }        // err: check obj.hasOwnProperty(key)
```

```js
/* jshint freeze: true */
Array.prototype.count = ...;    // err: don't modify native prototypes
```

```js
/* jshint esversion: 6 */
const sum = (a, b) => a + b     // allow ES6 syntax
```

```js
/* jshint quotmark: single */   // (deprecated)
/* jshint quotmark: double */
alert("hi");                    // err: only single allowed
```

```js
/* jshint strict: true */
function() { ... }              // err: need "use strict"
```

```js
/* jshint indent: 4, maxlen: 80 */  // (deprecated)
/* jshint maxdepth: 2 */
/* jshint maxparams: 3 */
/* jshint maxstatements: 4 */
/* jshint maxcomplexity: 5 */
```

See: [Enforcing options](https://jshint.com/docs/options/#enforcing-options) _(jshint.com)_

### Ignore

```js
/* jshint ignore:start */
/* jshint ignore:end */
```

See: [JSHint options](https://jshint.com/docs/options/) _(jshint.com)_

### Globals and Environments

```js
/* jshint undef: true */
/* globals jQuery */
/* globals -BAD_LIB */
```

```js
/* jshint devel: true */   console, alert, ...
/* jshint browser: true */ window, document, location, ...
/* jshint node: true */    module, exports, console, process, ...
/* jshint jquery: true */  jQuery, $
```

See: [Environments](https://jshint.com/docs/options/#environments) _(jshint.com)_

### Also see

* <https://jshint.com/docs/options/>
* <https://gist.github.com/haschek/2595796>
