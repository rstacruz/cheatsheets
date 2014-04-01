---
title: Jshint
layout: default
---

### Relaxing

    /* expr: true */
    production && minify = true;

    /* loopfunc: true */
    for (i=0; i<10; x++) {
      (function(i) {
      })(i);
    }

    /* sub: true */
    process.env['name_here'];

### Enforcement

    /* es3: true (legacy IE compatibility) */
    a.default = function() { ... };
    array = [ 1, 2, 3, ];

### Environments

    browser /* window, document, ... */
    node    /* module, exports, console, process, ... */
    jquery  /* jQuery, $ */



    
### Also see

 * www.jshint.com/docs/options/
 * https://gist.github.com/haschek/2595796

