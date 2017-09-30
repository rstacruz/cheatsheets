import $ from 'jquery'

/*
 * Behavior: [data-js-no-preview]
 */

$(function () {
  if (~window.location.search.indexOf('preview=1')) {
    $('[data-js-no-preview]').remove()
  }
})
