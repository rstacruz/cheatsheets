/**
 * Injects disqus's scripts into the page.
 *
 * @example
 *     injectDisqus('devhints.disqus.com')
 */

export default function injectDisqus (host) {
  const d = document
  const s = d.createElement('script')
  s.src = 'https://' + host + '/embed.js'
  s.setAttribute('data-timestamp', +new Date())
  ;(d.head || d.body).appendChild(s)
}
