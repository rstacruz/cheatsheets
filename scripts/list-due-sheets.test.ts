import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getPages } from '../src/lib/page'
import { listSheetFiles } from '../src/lib/sheetFiles'
import { DEFAULT_LABEL, openPrSheetPaths } from './lib/openPrFiles'
import {
  findDueSheets,
  formatReport,
  loadSheets,
  parseOptions,
  run,
  type DueSheet,
  type Tier
} from './list-due-sheets'

const DATE = '2026-11-28'
const SHEETS = {
  oldest: fixture('t1', '2026-11-01'),
  twin: fixture('t1', '2026-11-01'),
  alpha: fixture('t1', '2026-11-14'),
  'recent-t1': fixture('t1', '2026-11-15'),
  hidden: fixture('t1', '2026-11-01', 'Hidden'),
  'older-t2': fixture('t2', '2026-10-31'),
  'recent-t2': fixture('t2', '2026-11-01')
}

let root: string

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), 'due-sheets-'))
  for (const [slug, source] of Object.entries(SHEETS)) {
    writeFileSync(join(root, `${slug}.md`), source)
  }
})

afterAll(() => rmSync(root, { recursive: true, force: true }))

it.each([[], ['--json'], ['--date', DATE]])(
  'requires --tier: %j',
  (...args) => {
    expect(() => parseOptions(args)).toThrow(/--tier is required/)
  }
)
it.each(['2026-02-30', '2026-13-01', '26-11-28'])(
  'rejects invalid --date: %s',
  (date) => {
    expect(() => parseOptions(['--tier', 't1', '--date', date])).toThrow(
      /--date must be YYYY-MM-DD/
    )
  }
)

it.each([
  ['t1', '2026-11-14'],
  ['t2', '2026-10-31']
] as const)('treats the %s cadence as inclusive', (tier, stamp) => {
  const rows = findDueSheets(loadSheets(root), { tier, date: DATE })
  expect(rows.map((row) => row.verifiedAt)).toContain(stamp)
})

test('t1 excludes sheets younger than 14 days', () => {
  const rows = dueRows(['--tier', 't1'])
  expect(rows.map((row) => row.slug)).toEqual(['oldest', 'twin', 'alpha'])
})

test('t2 uses a 28-day cadence', () => {
  expect(dueRows(['--tier', 't2']).map((row) => row.slug)).toEqual(['older-t2'])
})

test('limits the oldest-first result', () => {
  const slugs = dueRows(['--tier', 't1', '--limit', '1']).map((row) => row.slug)
  expect(slugs).toEqual(['oldest'])
})

test('sorts equal stamps by slug', () => {
  const slugs = dueRows(['--tier', 't1']).map((row) => row.slug)
  expect(slugs).toEqual(['oldest', 'twin', 'alpha'])
})

it.each([
  [
    't2',
    '2026-10-31',
    'No t2 sheets are due for verification; sheets in open sheet-refresh PRs are excluded.'
  ],
  [
    't2',
    DATE,
    '1 t2 sheet is due for verification, oldest first; sheets in open sheet-refresh PRs are excluded.'
  ],
  [
    't1',
    DATE,
    '3 t1 sheets are due for verification, oldest first; sheets in open sheet-refresh PRs are excluded.'
  ]
])('prints the %s summary on %s', (tier, date, expected) => {
  const rows = findDueSheets(loadSheets(root), { tier: tier as Tier, date })
  const line = formatReport(rows, tier as Tier, DEFAULT_LABEL).split('\n')[0]
  expect(line).toBe(expected)
})

test('prints a TSV table with dated rows', () => {
  const output = run(['--tier', 't1', '--date', DATE], {
    root,
    excludedPaths: new Set(),
    print: vi.fn()
  })
  const lines = output.split('\n')

  expect(lines[1]).toBe('')
  expect(lines[2]).toBe('slug\tlast_verified_at\tage')
  expect(lines[3]).toBe('oldest\t2026-11-01\t27d')
})

test('prints dashes when a stamp is missing', () => {
  const rows = findDueSheets(
    [{ slug: 'undated', frontmatter: { tier: 't1' } }],
    { tier: 't1', date: DATE }
  )
  expect(formatReport(rows, 't1', DEFAULT_LABEL)).toContain('undated\t-\t-')
})

test('excludes sheets in open PRs', () => {
  const excluded = openPrSheetPaths(DEFAULT_LABEL, () =>
    JSON.stringify([
      { number: 1, files: [{ path: 'oldest.md' }, { path: '_docs/tiers.md' }] }
    ])
  )
  const slugs = dueRows(['--tier', 't1'], excluded).map((row) => row.slug)
  expect(slugs).toEqual(['twin', 'alpha'])
})
test('run uses open PR paths by default', () => {
  const openPrPaths = vi.fn(() => new Set(['oldest.md']))
  const output = run(['--tier', 't1', '--date', DATE, '--json'], {
    root,
    openPrPaths,
    print: vi.fn()
  })
  expect(JSON.parse(output).map((row: DueSheet) => row.slug)).toEqual([
    'twin',
    'alpha'
  ])
  expect(openPrPaths).toHaveBeenCalledWith(DEFAULT_LABEL)
})

test('warns and continues when gh fails', () => {
  const warn = vi.spyOn(console, 'error').mockImplementation(() => {})
  const excluded = openPrSheetPaths(DEFAULT_LABEL, () => {
    throw new Error('not logged in')
  })

  expect(excluded.size).toBe(0)
  expect(warn.mock.calls[0][0]).toMatch(/could not list open sheet-refresh PRs/)
  warn.mockRestore()
})

test('listing never edits sheets', () => {
  const before = Object.keys(SHEETS).map((slug) =>
    readFileSync(join(root, `${slug}.md`), 'utf8')
  )
  dueRows(['--tier', 't1'])

  const after = Object.keys(SHEETS).map((slug) =>
    readFileSync(join(root, `${slug}.md`), 'utf8')
  )
  expect(after).toEqual(before)
})

test('discovers the same sheets as getPages', async () => {
  const slugs = Object.keys(await getPages())
  expect(
    listSheetFiles()
      .map((path) => path.replace(/\.md$/, ''))
      .sort()
  ).toEqual(slugs.sort())
})

function dueRows(args: string[], excluded = new Set<string>()): DueSheet[] {
  const output = run([...args, '--date', DATE, '--json'], {
    root,
    excludedPaths: excluded,
    print: vi.fn()
  })
  return JSON.parse(output) as DueSheet[]
}

function fixture(tier: string, stamp: string, category = 'Test') {
  return [
    '---',
    `category: ${category}`,
    'created_at: 2010-01-01',
    'intro: Hello',
    'links:',
    '  - title: Docs',
    '    url: https://example.com/docs',
    `tier: ${tier}`,
    'last_verified_with: "Tool 1.0."',
    'fragments: [a, b, c, d, e, f, g, h, i, j, k, l]',
    `updated: ${stamp}`,
    `last_verified_at: ${stamp}`,
    '---',
    '',
    '# Body'
  ].join('\n')
}
