
import $ from 'jquery'
import onmount from 'onmount'
import permutate from '../helpers/permutate'

/**
 * Sets search indices (`data-search-index` attribute)
 */

onmount('[data-js-searchable-item]', function () {
  const $this = $(this)
  const data = $this.data('js-searchable-item')
  const words = permutate(data)

  $this.attr('data-search-index', words.join(' '))
})
