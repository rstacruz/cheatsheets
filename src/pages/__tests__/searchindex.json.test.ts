import { GET } from '../searchindex.json'

type SearchData = {
  index: { records: unknown[] }
  rows: Array<{ title: string; slug: string }>
}

let data: SearchData

beforeAll(async () => {
  const response = await GET()
  data = await response.json()
})

test('has data', async () => {
  expect(typeof data.index).toEqual('object')
  expect(Array.isArray(data.index.records)).toBeTruthy()
  expect(Array.isArray(data.rows)).toBeTruthy()

  for (const row of data.rows) {
    expect(typeof row.title).toBeTruthy() // some titles are numbers?
    expect(typeof row.slug).toEqual('string')
  }
})

test('skips unlisted sheets', async () => {
  const slugs = data.rows.map((row) => row.slug)

  expect(slugs).toContain('bash')
  expect(slugs).not.toContain('tests/basic') // hidden
  expect(slugs).not.toContain('react@16') // deprecated
  expect(slugs).not.toContain('firefox') // archived
})
