/*
 * Accessors: things that get stuff from a specific record. Usually in the form
 * of `get(page, ...) -> any`
 */

import type { SheetPage } from '../page'

/**
 * Check if a page has a tag
 */

export function hasTag(page: SheetPage, tagName: string): boolean {
  return (
    (page.frontmatter.tags && page.frontmatter.tags.includes(tagName)) || false
  )
}

/**
 * Checks if something should appear in listings: the homepage, the sitemap,
 * and the related and top lists. Hidden and deprecated sheets are not listed;
 * the archive page carries them instead.
 */

export function isListed(page: SheetPage): boolean {
  return page.frontmatter.category !== 'Hidden' && !isDeprecated(page)
}

/**
 * Checks if a sheet is deprecated: either explicitly via `deprecated: true`,
 * or by pointing to a newer sheet via `deprecated_by`
 */

export function isDeprecated(page: SheetPage): boolean {
  return (
    page.frontmatter.deprecated === true ||
    Boolean(page.frontmatter.deprecated_by)
  )
}

/**
 * Checks if a sheet is a test fixture (lives under tests/)
 */

export function isTestFixture(page: SheetPage): boolean {
  return page.slug.startsWith('tests/')
}

/**
 * Checks if a sheet is a redirect stub (e.g. declares `redirect_to`)
 */

export function isRedirect(page: SheetPage): boolean {
  return page.frontmatter.redirect_to !== undefined
}
