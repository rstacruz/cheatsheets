---
title: applicationCache
category: JavaScript
layout: 2017/sheet
---

## Reference
{: .-one-column}

### applicationCache checking

```js
if (window.applicationCache) {
  // "Naturally" reload when an update is available
  var reload = false

  window.applicationCache.addEventListener('updateready', () => {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache()
      reload = true
    }
  }, false)

  setInterval(() => {
    try {
      // There's nothing to update for first-time load, browser freaks out :/
      window.applicationCache.update()
    } catch (e) { }
  }, 1000 * 60 * 60) // Every hour
}
```

This is a deprecated HTML feature. See: [Using the application cache](https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache) _(developer.mozilla.org)_
