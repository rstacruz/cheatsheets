import snarkdown from 'snarkdown'
import { site } from '../../config'
import type { SheetPage } from '../page'
import { isListed } from '../page/accessors'

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

export function getPageTitle(page: {
  frontmatter: { title?: string; seo_title?: string; layout?: string }
}) {
  const { title = '', seo_title, layout } = page.frontmatter
  if (seo_title) return seo_title
  if (layout === 'snippet') return title
  return `${title} cheatsheet`
}

export function getSEOPropsForPage(
  page: Pick<SheetPage, 'slug' | 'frontmatter'>
) {
  const title = getPageTitle(page)
  const description = getDescription(page)
  const image = getPageImage(page)
  const url = getPageURL(page)
  const robots = isListed(page) ? undefined : 'noindex, follow'

  return {
    title: title,
    links: {
      canonical: url
    },
    meta: {
      description,
      'app:pageurl': url,
      ...(robots !== undefined && { robots })
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

export const MAX_DESCRIPTION = 155

export function getDescription(page: {
  frontmatter: {
    title?: string
    layout?: string
    intro?: string
    description?: string
    keywords?: string[]
  }
}) {
  const {
    title = '',
    layout,
    description,
    intro,
    keywords = []
  } = page.frontmatter

  if (description) {
    return clamp(toPlainText(description), MAX_DESCRIPTION)
  }

  const lead = title
    ? layout === 'snippet'
      ? title
      : `${title} cheatsheet`
    : 'Cheatsheet'
  const introText = toPlainText(intro ?? '')

  if (introText) return clamp(`${lead}. ${introText}`, MAX_DESCRIPTION)

  const tokens = keywords.slice(0, 5).join(', ')
  if (tokens) return clamp(`${lead}: ${tokens}.`, MAX_DESCRIPTION)

  return `${lead}: usage, examples, and snippets.`
}

/**
 * Cut at a word boundary; never exceed max.
 */

function clamp(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const at = cut.lastIndexOf(' ')
  return (at > 0 ? cut.slice(0, at) : cut).replace(/[,;:.\s]+$/, '') + '…'
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
