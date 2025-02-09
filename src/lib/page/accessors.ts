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
 * Checks if something should appear on the homepage
 */

export function isListed(page: SheetPage): boolean {
  return page.frontmatter.category !== 'Hidden'
}
