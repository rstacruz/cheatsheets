import Fuse from 'fuse.js'
import { fetchFuse, parseFuse, type Row } from '~/lib/fuseSearch/fuseSearch'
import { getInitialRedirectSlug } from '~/lib/fuseSearch/searchLanding'
import {
  getResultTitle,
  getStatusText,
  rankGroupSlugs
} from './SearchResults.core'

const RESULT_LIMIT = 24

type SearchIndex = Fuse<Row>

function queryFromUrl(): string {
  return new URLSearchParams(location.search).get('q')?.trim() ?? ''
}

function requiredElement<T extends HTMLElement = HTMLElement>(
  selector: string
): T {
  const element = document.querySelector<T>(selector)
  if (!element) throw new Error(`Missing search element: ${selector}`)
  return element
}

function setShown(element: HTMLElement, shown: boolean) {
  // Tailwind's flex/grid/contents classes outrank the UA [hidden] rule.
  element.style.display = shown ? '' : 'none'
}

export function setupSearchResults() {
  const form = requiredElement<HTMLFormElement>('[data-js-search-form]')
  const input = requiredElement<HTMLInputElement>('[data-js-search-input]')
  const status = requiredElement('[data-js-search-status]')
  const empty = requiredElement('[data-js-search-empty]')
  const groups = Array.from(
    document.querySelectorAll<HTMLElement>('[data-js-search-group]')
  )
  const baseTitle = document.title
  const landingQuery = queryFromUrl()
  let index: SearchIndex | undefined

  input.value = landingQuery

  function search(query: string): string[] {
    if (!index || !query) return []
    return index
      .search(query, { limit: RESULT_LIMIT })
      .map((hit) => hit.item.slug)
  }

  function render(query: string, resultSlugs: string[]) {
    const matched = new Set<string>()

    for (const group of groups) {
      const header = group.querySelector<HTMLElement>(
        '[data-js-searchable-header]'
      )
      const container = group.querySelector<HTMLElement>(
        '[data-js-search-container]'
      )
      const nodes = Array.from(
        group.querySelectorAll<HTMLElement>('[data-slug]')
      )
      const nodeBySlug = new Map(
        nodes.map((node) => [node.dataset.slug ?? '', node])
      )
      const ranking = rankGroupSlugs(
        nodes.map((node) => node.dataset.slug ?? ''),
        resultSlugs,
        query.length > 0
      )
      const parent = container ?? group

      for (const slug of ranking.ordered) {
        const node = nodeBySlug.get(slug)
        if (node) parent.append(node)
      }

      const visible = new Set(ranking.visible)
      for (const node of nodes) {
        setShown(node, visible.has(node.dataset.slug ?? ''))
      }
      for (const slug of visible) matched.add(slug)

      const hasResults = ranking.visible.length > 0
      if (header) setShown(header, !query || hasResults)
      if (container) setShown(container, !query || hasResults)
      setShown(group, !query || hasResults)
    }

    empty.hidden = !(query.length > 0 && matched.size === 0)
    status.textContent = getStatusText(query, matched.size)
    document.title = getResultTitle(query, baseTitle)
  }

  function renderFromUrl(initial = false) {
    const query = queryFromUrl()
    input.value = query
    if (!index) return

    const resultSlugs = search(query)
    if (initial && query === landingQuery) {
      const redirect = getInitialRedirectSlug(query, resultSlugs)
      if (redirect) {
        location.replace(`/${redirect}`)
        return
      }
    }
    render(query, resultSlugs)
  }

  // Wire handlers before the index fetch so Enter during loading is not lost.
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = input.value.trim()
    const url = query ? `/search?q=${encodeURIComponent(query)}` : '/search'
    history.pushState({}, '', url)
    renderFromUrl()
  })
  window.addEventListener('popstate', () => renderFromUrl())

  fetchFuse()
    .then((data) => {
      index = parseFuse(data)
      renderFromUrl(true)
    })
    .catch(() => {
      status.textContent = 'Search is unavailable; all cheatsheets are listed.'
    })
}
