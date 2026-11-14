---
title: Google Webfonts
category: Hidden
# Documents the retired v1 CSS API; Google now serves fonts from `/css2`.
tags: [Archived]
archived: |
  This sheet documents the retired Google Fonts v1 CSS API. Start from
  [Google Fonts](https://fonts.google.com/) and load families from the v2 API
  with `<link>` or `@import`.
intro: |
  Short snippets on using [Google Fonts](https://fonts.google.com/) in a web page.
links:
  - title: Google Fonts
    url: https://fonts.google.com/
---

### Link tag

<!-- prettier-ignore -->
```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
```

### CSS import

<!-- prettier-ignore -->
```css
/* One font */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

/* Combining multiple fonts */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400italic|Montserrat:400,700');
```

Great for using with [Codepen.io](https://codepen.io/) or similar websites!
