/**
 * Updates a local storage key. If it doesn't exist, it defaults to an empty
 * object.
 *
 * @example
 *     update('dismissed', (data) => {
 *       data.lol = true
 *       return data
 *     })
 */

export function update(key, fn) {
  if (!window.localStorage) return
  let data = JSON.parse(window.localStorage[key] || '{}')
  data = fn(data)
  window.localStorage[key] = JSON.stringify(data)
}

/**
 * Fetches a local storage key.
 *
 * @example
 *     const data = fetch('dismissed')
 */

export function fetch(key) {
  if (!window.localStorage) return
  return JSON.parse(window.localStorage[key] || '{}')
}
