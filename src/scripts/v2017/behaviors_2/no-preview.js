import { isPreview } from '../helpers/preview'

/*
 * Behavior: Things to remove when preview mode is on
 */

export function setupNoPreview() {
  document.querySelectorAll('[data-js-no-preview]').forEach((el) => {
    if (isPreview()) {
      el.parentNode.removeChild(el)
      document.documentElement.classList.add('PreviewMode')
    }
  })
}
