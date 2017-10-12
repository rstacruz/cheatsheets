import onmount from 'onmount'
import injectDisqus from '../helpers/inject_disqus'
import ready from 'dom101/ready'

/**
 * Injects Disqus onto the page.
 */

onmount('[data-js-disqus]', function () {
  const data = JSON.parse(this.getAttribute('data-js-disqus'))

  window.disqus_config = function () {
    this.page.url = data.url
    this.page.identifier = data.identifier
  }

  // Disqus takes a while to load, don't do it so eagerly.
  ready(() => {
    injectDisqus(data.host)
  })
})
