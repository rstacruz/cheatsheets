---
title: Premailer
category: Ruby libraries
subtitle: CSS inliner for email
tags: [WIP]
intro: |
  [Premailer](https://github.com/premailer/premailer/) is a Ruby library that inlines CSS into HTML.
links:
  - title: Premailer
    url: https://github.com/premailer/premailer/
tier: t3
last_verified_with: "Premailer 1.33.0."
updated: 2026-11-25
---

### Custom CSS properties

<!-- prettier-ignore -->
```css
table, th, td {
  /* Available on table, th and td elements */
  -premailer-width: 32px;
}

table, tr, th, td {
  /* Available on table, tr, th and td elements */
  -premailer-height: 32px;
}

table {
  /* Available on table elements */
  -premailer-cellpadding: 32px;
  -premailer-cellspacing: 32px;
}
```
<!-- {: data-highlight="-premailer-width; -premailer-height; -premailer-cellpadding; -premailer-cellspacing"} -->

See: [Premailer repository](https://github.com/premailer/premailer)
