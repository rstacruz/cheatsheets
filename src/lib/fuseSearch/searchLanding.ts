/** Return the slug when a landed query has exactly one match. */
export function getInitialRedirectSlug(
  query: string,
  resultSlugs: readonly string[]
): string | null {
  if (!query.trim()) return null
  if (resultSlugs.length !== 1) return null
  return resultSlugs[0] ?? null
}
