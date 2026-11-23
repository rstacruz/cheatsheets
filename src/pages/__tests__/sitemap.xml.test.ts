import { site } from '~/config'
import { getPages } from '~/lib/page'
import { isListed, isSnippet } from '~/lib/page/accessors'
import { GET } from '../sitemap.xml'

let body: string
let lines: string[]

beforeEach(async () => {
  if (body) return
  const response = await GET()
  body = await response.text()
  lines = body.split('\n')
})

test('has data', async () => {
  expect(body).toContain('<loc>https://devhints.io/react</loc>')
  expect(body).toContain('<loc>https://devhints.io/bash</loc>')
})

test('adds lastmod from updated', () => {
  expect(body).toMatch(
    /<url><loc>https:\/\/devhints\.io\/bash<\/loc><lastmod>\d{4}-\d{2}-\d{2}<\/lastmod><\/url>/
  )
})

test('omits lastmod when updated is missing', async () => {
  const pages = await getPages()
  const page = Object.values(pages).find(
    (page) => isListed(page) && !page.frontmatter.updated
  )

  expect(page, 'expected a listed sheet without updated').toBeDefined()
  expect(body).toContain(`<url><loc>${site.url}/${page!.slug}</loc></url>`)
})

test('tiered sheets carry lastmod', async () => {
  const pages = Object.values(await getPages()).filter(
    (page) => page.frontmatter.tier
  )

  expect(pages.length).toBeGreaterThan(0)
  for (const page of pages) {
    expect(body).toContain(`<url><loc>${site.url}/${page.slug}</loc><lastmod>`)
  }
})

test('includes snippet sheets', async () => {
  const pages = Object.values(await getPages()).filter(isSnippet)

  expect(pages.length).toBeGreaterThan(0)
  for (const page of pages) {
    expect(body).toContain(`<loc>${site.url}/${page.slug}</loc>`)
  }
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
