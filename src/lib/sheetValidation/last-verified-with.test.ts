import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'

const note = 'Current Conventional Commits 1.0.0, curl 8.23.0.'

const TIERED = {
  fragments: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
}

test('last_verified_with is optional on untiered sheets', () => {
  expect(SheetFrontmatterSchema.parse({}).last_verified_with).toBeUndefined()
})

it.each(['t1', 't2'] as const)('requires a note on %s', (tier) => {
  expect(() => SheetFrontmatterSchema.parse({ ...TIERED, tier })).toThrow(
    /last_verified_with/
  )
})

it.each(['t1', 't2'] as const)('accepts a note on %s', (tier) => {
  const parsed = SheetFrontmatterSchema.parse({
    ...TIERED,
    tier,
    last_verified_with: note
  })
  expect(parsed.last_verified_with).toBe(note)
})

test('the schema accepts a verification note', () => {
  const parsed = SheetFrontmatterSchema.parse({ last_verified_with: note })
  expect(parsed.last_verified_with).toBe(note)
})

test('the schema rejects notes longer than 160 characters', () => {
  expect(() =>
    SheetFrontmatterSchema.parse({ last_verified_with: 'x'.repeat(161) })
  ).toThrow()
})

it.each([
  'Jekyll 4.4.1, Ruby 3.4, 2026-11-22',
  'Last edited 2026-11',
  'Verified 22 Nov 2026',
  'Verified 11/22/2026'
])('rejects dates in the note: %s', (value) => {
  expect(() =>
    SheetFrontmatterSchema.parse({ last_verified_with: value })
  ).toThrow(/must not contain dates/)
})

it.each(['Current yt-dlp 2026.10.26.', 'Current mise v2026.11.1.'])(
  'accepts version-shaped numbers: %s',
  (value) => {
    expect(
      SheetFrontmatterSchema.parse({ last_verified_with: value })
        .last_verified_with
    ).toBe(value)
  }
)
