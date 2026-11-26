import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'
import { findFences } from './utils'

// A comment line that sits between two code lines. `#define`/`--flag` are code,
// so the marker needs a following space or the end of the line.
const COMMENT = /^(?:\/\/|#(?:\s|$)|--(?:\s|$))/

type Finding = { line: number; text: string; heading: string }

/** Flags a result comment wedged between two statements without blank lines */
export function findTightExampleGroups(source: string): Finding[] {
  const lines = source.split('\n')
  const headings = scanHeadings(source)
  const found: Finding[] = []

  for (const fence of findFences(lines)) {
    fence.code.forEach((raw, index) => {
      const text = raw.trim()
      if (!COMMENT.test(text)) return

      const previous = fence.code[index - 1]?.trim() ?? ''
      const next = fence.code[index + 1]?.trim() ?? ''
      if (previous === '' || next === '') return
      if (COMMENT.test(previous) || COMMENT.test(next)) return

      const line = fence.closeLine - fence.code.length + index
      const heading =
        headings
          .filter((entry) => entry.level === 3 && entry.line < line)
          .at(-1)?.title ?? ''

      found.push({ line, text, heading })
    })
  }

  return found
}

describe('findTightExampleGroups()', () => {
  const body = (code: string[]) =>
    ['### A', '', '```js', ...code, '```'].join('\n')

  test('flags a result comment between two statements', () => {
    expect(
      findTightExampleGroups(body(['foo()', '// "one"', 'bar()']))
    ).toEqual([{ line: 5, text: '// "one"', heading: 'A' }])
  })

  test('allows a blank line before the comment', () => {
    expect(
      findTightExampleGroups(body(['foo()', '', '// "one"', 'bar()']))
    ).toEqual([])
  })

  test('allows a blank line after the comment', () => {
    expect(
      findTightExampleGroups(body(['foo()', '// "one"', '', 'bar()']))
    ).toEqual([])
  })

  test('allows a comment at the start of a block', () => {
    expect(findTightExampleGroups(body(['// "one"', 'foo()']))).toEqual([])
  })

  test('allows statements without comments', () => {
    expect(findTightExampleGroups(body(['foo()', 'bar()']))).toEqual([])
  })

  test('ignores preprocessor lines', () => {
    expect(
      findTightExampleGroups(body(['int x;', '#define Y 1', 'int y;']))
    ).toEqual([])
  })

  test('flags shell result comments', () => {
    expect(
      findTightExampleGroups(body(['ls', '# "file"', 'pwd']))
    ).toHaveLength(1)
  })

  test('ignores comments outside fences', () => {
    const input = ['foo()', '// "one"', 'bar()'].join('\n')
    expect(findTightExampleGroups(input)).toEqual([])
  })

  test('allows inline results in a compact call list', () => {
    const input = body(["nth(1) // → '1st'", "nth(2) // → '2nd'"])
    expect(findTightExampleGroups(input)).toEqual([])
  })
})

test('every code block spaces its example groups', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findTightExampleGroups(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(
      findings.map(({ slug, heading, text }) => `${slug}#${heading}#${text}`)
    )
  ].sort()
  if (updatingBaseline)
    return saveBaseline('code-space-between-examples.json', keys)

  const allowed = new Set(
    loadBaseline<string[]>('code-space-between-examples.json', [])
  )
  const unexpected: string[] = []
  for (const { slug, line, heading, text } of findings) {
    if (allowed.has(`${slug}#${heading}#${text}`)) continue
    unexpected.push(
      `${slug}:${line}: blank line between example groups (${heading})`
    )
  }
  expect(unexpected).toEqual([])
})
