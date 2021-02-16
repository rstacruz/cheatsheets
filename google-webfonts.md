---
title: Google Webfonts
layout: 2017/sheet
intro: |
  Short snippets on using [Google Webfonts](https://google.com/fonts) in a web page.
---

### Link tag

<!-- prettier-ignore -->
```html
<link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
```

### CSS import

<!-- prettier-ignore -->
```css
/* One font */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

/* Combining multiple fonts */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400italic|Montserrat:400,700'');
```

Great for using with [Codepen.io](https://codepen.io/) or similar websites!
