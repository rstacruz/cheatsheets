import { baselines } from './baselines'
import { collectSheetFindingsBySlug, overAllowance } from './sheets'
import { findH2WithoutH3 } from './structure'

describe('findH2WithoutH3()', () => {
  test('flags a content section without H3 cards', () => {
    expect(findH2WithoutH3('## Setup\n\nrun this')).toEqual([
      { line: 1, text: 'Setup' }
    ])
  })

  test('accepts a section with an H3', () => {
    expect(findH2WithoutH3('## Setup\n\n### Install\n\nrun this')).toEqual([])
  })

  test('accepts link footers', () => {
    expect(findH2WithoutH3('## Also see\n\n- [Docs](https://x)')).toEqual([])
    expect(findH2WithoutH3('## References\n\n- [Docs](https://x)')).toEqual([])
  })

  test('ignores headings inside fences', () => {
    expect(
      findH2WithoutH3('## Setup\n\n### Install\n\n```md\n## Fake\n```')
    ).toEqual([])
    expect(findH2WithoutH3('## Setup\n\n```md\n### Fake\n```')).toEqual([
      { line: 1, text: 'Setup' }
    ])
  })
})

test('every H2 has an H3, or is a link footer', async () => {
  const findings = await collectSheetFindingsBySlug(findH2WithoutH3)
  expect(overAllowance(findings, baselines.h2WithoutH3)).toEqual([])
})
