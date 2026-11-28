export type GroupRanking = {
  ordered: string[]
  visible: string[]
}

/** Orders a group's slugs by result rank */
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

/** Orders groups by their best hit */
export function rankGroupOrder(
  groupSlugs: readonly (readonly string[])[],
  resultSlugs: readonly string[],
  hasQuery: boolean
): number[] {
  const order = groupSlugs.map((_, index) => index)
  if (!hasQuery) return order

  const rankBySlug = new Map(resultSlugs.map((slug, rank) => [slug, rank]))
  const bestRank = groupSlugs.map((slugs) => {
    const ranks = slugs.flatMap((slug) => {
      const rank = rankBySlug.get(slug)
      return rank === undefined ? [] : [rank]
    })
    return ranks.length > 0 ? Math.min(...ranks) : Number.POSITIVE_INFINITY
  })

  return order.sort(
    (a, b) => (bestRank[a] ?? Infinity) - (bestRank[b] ?? Infinity) || a - b
  )
}

export function getResultTitle(query: string, baseTitle: string): string {
  return query ? `${query} — ${baseTitle}` : baseTitle
}
