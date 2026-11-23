import { getPages } from '../page'
import { isSheetSlug } from './baseline'
import { scanHeadings } from './outline'

const MAX_H3 = 6

type Finding = { line: number; text: string }

/** Snippet sheets with more H3 cards than the budget allows */
export function findOversizedSnippets(source: string): Finding[] {
  const h3s = scanHeadings(source).filter((heading) => heading.level === 3)
  if (h3s.length <= MAX_H3) return []
  return [
    {
      line: h3s[MAX_H3].line,
      text: `${h3s.length} H3s (max ${MAX_H3})`
    }
  ]
}

describe('findOversizedSnippets()', () => {
  const cards = (count: number) =>
    Array.from({ length: count }, (_, index) => `### Card ${index + 1}`).join(
      '\n\n'
    )

  test('allows six H3 cards', () => {
    expect(findOversizedSnippets(cards(6))).toEqual([])
  })

  test('flags a seventh H3 card', () => {
    expect(findOversizedSnippets(cards(7))).toEqual([
      { line: 13, text: '7 H3s (max 6)' }
    ])
  })
})

test('every snippet sheet has at most six H3 cards', async () => {
  const findings: string[] = []
  for (const page of Object.values(await getPages())) {
    if (!isSheetSlug(page.slug) || page.frontmatter.layout !== 'snippet')
      continue
    for (const { line, text } of findOversizedSnippets(page.markdown)) {
      findings.push(`${page.slug}:${line}: ${text}`)
    }
  }
  expect(findings).toEqual([])
})
