import { getPages, mapGlobToPages } from './page'

let pages: Awaited<ReturnType<typeof getPages>>
let keys: string[]

beforeEach(async () => {
  pages ??= await getPages()
  keys ??= Object.keys(pages)
})

test('return pages', () => {
  expect(keys).toContain('react')
  expect(keys).toContain('bash')
  expect(keys).toContain('tests/basic')
})

test('frontmatter', () => {
  const page = pages.bash
  expect(page.slug).toEqual('bash')
  expect(typeof page.markdown).toEqual('string')
  expect(typeof page.frontmatter.title).toEqual('string')
  expect(typeof page.frontmatter.keywords).toEqual('object')
})

describe('mapGlobToPages()', () => {
  test('basic scenario', () => {
    const result = mapGlobToPages({
      bash: ['---', 'title: Bash', '---', '# hi'].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "bash": {
          "frontmatter": {
            "title": "Bash",
          },
          "markdown": "# hi",
          "slug": "bash",
        },
      }
    `)
  })

  test('parsing numbers', () => {
    const result = mapGlobToPages({
      '101': ['---', 'title: 101', '---', '# hi'].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "101": {
          "frontmatter": {
            "title": "101",
          },
          "markdown": "# hi",
          "slug": "101",
        },
      }
    `)
  })

  test('invalid type', () => {
    expect(() => {
      mapGlobToPages({
        '101': ['---', 'title: false', '---', '# hi'].join('\n')
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `[FrontmatterValidationError: Zod validation error: '101' {"title":["Invalid input"]}]`
    )
  })

  test('missing frontmatter', () => {
    const result = mapGlobToPages({
      '101': ['---', 'title: 101', '---', '# hi'].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "101": {
          "frontmatter": {
            "title": "101",
          },
          "markdown": "# hi",
          "slug": "101",
        },
      }
    `)
  })
})
