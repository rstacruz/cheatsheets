import * as Store from './store'

/**
 * Stores the visibility decision for an announcement.
 *
 * `dismissed[id]` is a decision: `true` = hidden (dismissed or rolled out),
 * `false` = decided visible, absent = not decided yet.
 *
 * @example
 *     setDismissed('2017-09-02-happy-birthday')
 *     setDismissed('2026-10-03', false)
 */

export function setDismissed(id, value = true) {
  Store.update('dismissed', function (data) {
    data[id] = value
    return data
  })
}

/**
 * Checks if an announcement is hidden.
 *
 * @example
 *     setDismissed('2017-09-02-happy-birthday')
 *     isDismissed('2017-09-02-happy-birthday') => true
 */

export function isDismissed(id) {
  const data = Store.fetch('dismissed')
  return Boolean(data && data[id])
}

/**
 * Checks if a visibility decision has been stored for an announcement.
 *
 * @example
 *     isDecided('2017-09-02-happy-birthday') => false
 */

export function isDecided(id) {
  const data = Store.fetch('dismissed')
  return Boolean(data && id in data)
}
