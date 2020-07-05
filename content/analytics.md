---
title: Analytics libraries
layout: 2017/sheet
category: Analytics
---

### Mixpanel

```js
mixpanel.identify('284');
mixpanel.people.set({ $email: 'hi@gmail.com' });
mixpanel.register({ age: 28, gender: 'male' }); /* set common properties */
```

[mixpanel](./mixpanel)
{: .-crosslink}

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
{: .-crosslink}
