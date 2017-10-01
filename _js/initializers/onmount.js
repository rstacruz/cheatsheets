import wrapify from '../wrapify'
import ready from 'dom101/ready'
import onmount from 'onmount'

/**
 * Behavior: Wrapping
 */

ready(() => {
  const body = document.querySelector('[data-js-main-body]')
  if (body) { wrapify(body) }
  setTimeout(() => { onmount() })
})
