---
title: Virtual-dom
category: JavaScript libraries
---

### About

See <https://www.npmjs.com/package/virtual-dom>

### Example

```js
var h = require('virtual-dom/h')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var createElement = require('virtual-dom/create-element')
```

### Rendering

```js
tree = h('div', { style: { color: 'blue' } }, [ 'hello' ])
el = createElement(tree)
document.body.appendChild(root)
```

### Updating

```js
tree2 = h('div', { style: { color: 'blue' } }, [ 'hello world' ])
delta = diff(tree, tree2)
el = patch(el, delta) // patch() modifies el
```
