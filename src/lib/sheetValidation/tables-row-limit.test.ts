import type { Heading, RootContent, Table, TableCell } from 'mdast'
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

const MAX_ROWS = 20
const SEPARATOR = /^:?-+:?$/

const processor = unified().use(remarkParse).use(remarkGfm)

type Finding = { line: number; heading: string; rows: number }

function cellText(cell: TableCell): string {
  return cell.children
    .map((child) => ('value' in child ? child.value : ''))
    .join('')
}

/** A `| --- |` row splits the body in the site's table dialect */
function isSeparator(row: Table['children'][number]): boolean {
  return row.children.every((cell) => SEPARATOR.test(cellText(cell).trim()))
}

function rowCount(table: Table): number {
  return table.children.slice(1).filter((row) => !isSeparator(row)).length
}

/** Flags an H3 whose tables hold more rows than a single card should */
export function findLargeCardTables(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  let card: { heading: Heading; rows: number } | undefined

  const flush = () => {
    if (!card?.heading.position) return
    if (card.rows > MAX_ROWS) {
      found.push({
        line: card.heading.position.start.line,
        heading: (lines[card.heading.position.start.line - 1] ?? '')
          .replace(/^###\s+/, '')
          .trim(),
        rows: card.rows
      })
    }
  }

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'heading' && node.depth <= 3) {
        flush()
        card = node.depth === 3 ? { heading: node, rows: 0 } : undefined
      } else if (node.type === 'table' && card) {
        card.rows += rowCount(node)
      }
      if ('children' in node) walk(node.children)
    }
  }

  walk(processor.parse(source).children)
  flush()
  return found
}

describe('findLargeCardTables()', () => {
  const table = (rows: number) =>
    [
      '| A | B |',
      '| --- | --- |',
      ...Array.from({ length: rows }, (_, index) => `| ${index} | x |`)
    ].join('\n')

  const body = (...tables: string[]) => ['### A', '', ...tables].join('\n\n')

  test('allows a card at the limit', () => {
    expect(findLargeCardTables(body(table(20)))).toEqual([])
  })

  test('flags a card over the limit', () => {
    expect(findLargeCardTables(body(table(21)))).toEqual([
      { line: 1, heading: 'A', rows: 21 }
    ])
  })

  test('sums rows across tables in one card', () => {
    expect(findLargeCardTables(body(table(12), table(12)))).toEqual([
      { line: 1, heading: 'A', rows: 24 }
    ])
  })

  test('does not count separator rows', () => {
    const separated = table(10).replace('| 5 | x |', '| 5 | x |\n| --- | --- |')
    expect(findLargeCardTables(body(separated))).toEqual([])
  })

  test('starts counting anew under the next card', () => {
    const source = ['### A', '', table(11), '', '### B', '', table(11)].join(
      '\n\n'
    )
    expect(findLargeCardTables(source)).toEqual([])
  })
})

test('every card keeps its table rows within the limit', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug) || slug.includes('_includes/')) continue
    for (const finding of findLargeCardTables(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, heading }) => `${slug}#${heading}`))
  ].sort()
  if (updatingBaseline) return saveBaseline('tables-row-limit.json', keys)

  const allowed = new Set(loadBaseline<string[]>('tables-row-limit.json', []))
  const unexpected: string[] = []
  for (const { slug, line, heading, rows } of findings) {
    if (allowed.has(`${slug}#${heading}`)) continue
    unexpected.push(
      `${slug}:${line}: ${heading} holds ${rows} table rows (max ${MAX_ROWS})`
    )
  }
  expect(unexpected).toEqual([])
})
