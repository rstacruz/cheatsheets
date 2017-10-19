import onmount from 'onmount'
import injectDisqus from '../helpers/inject_disqus'
import ready from 'dom101/ready'

/**
 * Delay disqus by some time. It's at the bottom of the page, there's no need
 * for it to load fast. This will give more time to load more critical assets.
 */

const DISQUS_DELAY = 10 * 1000

/**
 * Injects Disqus onto the page.
 */

onmount('[data-js-disqus]', function () {
  const data = JSON.parse(this.getAttribute('data-js-disqus'))
  const $parent = this.parentNode
  $parent.setAttribute('hidden', true)

  window.disqus_config = function () {
    this.page.url = data.url
    this.page.identifier = data.identifier
  }

  // Disqus takes a while to load, don't do it so eagerly.
  ready(() => {
    setTimeout(() => {
      injectDisqus(data.host)
      $parent.removeAttribute('hidden')
    }, DISQUS_DELAY)
  })
})
