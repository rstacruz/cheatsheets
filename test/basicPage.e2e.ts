import { expect, test } from '@playwright/test'
import type {
  JsonLdBreadcrumbList,
  JsonLdNewsArticle
} from '~/types/JsonLdDocument'
import { expectMeta, getLdJsonPayloads } from './e2eUtils'

test('/tests/basic', async ({ page }) => {
  await page.goto('/tests/basic')

  await expectMeta(page, {
    name: 'description',
    content:
      'The one-page guide to Basic test: usage, examples, links, snippets, and more.'
  })

  const ldJsonPayloads = await getLdJsonPayloads(page)
  expect(ldJsonPayloads.length).toEqual(2)

  const jsonData = ldJsonPayloads[0] as JsonLdNewsArticle
  expect(jsonData).toEqual({
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article'
    },
    headline: 'Basic test cheatsheet',
    image: ['https://assets.devhints.io/previews/tests/basic.jpg'],
    description:
      'The one-page guide to Basic test: usage, examples, links, snippets, and more.'
  })

  const jsonData2 = ldJsonPayloads[1] as JsonLdBreadcrumbList
  expect(jsonData2).toEqual({
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@id': 'https://devhints.io/#hidden', name: 'Hidden' }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'https://devhints.io/tests/basic',
          name: 'Basic test cheatsheet'
        }
      }
    ]
  })
})
