import { parseAttributes } from '~/lib/markdown/comments'
import { parseHighlightSpec } from '~/lib/markdown/inlineHighlight'
import { commentsAfter } from './attributes'
import { isSheetSlug } from './baseline'
import { sheetSources } from './sheets'
import { scanHeadings } from './outline'
import { findFences } from './utils'

type Finding = { line: number; text: string }

/** `data-highlight` tokens reused by a different H3 card */
function findRepeatedHighlights(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  const headings = scanHeadings(source).filter(({ level }) => level <= 3)
  const firstUse = new Map<string, number>()
  const firstCard = new Map<string, string>()

  for (const fence of findFences(lines)) {
    for (const { line, attributes } of commentsAfter(lines, fence.closeLine)) {
      const spec = parseAttributes(attributes)?.['data-highlight']
      if (spec === undefined) continue

      const card = headings.findLast(({ line: at }) => at < line)
      const cardKey = `${card?.level ?? 0}:${card?.line ?? 0}`
      const seen = new Set<string>()
      for (const token of parseHighlightSpec(spec)) {
        const first = firstUse.get(token)
        if (seen.has(token)) {
          found.push({
            line,
            text: `repeated data-highlight token: ${token} (first used at line ${first ?? line})`
          })
          continue
        }
        seen.add(token)
        if (first === undefined) {
          firstUse.set(token, line)
          firstCard.set(token, cardKey)
        } else if (firstCard.get(token) !== cardKey) {
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
  const pre = (spec: string) =>
    [
      '```python',
      'x',
      '```',
      '',
      `<!-- {: data-highlight="${spec}"} -->`,
      ''
    ].join('\n')
  const source = (...specs: string[]) =>
    ['### A', '', ...specs.map(pre)].join('\n')

  it('allows distinct tokens across blocks', () => {
    expect(findRepeatedHighlights(source('a', 'b'))).toEqual([])
  })

  it('allows a token reused within one card', () => {
    expect(findRepeatedHighlights(source('a', 'a'))).toEqual([])
  })

  it('flags a token reused in a later card', () => {
    const input = ['### A', '', pre('a'), '### B', '', pre('a')].join('\n')
    expect(findRepeatedHighlights(input)).toEqual([
      {
        line: 15,
        text: 'repeated data-highlight token: a (first used at line 7)'
      }
    ])
  })

  it('flags a token repeated in one spec', () => {
    expect(findRepeatedHighlights(source('a; a'))).toEqual([
      {
        line: 7,
        text: 'repeated data-highlight token: a (first used at line 7)'
      }
    ])
  })

  it('compares trimmed tokens across cards', () => {
    const input = ['### A', '', pre('a'), '### B', '', pre(' a ')].join('\n')
    expect(findRepeatedHighlights(input)).toEqual([
      {
        line: 15,
        text: 'repeated data-highlight token: a (first used at line 7)'
      }
    ])
  })

  it('compares tokens case-sensitively', () => {
    expect(findRepeatedHighlights(source('A', 'a'))).toEqual([])
  })

  it('ignores other attributes', () => {
    expect(
      findRepeatedHighlights(
        ['```python', 'x', '```', '', '<!-- {: .-setup} -->'].join('\n')
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

test('code/vary-highlights: no token repeats across cards', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, text } of findRepeatedHighlights(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  expect(findings).toEqual([])
})
