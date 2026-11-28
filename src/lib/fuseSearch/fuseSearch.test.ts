import { buildFuseIndex, parseFuse } from './fuseSearch'

describe('Simple pages scenario', () => {
  // prettier-ignore
  const pages = {
    "react": { slug: "react", markdown: "", frontmatter: { title: "React", keywords: ["hooks"] } },
    "vim": { slug: "vim", markdown: "### Motions", frontmatter: { title: "Vim", subtitle: "Modal editor", category: "Vim" } },
    "react-router": { slug: "react-router", markdown: "", frontmatter: { title: "React Router" } },
  }

  let fuse: ReturnType<typeof parseFuse>

  runTest({
    label: 'one-result search',
    query: 'vim'
  })
  runTest({
    label: 'multi-result search',
    query: 'react'
  })
  runTest({
    label: 'no-result search',
    query: 'skinamarink'
  })

  test('matches a heading-only term', () => {
    expect(fuse.search('motions').map((result) => result.item.slug)).toEqual([
      'vim'
    ])
  })

  test('matches a keyword-only term', () => {
    expect(fuse.search('hooks').map((result) => result.item.slug)).toEqual([
      'react'
    ])
  })

  beforeEach(() => {
    const externalData = buildFuseIndex(pages)
    fuse = parseFuse(externalData)
  })

  function runTest({ label, query }: { label: string; query: string }) {
    test(label, () => {
      const results = fuse.search(query)
      expect(results).toMatchSnapshot()
    })
  }
})
