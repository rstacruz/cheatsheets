import type { Heading, RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { sheetSources } from './sheets'

const SEE_LINE = /^See:/

const processor = unified().use(remarkParse).use(remarkGfm)

type Finding = { line: number; heading: string }

/**
 * Flags a paragraph followed by a code block or table in the same card.
 * Prose belongs at the end: put the explanation in the block, or split the
 * card so each block gets its own trailing prose.
 */
function findProseBeforeBlocks(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  let section: { heading: Heading; nodes: RootContent[] } | undefined

  const flush = () => {
    const heading = section?.heading
    if (!heading?.position) return

    let prose: number | undefined
    for (const node of section.nodes) {
      if (node.type === 'paragraph' && node.position) {
        const raw = lines
          .slice(node.position.start.line - 1, node.position.end.line)
          .join('\n')
        if (!SEE_LINE.test(raw) && prose === undefined) {
          prose = node.position.start.line
        }
      } else if ((node.type === 'code' || node.type === 'table') && prose) {
        found.push({
          line: prose,
          heading: (lines[heading.position.start.line - 1] ?? '')
            .replace(/^###\s+/, '')
            .trim()
        })
        return
      }
    }
  }

  for (const node of processor.parse(source).children) {
    if (node.type === 'heading' && node.depth <= 3) {
      flush()
      section = node.depth === 3 ? { heading: node, nodes: [node] } : undefined
    } else {
      section?.nodes.push(node)
    }
  }

  flush()

  return found
}

describe('findProseBeforeBlocks()', () => {
  const body = (parts: string[]) => ['### A', '', ...parts].join('\n')

  test('allows a card that ends with prose', () => {
    expect(
      findProseBeforeBlocks(body(['```bash', 'ls', '```', '', 'Text']))
    ).toEqual([])
  })

  test('allows a prose-only card', () => {
    expect(findProseBeforeBlocks(body(['Text']))).toEqual([])
  })

  test('flags prose between two blocks', () => {
    const input = body([
      '```bash',
      'ls',
      '```',
      '',
      'Text',
      '',
      '```bash',
      'pwd',
      '```',
      '',
      'More'
    ])
    expect(findProseBeforeBlocks(input)).toHaveLength(1)
  })

  test('flags prose before the first block', () => {
    expect(
      findProseBeforeBlocks(body(['Text', '', '```bash', 'ls', '```']))
    ).toHaveLength(1)
  })

  test('flags prose before a table', () => {
    const input = body(['Text', '', '| h |', '| --- |', '| x |'])
    expect(findProseBeforeBlocks(input)).toHaveLength(1)
  })

  test('allows a trailing See: line', () => {
    const input = body(['```bash', 'ls', '```', '', 'Text', '', 'See: docs'])
    expect(findProseBeforeBlocks(input)).toEqual([])
  })
})

test('every card keeps prose after its blocks', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findProseBeforeBlocks(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, heading }) => `${slug}#${heading}`))
  ].sort()
  if (updatingBaseline) return saveBaseline('paragraphPlacement.json', keys)

  const allowed = new Set(loadBaseline<string[]>('paragraphPlacement.json', []))
  const unexpected: string[] = []
  for (const { slug, line, heading } of findings) {
    if (allowed.has(`${slug}#${heading}`)) continue
    unexpected.push(`${slug}:${line}: prose before a block (${heading})`)
  }
  expect(unexpected).toEqual([])
})
