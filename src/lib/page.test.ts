import { getPages, mapGlobToPages } from './page'

const INTRO = 'intro: Hello'
const LINKS = ['links:', '  - title: Docs', '    url: https://example.com/docs']
const REQUIRED = [INTRO, ...LINKS]

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

test('skip internal docs', () => {
  expect(keys).not.toContain('_docs/markdown-dialect')
  expect(keys).not.toContain('_docs/writing-guidelines')
  expect(keys).not.toContain('AGENTS')
})

test('frontmatter', () => {
  const page = pages.bash
  expect(page.slug).toEqual('bash')
  expect(typeof page.markdown).toEqual('string')
  expect(typeof page.frontmatter.title).toEqual('string')
  expect(typeof page.frontmatter.keywords).toEqual('object')
})

test('links frontmatter', () => {
  const result = mapGlobToPages({
    bash: [
      '---',
      'title: Bash',
      'created_at: 2020-01-01',
      ...REQUIRED,
      '---',
      '# hi'
    ].join('\n')
  })

  expect(result.bash.frontmatter.links).toEqual([
    { title: 'Docs', url: 'https://example.com/docs' }
  ])
})

test('intro length cap', () => {
  const page = (intro: string) =>
    mapGlobToPages({
      bash: [
        '---',
        'title: Bash',
        'created_at: 2020-01-01',
        `intro: ${intro}`,
        ...LINKS,
        '---',
        '# hi'
      ].join('\n')
    })

  expect(() => page('x'.repeat(501))).toThrow(/intro/)
  expect(() => page('x'.repeat(500))).not.toThrow()
})

test('intro and links are both required', () => {
  const withoutIntro = () =>
    mapGlobToPages({
      bash: [
        '---',
        'title: Bash',
        'created_at: 2020-01-01',
        ...LINKS,
        '---',
        '# hi'
      ].join('\n')
    })
  const withoutLinks = () =>
    mapGlobToPages({
      bash: [
        '---',
        'title: Bash',
        'created_at: 2020-01-01',
        INTRO,
        '---',
        '# hi'
      ].join('\n')
    })

  expect(withoutIntro).toThrow(/intro/)
  expect(withoutLinks).toThrow(/links/)
})

test('links cap', () => {
  const page = (count: number) =>
    mapGlobToPages({
      bash: [
        '---',
        'created_at: 2020-01-01',
        'title: Bash',
        INTRO,
        'links:',
        ...Array.from(
          { length: count },
          (_, i) => `  - title: L${i}\n    url: https://example.com/${i}`
        ),
        '---',
        '# hi'
      ].join('\n')
    })

  expect(() => page(5)).toThrow(/links/)
  expect(() => page(4)).not.toThrow()
})

test('deprecated frontmatter', () => {
  const result = mapGlobToPages({
    old: [
      '---',
      'created_at: 2020-01-01',
      'title: Old',
      ...REQUIRED,
      'deprecated: true',
      'deprecated_by: /new',
      '---',
      '# hi'
    ].join('\n')
  })

  expect(result.old.frontmatter.deprecated).toBe(true)
  expect(result.old.frontmatter.deprecated_by).toBe('/new')
})

describe('mapGlobToPages()', () => {
  test('basic scenario', () => {
    const result = mapGlobToPages({
      bash: [
        '---',
        'title: Bash',
        'created_at: 2020-01-01',
        ...REQUIRED,
        '---',
        '# hi'
      ].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "bash": {
          "frontmatter": {
            "created_at": 2020-01-01T00:00:00.000Z,
            "intro": "Hello",
            "links": [
              {
                "title": "Docs",
                "url": "https://example.com/docs",
              },
            ],
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
      '101': [
        '---',
        'title: 101',
        'created_at: 2020-01-01',
        ...REQUIRED,
        '---',
        '# hi'
      ].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "101": {
          "frontmatter": {
            "created_at": 2020-01-01T00:00:00.000Z,
            "intro": "Hello",
            "links": [
              {
                "title": "Docs",
                "url": "https://example.com/docs",
              },
            ],
            "title": "101",
          },
          "markdown": "# hi",
          "slug": "101",
        },
      }
    `)
  })

  test('description field', () => {
    const result = mapGlobToPages({
      '101': [
        '---',
        'created_at: 2020-01-01',
        'title: 101',
        'description: Custom description',
        ...REQUIRED,
        '---',
        '# hi'
      ].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "101": {
          "frontmatter": {
            "created_at": 2020-01-01T00:00:00.000Z,
            "description": "Custom description",
            "intro": "Hello",
            "links": [
              {
                "title": "Docs",
                "url": "https://example.com/docs",
              },
            ],
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
        '101': [
          '---',
          'title: false',
          'created_at: 2020-01-01',
          ...REQUIRED,
          '---',
          '# hi'
        ].join('\n')
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `[FrontmatterValidationError: Zod validation error: '101' {"title":["Invalid input"]}]`
    )
  })

  test('missing frontmatter', () => {
    const result = mapGlobToPages({
      '101': [
        '---',
        'title: 101',
        'created_at: 2020-01-01',
        ...REQUIRED,
        '---',
        '# hi'
      ].join('\n')
    })

    expect(result).toMatchInlineSnapshot(`
      {
        "101": {
          "frontmatter": {
            "created_at": 2020-01-01T00:00:00.000Z,
            "intro": "Hello",
            "links": [
              {
                "title": "Docs",
                "url": "https://example.com/docs",
              },
            ],
            "title": "101",
          },
          "markdown": "# hi",
          "slug": "101",
        },
      }
    `)
  })
})
