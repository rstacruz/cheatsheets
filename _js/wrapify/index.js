import $ from 'jquery'

/*
 * Wraps h2 sections into h2-section.
 * Wraps h3 sections into h3-section.
 */

export default function wrapify (root) {
  const $root = $(root)
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

export function groupify ($this, { tag, wrapper, body }) {
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
