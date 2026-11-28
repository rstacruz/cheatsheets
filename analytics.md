---
title: Analytics libraries
created_at: 2014-09-05
subtitle: Analytics library comparison
category: Hidden
# Universal Analytics stopped processing hits on 2023-07-01.
tags: [Archived]
archived: |
  This documents Universal Analytics (`analytics.js`), which stopped processing
  hits on 1 July 2023. Use
  [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
  instead; Mixpanel has its own [sheet](./mixpanel).
---

### Mixpanel

```js
mixpanel.identify('284');
mixpanel.people.set({ $email: 'hi@gmail.com' });
mixpanel.register({ age: 28, gender: 'male' }); /* set common properties */
```

[mixpanel](./mixpanel)

<!-- {: .-crosslink} -->

### Google Analytics's analytics.js

```js
ga('create', 'UA-XXXX-Y', 'auto');
ga('create', 'UA-XXXX-Y', { userId: 'USER_ID' });
```

```js
ga('send', 'pageview');
ga('send', 'pageview', { 'dimension15': 'My custom dimension' });
```

[analytics.js](./analytics.js)

<!-- {: .-crosslink} -->
