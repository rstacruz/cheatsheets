---
title: DOM Selection
category: JavaScript
---

## Selection
See <http://devdocs.io/dom/selection>

```js
var selection = document.getSelection()
```

## Methods

```js
selection
  .removeAllRanges()   // deselects
  .addRange(range)     // sets a selection
  .removeRange(range)  // remove a range
```

```js
selection
  .rangeCount          // ranges
  .getRangeAt(0)       // get the 0th range
```

### Collapsing

```js
selection
  .collapse(parent, offset)
  .collapseToEnd()
  .collapseToStart()
  .isCollapsed
```

```js
selection
  .containsNode(node)
```

### Deleting

```js
selection
  .deleteFromDocument()
```

### Events

```js
document.addEventListener('selectionchange', () => {})
```
