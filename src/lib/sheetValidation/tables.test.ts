import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getPages } from '../page'

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
  const pages = await getPages()
  const includes = import.meta.glob('../../../_includes/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  }) as Record<string, string>

  const findings: string[] = []
  const collect = (slug: string, source: string) => {
    for (const { line, text } of findUncoveredPipeLines(source)) {
      findings.push(`${slug}:${line}: ${text}`)
    }
  }

  for (const page of Object.values(pages)) {
    collect(page.slug, page.markdown)
  }
  for (const [filePath, source] of Object.entries(includes)) {
    collect(filePath, source)
  }

  expect(findings).toEqual([])
})
