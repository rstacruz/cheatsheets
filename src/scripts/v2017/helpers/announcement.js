/**
 * Checks if the announcement is forced to show (?announcement=1).
 */

export function isAnnouncementForced() {
  return new URLSearchParams(window.location.search).get('announcement') === '1'
}
