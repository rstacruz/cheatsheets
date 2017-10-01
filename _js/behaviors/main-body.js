import onmount from 'onmount'
import wrapify from '../wrapify'
import ready from 'dom101/ready'

/**
 * Behavior: Wrapping
 */

ready(() => {
  const body = document.querySelector('[data-js-main-body]')
  if (body) wrapify(body)
})
