---
title: Layout thrashing
category: HTML
---

### Things that cause invalidation

Element

    clientHeight
    clientLeft
    clientTop
    clientWidth
    focus
    getBoundingClientRect
    getClientRects
    innerText
    offsetHeight
    offsetLeft
    offsetParent
    offsetTop
    offsetWidth
    outerText
    scrollByLines
    scrollByPages
    scrollHeight
    scrollIntoView
    scrollIntoViewIfNeeded
    scrollLeft
    scrollTop
    scrollWidth

MouseEvent

    layerX
    layerY
    offsetX
    offsetY

Window

    getComputedStyle
    scrollBy
    scrollTo
    scrollX
    scrollY

Frame, Document & Image

    height
    width

jQuery

    $.fn.offset
    $.fn.offsetParent
    $.fn.position
    $.fn.scrollLeft
    $.fn.scrollTop
    $.fn.css('...')
    $.fn.text('...')
    $(':hidden')
    $(':contains')

### Reference

 * http://www.kellegous.com/j/2013/01/26/layout-performance/
 * https://gist.github.com/desandro/4657744
 * 
 http://stackoverflow.com/questions/17199958/why-does-setting-textcontent-cause-layout-thrashing
