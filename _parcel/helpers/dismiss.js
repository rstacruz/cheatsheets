import * as Store from './store'

/**
 * Dismisses an announcement.
 *
 * @example
 *     setDismissed('2017-09-02-happy-birthday')
 */

export function setDismissed(id) {
  Store.update('dismissed', function (data) {
    data[id] = true
    return data
  })
}

/**
 * Checks if an announcement has been dismissed before.
 *
 * @example
 *     setDismissed('2017-09-02-happy-birthday')
 *     isDismissed('2017-09-02-happy-birthday') => true
 */

export function isDismissed(id) {
  const data = Store.fetch('dismissed')
  return data && data[id]
}
