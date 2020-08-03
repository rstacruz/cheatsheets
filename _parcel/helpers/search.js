import { splitwords } from './permutate'
import qsa from 'dom101/query-selector-all'

/**
 * Show everything.
 *
 * @example
 *     Search.showAll()
 */

export function showAll() {
  qsa('[data-search-index]').forEach((el) => {
    el.removeAttribute('hidden')
    el.style.removeProperty('display')
  })
}

/**
 * Search for a given keyword.
 *
 * @example
 *     Search.show('hello')
 */

export function show(val) {
  const keywords = splitwords(val)

  if (!keywords.length) return showAll()

  const selectors = keywords
    .map((k) => `[data-search-index~=${JSON.stringify(k)}]`)
    .join('')

  qsa('[data-search-index]').forEach((el) => {
    el.setAttribute('hidden', true)
    el.style.setProperty('display', "none")
  })

  qsa(selectors).forEach((el) => {
    el.removeAttribute('hidden')
    el.style.removeProperty('display')
  })
}
