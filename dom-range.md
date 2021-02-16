---
title: DOM Range
category: JavaScript
layout: 2017/sheet
intro: |
  Quick reference to the HTML [DOM createRange API](https://devdocs.io/dom/range).
---

## Reference
{:.-three-column}

### Creating ranges

```js
var range = document.createRange()
```

See: <https://devdocs.io/dom/document/createrange>

## Methods

```js
range
  .setStart(startNode, startOffset)
  .setEnd(endNode, endOffset)

  .setStartBefore(node)
  .setStartAfter(node)
  .setEndBefore(node)
  .setEndAfter(node)

  .selectNode(node)
  .selectNodeContents(node)
```

See: <https://devdocs.io/dom/range>

### Collapsing

```js
range.collapse() // to end (a single point)
range.collapse(true) // to start (a single point)
range.collapsed // true | false
```

### Operations

```js
range.cloneContents() // copy => DocumentFragment
range.extractContents() // cut  => DocumentFragment
range.deleteContents() // delete
```

```js
range.insertNode(node)
```

### String

```js
range.toString()
```

### Read-only attributes

```js
range.collapsed //       => true/false
range.startContainer //  => Node
range.startOffset
range.endContainer //    => Node
range.endOffset
range.commonAncestorContainer // closest of start and end containers
```
