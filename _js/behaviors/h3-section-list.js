/* eslint-disable no-new */

import $ from 'jquery'
import Isotope from 'isotope-layout/dist/isotope.pkgd.js'
import onmount from 'onmount'

/*
 * Ensure that main-body is evaluated first
 */

import './main-body'

/*
 * Behavior: Isotope
 */

onmount('[data-js-h3-section-list]', function () {
  new Isotope(this, {
    itemSelector: '.h3-section',
    transitionDuration: 0
  })
})
