---
title: Analytics
---

### Mixpanel

Identify:

    mixpanel.identify('284');
    mixpanel.people.set({ $email: 'hi@gmail.com' });
    mixpanel.register({ age: 28, gender: 'male' }); /* set common properties */

Events:

    mixpanel.track('Login success');
    mixpanel.track('Search', { query: 'cheese' });

References:

 * https://mixpanel.com/help/reference/javascript

### analytics.js

    ga('create', 'UA-XXXX-Y', 'auto');
    ga('create', 'UA-XXXX-Y', { userId: 'USER_ID' });
  
    ga('send', 'pageview');
    ga('send', 'pageview', { 'dimension15': 'My custom dimension' });

Events:

    ga('send', 'event', 'button',  'click', {color: 'red'});
    ga('send', 'event', 'button',  'click', 'nav buttons',  4);
    /*                  ^category  ^action  ^label          ^value */

Exceptions:

    ga('send', 'exception', {
      exDescription: 'DatabaseError',
      exFatal: false,
      appName: 'myapp',
      appVersion: '0.1.2'
    })
