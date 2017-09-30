import $ from 'jquery'
import wrapify from '../wrapify'

/*
 * Behavior: Wrapping
 */

$(function () {
  const $root = $('[data-js-main-body]')
  wrapify($root)
})
