import { getPages } from '../page'
import { isSheetSlug } from './baseline'
import { scanCodeLines } from './outline'

const LIMIT = 49

type Finding = { line: number; text: string }

/** Code lines in a snippet sheet that overflow the narrow left column */
export function findWideSnippetCodeLines(source: string): Finding[] {
  return scanCodeLines(source).flatMap(({ line, text }) =>
    text.length > LIMIT
      ? [{ line, text: `${text.length}>${LIMIT} ${text.trim()}` }]
      : []
  )
}

describe('findWideSnippetCodeLines()', () => {
  test('allows a 49-character code line', () => {
    const input = ['```bash', 'x'.repeat(LIMIT), '```'].join('\n')
    expect(findWideSnippetCodeLines(input)).toEqual([])
  })

  test('flags a code line over 49 characters', () => {
    const input = ['```bash', 'x'.repeat(LIMIT + 1), '```'].join('\n')
    expect(findWideSnippetCodeLines(input)).toEqual([
      { line: 2, text: `${LIMIT + 1}>${LIMIT} ${'x'.repeat(LIMIT + 1)}` }
    ])
  })

  test('allows long prose outside code', () => {
    expect(findWideSnippetCodeLines('word '.repeat(40))).toEqual([])
  })
})

test('every snippet sheet keeps code lines within 49 characters', async () => {
  const findings: string[] = []
  for (const page of Object.values(await getPages())) {
    if (!isSheetSlug(page.slug) || page.frontmatter.layout !== 'snippet')
      continue
    for (const { line, text } of findWideSnippetCodeLines(page.markdown)) {
      findings.push(`${page.slug}:${line}: ${text}`)
    }
  }
  expect(findings).toEqual([])
})
