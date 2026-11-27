---
title: jQuery
subtitle: DOM manipulation library
logo: { src: /assets/logos/jquery.svg, mono: true }
category: Hidden
# Unfinished overview: selectors and internals, no events or AJAX.
tags: [Archived]
archived: |
  This unfinished overview stops at selectors and a few extension hooks; it
  has no events, effects, or AJAX coverage. Use the
  [jQuery API documentation](https://api.jquery.com/).
weight: -1
last_verified_with: "jQuery 4.1.0."
updated: 2026-11-25
intro: |
  [jQuery](https://api.jquery.com/) is a JavaScript library for selecting and traversing DOM elements. This sheet covers selectors, traversal methods, selector extensions, and CSS hooks.
links:
  - title: jQuery API documentation
    url: https://api.jquery.com/
  - title: jQuery Learning Center
    url: https://learn.jquery.com/
  - title: jQuery repository
    url: https://github.com/jquery/jquery
---

## Selecting

### Selecting

```js
$('.box')
$('#main')
$('div > p')
```
<!-- {: data-highlight="$('.box'); $('#main'); $('div > p')"} -->

See: [jQuery()](https://api.jquery.com/jQuery/)

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

See: [Traversing](https://api.jquery.com/category/traversing/)

## Advanced features

### Extending selectors

```js
$.expr.pseudos.inline = function (el) {
  return $(el).css('display') === 'inline'
}
```
<!-- {: data-highlight="$.expr.pseudos"} -->

Enables `$(':inline')`; `$.expr[':']` is still an alias for `$.expr.pseudos` in jQuery 4.

See: [jQuery.find()](https://api.jquery.com/jQuery.find/)

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
<!-- {: data-highlight="$.cssHooks"} -->

See: [jQuery.cssHooks](https://api.jquery.com/jQuery.cssHooks/), [jQuery.cssNumber](https://api.jquery.com/jQuery.cssNumber/)

### Animation step hooks

```js
$('.box').animate({ width: 200 }, {
  step: function (now, fx) {
    console.log(fx.prop, now)
  }
})
```
<!-- {: data-highlight="step: function"} -->

Use the `step` option to inspect each animation frame.

See: [.animate()](https://api.jquery.com/animate/)
