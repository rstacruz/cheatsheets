---
title: DOM without jQuery
category: JavaScript libraries
layout: 2017/sheet
---

## Selectors
{: .-one-column}

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

## Classes
{: .-one-column}

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

## Events
{: .-one-column}

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

## Attributes
{: .-one-column}

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
{: .-one-column}

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
{: .-one-column}

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

### Finding

```js
$(el).find('button')
```

```js
el.querySelector('button')
el.querySelectorAll('button')
```

## Inputs
{: .-one-column}

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
{: .-one-column}

### Remove

```js
$(el).remove()
```

```js
el.parentNode.removeChild(el)
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

### Before/after (HTML)

```js
$(el).before('<span></span>')
$(el).after('<span></span>')
```

```js
el.insertAdjacentHTML('beforebegin', '<span></span>')
el.insertAdjacentHTML('afterend', '<span></span>')
```

### Set text

```js
$(el).text('hello')
```

```js
el.textContent = 'hello'
```

### Get text

```js
$(el).text()
```

```js
el.textContent
```

<!-- needs polyfill for IE8 below -->

## Events
{: .-one-column}

### Attach event

```js
$(el).on('click', (event) => {
  ···
})
```

```js
el.addEventListener('click', (event) => {
})
```

<!-- needs polyfill for IE8 below -->

### Trigger

```js
$(el).trigger('click')
```

```js
var ev = document.createEvent('HTMLEvents')
ev.initEvent('click', true, true)
el.dispatchEvent(ev)
```

<!-- See: [document.createEvent](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent) -->


<style>
.h3-section .body {
display: flex;
}
.h3-section .body > pre {
flex: 0 0 50%;
}
.h3-section .body > pre + pre {
background: #faf7ff;
}
.h3-section .body > pre ~ p {
display: none;
}
.h3-section h3 {
display: none;
}
</style>
