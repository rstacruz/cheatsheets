import { site } from '~/config'
import { getPages } from '~/lib/page'
import { isListed } from '~/lib/page/accessors'
import { sitemapEntry } from '~/lib/sitemap'

export async function GET() {
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  ]

  const visiblePages = Object.values(await getPages()).filter(isListed)

  // Search engines ignore priority/changefreq; lastmod must be a real edit
  for (const page of visiblePages) {
    lines.push(
      sitemapEntry(`${site.url}/${page.slug}`, page.frontmatter.updated)
    )
  }

  lines.push(`</urlset>`)

  const data = lines.join('\n') + '\n'

  return new Response(data, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  })
}
