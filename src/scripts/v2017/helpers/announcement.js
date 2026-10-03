/**
 * Checks if the announcement is forced to show (?announcement=1).
 */

export function isAnnouncementForced() {
  return window.location.search.indexOf('announcement=1') !== -1
}
