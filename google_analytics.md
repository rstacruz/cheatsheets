---
title: Google Analytics
tags: [Archived]
archived: This sheet describes an older version of Google Analytics (UA).
---

### Pageview

    // Analytics.js
    ga('create', 'UA-XXXX-Y', 'auto');
    ga('send', 'pageview');

### Track events

    // ga.js
    // [..., category, action, label, value (int), noninteraction (bool)]
    _gaq.push(['_trackEvent', 'Videos', 'Play', 'Birthday video', true])
    _gaq.push(['_trackEvent', 'Projects', 'Donate', 'Project name'])
    _gaq.push(['_trackEvent', 'Accounts', 'Login'])

    // Analytics.js
    //       ,        ,  category,  action,  label,         value (int)
    ga('send', 'event', 'button',   'click', 'nav buttons', 4);

### Variables

    // [..., index, name, value, scope (optional)]
    _gaq.push(['_setCustomVar', 1, 'Logged in', 'Yes', 2]);

    // Scope = 1 (visitor), 2 (session), 3 (page, default)

### References

- <https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingCustomVariables>
- <https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide>
