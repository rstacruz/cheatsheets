/**
 * Checks if we're in preview mode (?preview=1).
 */

export function isPreview() {
  return window.location.search.indexOf('preview=1') !== -1
}
