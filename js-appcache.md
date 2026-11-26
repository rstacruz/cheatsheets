---
title: applicationCache
subtitle: Deprecated offline caching API
category: Hidden
# window.applicationCache was removed from browsers; use Service Workers.
tags: [Archived]
archived: |
  `window.applicationCache` was removed from browsers. Use
  [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
  instead.
updated: 2026-10-04
---

## Reference

<!-- {: .-one-column} -->

### Checking for updates

```js
if (window.applicationCache) {
  // "Naturally" reload when an update is available
  var cache = window.applicationCache
  var reload = false

  cache.addEventListener('updateready', () => {
    if (cache.status === cache.UPDATEREADY) {
      cache.swapCache()
      reload = true
    }
  }, false)

  setInterval(() => {
    try {
      // Nothing to update on first load; browsers error
      cache.update()
    } catch (e) { }
  }, 1000 * 60 * 60) // Every hour
}
```

`window.applicationCache` was removed from browsers; use Service Workers
instead.

See: [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) _(developer.mozilla.org)_
