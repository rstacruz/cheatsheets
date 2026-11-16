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

// Column 0; `#define` and indented comments are not captions
const CAPTION = /^#(?:\s|$)/

type Finding = { line: number; heading: string; caption: string }

/** Flags a block stacking two or more commented examples */
function findMultiExampleBlocks(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  let heading: Heading | undefined

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'heading' && node.depth <= 3) {
        heading = node
      } else if (node.type === 'code' && node.position) {
        const captions = node.value.split(/\n\s*\n/).flatMap((run) => {
          const line = run.split('\n')[0] ?? ''
          return CAPTION.test(line) ? [line] : []
        })
        if (captions.length < 2) continue
        found.push({
          line: node.position.start.line,
          heading: heading?.position
            ? (lines[heading.position.start.line - 1] ?? '')
                .replace(/^#{2,3}\s+/, '')
                .trim()
            : '',
          caption: captions[0].replace(/^#\s*/, '')
        })
      }
      if ('children' in node) walk(node.children)
    }
  }

  walk(processor.parse(source).children)
  return found
}

describe('findMultiExampleBlocks()', () => {
  const body = (code: string[]) =>
    ['### A', '', '```bash', ...code, '```'].join('\n')

  test('allows a single commented example', () => {
    const input = body(['# Install', 'brew install yazi'])
    expect(findMultiExampleBlocks(input)).toEqual([])
  })

  test('flags two commented examples', () => {
    const input = body([
      '# Arch Linux',
      'sudo pacman -S yazi',
      '',
      '# macOS',
      'brew install yazi'
    ])
    expect(findMultiExampleBlocks(input)).toEqual([
      { line: 3, heading: 'A', caption: 'Arch Linux' }
    ])
  })

  test('ignores preprocessor lines', () => {
    const input = body(['#define MAX 10', '', '#undef MAX', 'int max = MAX;'])
    expect(findMultiExampleBlocks(input)).toEqual([])
  })

  test('ignores indented comments', () => {
    const input = body([
      '  # Arch Linux',
      '  sudo pacman -S yazi',
      '',
      '  # macOS',
      '  brew install yazi'
    ])
    expect(findMultiExampleBlocks(input)).toEqual([])
  })

  test('ignores blank-line groups without captions', () => {
    expect(
      findMultiExampleBlocks(body(['ls', '', 'pwd', '', 'echo hi']))
    ).toEqual([])
  })
})

test('every code block holds one example', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findMultiExampleBlocks(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(
      findings.map(
        ({ slug, heading, caption }) => `${slug}#${heading}#${caption}`
      )
    )
  ].sort()
  if (updatingBaseline) return saveBaseline('multiExampleBlocks.json', keys)

  const allowed = new Set(loadBaseline<string[]>('multiExampleBlocks.json', []))
  const unexpected: string[] = []
  for (const { slug, line, heading, caption } of findings) {
    if (allowed.has(`${slug}#${heading}#${caption}`)) continue
    unexpected.push(
      `${slug}:${line}: several commented examples in one block (${heading}: ${caption})`
    )
  }
  expect(unexpected).toEqual([])
})
