/**
 * Stores and retrieves data from an element. Works like jQuery.data().
 */

export function data(el, key, val) {
  if (typeof val !== 'undefined') {
    return getData(el, key)
  } else {
    return setData(el, key, val)
  }
}

export function getData(el, key) {
  const str = el.getAttribute('data-' + key)
  return JSON.parse(str || '{}')
}

export function setData(el, key, val) {
  el.setAttribute('data-' + key, JSON.stringify(val))
}
