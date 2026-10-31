import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

/** Footer sections list links only; the one H2 shape allowed to skip H3s */
const FOOTER_TITLES = new Set([
  'also see',
  'see also',
  'references',
  'reference',
  'read more'
])

type Finding = { line: number; title: string }

function findH2WithoutH3(source: string): Finding[] {
  const found: Finding[] = []
  let section: { line: number; title: string; hasH3: boolean } | undefined

  const flush = () => {
    if (
      section &&
      !section.hasH3 &&
      !FOOTER_TITLES.has(section.title.toLowerCase())
    ) {
      found.push({ line: section.line, title: section.title })
    }
  }

  for (const heading of scanHeadings(source)) {
    if (heading.level === 2) {
      flush()
      section = { line: heading.line, title: heading.title, hasH3: false }
    } else if (heading.level === 3 && section) {
      section.hasH3 = true
    }
  }

  flush()
  return found
}

describe('findH2WithoutH3()', () => {
  test('flags an H2 with no H3', () => {
    expect(findH2WithoutH3('## A\n\ntext')).toEqual([{ line: 1, title: 'A' }])
  })

  test('allows an H2 with an H3', () => {
    expect(findH2WithoutH3('## A\n\n### B\n\ntext')).toEqual([])
  })

  test('allows footer sections', () => {
    const input = '## A\n\n### B\n\n## Also see\n\n- [x](./x)'
    expect(findH2WithoutH3(input)).toEqual([])
  })

  test('flags each H2 that has no H3', () => {
    expect(findH2WithoutH3('## A\n\n## B\n')).toEqual([
      { line: 1, title: 'A' },
      { line: 3, title: 'B' }
    ])
  })

  test('ignores headings inside fenced code', () => {
    expect(findH2WithoutH3('## A\n\n### B\n\n```md\n## C\n```')).toEqual([])
  })
})

test('every sheet gives each H2 an H3', async () => {
  const findings: Array<Finding & { slug: string }> = []
  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findH2WithoutH3(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, title }) => `${slug}#${title}`))
  ].sort()
  if (updatingBaseline) return saveBaseline('structure.json', keys)

  const allowed = new Set(loadBaseline<string[]>('structure.json', []))
  expect(
    findings
      .filter(({ slug, title }) => !allowed.has(`${slug}#${title}`))
      .map(({ slug, line, title }) => `${slug}:${line}: ${title}`)
  ).toEqual([])
})
