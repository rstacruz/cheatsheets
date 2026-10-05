import { onScrollVisible } from '~/lib/domutils/onScrollVisible'
import injectDisqus from '../helpers/inject_disqus'

/**
 * Injects Disqus onto the page.
 */

export function setupDisqus() {
  document.querySelectorAll('[data-js-disqus]').forEach((el) => {
    const data = JSON.parse(el.getAttribute('data-js-disqus'))
    const $parent = el.parentNode

    onScrollVisible($parent, () => {
      activateDisqus(data, $parent)
    })
  })
}

function activateDisqus(data, $parent) {
  $parent.setAttribute('hidden', true)

  window.disqus_config = function () {
    this.page.url = data.url
    this.page.identifier = data.identifier
  }

  // Disqus takes a while to load, don't do it so eagerly.
  injectDisqus(data.host)
  $parent.removeAttribute('hidden')
}
