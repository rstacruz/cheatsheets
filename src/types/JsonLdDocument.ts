export type JsonLdNewsArticle = {
  '@context': 'http://schema.org'
  '@type': 'NewsArticle'
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  headline: string
  image: string[]
  description: string
}

export type JsonLdListItem = {
  '@type': 'ListItem'
  position: number
  item: {
    '@id': string
    name: string
  }
}

export type JsonLdBreadcrumbList = {
  '@context': 'http://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: JsonLdListItem[]
}

export type JsonLdDocument = JsonLdNewsArticle | JsonLdBreadcrumbList
