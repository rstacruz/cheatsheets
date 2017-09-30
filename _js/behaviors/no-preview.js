import $ from 'jquery'
import ready from 'dom101/ready'
import remove from 'dom101/remove'
import onmount from 'onmount'

/*
 * Behavior: Things to remove when preview mode is on
 */

onmount('[data-js-no-preview]', function (b) {
  if (~window.location.search.indexOf('preview=1')) {
    remove(this)
  }
})
