---
title: DOM Range
subtitle: Document range API
category: Browser APIs
intro: |
  Quick reference to the HTML [DOM createRange API](https://devdocs.io/dom/range).
last_verified_with: "WHATWG DOM Standard."
updated: 2026-11-25
tier: t3
links:
  - title: Range
    url: https://developer.mozilla.org/en-US/docs/Web/API/Range
---

## Reference

<!-- {: .-three-column} -->

### Creating ranges

```js
var range = document.createRange()
```

See: [Document.createRange()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createRange)

### Methods

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

See: [Range](https://developer.mozilla.org/en-US/docs/Web/API/Range#instance_methods)

### Collapsing

```js
range.collapse() // to end
range.collapse(true) // to start
range.collapsed // true | false
```

See: [Range.collapse()](https://developer.mozilla.org/en-US/docs/Web/API/Range/collapse)

### Operations

#### Copy and remove

```js
range.cloneContents() // copy
range.extractContents() // cut
range.deleteContents() // delete
```

#### Insert

```js
range.insertNode(node)
```

Both `cloneContents()` and `extractContents()` return a DocumentFragment; `insertNode()` returns nothing.

See: [Range methods](https://developer.mozilla.org/en-US/docs/Web/API/Range#instance_methods)

### String

```js
range.toString()
```

See: [Range.toString()](https://developer.mozilla.org/en-US/docs/Web/API/Range/toString)

### Read-only attributes

```js
range.collapsed //       => true/false
range.startContainer //  => Node
range.startOffset
range.endContainer //    => Node
range.endOffset
// closest shared ancestor
range.commonAncestorContainer
```

See: [Range properties](https://developer.mozilla.org/en-US/docs/Web/API/Range#instance_properties)
