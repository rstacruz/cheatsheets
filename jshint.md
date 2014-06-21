---
title: Jshint
layout: default
---

### Inline

    /* jshint undef: true */
    /* global jQuery */
    /* global -BAD_LIB */

### Relaxing

    /* jshint expr: true */
    production && minify = true;

    /* jshint loopfunc: true */
    for (i=0; i<10; x++) {
      (function(i) {
      })(i);
    }

    /* jshint sub: true */
    process.env['name_here'];

### Enforcement

    /* jshint es3: true (legacy IE compatibility) */
    a.default = function() { ... };
    array = [ 1, 2, 3, ];

    /* jshint white: true, indent: 4 */
    // check whitespace and indentation rules

### Ignore

    /* jshint ignore:start */
    /* jshint ignore:end */

### Environments

    /* jshint browser: true */ window, document, ...
    /* jshint node: true */    module, exports, console, process, ...
    /* jshint jquery: true */  jQuery, $

### Also see

 * http://www.jshint.com/docs/options/
 * https://gist.github.com/haschek/2595796

