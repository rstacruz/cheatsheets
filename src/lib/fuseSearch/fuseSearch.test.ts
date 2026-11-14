import { buildFuseIndex, parseFuse } from './fuseSearch'

describe('Simple pages scenario', () => {
  // prettier-ignore
  const pages = {
    "react": { slug: "react", frontmatter: { title: "React" } },
    "vim": { slug: "vim", frontmatter: { title: "Vim" } },
    "react-router": { slug: "react-router", frontmatter: { title: "React Router" } },
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
