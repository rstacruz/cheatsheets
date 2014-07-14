---
title: Jshint
layout: default
---

### Relaxing


    /* jshint asi: true */
    allow()
    missing_semicolons()

    /* jshint boss: true */
    if (m = str.match(/.../))

    /* jshint debug: true */
    debugger;

    /* jshint eqnull: true */
    if (x == null)

    /* jshint evil: true */
    eval('...')

    /* jshint expr: true */
    production && minify = true;

    /* jshint laxcomma: true */
    var one = 1
      , two = 2;

    /* jshint loopfunc: true */
    for (i=0; i<10; x++) {
      (function(i) { ... })(i);
    }

    /* jshint sub: true */
    process.env['name_here'];

### Enforcement

    /* jshint es3: true */
    // legacy IE compatibility
    a.default = function() { ... };
    array = [ 1, 2, 3, ];

    /* jshint white: true, indent: 4 */
    /* jshint maxdepth: 2 */
    /* jshint maxparams: 3 */
    /* jshint maxstatements: 4 */
    /* jshint maxcomplexity: 5 */
    /* jshint maxlen: 80 */

### Ignore

    /* jshint ignore:start */
    /* jshint ignore:end */

### Globals

    /* jshint undef: true */
    /* global jQuery */
    /* global -BAD_LIB */

    /* jshint browser: true */ window, document, ...
    /* jshint node: true */    module, exports, console, process, ...
    /* jshint jquery: true */  jQuery, $

### Also see

 * http://www.jshint.com/docs/options/
 * https://gist.github.com/haschek/2595796

