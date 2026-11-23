import { parseAttributes } from '~/lib/markdown/comments'
import { parseHighlightSpec } from '~/lib/markdown/inlineHighlight'
import { commentsAfter } from './attributes'
import { isSheetSlug } from './baseline'
import { sheetSources } from './sheets'
import { findFences } from './utils'

const MAX_TOKENS = 4

type Finding = { line: number; text: string }

/** `data-highlight` comments naming more than MAX_TOKENS tokens */
function findOverLimitHighlights(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []

  for (const fence of findFences(lines)) {
    for (const { line, attributes } of commentsAfter(lines, fence.closeLine)) {
      const spec = parseAttributes(attributes)?.['data-highlight']
      if (spec === undefined) continue

      const count = parseHighlightSpec(spec).length
      if (count > MAX_TOKENS) {
        found.push({
          line,
          text: `data-highlight has ${count} tokens (max ${MAX_TOKENS})`
        })
      }
    }
  }

  return found
}

describe('code/highlight-limit: findOverLimitHighlights()', () => {
  const fenced = (spec: string) =>
    [
      '```python',
      'driver.save_screenshot("x")',
      '```',
      '',
      `<!-- {: data-highlight="${spec}"} -->`
    ].join('\n')

  it('allows four tokens', () => {
    expect(findOverLimitHighlights(fenced('a; b; c; d'))).toEqual([])
  })

  it('flags five tokens', () => {
    expect(findOverLimitHighlights(fenced('a; b; c; d; e'))).toEqual([
      { line: 5, text: 'data-highlight has 5 tokens (max 4)' }
    ])
  })

  it('ignores other attributes', () => {
    expect(
      findOverLimitHighlights(
        ['```python', 'x', '```', '', '<!-- {: data-line="1"} -->'].join('\n')
      )
    ).toEqual([])
  })
})

test('code/highlight-limit: every block keeps at most four tokens', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, text } of findOverLimitHighlights(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  expect(findings).toEqual([])
})
