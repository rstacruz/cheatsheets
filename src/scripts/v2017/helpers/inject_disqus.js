/**
 * Injects disqus's scripts into the page.
 *
 * @example
 *     inject('devhints.disqus.com')
 */

export default function inject(host) {
  injectEmbed(host)
  injectCount(host)
}

export function injectEmbed(host) {
  const d = document
  const s = d.createElement('script')
  s.src = `https://${host}/embed.js`
  s.setAttribute('data-timestamp', +new Date())
  ;(d.head || d.body).appendChild(s)
}

export function injectCount(host) {
  const d = document
  const s = d.createElement('script')
  s.src = `https://${host}/count.js`
  s.id = 'dsq-count-scr'
  s.async = true
  ;(d.head || d.body).appendChild(s)
}
