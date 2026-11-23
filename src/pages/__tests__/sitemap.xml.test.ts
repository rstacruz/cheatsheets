import { site } from '~/config'
import { getPages } from '~/lib/page'
import { isListed, isSnippet } from '~/lib/page/accessors'
import { GET } from '../sitemap.xml'

let body: string

beforeEach(async () => {
  if (body) return
  const response = await GET()
  body = await response.text()
})

test('has data', async () => {
  expect(body).toContain('<loc>https://devhints.io/react</loc>')
  expect(body).toContain('<loc>https://devhints.io/bash</loc>')
})

test('adds lastmod from updated', async () => {
  const bash = (await getPages())['bash']
  const updated = bash.frontmatter.updated?.toISOString().slice(0, 10)

  expect(updated).toBeDefined()
  expect(body).toContain(
    `<url><loc>${site.url}/bash</loc><lastmod>${updated}</lastmod></url>`
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
    (page) => isListed(page) && page.frontmatter.tier
  )

  expect(pages.length).toBeGreaterThan(0)
  for (const page of pages) {
    expect(body).toContain(`<url><loc>${site.url}/${page.slug}</loc><lastmod>`)
  }
})

test('includes snippet sheets', async () => {
  const pages = Object.values(await getPages()).filter(
    (page) => isListed(page) && isSnippet(page)
  )

  expect(pages.length).toBeGreaterThan(0)
  for (const page of pages) {
    expect(body).toContain(`<url><loc>${site.url}/${page.slug}</loc><lastmod>`)
  }
})

test('skip internal docs', async () => {
  expect(body).not.toContain(
    '<loc>https://devhints.io/_docs/markdown-dialect</loc>'
  )
  expect(body).not.toContain(
    '<loc>https://devhints.io/_docs/writing-guidelines</loc>'
  )
  expect(body).not.toContain('<loc>https://devhints.io/AGENTS</loc>')
})

test('skip unlisted sheets', async () => {
  expect(body).not.toContain('<loc>https://devhints.io/tests/basic</loc>')
})

test('skip hidden sheets', async () => {
  expect(body).not.toContain('<loc>https://devhints.io/absinthe</loc>')
})

test('skip deprecated sheets', async () => {
  expect(body).not.toContain('<loc>https://devhints.io/react@16</loc>')
})

test('skip archived sheets', async () => {
  expect(body).not.toContain('<loc>https://devhints.io/firefox</loc>')
})
