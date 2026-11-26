/** One sitemap URL entry; lastmod is only real when the sheet has an edit date. */
export function sitemapEntry(url: string, updated?: Date) {
  const lastmod = updated
    ? `<lastmod>${updated.toISOString().slice(0, 10)}</lastmod>`
    : ''
  return `<url><loc>${url}</loc>${lastmod}</url>`
}
