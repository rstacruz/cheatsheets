import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { getPages } from './page'
import {
  isSheetPath,
  parseRedirects,
  sheetSlug,
  targetSlug,
  unredirectedSheets
} from './redirects'

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

/** Files removed between two commits. Renames show up as a delete plus an add */
function deletedPaths(baseSha: string, headSha = 'HEAD') {
  const output = git([
    'diff',
    '--name-status',
    '-z',
    '--diff-filter=D',
    '--no-renames',
    baseSha,
    headSha
  ])
  return output.split('\0').filter((token) => token && token !== 'D')
}

/** Routes Astro or `public/` serve in addition to markdown pages */
function staticRoutes() {
  const routes = new Set<string>([''])

  for (const entry of readdirSync(join(root, 'src/pages'), {
    withFileTypes: true
  })) {
    if (!entry.isFile() || !/\.(?:astro|ts)$/.test(entry.name)) continue
    const name = entry.name.replace(/\.(?:astro|ts)$/, '')
    if (name.includes('[')) continue
    routes.add(name === 'index' ? '' : name)
  }

  for (const entry of readdirSync(join(root, 'public'), {
    withFileTypes: true
  })) {
    if (!entry.isFile() || entry.name.startsWith('_')) continue
    routes.add(entry.name)
  }

  return routes
}

async function livePaths() {
  const pages = await getPages()
  return new Set([...Object.keys(pages), ...staticRoutes()])
}

const base = resolveBase()

test('the redirect file is well formed', () => {
  expect(errors).toEqual([])
})

test('redirect sources do not shadow live pages', async () => {
  const live = await livePaths()
  const shadowing = rules.flatMap((rule) =>
    live.has(rule.source.slice(1)) ? [rule.source] : []
  )
  expect(shadowing).toEqual([])
})

test('redirect targets are live pages or external URLs', async () => {
  const live = await livePaths()
  const missing = rules.flatMap((rule) => {
    const slug = targetSlug(rule.target)
    if (slug === null || live.has(slug)) return []
    return [`${rule.source} -> ${rule.target}`]
  })
  expect(missing).toEqual([])
})

test('the live set includes non-markdown routes', async () => {
  const live = await livePaths()
  expect(live.has('archive')).toBe(true)
  expect(live.has('robots.txt')).toBe(true)
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

  const missing = unredirectedSheets(deletedPaths(base.sha), rules)

  expect(
    missing,
    'Add a rule to public/_redirects, eg `/old /new 301`'
  ).toEqual([])
})

describe('unredirectedSheets', () => {
  const redirect = (source: string) => ({ source, target: '/', status: 301 })

  test('flags removed sheets that have no rule', () => {
    expect(unredirectedSheets(['php.md', 'wip/php.md'], [])).toEqual([
      'php',
      'wip/php'
    ])
  })

  test('accepts removed sheets that have a rule', () => {
    expect(unredirectedSheets(['wip/php.md'], [redirect('/wip/php')])).toEqual(
      []
    )
  })

  test('ignores files that are not pages', () => {
    expect(
      unredirectedSheets(['README.md', '_docs/tiers.md', 'docs/a/b.md'], [])
    ).toEqual([])
  })
})

test('sheet paths are root or one directory deep', () => {
  expect(isSheetPath('php.md')).toBe(true)
  expect(isSheetPath('wip/php.md')).toBe(true)
  expect(isSheetPath('README.md')).toBe(false)
  expect(isSheetPath('_docs/tiers.md')).toBe(false)
  expect(isSheetPath('docs/a/b.md')).toBe(false)
  expect(sheetSlug('wip/php.md')).toEqual('wip/php')
})

test('every published page is a sheet path', async () => {
  const pages = await getPages()
  const rejected = Object.keys(pages).filter(
    (slug) => !isSheetPath(`${slug}.md`)
  )
  expect(rejected).toEqual([])
})

test('deletedPaths finds a known removal in a commit range', () => {
  // 3ad25b5a5 promoted wip/php.md to php.md
  expect(deletedPaths('3ad25b5a5^', '3ad25b5a5')).toContain('wip/php.md')
})
