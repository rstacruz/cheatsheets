---
title: Layout thrashing
subtitle: Forced reflow performance issue
# Reproduces browser API lists from a 2015 layout audit.
category: Hidden
tags: [Archived]
archived: |
  This reproduces the browser-specific property lists from a 2015 layout audit rather than current browser APIs. Use the [web.dev guide](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing) instead.
description: ""
updated: 2026-11-23
weight: -1
intro: |
  These DOM properties and methods can force synchronous layout. Batch reads before writes to avoid bottlenecks in your UI performance.
links:
  - title: Layout thrashing
    url: https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
---

## Layout thrashing

<!-- {: .-one-column} -->

### Things that cause invalidation

#### Element

  - clientHeight
  - clientLeft
  - clientTop
  - clientWidth
  - focus
  - getBoundingClientRect
  - getClientRects
  - innerText
  - offsetHeight
  - offsetLeft
  - offsetParent
  - offsetTop
  - offsetWidth
  - outerText
  - scrollByLines
  - scrollByPages
  - scrollHeight
  - scrollIntoView
  - scrollIntoViewIfNeeded
  - scrollLeft
  - scrollTop
  - scrollWidth

<!-- {: .-six-column} -->

#### MouseEvent

  - layerX
  - layerY
  - offsetX
  - offsetY

<!-- {: .-enum-lines} -->

#### Window

  - getComputedStyle
  - scrollBy
  - scrollTo
  - scrollX
  - scrollY

<!-- {: .-six-column} -->

#### Frame, Document & Image

  - height
  - width

<!-- {: .-enum-lines} -->

#### jQuery

  - $.fn.offset
  - $.fn.offsetParent
  - $.fn.position
  - $.fn.scrollLeft
  - $.fn.scrollTop
  - $.fn.css('...')
  - $.fn.text('...')
  - $(':hidden')
  - $(':contains')

<!-- {: .-six-column} -->

### Read, then write

```js
// Bad: read-write-read-write forces layout
for (const p of paragraphs) {
  p.style.width = `${box.offsetWidth}px`;
}

// Good: read once, then write
const width = box.offsetWidth;
for (const p of paragraphs) {
  p.style.width = `${width}px`;
}
```

Batch style reads before writes to avoid forced reflow.

## Also see

 * <https://kellegous.com/j/2013/01/26/layout-performance/>
 * <https://gist.github.com/desandro/4657744>
 * <https://stackoverflow.com/questions/17199958/why-does-setting-textcontent-cause-layout-thrashing>
