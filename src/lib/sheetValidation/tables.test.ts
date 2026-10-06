import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { collectSheetFindings, sheetSources } from './sheets'
import { scanFences } from './utils'

function findUncoveredPipeLines(source: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source)
  const covered = new Set<number>()

  const mark = (node: RootContent) => {
    if (
      (node.type === 'table' || node.type === 'code' || node.type === 'html') &&
      node.position
    ) {
      for (
        let line = node.position.start.line;
        line <= node.position.end.line;
        line++
      ) {
        covered.add(line)
      }
    }
  }

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      mark(node)
      if (node.type === 'blockquote') walk(node.children)
      else if (node.type === 'list') walk(node.children)
      else if (node.type === 'listItem') walk(node.children)
    }
  }

  walk(tree.children)

  return source
    .split('\n')
    .map((text, index) => ({ line: index + 1, text }))
    .filter(({ line, text }) => /^\s*\|/.test(text) && !covered.has(line))
}

describe('findUncoveredPipeLines()', () => {
  test('flags a headerless table', () => {
    const input = ['| a | b |', '| c | d |'].join('\n')
    expect(findUncoveredPipeLines(input)).toEqual([
      { line: 1, text: '| a | b |' },
      { line: 2, text: '| c | d |' }
    ])
  })

  test('allows a table with a delimiter row', () => {
    const input = ['| h | h |', '| --- | --- |', '| a | b |'].join('\n')
    expect(findUncoveredPipeLines(input)).toEqual([])
  })

  test('allows pipe rows inside a fenced code block', () => {
    const input = ['```', '| a | b |', '```'].join('\n')
    expect(findUncoveredPipeLines(input)).toEqual([])
  })

  test('allows pipe rows inside a raw HTML block', () => {
    const input = ['<div>', '| a | b |', '</div>'].join('\n')
    expect(findUncoveredPipeLines(input)).toEqual([])
  })

  test('allows inline HTML inside a table with a header', () => {
    const input = ['| h | h |', '| --- | --- |', '| a<br>b | c |'].join('\n')
    expect(findUncoveredPipeLines(input)).toEqual([])
  })

  test('flags a paragraph line that starts with a pipe', () => {
    const input = ['| not a table'].join('\n')
    expect(findUncoveredPipeLines(input)).toEqual([
      { line: 1, text: '| not a table' }
    ])
  })
})

test('every sheet uses table headers', async () => {
  expect(await collectSheetFindings(findUncoveredPipeLines)).toEqual([])
})

const SEPARATOR_ROW = /^\|(?:\s*:?-{1,}:?\s*\|)+$/

/** Tables of 8+ data rows should be split with `| --- |` rows or H4 groups */
function findUnsplitTables(source: string) {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const found: Array<{ line: number; text: string; rows: number }> = []
  let rows = 0
  let separators = 0
  let start = 0
  let header = ''

  const flush = () => {
    const body = rows - 1 - separators
    if (start && body >= 8 && separators <= 1) {
      found.push({ line: start, text: header, rows: body })
    }
    rows = 0
    separators = 0
    start = 0
  }

  lines.forEach((line, index) => {
    const text = line.trim()
    if (fenced[index] || !text.startsWith('|')) {
      flush()
      return
    }
    if (!start) {
      start = index + 1
      // Collapse padding so column-width changes keep the baseline key stable
      header = text.replace(/\s+/g, ' ')
    }
    rows += 1
    if (SEPARATOR_ROW.test(text)) separators += 1
  })
  flush()
  return found
}

describe('findUnsplitTables()', () => {
  const table = (rows: number, split = false) => {
    const body = Array.from({ length: rows }, (_, index) => `| ${index} |`)
    if (split) body.splice(4, 0, '| --- |')
    return ['| h |', '| --- |', ...body].join('\n')
  }

  test('flags 8 rows without separators', () => {
    const found = findUnsplitTables(table(8))
    expect(found).toHaveLength(1)
    expect(found[0].rows).toBe(8)
  })

  test('allows 7 rows', () => {
    expect(findUnsplitTables(table(7))).toEqual([])
  })

  test('allows a table with separator rows', () => {
    expect(findUnsplitTables(table(8, true))).toEqual([])
  })

  test('ignores pipe rows inside fenced code', () => {
    expect(findUnsplitTables(['```', table(8), '```'].join('\n'))).toEqual([])
  })
})

test('every sheet separates long tables', async () => {
  const findings: Array<{
    slug: string
    line: number
    text: string
    rows: number
  }> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findUnsplitTables(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, text }) => `${slug}#${text}`))
  ].sort()
  if (updatingBaseline) return saveBaseline('tables.json', keys)

  const allowed = new Set(loadBaseline<string[]>('tables.json', []))
  expect(
    findings
      .filter(({ slug, text }) => !allowed.has(`${slug}#${text}`))
      .map(
        ({ slug, line, rows, text }) =>
          `${slug}:${line}: ${rows} rows without separators ${text}`
      )
  ).toEqual([])
})
