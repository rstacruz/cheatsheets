/**
 * Trigger a `callback` when an `element` is made visible.
 */

export function onScrollVisible(element: HTMLElement, callback: () => void) {
  if (typeof IntersectionObserver !== 'function') {
    callback()
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback()
        observer.unobserve(element)
      }
    })
  })
  observer.observe(element)
}
