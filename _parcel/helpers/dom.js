import matches from 'dom101/matches'

/*
 * Just like jQuery.append
 */

export function appendMany(el, children) {
  children.forEach((child) => {
    el.appendChild(child)
  })
}

/*
 * Just like jQuery.nextUntil
 */

export function nextUntil(el, selector) {
  const nextEl = el.nextSibling
  return nextUntilTick(nextEl, selector, [])
}

function nextUntilTick(el, selector, acc) {
  if (!el) return acc

  const isMatch = matches(el, selector)
  if (isMatch) return acc

  return nextUntilTick(el.nextSibling, selector, [...acc, el])
}

/*
 * Just like jQuery.before
 */

export function before(reference, newNode) {
  reference.parentNode.insertBefore(newNode, reference)
}

/*
 * Like jQuery.children('selector')
 */

export function findChildren(el, selector) {
  return [].slice.call(el.children).filter((child) => matches(child, selector))
}

/**
 * Creates a div
 * @private
 *
 * @example
 *
 *     createDiv({ class: 'foo' })
 */

export function createDiv(props) {
  const d = document.createElement('div')
  Object.keys(props).forEach((key) => {
    d.setAttribute(key, props[key])
  })
  return d
}
