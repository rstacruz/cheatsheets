---
title: Pug
category: JavaScript libraries
layout: 2017/sheet
prism_languages: [jade]
updated: 2017-08-30
weight: -3
---

## Pug
{: .-three-column}

### Basic document

```jade
doctype html
html(lang='en')
  h1.class#id(name='hi')
    | This is some text, hello there,
    = name

  if showControls
    button.red Edit this page

  - javascript()
```

### Comments

```jade
// This comment will appear in the HTML
```

```jade
-// This is a silent comment
```

### Iteration

```jade
ul
  each user in users
    li= user
```

### Layouts

```jade
-// page.pug
extends layout.pug

block title
  | hello

block content
  | hello
```

```jade
-// layout.pug
title
  block title
body
  block content
```

### Includes (partials)

```jade
include ./includes/head.pug
```

```jade
include:markdown article.md
```

### Multiline text

```jade
p.
  This is text that doesn't need to
  be prefixed by pipes.
```
{: data-line="1"}

```jade
script.
  // It's great for raw
  // JavaScript and stuff
  alert('hello')
```
{: data-line="1"}

## Mixins
{: .-three-column}

### Mixins

```jade
mixin list
  ul
    ···
```
{: data-line="1"}

```jade
+list
```

### Mixin with arguments

```jade
mixin pet(name)
  span.pet= name
```
{: data-line="1"}

```jade
+pet('cat')
```

### Mixin with content

```jade
mixin article(title)
  article
    h2.title= title
    block
```
{: data-line="1,4"}

```jade
+article('hello there')
  p Content goes here
```
