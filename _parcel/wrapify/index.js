import matches from 'dom101/matches'
import addClass from 'dom101/add-class'
import {
  appendMany,
  nextUntil,
  before,
  findChildren,
  createDiv
} from '../helpers/dom'

/**
 * Wraps h2 sections into h2-section.
 * Wraps h3 sections into h3-section.
 *
 * @private
 */

export default function wrapify(root) {
  // These are your H2 sections. Returns a list of .h2-section nodes.
  const sections = wrapifyH2(root)

  // For each h2 section, wrap the H3's in them
  sections.forEach((section) => {
    const bodies = findChildren(section, '[data-js-h3-section-list]')
    bodies.forEach((body) => {
      wrapifyH3(body)
    })
  })
}

/**
 * Wraps h2 sections into h2-section.
 * Creates and HTML structure like so:
 *
 *     .h2-section
 *       h2.
 *         (title)
 *       .body.h3-section-list.
 *         (body goes here)
 *
 * @private
 */

function wrapifyH2(root) {
  return groupify(root, {
    tag: 'h2',
    wrapperFn: () => createDiv({ class: 'h2-section' }),
    bodyFn: () =>
      createDiv({
        class: 'body h3-section-list',
        'data-js-h3-section-list': ''
      })
  })
}

/**
 * Wraps h3 sections into h3-section.
 * Creates and HTML structure like so:
 *
 *     .h3-section
 *       h3.
 *         (title)
 *       .body.
 *         (body goes here)
 *
 * @private
 */

function wrapifyH3(root) {
  return groupify(root, {
    tag: 'h3',
    wrapperFn: () => createDiv({ class: 'h3-section' }),
    bodyFn: () => createDiv({ class: 'body' })
  })
}

/**
 * Groups all headings (a `tag` selector) under wrappers like `.h2-section`
 * (build by `wrapperFn()`).
 * @private
 */

export function groupify(el, { tag, wrapperFn, bodyFn }) {
  const first = el.children[0]
  let result = []

  // Handle the markup before the first h2
  if (first && !matches(first, tag)) {
    const sibs = nextUntil(first, tag)
    result.push(wrap(first, null, [first, ...sibs]))
  }

  // Find all h3's inside it
  const children = findChildren(el, tag)

  children.forEach((child) => {
    const sibs = nextUntil(child, tag)
    result.push(wrap(child, child, sibs))
  })

  return result

  function wrap(pivot, first, sibs) {
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
