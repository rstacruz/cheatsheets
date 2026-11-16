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

// Column 0 only: `#define`, shebangs and indented comments do not label
const CAPTION = /^#(?:\s|$)/

type Finding = { line: number; heading: string }

/**
 * Flags two code blocks in one card with no heading between them. Give each
 * block an H4 label, or the second reads as part of the first. A block that
 * opens with a caption comment is self-labelled and needs no H4.
 */
function findConsecutiveBlocks(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  let section: { heading: Heading; nodes: RootContent[] } | undefined

  const flush = () => {
    const heading = section?.heading
    if (!heading?.position) return

    let previous: number | undefined
    for (const node of section.nodes) {
      if (node.type === 'heading') {
        previous = undefined
      } else if (node.type === 'code' && node.position) {
        const caption = CAPTION.test(node.value.split('\n')[0] ?? '')
        if (previous !== undefined && !caption) {
          found.push({
            line: node.position.start.line,
            heading: (lines[heading.position.start.line - 1] ?? '')
              .replace(/^###\s+/, '')
              .trim()
          })
          return
        }
        previous = node.position.start.line
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

describe('findConsecutiveBlocks()', () => {
  const body = (parts: string[]) => ['### A', '', ...parts].join('\n')
  const pre = (cmd: string) => ['```bash', cmd, '```']

  test('flags two adjacent code blocks', () => {
    expect(
      findConsecutiveBlocks(body([...pre('ls'), '', ...pre('pwd')]))
    ).toHaveLength(1)
  })

  test('allows an H4 between them', () => {
    const input = body([...pre('ls'), '', '#### Second', '', ...pre('pwd')])
    expect(findConsecutiveBlocks(input)).toEqual([])
  })

  test('allows a single code block', () => {
    expect(findConsecutiveBlocks(body(pre('ls')))).toEqual([])
  })

  test('flags blocks with only prose between them', () => {
    const input = body([...pre('ls'), '', 'Text', '', ...pre('pwd')])
    expect(findConsecutiveBlocks(input)).toHaveLength(1)
  })

  test('allows adjacent caption-led blocks', () => {
    const input = body([
      ...pre('# Arch\npacman -S yazi'),
      '',
      ...pre('# macOS\nbrew install yazi')
    ])
    expect(findConsecutiveBlocks(input)).toEqual([])
  })

  test('flags an uncaptioned block after a captioned one', () => {
    const input = body([...pre('# Arch\npacman -S yazi'), '', ...pre('pwd')])
    expect(findConsecutiveBlocks(input)).toHaveLength(1)
  })

  test('allows blocks in separate cards', () => {
    const input = ['### A', '', ...pre('ls'), '', '### B', '', ...pre('pwd')]
    expect(findConsecutiveBlocks(input.join('\n'))).toEqual([])
  })
})

test('every card separates its code blocks', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findConsecutiveBlocks(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, heading }) => `${slug}#${heading}`))
  ].sort()
  if (updatingBaseline) return saveBaseline('consecutiveBlocks.json', keys)

  const allowed = new Set(loadBaseline<string[]>('consecutiveBlocks.json', []))
  const unexpected: string[] = []
  for (const { slug, line, heading } of findings) {
    if (allowed.has(`${slug}#${heading}`)) continue
    unexpected.push(
      `${slug}:${line}: code block after a code block (${heading})`
    )
  }
  expect(unexpected).toEqual([])
})
