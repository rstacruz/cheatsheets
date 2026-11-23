import { parseAttributes } from '~/lib/markdown/comments'
import { parseHighlightSpec } from '~/lib/markdown/inlineHighlight'
import { commentsAfter } from './attributes'
import { isSheetSlug } from './baseline'
import { sheetSources } from './sheets'
import { findFences } from './utils'

type Finding = { line: number; text: string }

/** `data-highlight` comments naming text that is absent from the block */
function findMissingHighlights(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []

  for (const fence of findFences(lines)) {
    const code = fence.code.join('\n')
    for (const { line, attributes } of commentsAfter(lines, fence.closeLine)) {
      const spec = parseAttributes(attributes)?.['data-highlight']
      if (spec === undefined) continue

      const tokens = parseHighlightSpec(spec)
      if (tokens.length === 0) {
        found.push({ line, text: 'data-highlight has no tokens' })
        continue
      }

      const missing = tokens.filter((token) => !code.includes(token))
      if (missing.length > 0) {
        found.push({
          line,
          text: `data-highlight not found in block: ${missing.join(', ')}`
        })
      }
    }
  }

  return found
}

describe('code/data-highlight-in-block: findMissingHighlights()', () => {
  const fenced = (code: string[], spec?: string) =>
    [
      '```python',
      ...code,
      '```',
      '',
      ...(spec === undefined ? [] : [`<!-- {: data-highlight="${spec}"} -->`])
    ].join('\n')

  it.each([
    'save_screenshot',
    'save_screenshot; screenshot',
    'driver.save_screenshot'
  ])('allows a token present in the block %s', (spec) => {
    expect(
      findMissingHighlights(fenced(['driver.save_screenshot("x")'], spec))
    ).toEqual([])
  })

  it('flags a token that is absent', () => {
    expect(
      findMissingHighlights(fenced(['bat -r 2:4 hello.py'], '--theme'))
    ).toEqual([{ line: 5, text: 'data-highlight not found in block: --theme' }])
  })

  it('flags only the missing tokens', () => {
    expect(
      findMissingHighlights(fenced(['bat -r 2:4 hello.py'], '-r 2:4; --theme'))
    ).toEqual([{ line: 5, text: 'data-highlight not found in block: --theme' }])
  })

  it('flags an empty spec', () => {
    expect(findMissingHighlights(fenced(['bat hello.py'], ''))).toEqual([
      { line: 5, text: 'data-highlight has no tokens' }
    ])
  })

  it('ignores other attributes', () => {
    expect(findMissingHighlights(fenced(['bat hello.py'], undefined))).toEqual(
      []
    )
  })

  it('ignores a data-highlight comment with no fence above it', () => {
    const input = ['Text', '', '<!-- {: data-highlight="x"} -->'].join('\n')
    expect(findMissingHighlights(input)).toEqual([])
  })

  it('ignores a comment separated from the fence by prose', () => {
    const input = [
      ...fenced(['bat hello.py']).split('\n'),
      '',
      'Text',
      '',
      '<!-- {: data-highlight="--theme"} -->'
    ].join('\n')
    expect(findMissingHighlights(input)).toEqual([])
  })
})

test('code/data-highlight-in-block: every token appears in its code block', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, text } of findMissingHighlights(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  expect(findings).toEqual([])
})
