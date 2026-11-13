import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

/** Footer sections list links only; the one H2 shape exempt from the minimum */
const FOOTER_TITLES: Record<string, true> = {
  'also see': true,
  'see also': true,
  references: true,
  reference: true,
  'read more': true
}

/** A single card renders as a stub, so every section gets at least two */
const MIN_H3 = 2

type Finding = { line: number; title: string; count: number }

function findThinH2Sections(source: string): Finding[] {
  const found: Finding[] = []
  let section: Finding | undefined

  const flush = () => {
    if (
      section &&
      section.count < MIN_H3 &&
      !FOOTER_TITLES[section.title.toLowerCase()]
    ) {
      found.push(section)
    }
  }

  for (const heading of scanHeadings(source)) {
    if (heading.level === 2) {
      flush()
      section = { line: heading.line, title: heading.title, count: 0 }
    } else if (heading.level === 3 && section) {
      section.count++
    }
  }

  flush()
  return found
}

describe('findThinH2Sections()', () => {
  test('flags an H2 with no H3', () => {
    expect(findThinH2Sections('## A\n\ntext')).toEqual([
      { line: 1, title: 'A', count: 0 }
    ])
  })

  test('flags an H2 with one H3', () => {
    expect(findThinH2Sections('## A\n\n### B\n\ntext')).toEqual([
      { line: 1, title: 'A', count: 1 }
    ])
  })

  test('allows an H2 with two H3s', () => {
    expect(findThinH2Sections('## A\n\n### B\n\n### C')).toEqual([])
  })

  test('does not count H4s', () => {
    expect(findThinH2Sections('## A\n\n### B\n\n#### C')).toEqual([
      { line: 1, title: 'A', count: 1 }
    ])
  })

  test('allows footer sections', () => {
    const input = '## A\n\n### B\n\n## Also see\n\n- [x](./x)'
    expect(findThinH2Sections(input)).toEqual([
      { line: 1, title: 'A', count: 1 }
    ])
  })

  test('allows footer sections with one card', () => {
    const input = '## References\n\n### Docs\n\n- [x](./x)'
    expect(findThinH2Sections(input)).toEqual([])
  })

  test('flags each thin H2', () => {
    expect(findThinH2Sections('## A\n\n### B\n\n## C\n')).toEqual([
      { line: 1, title: 'A', count: 1 },
      { line: 5, title: 'C', count: 0 }
    ])
  })

  test('ignores headings inside fenced code', () => {
    const input = '## A\n\n### B\n\n```md\n## C\n```'
    expect(findThinH2Sections(input)).toEqual([
      { line: 1, title: 'A', count: 1 }
    ])
  })
})

test('every sheet gives each H2 at least two H3s', async () => {
  const findings: Array<Finding & { slug: string }> = []
  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findThinH2Sections(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, title }) => `${slug}#${title}`))
  ].sort()
  if (updatingBaseline) return saveBaseline('structure.json', keys)

  const allowed = new Set(loadBaseline<string[]>('structure.json', []))
  expect(
    findings.flatMap(({ slug, line, title, count }) =>
      allowed.has(`${slug}#${title}`)
        ? []
        : [`${slug}:${line}: "${title}" has ${count} H3`]
    )
  ).toEqual([])
})
