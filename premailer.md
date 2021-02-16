---
title: Premailer
layout: 2017/sheet
tags: [WIP]
intro: |
  [Premailer](https://github.com/premailer/premailer/) is a Ruby library that inlines CSS into HTML.
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
