/*
 * This is the "critical path" JavaScript that will be included INLINE on every
 * page. Keep this as small as possible!
 */

import wrapify from './wrapify'
import addClass from 'dom101/add-class'

const body = document.querySelector('[data-js-main-body]')

if (body) {
  wrapify(body)
  addClass(body, '-wrapified')
}
