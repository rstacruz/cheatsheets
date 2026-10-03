---
title: Layout thrashing
category: HTML
description: ""
updated: 2017-10-19
weight: -1
intro: |
  These are CSS properties that will cause "layout thrashing". Avoid changing them to prevent bottlenecks in your UI performance.
---

## Layout thrashing
{: .-one-column}

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
{: .-six-column}

#### MouseEvent

  - layerX
  - layerY
  - offsetX
  - offsetY
{: .-six-column}

#### Window

  - getComputedStyle
  - scrollBy
  - scrollTo
  - scrollX
  - scrollY
{: .-six-column}

#### Frame, Document & Image

  - height
  - width
{: .-six-column}

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
{: .-six-column}

## Also see

 * <http://www.kellegous.com/j/2013/01/26/layout-performance/>
 * <https://gist.github.com/desandro/4657744>
 * <http://stackoverflow.com/questions/17199958/why-does-setting-textcontent-cause-layout-thrashing>
