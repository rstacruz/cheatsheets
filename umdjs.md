---
title: Universal JS module loader
category: JavaScript libraries
---

### Reference

 * <https://github.com/umdjs/umd>

### [With dependency](https://github.com/umdjs/umd/blob/master/amdWebGlobal.js)

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

### No dependencies

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

### [Supports circular references](https://github.com/umdjs/umd/blob/master/commonjsStrict.js)

~~~ js
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['exports', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(exports, require('jquery'));
  } else {
    factory((root.YourModule = {}), root.jQuery);
  }

}(this, function (exports, jQuery) {
  exports.action = function () {};
}));
~~~
