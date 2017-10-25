---
title: DOM vs. jQuery
category: JavaScript libraries
layout: 2017/sheet
---

## Selectors
{: .-versus.-no-hide}

### Selectors

```js
$('.selector')
```

```js
document.querySelector('.selector')
document.querySelectorAll('.selector')
```

### Iteration

```js
$('.selector').each(function () {
  $(this)
})
```

```js
const elements = document.querySelectorAll('.selector')

Array.from(elements).forEach(el => {
  ···
})
```

The result of some DOM operations return NodeLists (eg, `querySelectorAll`, `children`, and others). These can't be iterated via `.forEach()` until you convert them to arrays using `Array.from()`.

## Classes
{: .-versus}

### Add class

```js
$(el).addClass('expanded')
```

```js
el.classList.add('expanded')
```

See: [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

### Remove class

```js
$(el).removeClass('expanded')
```

```js
el.classList.remove('expanded')
```

### Toggle class

```js
el.toggleClass('expanded')
```

```js
el.classList.toggle('expanded')
```

### Replace class

```js
el.hasClass('expanded')
```

```js
el.classList.contains('expanded')
```

### Update class

```js
$(el).removeClass('collapsed')
$(el).addClass('expanded')
```

```js
el.classList.replace('collapsed', 'expanded')
```

## DOM ready
{: .-versus}

### Document ready

```js
$(function () {
  console.log('loaded')
})
```

```js
function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(() => {
  console.log('loaded')
})
```

The [dom-loaded](https://www.npmjs.com/package/dom-loaded) npm package takes care of this for you.

## Attributes
{: .-versus}

### Get attribute

```js
$(el).attr('tabindex')
```

```js
el.getAttribute('tabindex')
```

### Set attribute

```js
$(el).attr('tabindex', 3)
```

```js
el.setAttribute('tabindex', 3)
```

### Remove attribute

```js
$(el).removeAttr('hidden')
```

```js
el.removeAttribute('hidden')
```

## Properties
{: .-versus}

### Get checked

```js
$(el).prop('checked')
```

```js
el.checked
```

### Set checked

```js
$(el).prop('checked', true)
```

```js
el.checked = true
```

### Get disabled

```js
$(el).prop('disabled')
```

```js
el.disabled
```

### Set disabled

```js
$(el).prop('disabled', true)
```

```js
el.disabled = true
```

## Traversing
{: .-versus}

### Children

```js
$(el).children()
```

```js
el.children
```

### Parent

```js
$(el).parent()
```

```js
el.parentNode
```

### Siblings

```js
$(el).next()
$(el).previous()
```

```js
el.nextSibling
el.previousSibling
```

### Closest match

```js
$(el).closest('div')
```

```js
el.closest('div')
```

### Match check

```js
$(el).is(':checked')
```

```js
el.matches(':checked')
```

### Finding

```js
$(el).find('button')
```

```js
el.querySelector('button')
el.querySelectorAll('button')
```

## Inputs
{: .-versus}

### Blur

```js
$(el).blur()
```

```js
el.blur()
```

### Focus

```js
$(el).focus()
```

```js
el.focus()
```

## DOM operations
{: .-versus}

### Remove

```js
$(el).remove()
```

```js
el.parentNode.removeChild(el)
```

### Append

```js
$(el).append(newEl)
```

```js
el.appendChild(newEl)
```

### Before

```js
$(refEl).before(newEl)
```

```js
refEl.parentNode.insertBefore(newEl, refEl)
```

### After

```js
$(refEl).after(newEl)
```

```js
refEl.parentNode.insertBefore(newEl, refEl.nextSibling)
```

If `refEl` is at the end, `refEl.nextSibling` will be null. The behavior of `insertBefore(el, null)` is the same as `appendChild(el)`.

See: [Node.insertBefore](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore) _(developer.mozilla.org)_

### Before/after (HTML)

```js
$(el).before('<span></span>')
$(el).after('<span></span>')
```

```js
el.insertAdjacentHTML('beforebegin', '<span></span>')
el.insertAdjacentHTML('afterend', '<span></span>')
```

## Events
{: .-versus}

### Attach event

```js
$(el).on('click', (event) => {
  ···
})
```

```js
el.addEventListener('click', (event) => {
  ···
})
```

See: [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) _(developer.mozilla.org)_

### Trigger

```js
$(el).trigger('click')
```

```js
var ev = document.createEvent('HTMLEvents')
ev.initEvent('click', true, true)
el.dispatchEvent(ev)
```

See: [document.createEvent](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent) _(developer.mozilla.org)_

## HTML
{: .-versus}

### Getting HTML

```js
$(el).html()
// → "<div>hello</div>"
```

```js
el.innerHTML
// → "<div>hello</div>"
```

### Setting HTML

```js
$(el).html('<span>ok</span>')
```

```js
el.innerHTML = '<span>ok</span>'
```

See: [Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) _(developer.mozilla.org)_

### Getting text

```js
$(el).text()
```

```js
el.textContent
```

<!-- needs polyfill for IE8 below -->

### Setting text

```js
$(el).text('hello')
```

```js
el.textContent = 'hello'
```

## Creating elements
{: .-versus}

### Create element

```js
div = $('<div>')
div = $.parseHTML('<div>')
```

```js
div = document.createElement('div')
```

### With class name

```js
div = $('<div class="hello">')
div = $.parseHTML('<div class="hello">')
```

```js
div = document.createElement('div')
div.className = 'hello'
```
