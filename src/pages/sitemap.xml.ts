import { site } from '~/config'
import { getPages } from '~/lib/page'
import { isListed } from '~/lib/page/accessors'

export async function GET() {
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  ]

  const visiblePages = Object.values(await getPages()).filter(isListed)

  for (const page of visiblePages) {
    const url = `${site.url}/${page.slug}`
    lines.push(`<url><loc>${url}</loc></url>`)
  }

  lines.push(`</urlset>`)

  const data = lines.join('\n') + '\n'

  return new Response(data, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  })
}
