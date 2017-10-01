import onmount from 'onmount'
import $ from 'jquery'

// Ensure that search-index is set first
import './searchable-item'

/**
 * Propagate item search indices to headers
 */

onmount('[data-js-searchable-header]', function () {
  const $this = $(this)
  const $els = $this
    .nextUntil('[data-js-searchable-header]')
    .filter('[data-search-index]')

  const keywords = $els
    .map(function () { return $(this).attr('data-search-index') })
    .get()
    .join(' ')
    .split(' ')

  $this.attr('data-search-index', keywords.join(' '))
})
