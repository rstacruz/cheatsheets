---
title: jQuery
category: JavaScript libraries
tags: [WIP]
weight: -1
---

### Traversing

```js
$('.box')
  .children()
  .closest('div')
  .filter(':selected')
  .find('div')
  .has('div')
  .first()
  .next('div')
  .nextUntil('div')
```

## Advanced features

### Extending selectors

```js
$.expr[':'].inline = function (el) {
  return $(el).css('display') === 'inline'
}
```

Enables `$(':inline')`

### Extend CSS properties

```js
$.cssHooks.someCSSProp = {
  get: function (elem, computed, extra) {
  },
  set: function (elem, value) {
  }
}

// Disable "px"
$.cssNumber["someCSSProp"] = true
```

### fn.animate() hooks

```js
$.fn.step.someWhatever = function(fx) {
  // ...
}
```
