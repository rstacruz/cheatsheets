import onmount from 'onmount'
import on from 'dom101/on'

/**
 * Submitting the search form
 */

onmount('[data-js-search-form]', function () {
  on(this, 'submit', (e) => {
    e.preventDefault()

    const links = document.querySelectorAll('a[data-search-index]')

    const link = [].filter.call(links, function (el) {
      var style = window.getComputedStyle(el);
      return (style.display !== 'none')
    })[0];
    const href = link && link.getAttribute('href')

    if (href) window.location = href
  })
})