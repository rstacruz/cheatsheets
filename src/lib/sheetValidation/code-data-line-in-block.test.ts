import { ATTRIBUTE_COMMENT, parseAttributes } from '~/lib/markdown/comments'
import { isSheetSlug } from './baseline'
import { sheetSources } from './sheets'
import { findFences } from './utils'

type Finding = { line: number; text: string }

/** Every number named by a `data-line` spec, including both range ends */
function referencedLines(spec: string): number[] {
  const values: number[] = []
  for (const part of spec.replace(/\s+/g, '').split(',')) {
    if (!part) continue
    for (const token of part.split('-')) {
      values.push(/^\d+$/.test(token) ? Number(token) : Number.NaN)
    }
  }
  return values
}

/** `data-line` comments whose references fall outside their fenced block */
function findInvalidDataLines(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []

  for (const fence of findFences(lines)) {
    let index = fence.closeLine
    while (index < lines.length && lines[index].trim() === '') index++

    while (index < lines.length) {
      const comment = ATTRIBUTE_COMMENT.exec(lines[index].trim())
      if (!comment) break

      const spec = parseAttributes(comment[1] ?? '')?.['data-line']
      if (spec !== undefined) {
        const invalid = referencedLines(String(spec)).filter(
          (value) =>
            !Number.isInteger(value) || value < 1 || value > fence.code.length
        )
        if (invalid.length > 0) {
          found.push({
            line: index + 1,
            text: `data-line references ${invalid.join(', ')} outside 1-${fence.code.length}`
          })
        }
      }

      index++
      while (index < lines.length && lines[index].trim() === '') index++
    }
  }

  return found
}

describe('code/data-line-in-block: findInvalidDataLines()', () => {
  const fenced = (code: string[], spec?: string) =>
    [
      '```js',
      ...code,
      '```',
      '',
      ...(spec === undefined ? [] : [`<!-- {: data-line="${spec}"} -->`])
    ].join('\n')

  it.each(['1', '1,3', '1-3'])('allows an in-range spec %s', (spec) => {
    expect(findInvalidDataLines(fenced(['a', 'b', 'c'], spec))).toEqual([])
  })

  it.each([
    {
      spec: '4',
      code: ['a', 'b', 'c'],
      text: 'data-line references 4 outside 1-3'
    },
    {
      spec: '0',
      code: ['a', 'b', 'c'],
      text: 'data-line references 0 outside 1-3'
    }
  ])('flags an out-of-range line $spec', ({ spec, code, text }) => {
    expect(findInvalidDataLines(fenced(code, spec))).toEqual([
      { line: 7, text }
    ])
  })

  it.each([
    ['2-5', 'data-line references 5 outside 1-4'],
    ['0-2', 'data-line references 0 outside 1-4']
  ])('checks both ends of a range %s', (spec, text) => {
    expect(findInvalidDataLines(fenced(['a', 'b', 'c', 'd'], spec))).toEqual([
      { line: 8, text }
    ])
  })

  it('ignores a data-line comment with no fence above it', () => {
    const input = ['Text', '', '<!-- {: data-line="9"} -->'].join('\n')
    expect(findInvalidDataLines(input)).toEqual([])
  })

  it('ignores a data-line comment separated from the fence by prose', () => {
    const input = [
      ...fenced(['a']).split('\n'),
      '',
      'Text',
      '',
      '<!-- {: data-line="2"} -->'
    ].join('\n')
    expect(findInvalidDataLines(input)).toEqual([])
  })
})

test('code/data-line-in-block: every reference stays inside its code block', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, text } of findInvalidDataLines(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  expect(findings).toEqual([])
})
