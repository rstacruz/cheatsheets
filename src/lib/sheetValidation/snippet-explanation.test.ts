import type { Paragraph, PhrasingContent, RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getPages } from '../page'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'

const MAX_BOLD_WORDS = 5
const SEE_WORD = /\bsee(?:\s+(?:also|the|a|an))?\s+$/i
const HAS_WORD = /[\p{L}\p{N}]/u

type Rule = 'words' | 'expound' | 'see-link'
type Finding = { line: number; heading: string; rule: Rule; detail: string }
type Explanation = { line: number; heading: string; paragraph: Paragraph }

const processor = unified().use(remarkParse).use(remarkGfm)

function textOf(node: RootContent | PhrasingContent): string {
  if ('value' in node) return node.value
  if ('children' in node)
    return node.children.map((child) => textOf(child)).join('')
  return ''
}

/** Explanation paragraphs of H3 cards, in source order */
function explanations(source: string): Explanation[] {
  const found: Explanation[] = []
  let section: { heading: RootContent; nodes: RootContent[] } | undefined

  const flush = () => {
    if (section?.heading.type !== 'heading') return
    const paragraph = section.nodes.at(-1)
    if (paragraph?.type !== 'paragraph') return
    const line = section.heading.position?.start.line
    if (!line) return
    found.push({
      line,
      heading: (section.heading.children.map(textOf).join('') || '').trim(),
      paragraph
    })
  }

  for (const node of processor.parse(source).children) {
    if (node.type === 'heading' && node.depth <= 3) {
      flush()
      section = node.depth === 3 ? { heading: node, nodes: [] } : undefined
    } else {
      section?.nodes.push(node)
    }
  }
  flush()

  return found
}

/**
 * Checks the explanatory paragraph of each snippet card. Paragraphs without a
 * leading bold summary are left to `snippet/bold-summary` to report.
 */
export function findExplanationIssues(source: string, rule: Rule): Finding[] {
  const found: Finding[] = []

  for (const { line, heading, paragraph } of explanations(source)) {
    const children = paragraph.children
    if (children[0]?.type !== 'strong') continue
    const words = textOf(children[0]).trim().split(/\s+/).filter(Boolean)

    if (rule === 'words' && words.length > MAX_BOLD_WORDS) {
      found.push({
        line,
        heading,
        rule,
        detail: `${words.length} words in bold summary (max ${MAX_BOLD_WORDS})`
      })
      continue
    }

    const see = children.findIndex(
      (child, index) =>
        index > 0 && child.type === 'text' && SEE_WORD.test(child.value)
    )
    const link = children.findIndex(
      (child, index) => index > 0 && child.type === 'link'
    )

    if (rule === 'see-link') {
      if (see === -1 || children[see + 1]?.type !== 'link') {
        found.push({
          line,
          heading,
          rule,
          detail: 'explanation needs See [link](url)'
        })
      }
      continue
    }

    const end = see >= 0 ? see + 1 : link >= 0 ? link : children.length
    const expound = children
      .slice(1, end)
      .map(textOf)
      .join('')
      .replace(SEE_WORD, '')
      .trim()

    if (!HAS_WORD.test(expound)) {
      found.push({
        line,
        heading,
        rule,
        detail: 'bold summary needs non-bold text before the See link'
      })
    }
  }

  return found
}

describe('findExplanationIssues()', () => {
  const GOOD =
    "**Renders in place,** sharing the caller's context. See [Include](https://example.com)."
  const LONG =
    "**Renders the template's output in place,** sharing context. See [Include](https://example.com)."
  const BARE = '**Renders in place.** See [Include](https://example.com).'
  const NO_SEE = "**Renders in place,** sharing the caller's context."
  const NO_LINK =
    "**Renders in place,** sharing the caller's context. See more."

  const cases: Array<[string, Rule, number]> = [
    [GOOD, 'words', 0],
    [LONG, 'words', 1],
    [GOOD, 'expound', 0],
    [BARE, 'expound', 1],
    [GOOD, 'see-link', 0],
    [NO_SEE, 'see-link', 1],
    [NO_LINK, 'see-link', 1]
  ]

  it.each(cases)('checks %s against %s', (explanation, rule, count) => {
    expect(findExplanationIssues(sheet(explanation), rule)).toHaveLength(count)
  })

  test('accepts lowercase see', () => {
    const input = sheet(
      '**Renders in place,** sharing context. see [Include](https://example.com).'
    )
    expect(findExplanationIssues(input, 'see-link')).toEqual([])
  })
})

const RULES: Array<[Rule, string]> = [
  ['words', 'snippet-bold-summary-words.json'],
  ['expound', 'snippet-summary-expounds.json'],
  ['see-link', 'snippet-see-link.json']
]

describe('snippet explanations', () => {
  it.each(RULES)('checks %s across snippet sheets', async (rule, file) => {
    const findings: Array<Finding & { slug: string }> = []
    for (const page of Object.values(await getPages())) {
      if (!isSheetSlug(page.slug) || page.frontmatter.layout !== 'snippet')
        continue
      for (const finding of findExplanationIssues(page.markdown, rule)) {
        findings.push({ slug: page.slug, ...finding })
      }
    }

    const keys = [
      ...new Set(
        findings.map(({ slug, heading, rule }) => `${slug}#${heading}#${rule}`)
      )
    ].sort()
    if (updatingBaseline) return saveBaseline(file, keys)

    const allowed = new Set(loadBaseline<string[]>(file, []))
    const unexpected: string[] = []
    for (const { slug, line, heading, rule, detail } of findings) {
      if (allowed.has(`${slug}#${heading}#${rule}`)) continue
      unexpected.push(`${slug}:${line}: ${detail}`)
    }
    expect(unexpected).toEqual([])
  })
})

function sheet(explanation: string) {
  return [
    '## Do it',
    '<!-- {: .-snippets} -->',
    '',
    '### Do it',
    '<!-- {: .-snippet} -->',
    '',
    '```bash',
    'do-it',
    '```',
    '',
    explanation,
    ''
  ].join('\n')
}
