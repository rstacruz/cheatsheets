import { GET } from '../sitemap.xml'

let lines: string[]

beforeEach(async () => {
  if (lines) return
  const response = await GET()
  const body = await response.text()
  lines = body.split('\n')
})

test('has data', async () => {
  expect(lines).toContain('<url><loc>https://devhints.io/react</loc></url>')
  expect(lines).toContain('<url><loc>https://devhints.io/bash</loc></url>')
})

test('skip internal docs', async () => {
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/_docs/markdown-dialect</loc></url>'
  )
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/_docs/writing-guidelines</loc></url>'
  )
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/AGENTS</loc></url>'
  )
})

test('skip unlisted sheets', async () => {
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/tests/basic</loc></url>'
  )
})

test('skip hidden sheets', async () => {
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/absinthe</loc></url>'
  )
})

test('skip deprecated sheets', async () => {
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/react@16</loc></url>'
  )
})

test('skip archived sheets', async () => {
  expect(lines).not.toContain(
    '<url><loc>https://devhints.io/firefox</loc></url>'
  )
})
