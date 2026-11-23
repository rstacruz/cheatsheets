import type { Root, RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'
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
    const explanation = content.at(-1)
    const left = content.slice(0, -1)
    const hasCode = left.some((node) => node.type === 'code')
    const leftIsValid = left.every(
      (node) =>
        node.type === 'code' || (node.type === 'heading' && node.depth === 4)
    )

    if (!hasCode) {
      found.push({
        line,
        text: `H3 "${title}" needs at least one code block before the explanation`
      })
      continue
    }

    if (!leftIsValid || explanation?.type !== 'paragraph') {
      found.push({
        line,
        text: `H3 "${title}" must hold code blocks and H4 labels, then one explanation paragraph`
      })
      continue
    }

    let linked = false
    visit(explanation, 'link', () => {
      linked = true
    })
    if (!linked) {
      found.push({
        line,
        text: `H3 "${title}" needs an explanation paragraph with a link`
      })
    }
  }

  return found
}

test('the schema accepts layout: snippet', () => {
  expect(SheetFrontmatterSchema.parse({ layout: 'snippet' }).layout).toBe(
    'snippet'
  )
  expect(() => SheetFrontmatterSchema.parse({ tier: 'snippet' })).toThrow()
})

test('the schema accepts a link_title override', () => {
  expect(
    SheetFrontmatterSchema.parse({ link_title: 'Git rename branch' }).link_title
  ).toBe('Git rename branch')
})

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

  test('accepts H4-labelled input and output blocks', () => {
    const input = sheet().replace(
      ['```bash', 'git branch -m new-name', '```'].join('\n'),
      [
        '```bash',
        'git branch -m new-name',
        '```',
        '',
        '#### Input',
        '',
        '```text',
        'old-name',
        '```',
        '',
        '#### Output',
        '',
        '```text',
        'new-name',
        '```'
      ].join('\n')
    )
    expect(findSnippetLayoutIssues(input)).toEqual([])
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
      {
        line: 4,
        text: 'H3 "Current branch" needs at least one code block before the explanation'
      }
    ])
  })

  test('flags extra content after the explanation', () => {
    const input = `${sheet()}\n\nAnother paragraph.`
    expect(findSnippetLayoutIssues(input)).toEqual([
      {
        line: 4,
        text: 'H3 "Current branch" must hold code blocks and H4 labels, then one explanation paragraph'
      }
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
    if (!isSheetSlug(page.slug) || page.frontmatter.layout !== 'snippet')
      continue
    for (const { line, text } of findSnippetLayoutIssues(page.markdown)) {
      findings.push(`${page.slug}:${line}: ${text}`)
    }
  }
  expect(findings).toEqual([])
})
