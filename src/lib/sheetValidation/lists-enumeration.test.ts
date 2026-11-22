import type { Properties } from 'hast'
import type { List, ListItem, Root, RootContent } from 'mdast'
import { commentAttributes } from '~/lib/markdown/comments'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(commentAttributes)

const ENUM_CLASSES: Record<string, true> = {
  '-enum': true,
  '-enum-wide': true,
  '-enum-lines': true
}

const MAX_WORDS = 8
const MAX_CHARS = 13
const SENTENCE_END = /[.!?]$/

type EnumKind = 'compact' | 'wide'
type Finding = { line: number; heading: string; reason: string }

/** Only lists that opt in get checked; the rule is opt-in until it settles */
function enumKind(list: List): EnumKind | undefined {
  const properties = list.data?.hProperties as Properties | undefined
  const classes = String(properties?.className ?? '').split(/\s+/)
  if (!classes.some((name) => ENUM_CLASSES[name] === true)) return undefined
  return classes.includes('-enum-wide') ? 'wide' : 'compact'
}

function wordsOf(item: ListItem): string[] {
  const words: string[] = []
  visit(item, ['text', 'inlineCode'], (node) => {
    words.push(...node.value.trim().split(/\s+/).filter(Boolean))
  })
  return words
}

function findEnumerationIssues(source: string): Finding[] {
  const headings = scanHeadings(source)
  const found: Finding[] = []

  const report = (line: number, reason: string) => {
    const heading = headings.findLast((h) => h.level <= 3 && h.line < line)
    found.push({ line, heading: heading?.title ?? '', reason })
  }

  const walk = (nodes: RootContent[]) => {
    for (const node of nodes) {
      if (node.type === 'list') {
        const kind = enumKind(node)
        if (kind) {
          const line = node.position?.start.line ?? 1
          let widest = 0
          if (node.children.length < 2)
            report(line, 'enumeration needs two or more items')

          for (const item of node.children) {
            const itemLine = item.position?.start.line ?? line
            if (
              item.children.length !== 1 ||
              item.children[0]?.type !== 'paragraph'
            ) {
              report(itemLine, 'enumeration item must hold one paragraph')
              continue
            }
            const words = wordsOf(item)
            const chars = words.join(' ').length
            widest = Math.max(widest, chars)
            if (words.length > MAX_WORDS)
              report(itemLine, `enumeration item has ${words.length} words`)
            if (kind === 'compact' && chars > MAX_CHARS)
              report(
                itemLine,
                `enumeration item has ${chars} characters (max ${MAX_CHARS})`
              )
            if (words.length > 0 && SENTENCE_END.test(words.at(-1) ?? ''))
              report(itemLine, 'enumeration item ends with punctuation')
          }

          if (kind === 'wide' && widest <= MAX_CHARS)
            report(
              line,
              `wide enumeration needs an item of ${MAX_CHARS + 1}+ characters`
            )
        }
      }
      if ('children' in node) walk(node.children as RootContent[])
    }
  }

  const tree = processor.runSync(processor.parse(source)) as Root
  walk(tree.children)
  return found
}

describe('findEnumerationIssues()', () => {
  const list = (items: string[], suffix = '<!-- {: .-enum} -->') =>
    ['### A', '', ...items.map((item) => `- ${item}`), '', suffix].join('\n')

  test('allows a valid opt-in list', () => {
    expect(
      findEnumerationIssues(list(['one', 'two', 'three', 'four']))
    ).toEqual([])
  })

  test('ignores lists without the class', () => {
    expect(
      findEnumerationIssues(list(['Done.'], '<!-- {: .-also-see} -->'))
    ).toEqual([])
  })

  it.each([
    ['one item', ['one'], ['enumeration needs two or more items']],
    [
      'a nine-word item',
      ['a b c d e f g h i', 'two'],
      [
        'enumeration item has 9 words',
        'enumeration item has 17 characters (max 13)'
      ]
    ],
    ['a 13-character item', ['abcdefghijklm', 'two'], []],
    [
      'a 14-character item',
      ['abcdefghijklmn', 'two'],
      ['enumeration item has 14 characters (max 13)']
    ],
    [
      'a full stop',
      ['Done.', 'two'],
      ['enumeration item ends with punctuation']
    ],
    ['a bang', ['Done!', 'two'], ['enumeration item ends with punctuation']],
    ['a question', ['Done?', 'two'], ['enumeration item ends with punctuation']]
  ])('checks %s', (_label, items, reasons) => {
    expect(findEnumerationIssues(list(items)).map((f) => f.reason)).toEqual(
      reasons
    )
  })

  test('allows a wide list with one long value', () => {
    const values = ['article:tag', 'article:author']
    expect(
      findEnumerationIssues(list(values, '<!-- {: .-enum-wide} -->'))
    ).toEqual([])
  })

  test('flags a wide list with only short values', () => {
    expect(
      findEnumerationIssues(
        list(['short', 'value'], '<!-- {: .-enum-wide} -->')
      ).map((f) => f.reason)
    ).toEqual(['wide enumeration needs an item of 14+ characters'])
  })

  test('flags a nested list', () => {
    const source = [
      '### A',
      '',
      '- one',
      '  - nested',
      '- two',
      '',
      '<!-- {: .-enum} -->'
    ].join('\n')
    expect(findEnumerationIssues(source)).toEqual([
      {
        line: 3,
        heading: 'A',
        reason: 'enumeration item must hold one paragraph'
      }
    ])
  })

  test('flags a second paragraph', () => {
    const source = [
      '### A',
      '',
      '- one',
      '',
      '  more',
      '- two',
      '',
      '<!-- {: .-enum} -->'
    ].join('\n')
    expect(findEnumerationIssues(source)).toEqual([
      {
        line: 3,
        heading: 'A',
        reason: 'enumeration item must hold one paragraph'
      }
    ])
  })
})

test('lists/enumeration: every opted-in list follows the rule', async () => {
  const findings: string[] = []
  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const { line, heading, reason } of findEnumerationIssues(source)) {
      findings.push(`${slug}:${line} ${heading}: ${reason}`)
    }
  }

  if (updatingBaseline) return saveBaseline('lists-enumeration.json', findings)

  const allowed = new Set(loadBaseline<string[]>('lists-enumeration.json', []))
  expect(findings.filter((finding) => !allowed.has(finding))).toEqual([])
})
