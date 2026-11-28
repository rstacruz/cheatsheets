/** Redirect slug for a single-hit query */
export function getInitialRedirectSlug(
  query: string,
  resultSlugs: readonly string[]
): string | null {
  if (!query.trim()) return null
  if (resultSlugs.length !== 1) return null
  return resultSlugs[0] ?? null
}
