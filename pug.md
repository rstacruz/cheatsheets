---
title: Pug
subtitle: HTML template engine
category: JavaScript libraries
prism_languages: [jade]
updated: 2017-10-30
weight: -3
---

## Pug

<!-- {: .-three-column} -->

### Basic document

<!-- {: .-prime} -->

```jade
doctype html
html(lang='en')
  h1.class#id(name='hi')
    | This is some text, hello there,
    = name

  - javascript()
```

### Elements

#### Plain element

```jade
div
  | Just a div
```

#### Class

```jade
.search
  | A div, with class 'search'
```

#### Text

```jade
h1 A heading with text
```

#### Interpolation

```jade
h1= page.title
```

#### Shorthand

```jade
div.class
div.class1.class2
h1.header
```

### Attributes

#### Static

```jade
input(type='text' name='q' autofocus)
```

#### Dynamic

```jade
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')
```

See: [Attributes](https://pugjs.org/language/attributes.html)

### Comments

#### HTML comment

```jade
// This comment will appear in the HTML
```

#### Silent comment

```jade
//- This is a silent comment
```

#### Comment block

```jade
//-
  Nesting inside a comment creates
  a comment block
```

See: [Comments](https://pugjs.org/language/attributes.html)

### Iteration

```jade
ul
  each user in users
    li= user
```

### Layouts

#### Page

```jade
//- page.pug
extends layout.pug

block title
  | hello

block content
  | hello
```

#### Layout

```jade
//- layout.pug
title
  block title
body
  block content
```

### Includes (partials)

#### Include

```jade
include ./includes/head.pug
```

#### Filter

```jade
include:markdown article.md
```

See: [Includes](https://pugjs.org/language/includes.html)

### Multiline text

#### Text

```jade
p.
  This is text that doesn't need to
  be prefixed by pipes.
```

<!-- {: data-line="1"} -->

#### Script

```jade
script.
  // It's great for raw
  // JavaScript and stuff
  alert('hello')
```

<!-- {: data-line="1"} -->

### Conditionals

```jade
if authenticated
  a(href='/logout') Sign out
else
  a(href='/login') Sign in
```

<!-- {: data-line="1,3"} -->

See: [Conditionals](https://pugjs.org/language/conditionals.html)

## Mixins

<!-- {: .-three-column} -->

### Mixins

#### Define

```jade
mixin list
  ul
    ···
```

<!-- {: data-line="1"} -->

#### Use

```jade
+list
```

Mixins allow you to create reusable code blocks.
See: [Mixins](https://pugjs.org/language/mixins.html)

### Mixin attributes

#### Define

```jade
mixin pet(name)
  span.pet= name
```

<!-- {: data-line="1"} -->

#### Use

```jade
+pet('cat')
```

See: [Mixin attributes](https://pugjs.org/language/mixins.html#mixin-attributes)

### Mixin blocks

#### Define

```jade
mixin article(title)
  article
    h2.title= title
    block
```

<!-- {: data-line="1,4"} -->

#### Use

```jade
+article('hello there')
  p Content goes here
```

See: [Mixin blocks](https://pugjs.org/language/mixins.html#mixin-blocks)
