---
title: Jshint
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-09-12
---

### Relaxing

Enable these options to *not* throw errors in these conditions.
See: [Relaxing](http://www.jshint.com/docs/options/#relaxing-options)
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
/* jshint laxcomma: true */
var one = 1
  , two = 2;
```

```js
/* jshint loopfunc: true */
for (i=0; i<10; x++) {
  (function(i) { ... })(i);
}
```

```js
/* jshint sub: true */
process.env['name_here']
```

```js
/* jshint strict: "global" */
"use strict";
```

### Enforcing

Enable these options to catch more errors.
See: [Enforcing](http://www.jshint.com/docs/options/#enforcing-options)
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
/* jshint es3: true */
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
/* jshint indent: 4 */
if (x) {                        // err: expected indent of 4, found 2
  ...;
}
```

```js
/* jshint quotmark: single */
/* jshint quotmark: double */
alert("hi");                    // err: only single allowed
```

```js
/* jshint strict: true */
function() { ... }              // err: need "use strict"
```

```js
/* jshint white: true, indent: 4 */
/* jshint maxdepth: 2 */
/* jshint maxparams: 3 */
/* jshint maxstatements: 4 */
/* jshint maxcomplexity: 5 */
/* jshint maxlen: 80 */
```

### Ignore

```js
/* jshint ignore:start */
/* jshint ignore:end */
```

### Globals and Environments

```js
/* jshint undef: true */
/* global jQuery */
/* global -BAD_LIB */
```

```js
/* jshint devel: true */   console, alert, ...
/* jshint browser: true */ window, document, location, ...
/* jshint node: true */    module, exports, console, process, ...
/* jshint jquery: true */  jQuery, $
```

See: [Environments](http://www.jshint.com/docs/options/#environments)

### Also see

* <http://www.jshint.com/docs/options/>
* <https://gist.github.com/haschek/2595796>
