import { categories } from '../../config'
import type { SheetPage } from '../page'
import { hasTag, isListed, isSnippet, isTestFixture } from './accessors'

export type Category = {
  pages: SheetPage[]
  title: string
  id: string
}

/**
 * Returns categories and their corresponding pages.
 */

export function getPagesByCategory(
  pages: Record<string, SheetPage>,
  options?: { excludeSnippets?: boolean }
) {
  const { excludeSnippets = false } = options ?? {}
  const pageCategories: Record<string, Category> = {}

  for (const category of categories) {
    pageCategories[category] = { pages: [], title: category, id: category }
  }

  for (const page of Object.values(pages)) {
    if (!isListed(page)) continue
    if (excludeSnippets && isSnippet(page)) continue

    const categoryName = page.frontmatter.category ?? 'Others'
    if (!categoryName) continue

    let cat = pageCategories[categoryName]
    if (!cat) cat = pageCategories['Others']

    cat.pages.push(page)
  }
  return pageCategories
}

/**
 * Counts listed sheets, excluding hidden, deprecated, and archived ones.
 */
export function getListedSheetCount(pages: Record<string, SheetPage>): number {
  return Object.values(pages).filter(isListed).length
}

type DateKey = 'created_at' | 'updated'
type LatestOptions = { maxCount?: number }

function getPagesByDate(
  pages: Record<string, SheetPage>,
  key: DateKey,
  maxCount: number
): SheetPage[] {
  return Object.values(pages)
    .filter((page) => isListed(page) && !isTestFixture(page))
    .filter((page) => Boolean(page.frontmatter[key]))
    .sort((a, b) => {
      const byDate =
        (b.frontmatter[key]?.getTime() ?? 0) -
        (a.frontmatter[key]?.getTime() ?? 0)
      return byDate || a.slug.localeCompare(b.slug)
    })
    .slice(0, maxCount)
}

export function getNewPages(
  pages: Record<string, SheetPage>,
  options?: LatestOptions
): SheetPage[] {
  return getPagesByDate(pages, 'created_at', options?.maxCount ?? 20)
}

export function getUpdatedPages(
  pages: Record<string, SheetPage>,
  options?: LatestOptions
): SheetPage[] {
  return getPagesByDate(pages, 'updated', options?.maxCount ?? 20)
}

/**
 * Returns categories and their corresponding pages.
 */

export function getRecentPages(
  pages: Record<string, SheetPage>,
  options?: { maxCount?: number; excludeSnippets?: boolean }
): SheetPage[] {
  const { maxCount = 8, excludeSnippets = false } = options ?? {}

  // The recent list follows the active t1/t2 rotation, not best-effort t3.
  return Object.values(pages)
    .filter(
      (page) =>
        isListed(page) &&
        (page.frontmatter.tier === 't1' || page.frontmatter.tier === 't2') &&
        page.frontmatter.updated &&
        (!excludeSnippets || !isSnippet(page))
    )
    .sort(compare('desc', (page: SheetPage) => page.frontmatter.updated ?? ''))
    .slice(0, maxCount)
}

/**
 * Return featured pages for the home page
 */

export function getFeaturedPages(
  pages: Record<string, SheetPage>,
  options?: { maxCount?: number; excludeSnippets?: boolean }
): SheetPage[] {
  const { maxCount = 8, excludeSnippets = false } = options ?? {}

  return Object.values(pages)
    .filter(
      (page) =>
        isListed(page) &&
        hasTag(page, 'Featured') &&
        (!excludeSnippets || !isSnippet(page))
    )
    .sort(compare('asc', (page: SheetPage) => page.slug ?? ''))
    .slice(0, maxCount)
}

/** Snippet-layout sheets for the condensed homepage list */
export function getSnippetPages(pages: Record<string, SheetPage>): SheetPage[] {
  return Object.values(pages)
    .filter((page) => isListed(page) && isSnippet(page))
    .sort(
      compare('asc', (page: SheetPage) =>
        (
          page.frontmatter.link_title ??
          page.frontmatter.title ??
          page.slug
        ).toLowerCase()
      )
    )
}

/** Listed snippets grouped by nav category, with empty groups removed. */
export function getSnippetsByCategory(
  pages: Record<string, SheetPage>
): Category[] {
  const grouped = new Map<string, SheetPage[]>()

  for (const page of getSnippetPages(pages)) {
    const name = page.frontmatter.category
    const categoryName = name && categories.includes(name) ? name : 'Others'
    const group = grouped.get(categoryName)
    if (group) group.push(page)
    else grouped.set(categoryName, [page])
  }

  return categories.flatMap((category) => {
    const groupPages = grouped.get(category)
    if (!groupPages) return []
    return [{ id: category, title: category, pages: groupPages }]
  })
}

/**
 * Top pages (highest weight)
 */

export function getTopPages(
  pages: Record<string, SheetPage>,
  referencePage: SheetPage,
  options?: { maxCount?: number }
): SheetPage[] {
  const { maxCount = 6 } = options ?? {}

  return Object.values(pages)
    .filter((page) => isListed(page) && 'weight' in page.frontmatter)
    .filter((page) => page.slug !== referencePage.slug)
    .sort(compare('asc', (page: SheetPage) => page.slug ?? ''))
    .sort(compare('asc', (page: SheetPage) => page.frontmatter.weight ?? 0))
    .slice(0, maxCount)
}

/**
 * Top pages (highest weight)
 */

export function getRelatedPages(
  pages: Record<string, SheetPage>,
  referencePage: SheetPage,
  options?: { maxCount?: number }
): SheetPage[] {
  const { maxCount = 6 } = options ?? {}
  const category = referencePage.frontmatter.category

  return Object.values(pages)
    .filter((page) => isListed(page) && page.frontmatter.category === category)
    .filter((page) => page.slug !== referencePage.slug)
    .sort(compare('asc', (page: SheetPage) => page.slug ?? ''))
    .sort(compare('asc', (page: SheetPage) => page.frontmatter.weight ?? 0))
    .slice(0, maxCount)
}

/**
 * Returns archived sheets — hidden, deprecated, or archived — sorted by title.
 * Excludes test fixtures.
 */

export function getArchivedPages(
  pages: Record<string, SheetPage>
): SheetPage[] {
  return Object.values(pages)
    .filter((page) => !isListed(page) && !isTestFixture(page))
    .sort(
      compare('asc', (page: SheetPage) =>
        (page.frontmatter.title ?? page.slug).toLowerCase()
      )
    )
}

/**
 * Helper: Create a comparator function
 */

function compare<T>(
  direction: 'asc' | 'desc',
  accessor: (input: T) => number | string
) {
  const k = direction === 'desc' ? -1 : 1

  return (a: T, b: T): number => {
    const va = accessor(a)
    const vb = accessor(b)
    return k * (va === vb ? 0 : va > vb ? 1 : -1)
  }
}
