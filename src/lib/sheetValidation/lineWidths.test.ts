import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanCodeLines } from './outline'
import { sheetSources } from './sheets'

const LIMIT = 70
/** Narrow columns wrap earlier (see the writing guidelines) */
const THREE_COLUMN_LIMIT = 42

type Finding = { line: number; text: string }

function findWideCodeLines(source: string): Finding[] {
  return scanCodeLines(source)
    .filter(
      ({ text, inThreeColumn }) =>
        text.length > (inThreeColumn ? THREE_COLUMN_LIMIT : LIMIT)
    )
    .map(({ line, text, inThreeColumn }) => ({
      line,
      text: `${text.length}>${
        inThreeColumn ? THREE_COLUMN_LIMIT : LIMIT
      } ${text.trim()}`
    }))
}

describe('findWideCodeLines()', () => {
  test('flags a code line over 70 characters', () => {
    const input = ['```bash', `echo ${'x'.repeat(66)}`, '```'].join('\n')
    expect(findWideCodeLines(input)).toHaveLength(1)
  })

  test('allows a 70-character code line', () => {
    const input = ['```bash', `echo ${'x'.repeat(65)}`, '```'].join('\n')
    expect(findWideCodeLines(input)).toEqual([])
  })

  test('allows long prose outside code', () => {
    expect(findWideCodeLines(`- ${'word '.repeat(40)}`)).toEqual([])
  })

  test('flags over 42 characters inside a three-column H2', () => {
    const input = [
      '## A',
      '{: .-three-column}',
      '',
      '```bash',
      `echo ${'x'.repeat(38)}`,
      '```'
    ].join('\n')
    expect(findWideCodeLines(input)).toHaveLength(1)
  })

  test('allows 42 characters there', () => {
    const input = [
      '## A',
      '{: .-three-column}',
      '',
      '```bash',
      `echo ${'x'.repeat(37)}`,
      '```'
    ].join('\n')
    expect(findWideCodeLines(input)).toEqual([])
  })

  test('returns to 70 characters after the next H2', () => {
    const input = [
      '## A',
      '{: .-three-column}',
      '',
      '```',
      'x'.repeat(30),
      '```',
      '',
      '## B',
      '',
      '```',
      'x'.repeat(50),
      '```'
    ].join('\n')
    expect(findWideCodeLines(input)).toEqual([])
  })
})

test('every sheet keeps code lines within the width limit', async () => {
  const counts: Record<string, number> = {}
  const findings: Array<Finding & { slug: string }> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    const wide = findWideCodeLines(source)
    if (wide.length) counts[slug] = wide.length
    for (const finding of wide) findings.push({ slug, ...finding })
  }

  if (updatingBaseline) return saveBaseline('lineWidths.json', counts)

  const allowed = loadBaseline<Record<string, number>>('lineWidths.json', {})
  expect(
    Object.entries(counts)
      .filter(([slug, count]) => count > (allowed[slug] ?? 0))
      .map(
        ([slug, count]) =>
          `${slug}: ${count} over-wide code lines (baseline ${
            allowed[slug] ?? 0
          })`
      )
  ).toEqual([])
})
