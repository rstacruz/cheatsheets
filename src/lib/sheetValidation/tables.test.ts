import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getPages } from '../page'
import { isListed } from '../page/accessors'
import { collectSheetFindings } from './sheets'

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

test('every listed sheet gives each table an H3 heading', async () => {
  const findings: string[] = []
  for (const page of Object.values(await getPages()).filter(isListed)) {
    for (const { line, text } of findTablesOutsideH3(page.markdown)) {
      findings.push(`${page.slug}:${line}: ${text}`)
    }
  }
  expect(findings).toEqual([])
})
