import { github } from '~/config'
import type { SheetPage } from './page'

export function getEditLink(page: { slug: string } | null | undefined) {
  if (!page) return null
  return `${github.repositoryUrl}/blob/${github.branch}/${page.slug}.md`
}

export function getUrlFromPage(
  page?: SheetPage | undefined,
  siteUrl?: URL | undefined
) {
  if (!siteUrl) throw new Error('No site URL found')
  if (!page) return siteUrl.toString()
  if (page.slug) return `${siteUrl}${page.slug}`
  throw new Error("Can't get URL from page")
}
