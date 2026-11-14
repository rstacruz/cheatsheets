import { getSEOPropsForPage, toPlainText } from './seo'

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
