import { parseAttributes } from '~/lib/markdown/comments'
import { parseHighlightSpec } from '~/lib/markdown/inlineHighlight'
import { commentsAfter } from './attributes'
import { isSheetSlug } from './baseline'
import { sheetSources } from './sheets'
import { findFences } from './utils'

type Finding = { line: number; text: string }

/** `data-highlight` tokens already used by another block in the same sheet */
function findRepeatedHighlights(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  const firstUse = new Map<string, number>()

  for (const fence of findFences(lines)) {
    for (const { line, attributes } of commentsAfter(lines, fence.closeLine)) {
      const spec = parseAttributes(attributes)?.['data-highlight']
      if (spec === undefined) continue

      for (const token of parseHighlightSpec(spec)) {
        const first = firstUse.get(token)
        if (first === undefined) {
          firstUse.set(token, line)
        } else {
          found.push({
            line,
            text: `repeated data-highlight token: ${token} (first used at line ${first})`
          })
        }
      }
    }
  }

  return found
}

describe('code/vary-highlights: findRepeatedHighlights()', () => {
  const source = (...specs: string[]) =>
    specs
      .map((spec) =>
        [
          '```python',
          'driver.save_screenshot("x")',
          '```',
          '',
          `<!-- {: data-highlight="${spec}"} -->`
        ].join('\n')
      )
      .join('\n\n')

  it('allows distinct tokens across blocks', () => {
    expect(findRepeatedHighlights(source('a', 'b'))).toEqual([])
  })

  it('flags a token reused in a later block', () => {
    expect(findRepeatedHighlights(source('a', 'a'))).toEqual([
      {
        line: 11,
        text: 'repeated data-highlight token: a (first used at line 5)'
      }
    ])
  })

  it('flags a token repeated in one spec', () => {
    expect(findRepeatedHighlights(source('a; a'))).toEqual([
      {
        line: 5,
        text: 'repeated data-highlight token: a (first used at line 5)'
      }
    ])
  })

  it('compares trimmed tokens', () => {
    expect(findRepeatedHighlights(source('a', ' a '))).toEqual([
      {
        line: 11,
        text: 'repeated data-highlight token: a (first used at line 5)'
      }
    ])
  })

  it('compares tokens case-sensitively', () => {
    expect(findRepeatedHighlights(source('A', 'a'))).toEqual([])
  })

  it('ignores other attributes', () => {
    expect(
      findRepeatedHighlights(
        ['```python', 'x', '```', '', '<!-- {: data-line="1"} -->'].join('\n')
      )
    ).toEqual([])
  })

  it('ignores a highlight comment with no fence above it', () => {
    expect(
      findRepeatedHighlights(
        ['Text', '', '<!-- {: data-highlight="a"} -->'].join('\n')
      )
    ).toEqual([])
  })
})

test('code/vary-highlights: no token repeats within a sheet', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, text } of findRepeatedHighlights(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  expect(findings).toEqual([])
})
