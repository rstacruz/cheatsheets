import $ from 'jquery'
import Isotope from 'isotope-layout/dist/isotope.pkgd.js'

/*
 * Behavior: Isotope
 */

$(function () {
  $('[data-js-h3-section-list]').each(function () {
    var iso = new Isotope(this, {
      itemSelector: '.h3-section',
      transitionDuration: 0
    })
  })
})
