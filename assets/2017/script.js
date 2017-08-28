/*
 * Wrapping
 */

$(function () {
  const $root = $('[data-js-main-body]')
  wrapify($root)
})

/*
 * Isotope
 */

$(function () {
  $('[data-js-h3-section-list]').each(function () {
    var iso = new Isotope(this, {
      itemSelector: '.h3-section',
      transitionDuration: 0
    })
  })
})

/*
 * Search
 */

$(function () {
  $('[data-js-searchable-item]').each(function () {
    const $this = $(this)
    const data = $this.data('js-searchable-item')
    const words = permutate(data)

    $this.attr('data-search-index', words.join(' '))
  })

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
 * Search
 */

const Search = {
  showAll () {
    $('[data-search-index]').removeAttr('aria-hidden')
  },

  show (val) {
    const keywords = val.split(/[ \-_]/)
    const selectors = keywords
      .map(k => `[data-search-index~=${JSON.stringify(k)}]`)
      .join('')

    $('[data-search-index]').attr('aria-hidden', true)
    $(selectors).removeAttr('aria-hidden')
  }
}

/*
 * Permutator
 */

function permutate (data) {
  let words = []
  if (data.slug) {
    words = words.concat(permutateString(data.slug))
  }
  if (data.category) {
    words = words.concat(permutateString(data.category))
  }
  return words
}

function permutateString (str) {
  let words = []
  let inputs = str.toLowerCase().split(/[ \-_]/)
  inputs.forEach(word => {
    words = words.concat(permutateWord(word))
  })
  return words
}

function permutateWord (str) {
  let words = []
  const len = str.length
  for (var i = 1; i <= len; ++i) {
    words.push(str.substr(0, i))
  }
  return words
}

/*
 * Wraps h2 sections into h2-section.
 * Wraps h3 sections into h3-section.
 */

function wrapify ($root) {
  const $h2sections = groupify($root, {
    tag: 'h2',
    wrapper: '<div class="h2-section">',
    body: '<div class="body h3-section-list" data-js-h3-section-list>'
  })

  $h2sections.each(function () {
    const $body = $(this).children('[data-js-h3-section-list]')

    groupify($body, {
      tag: 'h3',
      wrapper: '<div class="h3-section">',
      body: '<div class="body">'
    })
  })
}

/*
 * Groups stuff
 */

function groupify ($this, { tag, wrapper, body }) {
  const $first = $this.children(':first-child')
  let $result = $()

  // Handle the markup before the first h2
  if (!$first.is(tag)) {
    const $sibs = $first.nextUntil(tag)
    $result = $result.add(wrap($first, null, $first.add($sibs)))
  }

  $this.children(tag).each(function () {
    const $sibs = $(this).nextUntil(tag)
    const $heading = $(this)
    $result = $result.add(wrap($heading, $heading, $sibs))
  })

  return $result

  function wrap ($pivot, $first, $sibs) {
    const $wrap = $(wrapper)
    $wrap.addClass($pivot.attr('class'))
    $pivot.before($wrap)

    const $body = $(body)
    $body.addClass($pivot.attr('class'))
    $body.append($sibs)

    if ($first) $wrap.append($first)
    $wrap.append($body)

    return $wrap
  }
}
