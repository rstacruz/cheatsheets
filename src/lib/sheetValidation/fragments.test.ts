import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'

const twelve = Array.from({ length: 12 }, (_, index) => `f${index}`)
const twenty = Array.from({ length: 20 }, (_, index) => `f${index}`)

test('the schema requires fragments for t1 and t2 sheets', () => {
  expect(() => SheetFrontmatterSchema.parse({ tier: 't1' })).toThrow()
  expect(() => SheetFrontmatterSchema.parse({ tier: 't2' })).toThrow()
  expect(
    SheetFrontmatterSchema.parse({ tier: 't1', fragments: twelve }).fragments
  ).toEqual(twelve)
})

test('the schema allows untiered sheets to omit fragments', () => {
  expect(SheetFrontmatterSchema.parse({}).fragments).toBeUndefined()
})

test('the schema accepts 12 to 20 fragments', () => {
  expect(
    SheetFrontmatterSchema.parse({ tier: 't1', fragments: twelve }).fragments
  ).toHaveLength(12)
  expect(
    SheetFrontmatterSchema.parse({ tier: 't1', fragments: twenty }).fragments
  ).toHaveLength(20)
})

test('the schema rejects fewer than 12 or more than 20 fragments', () => {
  expect(() =>
    SheetFrontmatterSchema.parse({ tier: 't1', fragments: twelve.slice(0, 11) })
  ).toThrow()
  expect(() =>
    SheetFrontmatterSchema.parse({
      tier: 't1',
      fragments: [...twenty, 'extra']
    })
  ).toThrow()
})

test('the schema caps each fragment at 16 characters', () => {
  expect(() =>
    SheetFrontmatterSchema.parse({
      tier: 't1',
      fragments: [...twelve.slice(0, 11), 'x'.repeat(17)]
    })
  ).toThrow()
  expect(
    SheetFrontmatterSchema.parse({
      tier: 't1',
      fragments: [...twelve.slice(0, 11), 'x'.repeat(16)]
    }).fragments
  ).toContain('x'.repeat(16))
})
