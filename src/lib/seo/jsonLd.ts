import type { JsonLdDocument } from '~/types/JsonLdDocument'
import { site } from '../../config'
import { getDescription, getPageImage, getPageURL } from './seo'

export function getJSONLDsForPage(page: {
  // TODO: rename getJsonLdSchemasForPage
  slug: string
  frontmatter: {
    title?: string
    description?: string
    category?: string
  }
}): Array<JsonLdDocument> {
  const description = getDescription(page)
  const image = getPageImage(page)
  const url = getPageURL(page)
  const category = page.frontmatter.category ?? 'Others'
  const categoryAnchor = category.toLowerCase().replace(/ /g, '-')
  const headline = page.frontmatter.title
    ? `${page.frontmatter.title} cheatsheet`
    : ''

  const newsArticle: JsonLdDocument = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article'
    },
    headline,
    image: [image],
    description: description
  }

  const breadcrumb: JsonLdDocument = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': `${site.url}/#${categoryAnchor}`,
          name: category
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': url,
          name: headline
        }
      }
    ]
  }

  return [newsArticle, breadcrumb]
}
