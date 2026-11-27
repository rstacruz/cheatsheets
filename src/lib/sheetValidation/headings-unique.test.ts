import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

type Finding = { line: number; title: string; first: number }

/** Flags a repeated H2/H3 title, which would collide on the page anchor */
export function findDuplicateHeadings(source: string): Finding[] {
  const seen = new Map<string, number>()
  const found: Finding[] = []

  for (const heading of scanHeadings(source)) {
    if (heading.level > 3) continue
    const key = heading.title.trim().toLowerCase()
    const first = seen.get(key)
    if (first === undefined) {
      seen.set(key, heading.line)
      continue
    }
    found.push({ line: heading.line, title: heading.title, first })
  }

  return found
}

describe('findDuplicateHeadings()', () => {
  test('allows unique headings', () => {
    const input = ['## A', '', '### B', '', '### C'].join('\n')
    expect(findDuplicateHeadings(input)).toEqual([])
  })

  test('flags a repeated H3', () => {
    const input = ['## A', '', '### Install', '', '### Install'].join('\n')
    expect(findDuplicateHeadings(input)).toEqual([
      { line: 5, title: 'Install', first: 3 }
    ])
  })

  test('compares titles case-insensitively', () => {
    const input = ['## Setup', '', '### setup'].join('\n')
    expect(findDuplicateHeadings(input)).toHaveLength(1)
  })

  test('flags a title shared by an H2 and an H3', () => {
    const input = ['## Date', '', '### Date'].join('\n')
    expect(findDuplicateHeadings(input)).toHaveLength(1)
  })

  test('ignores repeated H4 labels', () => {
    const input = ['### A', '', '#### Same', '', '#### Same'].join('\n')
    expect(findDuplicateHeadings(input)).toEqual([])
  })
})

test('every sheet has unique H2 and H3 titles', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findDuplicateHeadings(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(
      findings.map(({ slug, title }) => `${slug}#${title.toLowerCase()}`)
    )
  ].sort()
  if (updatingBaseline) return saveBaseline('headings-unique.json', keys)

  const allowed = new Set(loadBaseline<string[]>('headings-unique.json', []))
  const unexpected = findings
    .filter(({ slug, title }) => !allowed.has(`${slug}#${title.toLowerCase()}`))
    .map(
      ({ slug, line, title, first }) =>
        `${slug}:${line}: duplicate heading "${title}" (first at line ${first})`
    )
  expect(unexpected).toEqual([])
})
