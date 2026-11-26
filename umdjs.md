---
title: Universal JS module loader
subtitle: Universal module definition pattern
category: Build tools
tier: t3
last_verified_with: "UMD templates (umdjs/umd master)."
updated: 2026-11-26
---

## Reference

- [UMD repository](https://github.com/umdjs/umd)

## Patterns

### With dependency

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

See: [returnExports.js template](https://github.com/umdjs/umd/blob/master/templates/returnExports.js)

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

See: [Regular module patterns](https://github.com/umdjs/umd#regular-module)

### Supports circular references

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

See: [commonjsStrict.js template](https://github.com/umdjs/umd/blob/master/templates/commonjsStrict.js)
