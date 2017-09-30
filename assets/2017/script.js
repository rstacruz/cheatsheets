/*
 * Behavior: Search
 */

$(function () {
  // Propagate item search indices to headers
  $('[data-js-searchable-header]').each(function () {
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
})

/*
 * Behavior: search input
 */

$(function () {
  $('[data-js-search-input]').each(function () {
    const $this = $(this)
    const val = $this.val()

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

  $('[data-js-search-form]').each(function () {
    const $this = $(this)

    $this.on('submit', e => {
      e.preventDefault()
      const href = $('a[data-search-index]:visible').eq(0).attr('href')
      if (href) window.location = href
    })
  })
})

/*
 * Helper for splitting to words
 */

function splitwords (str) {
  const words = str.toLowerCase()
    .split(/[ \/\-_]/)
    .filter(k => k && k.length !== 0)

  return words
}

/*
 * Search
 */

const Search = {
  showAll () {
    $('[data-search-index]').removeAttr('aria-hidden')
  },

  show (val) {
    const keywords = splitwords(val)

    if (!keywords.length) return Search.showAll()

    const selectors = keywords
      .map(k => `[data-search-index~=${JSON.stringify(k)}]`)
      .join('')

    $('[data-search-index]').attr('aria-hidden', true)
    $(selectors).removeAttr('aria-hidden')
  }
}


/*
 * Helper: minimal qs implementation
 */

function qs (search) {
  search = search.substr(1)
  const parts = search.split('&').map(p => p.split('='))
  return parts.reduce((result, part) => {
    result[part[0]] = qsdecode(part[1])
    return result
  }, {})
}

function qsdecode (string) {
  if (!string) string = ''
  string = string.replace(/\+/g, ' ')
  return string
}
