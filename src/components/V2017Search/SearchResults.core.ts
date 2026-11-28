/**
 * Pure helpers for the search landing page. DOM work lives in
 * SearchResults.script.ts.
 */

export type GroupRanking = {
  ordered: string[]
  visible: string[]
}

/** Order one group's slugs by result rank; keep every card when there is no query. */
export function rankGroupSlugs(
  slugs: readonly string[],
  resultSlugs: readonly string[],
  hasQuery: boolean
): GroupRanking {
  if (!hasQuery) return { ordered: [...slugs], visible: [...slugs] }

  const groupSlugs = new Set(slugs)
  const matched = resultSlugs.filter((slug) => groupSlugs.has(slug))
  return { ordered: matched, visible: matched }
}

export function getStatusText(query: string, count: number): string {
  if (!query) return ''
  if (count === 0) return `No cheatsheets for “${query}”`
  return `${count} cheatsheets for “${query}”`
}

export function getResultTitle(query: string, baseTitle: string): string {
  return query ? `${query} — ${baseTitle}` : baseTitle
}
