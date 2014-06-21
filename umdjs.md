---
title: Universal JS module loader
layout: default
---

### Basic (with dependency)

~~~ js
;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.YourModule = factory(root.jQuery);
  }

}(this, function (jquery) {
  return {};
}));
~~~

### Basic (no dependency)

~~~ js
;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.YourModule = factory();
  }

}(this, function () {
  return {};
}));
~~~


### Reference

 * https://github.com/umdjs/umd
