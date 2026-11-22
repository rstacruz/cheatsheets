import type { RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { collectSheetFindings } from './sheets'

const processor = unified().use(remarkParse).use(remarkGfm)

const MERMAID = 'mermaid'
const FENCE_TITLE = /(?:^|\s)title=/
const ACC_TITLE = /^\s*accTitle:\s*\S/m

type Finding = { line: number; text: string }

/** Mermaid fences carry their own name and description; fence titles are out */
function findMermaidIssues(source: string): Finding[] {
  const found: Finding[] = []

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'code' && node.lang === MERMAID) {
        const line = node.position?.start.line ?? 0
        if (FENCE_TITLE.test(node.meta ?? '')) {
          found.push({ line, text: 'mermaid fence has a title' })
        }
        if (!ACC_TITLE.test(node.value)) {
          found.push({ line, text: 'mermaid fence needs accTitle' })
        }
      }
      if ('children' in node) walk(node.children)
    }
  }

  walk(processor.parse(source).children)
  return found
}

describe('findMermaidIssues()', () => {
  const fence = (info: string, lines: string[]) =>
    ['### A', '', `\`\`\`${info}`, ...lines, '```'].join('\n')

  test('allows a diagram with accTitle', () => {
    const input = fence('mermaid', ['flowchart LR', '  accTitle: Flow'])
    expect(findMermaidIssues(input)).toEqual([])
  })

  test('flags a title on the fence', () => {
    const input = fence('mermaid title="Flow"', [
      'flowchart LR',
      '  accTitle: Flow'
    ])
    expect(findMermaidIssues(input)).toEqual([
      { line: 3, text: 'mermaid fence has a title' }
    ])
  })

  test('flags a missing or empty accTitle', () => {
    expect(
      findMermaidIssues(fence('mermaid', ['flowchart LR', '  A --> B']))
    ).toEqual([{ line: 3, text: 'mermaid fence needs accTitle' }])
    expect(
      findMermaidIssues(fence('mermaid', ['flowchart LR', '  accTitle:']))
    ).toEqual([{ line: 3, text: 'mermaid fence needs accTitle' }])
  })

  test('ignores other fenced languages', () => {
    expect(findMermaidIssues(fence('ruby', ['puts 1']))).toEqual([])
    expect(findMermaidIssues(fence('text title="x"', ['hi']))).toEqual([])
  })
})

test('every mermaid fence has accTitle and no fence title', async () => {
  expect(await collectSheetFindings(findMermaidIssues)).toEqual([])
})
