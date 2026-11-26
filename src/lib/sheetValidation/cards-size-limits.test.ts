import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'
import { SEP_LINE, scanFences } from './utils'

type Finding = {
  line: number
  heading: string
  occurrence: number
  text: string
}

const MAX_TABLES = 4
const MAX_LINES = 50

/** Table blocks between two 1-based line positions, outside fences */
function countTables(
  lines: string[],
  fenced: boolean[],
  start: number,
  end: number
) {
  let count = 0
  let index = start

  while (index < end) {
    if (
      fenced[index] ||
      !lines[index].trim().startsWith('|') ||
      !SEP_LINE.test(lines[index + 1]?.trim() ?? '')
    ) {
      index++
      continue
    }
    count++
    index += 2
    while (
      index < end &&
      !fenced[index] &&
      lines[index].trim().startsWith('|')
    ) {
      index++
    }
  }

  return count
}

/** H3 cards with too many tables or too many lines */
function findLargeCards(source: string): Finding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const headings = scanHeadings(source)
  const found: Finding[] = []
  const seen = new Map<string, number>()

  headings.forEach((heading, index) => {
    if (heading.level !== 3) return
    const occurrence = (seen.get(heading.title) ?? 0) + 1
    seen.set(heading.title, occurrence)
    const end = headings[index + 1]?.line ?? lines.length + 1
    const lineCount = end - heading.line
    const tables = countTables(lines, fenced, heading.line, end - 1)
    if (tables < MAX_TABLES && lineCount < MAX_LINES) return

    const reason =
      tables >= MAX_TABLES ? `${tables} tables` : `${lineCount} lines`
    found.push({
      line: heading.line,
      heading: heading.title,
      occurrence,
      text: `card has ${reason}`
    })
  })

  return found
}

describe('findLargeCards()', () => {
  const tableBlock = (name: string) => [`| ${name} |`, '| --- |', '| value |']

  const card = (body: string[]) =>
    [
      '## Section',
      '',
      '### Card',
      '',
      ...body,
      '',
      '### Next',
      '',
      'text'
    ].join('\n')

  test('flags a card with four tables', () => {
    const body = Array.from({ length: 4 }, (_, index) => [
      ...tableBlock(`t${index}`),
      ''
    ]).flat()
    expect(findLargeCards(card(body))).toEqual([
      { line: 3, heading: 'Card', occurrence: 1, text: 'card has 4 tables' }
    ])
  })

  test('flags a card with 50 lines', () => {
    const body = Array(47).fill('text')
    expect(findLargeCards(card(body))).toEqual([
      { line: 3, heading: 'Card', occurrence: 1, text: 'card has 50 lines' }
    ])
  })

  test('allows three tables and 49 lines', () => {
    const body = [
      ...Array.from({ length: 3 }, (_, index) => [
        ...tableBlock(`t${index}`),
        ''
      ]).flat(),
      ...Array(30).fill('text')
    ]
    expect(findLargeCards(card(body))).toEqual([])
  })

  test('ignores pipe rows and fake headings inside a fence', () => {
    const body = [
      '```md',
      '### Fake',
      ...tableBlock('a'),
      ...tableBlock('b'),
      ...tableBlock('c'),
      ...tableBlock('d'),
      '```'
    ]
    expect(findLargeCards(card(body))).toEqual([])
  })

  test('numbers same-titled cards by their place in the sheet', () => {
    const input = [
      '## Section',
      '',
      '### Methods',
      '',
      'text',
      '',
      '### Methods',
      '',
      ...Array(48).fill('text')
    ].join('\n')
    expect(findLargeCards(input)).toEqual([
      { line: 7, heading: 'Methods', occurrence: 2, text: 'card has 50 lines' }
    ])
  })
})

/** Baseline keys use the card's place among same-titled cards */
function cardKeys(findings: Array<{ slug: string } & Finding>) {
  return findings.map(
    ({ slug, heading, occurrence }) => `${slug}#${heading}#${occurrence}`
  )
}

test('cardKeys uses each card’s occurrence', () => {
  const findings = [
    { slug: 'sheet', line: 1, heading: 'Methods', occurrence: 1, text: 'a' },
    { slug: 'sheet', line: 10, heading: 'Methods', occurrence: 2, text: 'b' }
  ]
  expect(cardKeys(findings)).toEqual(['sheet#Methods#1', 'sheet#Methods#2'])
})

test('cards/size-limits: every card stays within the size limit', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findLargeCards(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = cardKeys(findings)
  if (updatingBaseline)
    return saveBaseline('cards-size-limits.json', [...keys].sort())

  const allowed = new Set(loadBaseline<string[]>('cards-size-limits.json', []))
  const unexpected = findings.flatMap(({ slug, line, text }, index) =>
    allowed.has(keys[index]) ? [] : [`${slug}:${line}: ${text}`]
  )
  expect(unexpected).toEqual([])
})
