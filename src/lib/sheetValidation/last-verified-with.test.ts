import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'

const note =
  'Ecto 3.14 / Phoenix 1.8; verified on Elixir 1.18.6 + Ecto 3.14.3 + SQLite.'

test('last_verified_with is optional', () => {
  expect(SheetFrontmatterSchema.parse({}).last_verified_with).toBeUndefined()
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
