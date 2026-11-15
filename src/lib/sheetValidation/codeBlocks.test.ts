import type { Code, RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { collectSheetFindings } from './sheets'

// mdast reports fenced and indented code alike, so check the opening line
const FENCE = /^(?:\s*(?:>\s*|[-*+]\s+|\d+[.)]\s+))*\s*(?:`{3,}|~{3,})/

/** CommonMark removes a code line's container indent plus up to four spaces */
const dedent = (line: string, width: number) => {
  const text = line.replace(/^\s*> ?/, '')
  if (text.trim() === '') return text.slice(Math.min(width, text.length))
  const indent = text.match(/^ */)?.[0].length ?? 0
  return text.slice(Math.min(indent, width)).replace(/^\t/, '')
}

/** An indented block's value is its own source lines, dedented */
function indentedSource(lines: string[], container: number) {
  const content = lines.map((line) => dedent(line, container + 4))
  while (content[content.length - 1] === '') content.pop()
  return content.join('\n')
}

function isFenced(node: Code, source: string[]) {
  const opening = source[0] ?? ''
  if (!FENCE.test(opening)) return false
  // A fence-shaped line only opens a fence when the value excludes it: an
  // indented block keeps its own source, fence lines and all. The block may
  // sit at any container indent up to the opening line's own indentation
  const nested = opening.match(/^[ \t]*/)?.[0].length ?? 0
  for (let container = 0; container <= nested; container++) {
    if (indentedSource(source, container) === node.value) return false
  }
  return true
}

function findIndentedCodeBlocks(source: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source)
  const lines = source.split('\n')
  const found: { line: number; text: string }[] = []

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'code' && node.position) {
        const text = lines[node.position.start.line - 1] ?? ''
        const block = lines.slice(
          node.position.start.line - 1,
          node.position.end.line
        )
        if (!isFenced(node, block))
          found.push({ line: node.position.start.line, text })
      }
      if (
        node.type === 'blockquote' ||
        node.type === 'list' ||
        node.type === 'listItem'
      ) {
        walk(node.children)
      }
    }
  }

  walk(tree.children)

  return found
}

describe('findIndentedCodeBlocks()', () => {
  test('flags an indented code block', () => {
    expect(findIndentedCodeBlocks('    code')).toEqual([
      { line: 1, text: '    code' }
    ])
  })

  test('allows a fenced code block', () => {
    const input = ['```', 'code', '```'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([])
  })

  test('allows a tilde-fenced code block', () => {
    const input = ['~~~', 'code', '~~~'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([])
  })

  test('allows an indented line inside a fenced code block', () => {
    const input = ['```', '    code', '```'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([])
  })

  test('allows a fenced code block inside a list item', () => {
    const input = ['- item', '', '  ```', '  code', '  ```'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([])
  })

  test('allows a fenced code block inside a nested list item', () => {
    const input = ['- item', '  - nested', '', '    ```', '    code', '    ```']
    expect(findIndentedCodeBlocks(input.join('\n'))).toEqual([])
  })

  test('flags an indented code block whose content is a fence', () => {
    const input = ['    ```', '    code', '    ```'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([
      { line: 1, text: '    ```' }
    ])
  })

  test('flags an indented code block inside a list item', () => {
    const input = ['- item', '', '      code'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([
      { line: 3, text: '      code' }
    ])
  })

  test('flags a fence-shaped indented code block inside a list item', () => {
    const input = ['- item', '', '      ```', '      code', '      ```']
    expect(findIndentedCodeBlocks(input.join('\n'))).toEqual([
      { line: 3, text: '      ```' }
    ])
  })

  test('allows a fenced code block inside a blockquote', () => {
    const input = ['> ```', '> code', '> ```'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([])
  })

  test('allows an indented line that continues a paragraph', () => {
    const input = ['text', '    more text'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([])
  })
})

test('every sheet uses fenced code blocks', async () => {
  expect(await collectSheetFindings(findIndentedCodeBlocks)).toEqual([])
})
