---
title: Gremlins.js
category: JavaScript libraries
layout: 2017/sheet
updated: 2017-10-22
weight: -1
intro: |
  [Gremlins](https://github.com/marmelab/gremlins.js) is a JavaScript library to do "monkey-testing" by providing random user input (clicks, scrolls, and so on).
---

## Example

### Simple example

```html
<script src='https://cdn.jsdelivr.net/npm/gremlins/dist/gremlins.js'></script>
<script>
gremlins.createHorde().unleash()
</script>
```

![](https://camo.githubusercontent.com/130e101ee69d4d9b6f065df0a0404c861eb5ce18/687474703a2f2f7374617469632e6d61726d656c61622e636f6d2f746f646f2e676966?q=99)

### Custom gremlins

```js
gremlins.createHorde()
  .allGremlins()
  .gremlin(function () {
    document.activeElement.blur()
  })
```
{: data-line="3,4,5"}

Runs the given function at regular intervals.

### Full example

```js
gremlins.createHorde()
  .gremlin(gremlins.species.formFiller())
  .gremlin(gremlins.species.clicker()
    .clickTypes(['click'])
    .canClick(element => { ··· })
    .showAction((x, y) => { ··· }))
  .gremlin(gremlins.species.scroller())
  .mogwai(gremlins.mogwais.alert())
  .mogwai(gremlins.mogwais.fps())
  .mogwai(gremlins.mogwais.gizmo().maxErrors(2))
  .unleash()
```

By default, all gremlins and mogwais species are added to the horde. Do it this way to customize gremlins.

See: [Specifying gremlins](https://github.com/marmelab/gremlins.js#setting-gremlins-and-mogwais-to-use-in-a-test)

## Hooks

### Before and after

```js
gremlins.createHorde()
  .before(function () {
    this.log('sync')
    console.profile('gremlins')
  })
  .after(function () {
    this.log('done')
    console.profileEnd()
  })
```
{: data-line="2,6"}

### Asynchronous

```js
gremlins.createHorde()
  .before(function (done) {
    setTimeout(() => {
      this.log('async')
      done()
    }, 500)
  })
```
{: data-line="2"}

## References

- [marmelab/gremlins.js](https://github.com/marmelab/gremlins.js)
