---
title: DOM Selection
category: JavaScript
layout: 2017/sheet
intro: |
  Quick introduction to the HTML [DOM selection API](https://devdocs.io/dom/selection).
---

## Reference
{: .-three-column}

### Selection

```js
var sel = document.getSelection()
```

See: <https://devdocs.io/dom/selection>

### Methods

```js
sel.removeAllRanges() //  deselects
sel.addRange(range) //    sets a selection
sel.removeRange(range) // remove a range
```

```js
sel.rangeCount
sel.getRangeAt(0) // get the 0th range
```

### Collapsing

```js
sel.collapse(parent, offset)
sel.collapseToEnd()
sel.collapseToStart()
sel.isCollapsed
```

```js
sel.containsNode(node)
```

### Deleting

```js
sel.deleteFromDocument()
```

### Events

```js
document.addEventListener('selectionchange', () => {})
```
