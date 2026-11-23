import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPages } from './page'
import { isSheetPath, parseRedirects, sheetSlug, targetSlug } from './redirects'

// Vitest runs from the repo root; import.meta.url is not a file URL in tests
const root = process.cwd()
const { rules, errors } = parseRedirects(
  readFileSync(join(root, 'public/_redirects'), 'utf8')
)

function git(args: string[]) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    // Missing refs are expected while resolving the base; keep stderr quiet
    stdio: ['ignore', 'pipe', 'ignore']
  })
}

/**
 * Commit the pull request branched from. CI checks out a shallow clone unless
 * build.yml sets `fetch-depth: 0`; local runs fall back to the default branch.
 */
function resolveBase() {
  const candidates = [
    process.env.REDIRECT_BASE_REF,
    process.env.GITHUB_BASE_REF && `origin/${process.env.GITHUB_BASE_REF}`,
    ...(process.env.GITHUB_ACTIONS
      ? []
      : ['origin/main', 'origin/master', 'main', 'master'])
  ].filter((ref): ref is string => Boolean(ref))

  for (const ref of candidates) {
    try {
      const sha = git(['merge-base', ref, 'HEAD']).trim()
      if (sha) return { ref, sha }
    } catch {
      // Ref is not in this clone; try the next candidate
    }
  }

  return null
}

/** Files removed by the branch. Renames show up as a delete plus an add */
function deletedPaths(baseSha: string) {
  const output = git([
    'diff',
    '--name-status',
    '-z',
    '--diff-filter=D',
    '--no-renames',
    baseSha,
    'HEAD'
  ])
  return output.split('\0').filter((token) => token && token !== 'D')
}

const base = resolveBase()

test('the redirect file is well formed', () => {
  expect(errors).toEqual([])
})

test('redirect sources do not shadow live pages', async () => {
  const pages = await getPages()
  const shadowing = rules.flatMap((rule) =>
    pages[rule.source.slice(1)] ? [rule.source] : []
  )
  expect(shadowing).toEqual([])
})

test('redirect targets are live pages or external URLs', async () => {
  const pages = await getPages()
  const missing = rules.flatMap((rule) => {
    const slug = targetSlug(rule.target)
    if (slug === null || slug === '' || pages[slug]) return []
    return [`${rule.source} -> ${rule.target}`]
  })
  expect(missing).toEqual([])
})

test('redirects do not chain', () => {
  const sources = new Set(rules.map((rule) => rule.source))
  const chains = rules.flatMap((rule) => {
    const slug = targetSlug(rule.target)
    if (slug === null || slug === '') return []
    return sources.has(`/${slug}`) ? [rule.source] : []
  })
  expect(chains).toEqual([])
})

test('the pull request base commit is available', () => {
  // GITHUB_BASE_REF is only set on pull_request events
  if (!process.env.GITHUB_BASE_REF) return
  expect(
    base,
    'Could not resolve the PR base; check fetch-depth in build.yml'
  ).not.toBeNull()
})

test.skipIf(!base)('removed sheets redirect their old URL', () => {
  if (!base) throw new Error('no base commit')

  const sources = new Set(rules.map((rule) => rule.source))
  const missing = deletedPaths(base.sha).flatMap((path) => {
    if (!isSheetPath(path)) return []
    const slug = sheetSlug(path)
    return sources.has(`/${slug}`) ? [] : [slug]
  })

  expect(
    missing,
    'Add a rule to public/_redirects, eg `/old /new 301`'
  ).toEqual([])
})
