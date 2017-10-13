import wrapify from '../wrapify'
import ready from 'dom101/ready'
import onmount from 'onmount'
import addClass from 'dom101/add-class'

/**
 * Behavior: Wrapping
 */

ready(() => {
  const body = document.querySelector('[data-js-main-body]')
  if (body) {
    wrapify(body)
    addClass(body, '-wrapified')
  }
  setTimeout(() => { onmount() })
})
