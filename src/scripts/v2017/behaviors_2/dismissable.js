import { isAnnouncementForced } from '../helpers/announcement'
import { getData } from '../helpers/data'
import { isDecided, isDismissed, setDismissed } from '../helpers/dismiss'
import { isPreview } from '../helpers/preview'

export function setupDismissable() {
  document.querySelectorAll('[data-js-dismissable]').forEach((el) => {
    const { id = '', chance } = getData(el, 'js-dismissable')

    if (shouldHide(id, chance)) {
      el.parentNode.removeChild(el)
    } else {
      el.classList.remove('-hide')
    }
  })
}

function shouldHide(id, chance) {
  if (isAnnouncementForced()) return false
  if (isPreview()) return true
  if (isDecided(id)) return isDismissed(id)
  if (typeof chance !== 'number') return false

  const hide = Math.random() >= chance
  setDismissed(id, hide)
  return hide
}
