/**
 * Helpers for `public/_redirects` (Cloudflare Pages / Netlify format), kept
 * apart from the test so the parsing rules are readable.
 */

export type RedirectRule = {
  /** Source path, always starting with `/` */
  source: string
  /** Destination path or absolute URL */
  target: string
  /** HTTP status, one of the 3xx codes below */
  status: number
}

export const REDIRECT_STATUSES = [301, 302, 303, 307, 308]

const NON_PAGE_FILES =
  /^(?:README|AGENTS|CONTRIBUTING|404|index|index@2016)\.md$/
const NON_PAGE_DIRS = /^(?:_docs|artefacts)\//

/** Parses the file, collecting malformed lines instead of throwing */
export function parseRedirects(text: string) {
  const rules: RedirectRule[] = []
  const errors: string[] = []
  const seen = new Set<string>()

  text.split('\n').forEach((rawLine, index) => {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) return

    const [source, target, statusText = '301'] = line.split(/\s+/)
    const lineNumber = index + 1

    if (!source || !target) {
      errors.push(`${lineNumber}: expected 'source target [status]'`)
      return
    }
    if (!source.startsWith('/')) {
      errors.push(`${lineNumber}: source must start with '/': ${source}`)
      return
    }
    if (!target.startsWith('/') && !/^https?:\/\//.test(target)) {
      errors.push(`${lineNumber}: target must be a path or URL: ${target}`)
      return
    }

    const status = Number(statusText)
    if (!REDIRECT_STATUSES.includes(status)) {
      errors.push(`${lineNumber}: status must be 3xx, got '${statusText}'`)
      return
    }

    if (seen.has(source)) {
      errors.push(`${lineNumber}: duplicate source: ${source}`)
      return
    }

    seen.add(source)
    rules.push({ source, target, status })
  })

  return { rules, errors }
}

/**
 * Page slug a target points at. `null` for external URLs, splats, and
 * placeholders, which the checks cannot resolve to a file.
 */
export function targetSlug(target: string): string | null {
  if (!target.startsWith('/')) return null
  if (/[*:]/.test(target)) return null

  const path = target.split('#')[0].split('?')[0]
  return path.replace(/^\//, '').replace(/\/$/, '')
}

/**
 * Markdown files `getPages()` publishes: root-level sheets plus one directory
 * deep, minus the repo files and docs it negates. A test asserts every
 * published page passes, so the two cannot drift silently.
 */
export function isSheetPath(path: string): boolean {
  if (!/^[^/]+(?:\/[^/]+)?\.md$/.test(path)) return false
  if (NON_PAGE_FILES.test(path)) return false
  if (NON_PAGE_DIRS.test(path)) return false
  return true
}

/** URL slug for a sheet path: `wip/php.md` → `wip/php` */
export function sheetSlug(path: string): string {
  return path.replace(/\.md$/, '')
}

/**
 * Slugs of removed sheets that still need a redirect. `paths` are git paths
 * from a deleted-files diff, eg `wip/php.md`.
 */
export function unredirectedSheets(paths: string[], rules: RedirectRule[]) {
  const sources = new Set(rules.map((rule) => rule.source))

  return paths.flatMap((path) => {
    if (!isSheetPath(path)) return []
    const slug = sheetSlug(path)
    return sources.has(`/${slug}`) ? [] : [slug]
  })
}
