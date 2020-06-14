import onmount from 'onmount'
import { nextUntil } from '../helpers/dom'
import matches from 'dom101/matches'

// Ensure that search-index is set first
import './searchable-item'

/**
 * Propagate item search indices to headers
 */

onmount('[data-js-searchable-header]', function () {
  const els = nextUntil(this, '[data-js-searchable-header]').filter((el) =>
    matches(el, '[data-search-index]')
  )

  const keywords = els
    .map((n) => n.getAttribute('data-search-index'))
    .join(' ')
    .split(' ')

  this.setAttribute('data-search-index', keywords.join(' '))
})
