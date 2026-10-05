const DEFAULTS = {
  // select elements to put anchor on
  rule: 'h2[id]',
  // class name for anchor
  className: 'local-anchor anchor',
  // text of anchor
  text: '#',
  // append before or after innerText?
  shouldAppend: true
}

/*
 * Behavior: Add local anchors
 */

export function setupAnchors() {
  document.querySelectorAll('[data-js-anchors]').forEach((parent) => {
    const data = JSON.parse(parent.getAttribute('data-js-anchors') || '{}')
    const rules = Array.isArray(data)
      ? data.length
        ? data
        : [DEFAULTS]
      : [Object.assign({}, DEFAULTS, data)]

    for (const { rule, className, text, shouldAppend } of rules) {
      for (const el of parent.querySelectorAll(rule)) {
        if (!el.hasAttribute('id')) {
          continue
        }

        const id = el.getAttribute('id')
        const anchor = document.createElement('a')
        anchor.setAttribute('href', `#${id}`)
        anchor.setAttribute('class', className)
        anchor.setAttribute('aria-hidden', 'true')
        anchor.innerText = String(text || DEFAULTS.text)

        if (shouldAppend) {
          el.appendChild(anchor)
        } else {
          prepend(el, anchor)
        }
      }
    }
  })
}

function prepend(el, child) {
  if (el.firstChild) {
    el.insertBefore(child, el.firstChild)
  } else {
    el.appendChild(child)
  }
}
