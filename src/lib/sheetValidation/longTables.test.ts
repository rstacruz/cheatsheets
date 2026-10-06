import { baselines } from './baselines'
import { findUnsplitTables } from './longTables'
import { collectSheetFindingsBySlug, overAllowance } from './sheets'

describe('findUnsplitTables()', () => {
  test('flags a table with 8 rows and no separator rows', () => {
    const rows = Array.from({ length: 8 }, (_, i) => `| a${i} | b${i} |`)
    expect(
      findUnsplitTables(['| A | B |', '| --- | --- |', ...rows].join('\n'))
    ).toEqual([{ line: 1, text: '8-row table' }])
  })

  test('accepts a table split by separator rows', () => {
    const rows = Array.from({ length: 8 }, (_, i) => `| a${i} | b${i} |`)
    const source = [
      '| A | B |',
      '| --- | --- |',
      ...rows.slice(0, 4),
      '| --- | --- |',
      ...rows.slice(4)
    ].join('\n')
    expect(findUnsplitTables(source)).toEqual([])
  })

  test('accepts tables under 8 rows', () => {
    const rows = Array.from({ length: 7 }, (_, i) => `| a${i} | b${i} |`)
    expect(
      findUnsplitTables(['| A | B |', '| --- | --- |', ...rows].join('\n'))
    ).toEqual([])
  })

  test('ignores tables inside fences', () => {
    const rows = Array.from({ length: 8 }, (_, i) => `| a${i} | b${i} |`)
    const source = ['```md', '| A | B |', '| --- | --- |', ...rows, '```'].join(
      '\n'
    )
    expect(findUnsplitTables(source)).toEqual([])
  })
})

test('every table with 8+ rows is separated', async () => {
  const findings = await collectSheetFindingsBySlug(findUnsplitTables)
  expect(overAllowance(findings, baselines.unsplitTable)).toEqual([])
})
