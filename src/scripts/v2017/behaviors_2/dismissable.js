import { getData } from '../helpers/data'
import { isDismissed } from '../helpers/dismiss'
import { isPreview } from '../helpers/preview'

export function setupDismissable() {
  document.querySelectorAll('[data-js-dismissable]').forEach((el) => {
    const id = getData(el, 'js-dismissable').id || ''

    if (isPreview() || isDismissed(id)) {
      el.parentNode.removeChild(el)
    } else {
      el.classList.remove('-hide')
    }
  })
}
