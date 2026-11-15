import Fuse from 'fuse.js'
import type { SheetPage } from '~/lib/page'

/**
 * This is what gets served in searchindex.json
 */

export type ExternalSearchData = {
  index: ReturnType<FuseIndex['toJSON']>
  rows: Array<{ title: string; slug: string }>
}

export type Row = { title: string; slug: string }

export type FuseIndex = Fuse.FuseIndex<Row>

/** A subset of `SheetPage` needed for search indexing */
type PartialSheetPage = {
  slug: SheetPage['slug']
  frontmatter: Pick<SheetPage['frontmatter'], 'title'>
}

/**
 * Get `pages` and turn them into a fuse index json.
 */

export function buildFuseIndex(pages: Record<string, PartialSheetPage>) {
  const rows = Object.values(pages).map((page): Row => {
    return { title: (page.frontmatter.title ?? '') as string, slug: page.slug }
  })
  const myIndex: FuseIndex = Fuse.createIndex(['title', 'slug'], rows)
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
  const index = Fuse.parseIndex(data.index)
  const fuse = new Fuse<Row>(data.rows, {}, index)
  return fuse
}
