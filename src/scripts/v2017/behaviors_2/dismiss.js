import { getData } from '../helpers/data'
import * as Dismiss from '../helpers/dismiss'

/**
 * Dismiss button
 */

export function setupDismiss() {
  document.querySelectorAll('[data-js-dismiss]').forEach((el) => {
    const parent = el.closest('[data-js-dismissable]')
    const dismissable = getData(parent, 'js-dismissable')
    const id = (dismissable && dismissable.id) || ''

    el.addEventListener('click', (e) => {
      Dismiss.setDismissed(id)
      e.preventDefault()
      if (parent && parent.parentNode) parent.parentNode.removeChild(parent)
    })
  })
}
