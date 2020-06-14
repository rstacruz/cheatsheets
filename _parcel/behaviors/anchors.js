import onmount from 'onmount'
import prepend from 'dom101/prepend'

const DEFAULTS = {
  // select elements to put anchor on
  rule: 'h2[id]',
  // class name for anchor
  className: 'local-anchor anchor',
  // text of anchor
  text: '#',
  // append before or after innerText?
  shouldAppend: false
}

/*
 * Behavior: Add local anchors
 */

onmount('[data-js-anchors]', function () {
  const data = JSON.parse(this.getAttribute('data-js-anchors') || '{}')
  const rules = Array.isArray(data)
    ? data.length
      ? data
      : [DEFAULTS]
    : [Object.assign({}, DEFAULTS, data)]

  for (const { rule, className, text, shouldAppend } of rules) {
    for (const el of this.querySelectorAll(rule)) {
      if (!el.hasAttribute('id')) {
        continue
      }

      const id = el.getAttribute('id')
      const anchor = document.createElement('a')
      anchor.setAttribute('href', `#${id}`)
      anchor.setAttribute('class', className)
      anchor.innerText = String(text || DEFAULTS.text)

      if (shouldAppend) {
        el.appendChild(anchor)
      } else {
        prepend(el, anchor)
      }
    }
  }
})
