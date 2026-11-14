import type { Heading, Root, RootContent } from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { getPages } from '../page'
import { scanHeadings } from './outline'
import { loadBaseline, saveBaseline, updatingBaseline } from './baseline'
import { scanFences } from './utils'

const NOT_CONTENT: Record<string, true> = {
  heading: true,
  html: true,
  thematicBreak: true,
  definition: true,
  footnoteDefinition: true
}

/** devhints.io links do not point at upstream docs */
const SELF_LINK = /^https?:\/\/(?:www\.)?devhints\.io(?:[/?#]|$)/i

/** Case-sensitive; `See also:` is prose, not the pointer */
const SEE_LINE = /^See:/

const SEE_NONE = /^<!--\s*see:\s*none\b.*-->\s*$/

type Finding = { line: number; title: string }

const processor = unified().use(remarkParse).use(remarkGfm)

/** H3 sections; H4 subsections stay inside their H3 */
function h3Sections(tree: Root) {
  const sections: Array<{ heading: Heading; nodes: RootContent[] }> = []
  let section: { heading: Heading; nodes: RootContent[] } | undefined

  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth <= 3) {
      section = node.depth === 3 ? { heading: node, nodes: [node] } : undefined
      if (section) sections.push(section)
    } else {
      section?.nodes.push(node)
    }
  }

  return sections
}

/** `See:` may sit anywhere but must start a block */
function hasSeeLine(
  nodes: RootContent[],
  lines: string[],
  fenced: boolean[],
  start: number,
  end: number
) {
  const paragraphStarts = new Set<number>()
  for (const node of nodes) {
    visit(node, 'paragraph', (paragraph) => {
      if (paragraph.position) paragraphStarts.add(paragraph.position.start.line)
    })
  }

  for (let line = start; line <= end; line++) {
    if (
      !fenced[line - 1] &&
      SEE_LINE.test(lines[line - 1] ?? '') &&
      paragraphStarts.has(line)
    ) {
      return true
    }
  }

  return false
}

function hasSeeNone(
  lines: string[],
  fenced: boolean[],
  start: number,
  end: number
) {
  for (let line = start; line <= end; line++) {
    if (!fenced[line - 1] && SEE_NONE.test(lines[line - 1] ?? '')) return true
  }
  return false
}

/** Only raw `[text](url)` counts; not autolinks, references, images */
function hasQualifyingLink(source: string, node: RootContent) {
  let found = false
  visit(node, 'link', (link) => {
    const offset = link.position?.start.offset
    if (offset === undefined) return
    if (source[offset] === '[' && !SELF_LINK.test(link.url)) found = true
  })
  return found
}

function findMissingLinksOrSee(source: string): Finding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const found: Finding[] = []

  for (const { heading, nodes } of h3Sections(processor.parse(source))) {
    if (!heading.position) continue
    const start = heading.position.start.line
    const end = nodes.at(-1)?.position?.end.line ?? start

    if (hasSeeNone(lines, fenced, start, end)) continue
    if (hasSeeLine(nodes, lines, fenced, start, end)) continue

    const last = nodes.filter((node) => !NOT_CONTENT[node.type]).at(-1)
    if (last && hasQualifyingLink(source, last)) continue

    const title = (lines[start - 1] ?? '').replace(/^###\s+/, '').trim()
    found.push({ line: start, title })
  }

  return found
}

describe('findMissingLinksOrSee()', () => {
  test('allows a trailing inline link', () => {
    const input = '### A\n\ntext\n\n[docs](https://example.com)'
    expect(findMissingLinksOrSee(input)).toEqual([])
  })

  test('allows a trailing internal link', () => {
    expect(findMissingLinksOrSee('### A\n\n[React](./react)')).toEqual([])
  })

  test('allows a link in the last row of a table', () => {
    const input = [
      '### A',
      '',
      '| Command | Docs |',
      '| --- | --- |',
      '| `:q` | [Vim help](https://www.vim.org/docs.php) |'
    ].join('\n')
    expect(findMissingLinksOrSee(input)).toEqual([])
  })

  test('flags a link in an earlier block', () => {
    const input = '### A\n\n[docs](https://example.com)\n\nMore text.'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 1, title: 'A' }])
  })

  test('allows a linkless See: anywhere in the H3', () => {
    expect(findMissingLinksOrSee('### A\n\nSee: docs\n\nMore text.')).toEqual(
      []
    )
    expect(
      findMissingLinksOrSee('### A\n\ntext\n\nSee: `:help motion.txt`')
    ).toEqual([])
    expect(findMissingLinksOrSee('### A\nSee: docs')).toEqual([])
  })

  test('flags See: glued to a paragraph', () => {
    const input = '### A\n\nSome text.\nSee: docs'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 1, title: 'A' }])
  })

  test('accepts only an exact, unindented See:', () => {
    const expected = [{ line: 1, title: 'A' }]
    expect(findMissingLinksOrSee('### A\n\nSee also: docs')).toEqual(expected)
    expect(findMissingLinksOrSee('### A\n\n  See: docs')).toEqual(expected)
    expect(findMissingLinksOrSee('### A\n\nsee: docs')).toEqual(expected)
  })

  test('flags See: inside fenced code', () => {
    const input = '### A\n\n```bash\nSee: docs\n```'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 1, title: 'A' }])
  })

  test('does not borrow a See: from a later H3', () => {
    const input = '### A\n\ntext\n\n### B\n\nSee: docs'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 1, title: 'A' }])
  })

  test('flags an autolink or bare URL in the last block', () => {
    const expected = [{ line: 1, title: 'A' }]
    expect(findMissingLinksOrSee('### A\n\n<https://example.com>')).toEqual(
      expected
    )
    expect(findMissingLinksOrSee('### A\n\nhttps://example.com')).toEqual(
      expected
    )
  })

  test('flags a reference-style link', () => {
    const input = '### A\n\n[docs][1]\n\n[1]: https://example.com'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 1, title: 'A' }])
  })

  test('flags an image', () => {
    expect(findMissingLinksOrSee('### A\n\n![logo](./logo.png)')).toEqual([
      { line: 1, title: 'A' }
    ])
  })

  test('flags a link inside code', () => {
    const expected = [{ line: 1, title: 'A' }]
    expect(
      findMissingLinksOrSee('### A\n\n```md\n[docs](https://example.com)\n```')
    ).toEqual(expected)
    expect(
      findMissingLinksOrSee('### A\n\n`[docs](https://example.com)`')
    ).toEqual(expected)
  })

  test('flags an absolute devhints.io link', () => {
    expect(
      findMissingLinksOrSee('### A\n\n[docs](https://devhints.io/react)')
    ).toEqual([{ line: 1, title: 'A' }])
  })

  test('includes H4 subsections in the H3', () => {
    const input = '### A\n\n#### Setup\n\n[docs](https://example.com)'
    expect(findMissingLinksOrSee(input)).toEqual([])
  })

  test('ignores trailing HTML blocks and thematic breaks', () => {
    expect(
      findMissingLinksOrSee(
        [
          '### A',
          '',
          '[docs](https://example.com)',
          '',
          '<style>',
          '.a {}',
          '</style>'
        ].join('\n')
      )
    ).toEqual([])
    expect(
      findMissingLinksOrSee('### A\n\n[docs](https://example.com)\n\n---')
    ).toEqual([])
  })

  test('ignores a trailing attribute comment', () => {
    expect(
      findMissingLinksOrSee(
        '### A\n\n[docs](./react)\n<!-- {: .-crosslink} -->'
      )
    ).toEqual([])
  })

  test('stops the H3 at a setext heading', () => {
    expect(
      findMissingLinksOrSee(
        [
          '### A',
          '',
          'text',
          '',
          'Title',
          '-----',
          '',
          '[docs](https://example.com)'
        ].join('\n')
      )
    ).toEqual([{ line: 1, title: 'A' }])
    expect(
      findMissingLinksOrSee(
        [
          '### A',
          '',
          '[docs](https://example.com)',
          '',
          'Title',
          '-----',
          '',
          'text'
        ].join('\n')
      )
    ).toEqual([])
  })

  test('ignores headings inside fenced code', () => {
    expect(findMissingLinksOrSee('```md\n### A\n```')).toEqual([])
  })

  test('allows an own-line opt-out marker, with or without a reason', () => {
    expect(findMissingLinksOrSee('### A\n<!-- see: none -->')).toEqual([])
    expect(
      findMissingLinksOrSee(
        '### A\n\ntext\n\n<!-- see: none: CLI-only section -->'
      )
    ).toEqual([])
  })

  test('keeps an opt-out marker local to its H3', () => {
    const input = [
      '### A',
      '',
      'text',
      '',
      '<!-- see: none -->',
      '',
      '### B',
      '',
      'text'
    ].join('\n')
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 7, title: 'B' }])
  })

  test('flags an opt-out marker inside fenced code', () => {
    const input = '### A\n\n```md\n<!-- see: none -->\n```'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 1, title: 'A' }])
  })

  test('reports the heading text as written', () => {
    expect(findMissingLinksOrSee('### `pull` an image\n\ntext')).toEqual([
      { line: 1, title: '`pull` an image' }
    ])
  })

  test('allows a link nested in a list', () => {
    const input = '### A\n\n- one\n- [docs](https://example.com)'
    expect(findMissingLinksOrSee(input)).toEqual([])
  })

  test('requires the opt-out marker at column 0', () => {
    expect(findMissingLinksOrSee('### A\n\n  <!-- see: none -->')).toEqual([
      { line: 1, title: 'A' }
    ])
  })

  test('reports same-titled H3s independently', () => {
    const input = '### A\n\n[docs](./react)\n\n### A\n\ntext'
    expect(findMissingLinksOrSee(input)).toEqual([{ line: 5, title: 'A' }])
  })
})

test('every tiered sheet gives each H3 a link or See', async () => {
  const pages = Object.values(await getPages())
  const tiered = pages.filter(
    (page) =>
      !page.slug.includes('/') &&
      (page.frontmatter.tier === 't1' || page.frontmatter.tier === 't2')
  )
  expect(tiered.length).toBeGreaterThan(0)
  expect(
    tiered.some((page) =>
      scanHeadings(page.markdown).some((heading) => heading.level === 3)
    )
  ).toBe(true)

  const findings = tiered.flatMap((page) =>
    findMissingLinksOrSee(page.markdown).map((finding) => ({
      slug: page.slug,
      ...finding
    }))
  )

  // Counts, not a set: same-titled H3s can recur
  const counts: Record<string, number> = {}
  for (const { slug, title } of findings) {
    const key = `${slug}#${title}`
    counts[key] = (counts[key] ?? 0) + 1
  }

  if (updatingBaseline) {
    const sorted = Object.entries(counts).sort(([a], [b]) => (a < b ? -1 : 1))
    return saveBaseline('seeLinks.json', Object.fromEntries(sorted))
  }

  const allowed = {
    ...loadBaseline<Record<string, number>>('seeLinks.json', {})
  }
  const unexpected: string[] = []
  for (const { slug, line, title } of findings) {
    const key = `${slug}#${title}`
    if ((allowed[key] ?? 0) === 0) {
      unexpected.push(
        `${slug}:${line}: ### ${title} - add trailing link or See:, or <!-- see: none -->`
      )
    } else {
      allowed[key] -= 1
    }
  }
  expect(unexpected).toEqual([])
})
