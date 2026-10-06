import { baselines } from './baselines'
import { findOverlongCodeLines } from './lineWidths'
import { collectSheetFindingsBySlug, overAllowance } from './sheets'

describe('findOverlongCodeLines()', () => {
  test('flags code lines over 70 characters', () => {
    const line = 'x'.repeat(71)
    expect(findOverlongCodeLines('```sh\n' + line + '\n```')).toEqual([
      { line: 2, text: `71 chars: ${line}` }
    ])
  })

  test('accepts lines at the limit', () => {
    expect(findOverlongCodeLines('```sh\n' + 'x'.repeat(70) + '\n```')).toEqual(
      []
    )
  })

  test('applies the 42-character limit inside three-column sections', () => {
    const line = 'x'.repeat(43)
    const source = [
      '## Keys',
      '{: .-three-column}',
      '',
      '### Table',
      '',
      '```sh',
      line,
      '```',
      '',
      '## Next',
      '',
      '```sh',
      line,
      '```'
    ].join('\n')

    expect(findOverlongCodeLines(source)).toEqual([
      { line: 7, text: `43 chars: ${line}` }
    ])
  })

  test('ignores prose', () => {
    expect(findOverlongCodeLines('x'.repeat(200))).toEqual([])
  })
})

test('every sheet keeps code lines within its width limit', async () => {
  const findings = await collectSheetFindingsBySlug(findOverlongCodeLines)
  expect(overAllowance(findings, baselines.codeLineWidth)).toEqual([])
})
