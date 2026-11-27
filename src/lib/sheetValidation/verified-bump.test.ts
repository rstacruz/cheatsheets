import { execFileSync } from 'node:child_process'
import grayMatter from 'gray-matter'

const root = process.cwd()

function git(args: string[]) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore']
  })
}

/** Merge base from the PR environment, with local refs for developer runs */
function resolveBase() {
  const candidates = [
    process.env.VERIFIED_BASE_REF,
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

type Stamp = { last_verified_with?: string; last_verified_at?: Date }

function readStamp(ref: string, path: string): Stamp | null {
  try {
    return grayMatter(git(['show', `${ref}:${path}`])).data as Stamp
  } catch {
    return null
  }
}

function changedMarkdown(baseSha: string) {
  return git(['diff', '--name-only', '-z', baseSha, 'HEAD'])
    .split('\0')
    .filter((path) => path.endsWith('.md'))
}

function staleStamp(slug: string, before: Stamp, after: Stamp): string | null {
  if (before.last_verified_with === after.last_verified_with) return null

  const previous = before.last_verified_at
  const current = after.last_verified_at
  if (!current || (previous && current <= previous)) {
    const date = previous?.toISOString().slice(0, 10) ?? 'the base stamp'
    return `FAIL ${slug}: last_verified_with changed; bump last_verified_at past ${date}`
  }
  return null
}

const base = resolveBase()

test.skipIf(!base)('a changed note moves the stamp forward', () => {
  const failures = changedMarkdown(base!.sha).flatMap((path) => {
    const before = readStamp(base!.sha, path)
    const after = readStamp('HEAD', path)
    if (!before || !after) return []

    const failure = staleStamp(path.replace(/\.md$/, ''), before, after)
    return failure ? [failure] : []
  })
  expect(failures).toEqual([])
})

const CURRENT = {
  last_verified_with: 'Bash 5.3.',
  last_verified_at: new Date('2026-11-28')
}

it.each([
  ['no stamp', {}, 'bump last_verified_at'],
  [
    'the same stamp',
    {
      last_verified_with: 'Bash 5.4.',
      last_verified_at: new Date('2026-11-28')
    },
    'bump last_verified_at'
  ],
  [
    'an older stamp',
    {
      last_verified_with: 'Bash 5.4.',
      last_verified_at: new Date('2026-11-27')
    },
    'bump last_verified_at'
  ]
] as const)('rejects a note change with %s', (_label, after, message) => {
  expect(staleStamp('bash', CURRENT, after)).toContain(message)
})

test('accepts a newer stamp with the changed note', () => {
  expect(
    staleStamp('bash', CURRENT, {
      last_verified_with: 'Bash 5.4.',
      last_verified_at: new Date('2026-11-29')
    })
  ).toBeNull()
})
