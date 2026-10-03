import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getPages } from '../page'

// mdast reports fenced and indented code alike, so check the opening line
const FENCE = /^(?:\s*(?:>\s*|[-*+]\s+|\d+[.)]\s+))*\s*(?:`{3,}|~{3,})/

function findIndentedCodeBlocks(source: string) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(source)
  const lines = source.split('\n')
  const found: { line: number; text: string }[] = []

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'code' && node.position) {
        const text = lines[node.position.start.line - 1] ?? ''
        if (!FENCE.test(text))
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

  test('flags an indented code block inside a list item', () => {
    const input = ['- item', '', '      code'].join('\n')
    expect(findIndentedCodeBlocks(input)).toEqual([
      { line: 3, text: '      code' }
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
  const pages = await getPages()
  const includes = import.meta.glob('../../../_includes/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  }) as Record<string, string>

  const findings: string[] = []
  const collect = (slug: string, source: string) => {
    for (const { line, text } of findIndentedCodeBlocks(source)) {
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
