/*
 * This is the "critical path" JavaScript that will be included INLINE on every
 * page. Keep this as small as possible!
 */

import wrapify from './wrapify'
import addClass from 'dom101/add-class'
import on from 'dom101/on'

// Transform the main body markup to make it readable.
const body = document.querySelector('[data-js-main-body]')

if (body) {
  wrapify(body)
  addClass(body, '-wrapified')
}

// Be "done" when we're done, or after a certain timeout.
on(window, 'load', done)
setTimeout(done, 5000)

let isDone
function done() {
  if (isDone) return
  addClass(document.documentElement, 'LoadDone')
  isDone = true
}
