/*
 * Helper: minimal qs implementation
 */

export default function qs(search) {
  search = search.substr(1)
  const parts = search.split('&').map((p) => p.split('='))
  return parts.reduce((result, part) => {
    result[part[0]] = qsdecode(part[1])
    return result
  }, {})
}

export function qsdecode(string) {
  if (!string) string = ''
  string = string.replace(/\+/g, ' ')
  return string
}
