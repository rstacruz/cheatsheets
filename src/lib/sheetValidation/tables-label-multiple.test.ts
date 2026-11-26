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

const processor = unified().use(remarkParse).use(remarkGfm)

type Finding = { line: number; heading: string; index: number }

/** Flags tables in a card without an H4 label above when there are 2+ */
export function findUnlabelledTables(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  let card: { heading: Heading; nodes: RootContent[] } | undefined

  const flush = () => {
    const heading = card?.heading
    if (!heading?.position || !card) return

    const tables = card.nodes.filter((node) => node.type === 'table')
    if (tables.length < 2) return

    tables.forEach((table, index) => {
      const position = table.position
      if (!position) return
      const previous = card.nodes[card.nodes.indexOf(table) - 1]
      if (previous?.type === 'heading' && previous.depth === 4) return

      found.push({
        line: position.start.line,
        heading: (lines[heading.position.start.line - 1] ?? '')
          .replace(/^###\s+/, '')
          .trim(),
        index
      })
    })
  }

  for (const node of processor.parse(source).children) {
    if (node.type === 'heading' && node.depth <= 3) {
      flush()
      card = node.depth === 3 ? { heading: node, nodes: [] } : undefined
    } else {
      card?.nodes.push(node)
    }
  }

  flush()
  return found
}

describe('findUnlabelledTables()', () => {
  const table = '| A | B |\n| --- | --- |\n| 1 | 2 |'
  const body = (...parts: string[]) => ['### Card', '', ...parts].join('\n')

  test('allows a single table without a label', () => {
    expect(findUnlabelledTables(body(table))).toEqual([])
  })

  test('allows two labelled tables', () => {
    const input = body('#### One', '', table, '', '#### Two', '', table)
    expect(findUnlabelledTables(input)).toEqual([])
  })

  test('flags a second table without a label', () => {
    const input = body('#### One', '', table, '', table)
    expect(findUnlabelledTables(input)).toEqual([
      { line: 9, heading: 'Card', index: 1 }
    ])
  })

  test('flags both tables when neither is labelled', () => {
    const input = body(table, '', table)
    expect(findUnlabelledTables(input)).toHaveLength(2)
  })

  test('ignores cards with no tables', () => {
    expect(findUnlabelledTables(body('Text only'))).toEqual([])
  })
})

test('every card labels its multiple tables', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findUnlabelledTables(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(
      findings.map(({ slug, heading, index }) => `${slug}#${heading}#${index}`)
    )
  ].sort()
  if (updatingBaseline) return saveBaseline('tables-label-multiple.json', keys)

  const allowed = new Set(
    loadBaseline<string[]>('tables-label-multiple.json', [])
  )
  const unexpected = findings
    .filter(
      ({ slug, heading, index }) => !allowed.has(`${slug}#${heading}#${index}`)
    )
    .map(
      ({ slug, line, heading, index }) =>
        `${slug}:${line}: table ${index + 1} needs an H4 label (${heading})`
    )
  expect(unexpected).toEqual([])
})
