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

### Environments

    browser /* window, document, ... */
    node    /* module, exports, console, process, ... */
    jquery  /* jQuery, $ */



    
### Also see

 * http://www.jshint.com/docs/options/
 * https://gist.github.com/haschek/2595796

