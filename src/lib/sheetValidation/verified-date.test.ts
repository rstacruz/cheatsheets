import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'
import { getPages } from '../page'

const UPDATED = new Date('2026-11-18')

const REQUIRED = {
  intro: 'Hello',
  links: [{ title: 'Docs', url: 'https://example.com' }]
}

const TIERED = {
  ...REQUIRED,
  created_at: new Date('2020-01-01'),
  fragments: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
  last_verified_with: 'Bash 5.3.',
  last_verified_at: UPDATED
}

it.each(['t1', 't2'] as const)('requires a stamp on %s', (tier) => {
  expect(() =>
    SheetFrontmatterSchema.parse({
      ...TIERED,
      tier,
      last_verified_at: undefined
    })
  ).toThrow(/`last_verified_at` is required/)
})

it.each(['t3', undefined])('allows a missing stamp on %s', (tier) => {
  const parsed = SheetFrontmatterSchema.parse({
    ...TIERED,
    tier,
    last_verified_at: undefined
  })
  expect(parsed.last_verified_at).toBeUndefined()
})

it.each([UPDATED, new Date('2026-11-19')])(
  'accepts stamp %s on or after updated',
  (last_verified_at) => {
    const parsed = SheetFrontmatterSchema.parse({
      ...TIERED,
      updated: UPDATED,
      last_verified_at
    })
    expect(parsed.last_verified_at).toEqual(last_verified_at)
  }
)

test('rejects a stamp before updated', () => {
  expect(() =>
    SheetFrontmatterSchema.parse({
      ...TIERED,
      updated: new Date('2026-11-19')
    })
  ).toThrow(/must not be before `updated`/)
})

test('a stamp does not require updated', () => {
  expect(
    SheetFrontmatterSchema.parse({ ...TIERED, tier: 't1' }).last_verified_at
  ).toEqual(UPDATED)
})

test('every t1 and t2 sheet has a current stamp', async () => {
  const tiered = Object.values(await getPages()).filter((page) =>
    ['t1', 't2'].includes(page.frontmatter.tier ?? '')
  )
  expect(tiered.length).toBeGreaterThan(0)

  for (const { slug, frontmatter } of tiered) {
    expect(frontmatter.last_verified_at, slug).toBeInstanceOf(Date)

    const verifiedAt = frontmatter.last_verified_at!.getTime()
    const updated = frontmatter.updated!.getTime()
    expect(verifiedAt, slug).toBeGreaterThanOrEqual(updated)
  }
})
