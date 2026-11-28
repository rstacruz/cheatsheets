import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'
import { getPages } from '../page'

const CREATED_AT = new Date('2020-01-01')

const REQUIRED = {
  intro: 'Hello',
  links: [{ title: 'Docs', url: 'https://example.com' }]
}

test('requires created_at', () => {
  expect(() => SheetFrontmatterSchema.parse({ ...REQUIRED })).toThrow(
    /created_at/
  )
})

test('accepts a creation date', () => {
  const parsed = SheetFrontmatterSchema.parse({
    ...REQUIRED,
    created_at: CREATED_AT
  })
  expect(parsed.created_at).toEqual(CREATED_AT)
})

it.each([
  ['updated', { updated: new Date('2019-12-31') }],
  ['last_verified_at', { last_verified_at: new Date('2019-12-31') }]
])('rejects a creation date after %s', (_, later) => {
  expect(() =>
    SheetFrontmatterSchema.parse({
      ...REQUIRED,
      created_at: CREATED_AT,
      ...later
    })
  ).toThrow(/must not be after/)
})

test('every sheet has a creation date', async () => {
  const pages = Object.values(await getPages())
  expect(pages.length).toBeGreaterThan(0)

  for (const { slug, frontmatter } of pages) {
    expect(frontmatter.created_at, slug).toBeInstanceOf(Date)
  }
})
