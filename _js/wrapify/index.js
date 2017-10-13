import $ from 'jquery'
import matches from 'dom101/matches'
import addClass from 'dom101/add-class'

/*
 * Wraps h2 sections into h2-section.
 * Wraps h3 sections into h3-section.
 */

export default function wrapify (root) {
  const $root = $(root)

  const $h2sections = groupify(root, {
    tag: 'h2',
    wrapper: '<div class="h2-section">',
    wrapperFn: () => {
      const d = document.createElement('div')
      d.className = 'h2-section'
      return d
    },
    bodyFn: () => {
      const d = document.createElement('div')
      d.className = 'body h3-section-list'
      d.setAttribute('data-js-h3-section-list', '')
      return d
    }
  })

  $($h2sections).each(function () {
    const $body = $(this).children('[data-js-h3-section-list]')

    groupify($body[0], {
      tag: 'h3',
      wrapperFn: () => {
        const d = document.createElement('div')
        d.className = 'h3-section'
        return d
      },
      bodyFn: () => {
        const d = document.createElement('div')
        d.className = 'body'
        return d
      }
    })
  })
}

/*
 * Groups stuff
 */

export function groupify (el, { tag, wrapperFn, bodyFn }) {
  const first = el.children[0]
  const $first = $(first)
  let result = []

  // Handle the markup before the first h2
  if (first && !matches(first, tag)) {
    const sibs = nextUntil(first, tag)
    result.push(wrap(first, null, [ $first[0], ...sibs ]))
  }

  // Find all h3's inside it
  const children = findChildren(el, tag)

  children.forEach(child => {
    const sibs = nextUntil(child, tag)
    result.push(wrap(child, child, sibs))
  })

  return result

  function wrap (pivot, first, sibs) {
    const wrap = wrapperFn()

    const pivotClass = pivot.className
    if (pivotClass) addClass(wrap, pivotClass)
    before(pivot, wrap)

    const body = bodyFn()
    if (pivotClass) addClass(body, pivotClass)
    appendMany(body, sibs)

    if (first) wrap.appendChild(first)
    wrap.appendChild(body)

    return wrap
  }
}

/*
 * Just like jQuery.append
 */

function appendMany (el, children) {
  children.forEach(child => { el.appendChild(child) })
}

/*
 * Just like jQuery.nextUntil
 */

function nextUntil (el, selector) {
  const nextEl = el.nextSibling
  return nextUntilTick(nextEl, selector, [])
}

function nextUntilTick (el, selector, acc) {
  if (!el) return acc

  const isMatch = matches(el, selector)
  if (isMatch) return acc

  return nextUntilTick(el.nextSibling, selector, [ ...acc, el ])
}

/*
 * Just like jQuery.before
 */

function before (reference, newNode) {
  reference.parentNode.insertBefore(newNode, reference)
}

/*
 * Like jQuery.children('selector')
 */

function findChildren (el, selector) {
  return [].slice.call(el.children)
    .filter(child => matches(child, selector))
}

