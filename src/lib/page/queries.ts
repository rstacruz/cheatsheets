import { categories } from '../../config'
import type { SheetPage } from '../page'
import { hasTag, isListed } from './accessors'

export type Category = {
  pages: SheetPage[]
  title: string
  id: string
}

/**
 * Returns categories and their corresponding pages.
 */

export function getPagesByCategory(pages: Record<string, SheetPage>) {
  const pageCategories: Record<string, Category> = {}

  for (const category of categories) {
    pageCategories[category] = { pages: [], title: category, id: category }
  }

  for (const page of Object.values(pages)) {
    if (!isListed(page)) continue

    const categoryName = page.frontmatter.category ?? 'Others'
    if (!categoryName) continue

    let cat = pageCategories[categoryName]
    if (!cat) cat = pageCategories['Others']

    cat.pages.push(page)
  }
  return pageCategories
}

/**
 * Returns categories and their corresponding pages.
 */

export function getRecentPages(
  pages: Record<string, SheetPage>,
  options?: { maxCount?: number }
): SheetPage[] {
  const { maxCount = 8 } = options ?? {}

  return Object.values(pages)
    .filter((page) => isListed(page) && page.frontmatter.updated)
    .sort(compare('desc', (page: SheetPage) => page.frontmatter.updated ?? ''))
    .slice(0, maxCount)
}

/**
 * Return featured pages for the home page
 */

export function getFeaturedPages(
  pages: Record<string, SheetPage>,
  options?: { maxCount?: number }
): SheetPage[] {
  const { maxCount = 8 } = options ?? {}

  return Object.values(pages)
    .filter((page) => isListed(page) && hasTag(page, 'Featured'))
    .sort(compare('asc', (page: SheetPage) => page.slug ?? ''))
    .slice(0, maxCount)
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
