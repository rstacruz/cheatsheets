---
title: Jade
---

```
doctype html
// comment (html)
-// silent comment

html(lang='en')
  - javascript()
  h1.class#id(name='hi')
    | Text. Hello there,
    = name

  if condition
    p. hello

  p.
    multiline text
    goes here
```

### Iteration

```jade
ul
  each user in users
    li= user
```

### Layouts

```jade
extends layout.jade

block title
  | hello

block content
  | hello
```

```jade
-// layout.jade
title
  block title
body
  block content
```

### Includes (partials)

```jade
include ./includes/head.jade
include:markdown article.md
```

### Mixins

```jade
mixin list
  ul ..

+list
```

```jade
mixin pet(name)
  span.pet= name

+pet('cat')
```

```jade
mixin article(title)
  article
    h2.title= title
    block

+article('hello there')
  p Content goes here
```
