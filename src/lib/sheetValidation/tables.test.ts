import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getPages } from '../page'
import { isListed } from '../page/accessors'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { collectSheetFindings, sheetSources } from './sheets'
import { SEP_LINE, scanFences } from './utils'

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

/** Tables that render outside an H3 card because no H3 precedes them */
function findTablesOutsideH3(source: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source)
  const found: { line: number; text: string }[] = []
  let inH3 = false

  for (const node of tree.children) {
    if (node.type === 'heading') {
      if (node.depth === 2) inH3 = false
      else if (node.depth === 3) inH3 = true
    } else if (node.type === 'table' && !inH3 && node.position) {
      found.push({
        line: node.position.start.line,
        text: 'table has no H3 heading above it'
      })
    }
  }

  return found
}

describe('findTablesOutsideH3()', () => {
  test('flags a table directly under an H2', () => {
    const input = ['## Section', '', '| a | b |', '| --- | --- |'].join('\n')
    expect(findTablesOutsideH3(input)).toEqual([
      { line: 3, text: 'table has no H3 heading above it' }
    ])
  })

  test('flags a table after prose under an H2', () => {
    const input = ['## Section', '', 'Prose.', '', '| a | b |', '| --- | --- |']
    expect(findTablesOutsideH3(input.join('\n'))).toEqual([
      { line: 5, text: 'table has no H3 heading above it' }
    ])
  })

  test('allows a table under an H3', () => {
    const input = [
      '## Section',
      '',
      '### Card',
      '',
      '| a | b |',
      '| --- | --- |'
    ]
    expect(findTablesOutsideH3(input.join('\n'))).toEqual([])
  })

  test('allows a table under an H4 beneath an H3', () => {
    const input = [
      '## Section',
      '',
      '### Card',
      '',
      '#### Part',
      '',
      '| a | b |',
      '| --- | --- |'
    ]
    expect(findTablesOutsideH3(input.join('\n'))).toEqual([])
  })

  test('resets after the next H2', () => {
    const input = [
      '## One',
      '',
      '### Card',
      '',
      '## Two',
      '',
      '| a | b |',
      '| --- | --- |'
    ]
    expect(findTablesOutsideH3(input.join('\n'))).toEqual([
      { line: 7, text: 'table has no H3 heading above it' }
    ])
  })

  test('allows prose and lists without an H3', () => {
    const input = ['## Section', '', 'Prose.', '', '- one', '- two'].join('\n')
    expect(findTablesOutsideH3(input)).toEqual([])
  })
})

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
    if (SEP_LINE.test(text)) separators += 1
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

  test('allows separator rows without a trailing pipe', () => {
    const body = Array.from({ length: 8 }, (_, index) => `| ${index} |`)
    body.splice(4, 0, '|---')
    const input = ['| h |', '|---|---|', ...body].join('\n')
    expect(findUnsplitTables(input)).toEqual([])
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

test('every listed sheet gives each table an H3 heading', async () => {
  const findings: string[] = []
  for (const page of Object.values(await getPages()).filter(isListed)) {
    for (const { line, text } of findTablesOutsideH3(page.markdown)) {
      findings.push(`${page.slug}:${line}: ${text}`)
    }
  }
  expect(findings).toEqual([])
})
