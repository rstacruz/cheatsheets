---
title: Google Analytics's analytics.js
subtitle: Deprecated Google Analytics library
category: Hidden
# Universal Analytics stopped processing data on 2023-07-01; replaced by GA4/gtag.js.
tags: [Archived]
archived: |
  Universal Analytics stopped processing hits on 1 July 2023. Use
  [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
  or the `gtag.js` snippet instead.
updated: 2017-10-29
intro: |
  Google Analytics's analytics.js is deprecated.
links:
  - title: analytics.js documentation
    url: https://developers.google.com/analytics/devguides/collection/analyticsjs
---

### Page view

```js
ga('create', 'UA-XXXX-Y', 'auto')
ga('create', 'UA-XXXX-Y', { userId: 'USER_ID' })
```

```js
ga('send', 'pageview')
ga('send', 'pageview', { 'dimension15': 'My custom dimension' })
```

### Events

```js
ga('send', 'event', 'button',  'click', {color: 'red'});
```

```js
ga('send', 'event', 'button',  'click', 'nav buttons',  4);
/*                  ^category  ^action  ^label          ^value */
```

### Exceptions

```js
ga('send', 'exception', {
  exDescription: 'DatabaseError',
  exFatal: false,
  appName: 'myapp',
  appVersion: '0.1.2'
})
```
