import onmount from 'onmount'
import permutate from '../helpers/permutate'

/**
 * Sets search indices (`data-search-index` attribute)
 */

onmount('[data-js-searchable-item]', function () {
  const data = JSON.parse(this.getAttribute('data-js-searchable-item') || '{}')
  const words = permutate(data)

  this.setAttribute('data-search-index', words.join(' '))
})
