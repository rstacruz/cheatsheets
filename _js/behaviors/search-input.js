import $ from 'jquery'
import onmount from 'onmount'
import * as Search from '../helpers/search'
import qs from '../helpers/qs'

onmount('[data-js-search-input]', function () {
  const $this = $(this)

  $this.on('input', () => {
    const val = $this.val()

    if (val === '') {
      Search.showAll()
    } else {
      Search.show(val)
    }
  })

  const query = (qs(window.location.search) || {}).q
  if (query && query.length) {
    $this.val(query)
    Search.show(query)
  }
})
