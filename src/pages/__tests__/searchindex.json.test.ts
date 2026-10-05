import { GET } from '../searchindex.json'

test('has data', async () => {
  const response = await GET()
  const data = await response.json()
  expect(typeof data.index).toEqual('object')
  expect(Array.isArray(data.index.records)).toBeTruthy()
  expect(Array.isArray(data.rows)).toBeTruthy()

  for (const row of data.rows) {
    expect(typeof row.title).toBeTruthy() // some titles are numbers?
    expect(typeof row.slug).toEqual('string')
  }
})
