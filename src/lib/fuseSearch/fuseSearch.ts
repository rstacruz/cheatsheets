import Fuse from 'fuse.js'
import type { SheetPage } from '~/lib/page'

/**
 * This is what gets served in searchindex.json
 */

export type ExternalSearchData = {
  index: ReturnType<FuseIndex['toJSON']>
  rows: Row[]
}

export type Row = {
  title: string
  slug: string
  subtitle?: string
  keywords?: string[]
  category?: string
  headings?: string[]
}

export type FuseIndex = Fuse.FuseIndex<Row>

/** A subset of `SheetPage` needed for search indexing */
type PartialSheetPage = {
  slug: SheetPage['slug']
  markdown: SheetPage['markdown']
  frontmatter: Pick<
    SheetPage['frontmatter'],
    'title' | 'subtitle' | 'keywords' | 'category'
  >
}

const searchKeys: Fuse.FuseOptionKey<Row>[] = [
  { name: 'title', weight: 0.4 },
  { name: 'slug', weight: 0.25 },
  { name: 'keywords', weight: 0.15 },
  { name: 'headings', weight: 0.1 },
  { name: 'subtitle', weight: 0.07 },
  { name: 'category', weight: 0.03 }
]

const searchOptions: Fuse.IFuseOptions<Row> = {
  keys: searchKeys,
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2
}

/**
 * Get `pages` and turn them into a fuse index json.
 */

export function buildFuseIndex(pages: Record<string, PartialSheetPage>) {
  const rows = Object.values(pages).map((page): Row => {
    return {
      title: (page.frontmatter.title ?? '') as string,
      slug: page.slug,
      subtitle: page.frontmatter.subtitle,
      keywords: page.frontmatter.keywords,
      category: page.frontmatter.category,
      headings: Array.from(page.markdown.matchAll(/^###\s+(.+)$/gm), (match) =>
        match[1].trim()
      )
    }
  })
  const myIndex: FuseIndex = Fuse.createIndex(searchKeys, rows)
  const indexJSON = myIndex.toJSON()

  const result = { index: indexJSON, rows }
  return result
}

export async function fetchFuse() {
  const res = await fetch('/searchindex.json')
  if (res.status > 400) throw new Error('Failed to fetch searchindex.json')
  return res.json()
}

export function parseFuse(data: ExternalSearchData) {
  const index = Fuse.parseIndex<Row>(data.index)
  const fuse = new Fuse<Row>(data.rows, searchOptions, index)
  return fuse
}
