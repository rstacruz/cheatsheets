---
title: DOM Range
category: JavaScript
---

### Creating ranges
See <http://devdocs.io/dom/document/createrange>

```js
var range = document.createRange()
```

## Methods
See <http://devdocs.io/dom/range>

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

### Collapsing

```js
range
  .collapse()     // to end (a single point)
  .collapse(true) // to start (a single point)
  .collapsed      // true | false
```

### Operations

```js
range
  .cloneContents()   // copy => DocumentFragment
  .extractContents() // cut  => DocumentFragment
  .deleteContents()  // delete

  .insertNode(node)
```

### Etc

```js
range
  .toString()
```

### Read-only attributes

```js
range
  .collapsed         // true/false
  .startContainer    // Node
  .startOffset
  .endContainer      // Node
  .endOffset
  .commonAncestorContainer // closest of start and end containers
```
