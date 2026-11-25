import { getSEOPropsForPage, MAX_DESCRIPTION, toPlainText } from './seo'

const slug = 'react'
const title = 'React'
const description = 'A React cheatsheet'
const markdownDescription =
  'A [React](https://react.dev) cheatsheet (*Markdown text*)'
const keywords = ['hooks', 'components', 'props']

describe('getSEOPropsForPage()', () => {
  runTest({
    title: 'title only',
    input: { slug, frontmatter: { title } }
  })
  runTest({
    title: 'with description',
    input: { slug, frontmatter: { title, description } }
  })
  runTest({
    title: 'with Markdown description',
    input: { slug, frontmatter: { title, description: markdownDescription } }
  })
  runTest({
    title: 'with description, keywords',
    input: { slug, frontmatter: { title, description, keywords } }
  })
  runTest({
    title: 'with keywords',
    input: { slug, frontmatter: { title, keywords } }
  })
  runTest({
    title: 'with seo_title',
    input: {
      slug,
      frontmatter: { title, seo_title: 'React cheatsheet — hooks' }
    }
  })

  test('seo_title overrides the generated title', () => {
    const output = getSEOPropsForPage({
      slug,
      frontmatter: { title, seo_title: 'React cheatsheet — hooks' }
    })
    expect(output.title).toEqual('React cheatsheet — hooks')
  })

  const tierCases: Array<['t1' | 't2' | 't3' | undefined, string, string]> = [
    ['t1', '2026-11-11', 'React cheatsheet (Nov 2026)'],
    ['t1', '2026-01-05', 'React cheatsheet (Jan 2026)'],
    ['t2', '2026-11-11', 'React cheatsheet'],
    ['t3', '2026-11-11', 'React cheatsheet'],
    [undefined, '2026-11-11', 'React cheatsheet']
  ]

  test.each(tierCases)(
    '%s sheet updated %s has title %s',
    (tier, updated, expected) => {
      const output = getSEOPropsForPage({
        slug,
        frontmatter: { title, tier, updated: new Date(updated) }
      })
      expect(output.title).toEqual(expected)
    }
  )

  test('stamps the updated month after a seo_title', () => {
    const output = getSEOPropsForPage({
      slug,
      frontmatter: {
        title,
        seo_title: 'React cheatsheet — hooks',
        tier: 't1',
        updated: new Date('2026-11-11')
      }
    })
    expect(output.title).toEqual('React cheatsheet — hooks (Nov 2026)')
    expect(output.metaProperties['og:title']).toEqual(
      'React cheatsheet — hooks (Nov 2026)'
    )
  })

  test('t1 sheets without updated keep the plain title', () => {
    const output = getSEOPropsForPage({
      slug,
      frontmatter: { title, tier: 't1' }
    })
    expect(output.title).toEqual('React cheatsheet')
  })

  test('snippet layouts use the title without a cheatsheet suffix', () => {
    const output = getSEOPropsForPage({
      slug: 'git-undo-commit',
      frontmatter: {
        title: 'How to undo a Git commit',
        layout: 'snippet'
      }
    })
    expect(output.title).toEqual('How to undo a Git commit')
    expect(output.meta.description).toContain('How to undo a Git commit')
  })

  test('uses the description verbatim, without the intro', () => {
    const output = getSEOPropsForPage({
      slug,
      frontmatter: { title, description, intro: 'Intro text' }
    })
    expect(output.meta.description).toEqual(description)
  })

  test('clamps long descriptions', () => {
    const output = getSEOPropsForPage({
      slug,
      frontmatter: { title, description: 'word '.repeat(50) }
    })
    expect(output.meta.description.length).toBeLessThanOrEqual(MAX_DESCRIPTION)
    expect(output.meta.description.endsWith('…')).toBe(true)
  })

  function runTest({ title, input }: { title: string; input: any }) {
    test(title, () => {
      const output = getSEOPropsForPage(input)
      expect(output).toMatchSnapshot()
    })
  }
})

describe('getSEOPropsForPage() robots', () => {
  test.each([
    ['archived', { title, archived: 'Old and unmaintained.' }],
    ['deprecated', { title, deprecated: true }],
    ['hidden', { title, category: 'Hidden' }]
  ])('%s pages are noindexed', (_label, frontmatter) => {
    const output = getSEOPropsForPage({ slug, frontmatter })
    expect(output.meta.robots).toEqual('noindex, follow')
  })

  test('listed pages have no robots meta', () => {
    const output = getSEOPropsForPage({ slug, frontmatter: { title } })
    expect(output.meta).not.toHaveProperty('robots')
  })
})

describe('toPlainText()', () => {
  test('converts markdown to plain text', () => {
    const input = 'This is a **bold** text'
    const output = toPlainText(input)
    expect(output).toEqual('This is a bold text')
  })

  test('removes HTML tags', () => {
    const input = '<p>This is a <strong>bold</strong> text</p>'
    const output = toPlainText(input)
    expect(output).toEqual('This is a bold text')
  })

  test('handles empty input', () => {
    const input = ''
    const output = toPlainText(input)
    expect(output).toEqual('')
  })
})
