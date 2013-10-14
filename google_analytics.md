---
title: Google Analytics
layout: default
---

### Track events

    // [..., category, action, label, value (int), noninteraction (bool)]
    _gaq.push(['_trackEvent', 'Videos', 'Play', 'Birthday video', true])
    _gaq.push(['_trackEvent', 'Projects', 'Donate', 'Project name'])
    _gaq.push(['_trackEvent', 'Accounts', 'Login'])

### Variables

    // [..., index, name, value, scope (optional)]
    _gaq.push(['_setCustomVar', 1, 'Logged in', 'Yes', 2]);

    // Scope = 1 (visitor), 2 (session), 3 (page, default)

https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingCustomVariables
https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
