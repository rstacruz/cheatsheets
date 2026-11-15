---
title: Date & time formats
weight: -5
updated: 2026-11-11
tier: t2
intro: |
  Date formatting tokens differ by tool: strftime for Ruby and `date`, Moment.js
  tokens for JavaScript libraries that copy them.
links:
  - title: strftime format cheatsheet
    url: "./strftime"
  - title: Moment.js cheatsheet
    url: "./moment#formatting"
  - title: strftime
    url: https://pubs.opengroup.org/onlinepubs/9799919799/functions/strftime.html
---

## Common time formats

<!-- {: .-one-column} -->

{% include common/strftime_format.md title="strftime format" %}

{% include common/moment_format.md title="Moment.js format" %}
