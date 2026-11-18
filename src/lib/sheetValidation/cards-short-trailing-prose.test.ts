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

/** Prose after the last code block or table in an H3 card */
const LIMIT = 40

const SEE_LINE = /^See:/

const processor = unified().use(remarkParse).use(remarkGfm)

type Finding = { line: number; words: number; heading: string }

/** Markdown syntax stripped, so link destinations don't count as words */
function countWords(text: string) {
  return text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .split(/\s+/)
    .filter(Boolean).length
}

/**
 * Flags a card whose prose after the last block runs long. Text before the
 * last block is untouched: only the closing paragraphs describe the block
 * the reader just saw.
 */
function findLongTrailingProse(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []
  let section: { heading: Heading; nodes: RootContent[] } | undefined

  const flush = () => {
    const heading = section?.heading
    if (!heading?.position) return

    const nodes = section.nodes
    let lastBlock = -1
    nodes.forEach((node, index) => {
      if (node.type === 'code' || node.type === 'table') lastBlock = index
    })
    if (lastBlock === -1) return

    let total = 0
    for (const node of nodes.slice(lastBlock + 1)) {
      if (node.type !== 'paragraph' || !node.position) continue
      const raw = lines
        .slice(node.position.start.line - 1, node.position.end.line)
        .join('\n')
      if (SEE_LINE.test(raw)) continue
      total += countWords(raw)
    }

    if (total > LIMIT) {
      found.push({
        line: heading.position.start.line,
        words: total,
        heading: (lines[heading.position.start.line - 1] ?? '')
          .replace(/^###\s+/, '')
          .trim()
      })
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

describe('findLongTrailingProse()', () => {
  const prose = (count: number) => Array(count).fill('word').join(' ')
  const card = (trailing: string) =>
    ['### A', '', '```bash', 'ls', '```', '', trailing].join('\n')

  test('flags 41 words after a code block', () => {
    expect(findLongTrailingProse(card(prose(41)))).toHaveLength(1)
  })

  test('allows 40 words', () => {
    expect(findLongTrailingProse(card(prose(40)))).toEqual([])
  })

  test('ignores prose before the block', () => {
    const input = ['### A', '', prose(50), '', '```bash', 'ls', '```'].join(
      '\n'
    )
    expect(findLongTrailingProse(input)).toEqual([])
  })

  test('ignores a See: line', () => {
    const input = card(`${prose(29)}\n\nSee: ${prose(20)}`)
    expect(findLongTrailingProse(input)).toEqual([])
  })

  test('counts after a table', () => {
    const input = [
      '### A',
      '',
      '| h |',
      '| --- |',
      '| x |',
      '',
      prose(41)
    ].join('\n')
    expect(findLongTrailingProse(input)).toHaveLength(1)
  })

  test('skips a card with no block', () => {
    expect(findLongTrailingProse(`### A\n\n${prose(40)}`)).toEqual([])
  })

  test('does not count a trailing list', () => {
    const input = card(`${prose(20)}\n\n- ${prose(20)}`)
    expect(findLongTrailingProse(input)).toEqual([])
  })
})

test('every card keeps trailing prose within the limit', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findLongTrailingProse(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, heading }) => `${slug}#${heading}`))
  ].sort()
  if (updatingBaseline)
    return saveBaseline('cards-short-trailing-prose.json', keys)

  const allowed = new Set(
    loadBaseline<string[]>('cards-short-trailing-prose.json', [])
  )
  const unexpected: string[] = []
  for (const { slug, line, words, heading } of findings) {
    if (allowed.has(`${slug}#${heading}`)) continue
    unexpected.push(
      `${slug}:${line}: ${words} words after the last block (${heading})`
    )
  }
  expect(unexpected).toEqual([])
})
