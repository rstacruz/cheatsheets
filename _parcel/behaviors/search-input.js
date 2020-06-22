import onmount from 'onmount'
import * as Search from '../helpers/search'
import qs from '../helpers/qs'
import on from 'dom101/on'

onmount('[data-js-search-input]', function () {
  on(this, 'input', () => {
    const val = this.value

    if (val === '') {
      Search.showAll()
    } else {
      Search.show(val)
    }
  })

  const query = (qs(window.location.search) || {}).q
  if (query && query.length) {
    this.value = query
    setTimeout(() => {
      Search.show(query)
    })
  }
})
