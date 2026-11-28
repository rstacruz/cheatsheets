import Fuse from 'fuse.js'
import { fetchFuse, parseFuse, type Row } from '~/lib/fuseSearch/fuseSearch'
import { getInitialRedirectSlug } from '~/lib/fuseSearch/searchLanding'
import { RESULT_LIMIT } from '~/lib/fuseSearch/searchConfig'
import {
  getResultTitle,
  rankGroupOrder,
  rankGroupSlugs
} from './SearchResults.core'

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
  // Tailwind's flex/grid/contents classes outrank the UA [hidden] rule
  element.style.display = shown ? '' : 'none'
}

export function setupSearchResults() {
  const form = requiredElement<HTMLFormElement>('[data-js-search-form]')
  const input = requiredElement<HTMLInputElement>('[data-js-search-input]')
  const empty = requiredElement('[data-js-search-empty]')
  const groupRoot = requiredElement('[data-js-search-groups]')
  const groups = Array.from(
    document.querySelectorAll<HTMLElement>('[data-js-search-group]')
  ).map((element) => {
    const nodes = Array.from(
      element.querySelectorAll<HTMLElement>('[data-slug]')
    )
    return {
      element,
      header: element.querySelector<HTMLElement>('[data-js-searchable-header]'),
      container: element.querySelector<HTMLElement>(
        '[data-js-search-container]'
      ),
      nodes,
      slugs: nodes.map((node) => node.dataset.slug ?? ''),
      nodeBySlug: new Map(nodes.map((node) => [node.dataset.slug ?? '', node]))
    }
  })
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

    for (const {
      element,
      header,
      container,
      nodes,
      slugs,
      nodeBySlug
    } of groups) {
      const ranking = rankGroupSlugs(slugs, resultSlugs, query.length > 0)
      const parent = container ?? element

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
      setShown(element, !query || hasResults)
    }

    const order = rankGroupOrder(
      groups.map((group) => group.slugs),
      resultSlugs,
      query.length > 0
    )
    for (const index of order) groupRoot.append(groups[index].element)

    empty.hidden = !(query.length > 0 && matched.size === 0)
    document.title = getResultTitle(query, baseTitle)
    delete document.documentElement.dataset.searchPending
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

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = input.value.trim()
    const url = query ? `/search?q=${encodeURIComponent(query)}` : '/search'
    history.pushState({}, '', url)
    renderFromUrl()
  })

  input.addEventListener('input', () => {
    if (!index) return
    const query = input.value.trim()
    render(query, search(query))
  })
  window.addEventListener('popstate', () => renderFromUrl())

  fetchFuse()
    .then((data) => {
      index = parseFuse(data)
      renderFromUrl(true)
    })
    .catch(() => {
      delete document.documentElement.dataset.searchPending
    })
}
