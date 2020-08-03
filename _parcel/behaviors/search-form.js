import onmount from 'onmount'
import on from 'dom101/on'

/**
 * Submitting the search form
 */

onmount('[data-js-search-form]', function () {
  on(this, 'submit', (e) => {
    e.preventDefault()

    const link = document.querySelector('a[data-search-index]:not([hidden])')
    const href = link && link.getAttribute('href')

    if (href) window.location = href
  })
})
