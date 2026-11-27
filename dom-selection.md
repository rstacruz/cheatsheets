---
title: DOM Selection
subtitle: Text selection API
logo: { set: icon-park-outline, name: browser }
category: Browser APIs
intro: |
  Quick introduction to the HTML [DOM selection API](https://devdocs.io/dom/selection).
last_verified_with: "WHATWG DOM Standard, Selection API."
updated: 2026-11-25
tier: t3
links:
  - title: Selection
    url: https://developer.mozilla.org/en-US/docs/Web/API/Selection
---

## Reference

<!-- {: .-three-column} -->

### Selection

```js
var sel = document.getSelection()
```

See: [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection)

### Methods

```js
sel.removeAllRanges() //  deselects
sel.addRange(range) //    sets a selection
sel.removeRange(range) // remove a range
```

#### Inspect ranges

```js
sel.rangeCount
sel.getRangeAt(0) // get the 0th range
```

See: [Selection methods](https://developer.mozilla.org/en-US/docs/Web/API/Selection#instance_methods)

### Collapsing

```js
sel.collapse(parent, offset)
sel.collapseToEnd()
sel.collapseToStart()
sel.isCollapsed
```

#### Check containment

```js
sel.containsNode(node)
```

See: [Selection.collapse()](https://developer.mozilla.org/en-US/docs/Web/API/Selection/collapse)

### Deleting

```js
sel.deleteFromDocument()
```

See: [Selection.deleteFromDocument()](https://developer.mozilla.org/en-US/docs/Web/API/Selection/deleteFromDocument)

### Events

```js
document.addEventListener(
  'selectionchange', () => {}
)
```

See: [selectionchange event](https://developer.mozilla.org/en-US/docs/Web/API/Document/selectionchange_event)
