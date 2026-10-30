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

type FrontmatterOnly = Pick<SheetPage, 'frontmatter'>

/**
 * Checks if something should appear in listings: the homepage, the sitemap,
 * and the related and top lists. Hidden, deprecated, and archived sheets are
 * not listed; the archive page carries them instead.
 */

export function isListed(page: FrontmatterOnly): boolean {
  return (
    page.frontmatter.category !== 'Hidden' &&
    !isDeprecated(page) &&
    !isArchived(page)
  )
}

/**
 * Checks if a sheet is deprecated: either explicitly via `deprecated: true`,
 * or by pointing to a newer sheet via `deprecated_by`
 */

export function isDeprecated(page: FrontmatterOnly): boolean {
  return (
    page.frontmatter.deprecated === true ||
    Boolean(page.frontmatter.deprecated_by)
  )
}

/**
 * Checks if a sheet is archived via an `archived` note
 */

export function isArchived(page: FrontmatterOnly): boolean {
  return Boolean(page.frontmatter.archived)
}

/**
 * Checks if a sheet is a test fixture (lives under tests/)
 */

export function isTestFixture(page: SheetPage): boolean {
  return page.slug.startsWith('tests/')
}
