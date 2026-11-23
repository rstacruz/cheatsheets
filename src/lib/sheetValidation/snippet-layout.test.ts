import type { Root, RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { getPages } from '../page'
import { isSheetSlug } from './baseline'
import { scanHeadings } from './outline'

const H2_CLASS = '-snippets'
const H3_CLASS = '-snippet'

type Finding = { line: number; text: string }

const processor = unified().use(remarkParse).use(remarkGfm)

/** H3 sections including the heading and all content below it */
function h3Sections(tree: Root) {
  const sections: Array<{ heading: RootContent; nodes: RootContent[] }> = []
  let section: { heading: RootContent; nodes: RootContent[] } | undefined

  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth <= 3) {
      section = node.depth === 3 ? { heading: node, nodes: [] } : undefined
      if (section) sections.push(section)
    } else {
      section?.nodes.push(node)
    }
  }

  return sections
}

export function findSnippetLayoutIssues(source: string): Finding[] {
  const found: Finding[] = []
  const headings = scanHeadings(source)

  for (const heading of headings) {
    const required = heading.level === 2 ? H2_CLASS : H3_CLASS
    if (heading.level > 3) continue
    if (heading.classes.includes(required)) continue
    found.push({
      line: heading.line,
      text: `H${heading.level} "${heading.title}" needs the .${required} class`
    })
  }

  for (const { heading, nodes } of h3Sections(processor.parse(source))) {
    if (!heading.position) continue
    const line = heading.position.start.line
    const title =
      heading.type === 'heading'
        ? heading.children
            .map((child) => ('value' in child ? child.value : ''))
            .join('')
        : ''
    const content = nodes.filter(
      (node) => !(node.type === 'html' && node.value.trim().startsWith('<!--'))
    )
    const first = content[0]

    if (first?.type !== 'code') {
      found.push({
        line,
        text: `H3 "${title}" must start with a code block`
      })
    }

    const explanation = content.find((node) => {
      if (node.type !== 'paragraph') return false
      let linked = false
      visit(node, 'link', () => {
        linked = true
      })
      return linked
    })
    if (!explanation) {
      found.push({
        line,
        text: `H3 "${title}" needs an explanation paragraph with a link`
      })
    }
  }

  return found
}

describe('findSnippetLayoutIssues()', () => {
  const card = (title = 'Current branch') =>
    [
      `### ${title}`,
      `<!-- {: .${H3_CLASS}} -->`,
      '',
      '```bash',
      'git branch -m new-name',
      '```',
      '',
      'Renames the checked-out branch. See the [git-branch manual](https://git-scm.com/docs/git-branch).'
    ].join('\n')

  const sheet = (h2Class = H2_CLASS) =>
    [`## Renaming`, `<!-- {: .${h2Class}} -->`, '', card()].join('\n')

  test('accepts the snippet layout', () => {
    expect(findSnippetLayoutIssues(sheet())).toEqual([])
  })

  test('flags an H2 without the snippet class', () => {
    expect(findSnippetLayoutIssues(sheet('-two-column'))).toEqual([
      { line: 1, text: 'H2 "Renaming" needs the .-snippets class' }
    ])
  })

  test('flags an H3 without the snippet class', () => {
    const input = sheet().replace(`<!-- {: .${H3_CLASS}} -->`, '')
    expect(findSnippetLayoutIssues(input)).toEqual([
      { line: 4, text: 'H3 "Current branch" needs the .-snippet class' }
    ])
  })

  test('flags an explanation before the code block', () => {
    const input = sheet().replace(
      [
        '```bash',
        'git branch -m new-name',
        '```',
        '',
        'Renames the checked-out branch. See the [git-branch manual](https://git-scm.com/docs/git-branch).'
      ].join('\n'),
      'See the [git-branch manual](https://git-scm.com/docs/git-branch).'
    )
    expect(findSnippetLayoutIssues(input)).toEqual([
      { line: 4, text: 'H3 "Current branch" must start with a code block' }
    ])
  })

  test('flags an explanation without a link', () => {
    const input = sheet().replace(
      'Renames the checked-out branch. See the [git-branch manual](https://git-scm.com/docs/git-branch).',
      'Renames the checked-out branch.'
    )
    expect(findSnippetLayoutIssues(input)).toEqual([
      {
        line: 4,
        text: 'H3 "Current branch" needs an explanation paragraph with a link'
      }
    ])
  })
})

test('every snippet sheet uses the snippet layout', async () => {
  const findings: string[] = []
  for (const page of Object.values(await getPages())) {
    if (!isSheetSlug(page.slug) || page.frontmatter.tier !== 'snippet') continue
    for (const { line, text } of findSnippetLayoutIssues(page.markdown)) {
      findings.push(`${page.slug}:${line}: ${text}`)
    }
  }
  expect(findings).toEqual([])
})
