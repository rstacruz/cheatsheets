import type { Root } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getPages } from '../page'

type Finding = { line: number }

const processor = unified().use(remarkParse).use(remarkGfm)

/** An H2 with content before its first H3 reads as an orphan block */
function findH2Preambles(tree: Root): Finding[] {
  const found: Finding[] = []
  const children = tree.children

  children.forEach((node, index) => {
    if (node.type !== 'heading' || node.depth !== 2) return
    if (!node.position) return

    let preamble = false
    let hasH3 = false
    for (const child of children.slice(index + 1)) {
      if (child.type === 'heading' && child.depth <= 2) break
      if (child.type === 'heading' && child.depth === 3) {
        hasH3 = true
        break
      }
      // Attribute comments are HTML nodes; they are not card content
      const comment =
        child.type === 'html' && child.value.trim().startsWith('<!--')
      if (!comment) preamble = true
    }

    if (hasH3 && preamble) found.push({ line: node.position.start.line })
  })

  return found
}

describe('findH2Preambles()', () => {
  const parse = (source: string) => findH2Preambles(processor.parse(source))

  test('flags a paragraph before the first H3', () => {
    expect(parse('## A\n\ntext\n\n### B')).toEqual([{ line: 1 }])
  })

  test('allows an H2 that starts with an H3', () => {
    expect(parse('## A\n\n### B')).toEqual([])
  })

  test('allows an attribute comment before the first H3', () => {
    expect(parse('## A\n\n<!-- {: .-two-column} -->\n\n### B')).toEqual([])
  })

  test('allows a section with no H3', () => {
    expect(parse('## Also see\n\n- [x](./x)')).toEqual([])
  })

  test('flags a table before the first H3', () => {
    const input = '## A\n\n| x |\n| --- |\n| y |\n\n### B'
    expect(parse(input)).toEqual([{ line: 1 }])
  })

  test('flags each section separately', () => {
    const input = '## A\n\ntext\n\n### B\n\n## C\n\n### D'
    expect(parse(input)).toEqual([{ line: 1 }])
  })

  test('ignores content after the first H3', () => {
    expect(parse('## A\n\n### B\n\ntext')).toEqual([])
  })
})

test('every tiered sheet starts each H2 with an H3', async () => {
  const findings: string[] = []

  for (const page of Object.values(await getPages())) {
    if (page.slug.includes('/') || !page.frontmatter.tier) continue
    for (const { line } of findH2Preambles(processor.parse(page.markdown))) {
      findings.push(`${page.slug}:${line}`)
    }
  }

  expect(findings).toEqual([])
})
