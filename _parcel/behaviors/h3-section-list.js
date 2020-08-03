/* eslint-disable no-new */

import Isotope from 'isotope-layout'
import onmount from 'onmount'
import on from 'dom101/on'
import qsa from 'dom101/query-selector-all'

/*
 * Behavior: Isotope
 */

onmount('[data-js-h3-section-list]', function () {
  const iso = new Isotope(this, {
    itemSelector: '.h3-section',
    transitionDuration: 0
  })

  const images = qsa('img', this)

  images.forEach((image) => {
    on(image, 'load', () => {
      iso.layout()
    })
  })

  // Insurance against weirdness on pages like devhints.io/vim, where the
  // critical path CSS may look different from the final CSS (because of the
  // tables).
  on(window, 'load', () => {
    iso.layout()
  })
})
