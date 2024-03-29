import snarkdown from 'snarkdown'
import { site } from '../../config'
import type { SheetPage } from '../page'

export function getSEOPropsForHome() {
  const t = {
    title: 'Devhints — TL;DR for developer documentation',
    description: 'A ridiculous collection of web development cheatsheets'
  }
  const url = site.url
  const image = 'https://assets.devhints.io/previews/index.jpg'

  return {
    title: t.title,
    links: {
      canonical: url
    },
    meta: {
      description: t.description,
      'app:pageurl': url
    },
    metaProperties: denull({
      'og:description': t.description,
      'og:image:height': '471',
      'og:image': image,
      'og:image:width': '900',
      'og:site_name': site.title,
      'og:title': t.title,
      'og:type': 'website',
      'og:url': url,
      // BUG: twitter card props should be metaNames
      'twitter:title': image,
      'twitter:image': image,
      'twitter:description': t.description
    })
  }
}

export function getSEOPropsForPage(
  page: Pick<SheetPage, 'slug' | 'frontmatter'>
) {
  const title = `${page.frontmatter.title} cheatsheet`
  const description = getDescription(page)
  const image = getPageImage(page)
  const url = getPageURL(page)

  return {
    title: title,
    links: {
      canonical: url
    },
    meta: {
      description,
      'app:pageurl': url
    },
    metaProperties: denull({
      'og:description': description,
      'og:image:height': '471',
      'og:image': image,
      'og:image:width': '900',
      'og:site_name': site.title,
      'og:title': title,
      'og:type': 'article',
      'og:url': url,
      'article:tag': page.frontmatter.tags ?? [],
      'article:section': page.frontmatter.category,
      // BUG: twitter card props should be metaNames
      'twitter:title': title,
      'twitter:image': image,
      'twitter:description': description
    })
  }
}

/**
 * Return a description for a page
 */

export function getDescription(page: {
  frontmatter: {
    title?: string
    intro?: string
    description?: string
    keywords?: string[]
  }
}) {
  const t = {
    withDescriptionAndIntro: `{description} {intro}`,
    withDescription: `{description} · One-page guide to {title}`,
    withKeywordsAndIntro: `{keywords} · {intro}`,
    withKeywords: `{keywords} · One-page guide to {title}`,
    withIntro: `One-page guide to {title}: usage, examples, and more. {intro}`,
    default: `The one-page guide to {title}: usage, examples, links, snippets, and more.`
  }

  let fmt: string = t.default

  if (page.frontmatter.description && page.frontmatter.intro) {
    fmt = t.withDescriptionAndIntro
  } else if (page.frontmatter.description) {
    fmt = t.withDescription
  } else if (page.frontmatter.keywords && page.frontmatter.intro) {
    fmt = t.withKeywordsAndIntro
  } else if (page.frontmatter.keywords) {
    fmt = t.withKeywords
  } else if (page.frontmatter.intro) {
    fmt = t.withIntro
  } else {
    fmt = t.default
  }

  return fmt
    .replace('{title}', () => page.frontmatter.title ?? '')
    .replace('{keywords}', () => (page.frontmatter.keywords ?? []).join(' · '))
    .replace('{intro}', () => toPlainText(page.frontmatter.intro ?? ''))
    .replace('{description}', () =>
      toPlainText(page.frontmatter.description ?? '')
    )
}

/**
 * Remove falsy values from an object
 */

function denull(
  record: Record<string, string | string[] | null | undefined>
): Record<string, string | string[]> {
  return Object.fromEntries(
    Object.entries(record).filter((entry): entry is [string, string] =>
      Boolean(entry[1])
    )
  )
}

export function getPageImage({ slug }: { slug: string }) {
  return `https://assets.devhints.io/previews/${slug}.jpg`
}

export function getPageURL({ slug }: { slug: string }) {
  return new URL(`/${slug}`, site.url).toString()
}

/**
 * Convert Markdown to plain text.
 */

export function toPlainText(input: string) {
  const html = snarkdown(input)
  const plainText = html.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
  return plainText
}
