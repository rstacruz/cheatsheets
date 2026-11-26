---
title: Pug
subtitle: HTML template engine
category: JavaScript libraries
intro: |
  Pug is an HTML template engine with indentation-based syntax, mixins, and inheritance. This reference covers the language and API.
links:
  - title: Pug language documentation
    url: https://pugjs.org/language/tags.html
  - title: Pug API getting started
    url: https://pugjs.org/api/getting-started.html
prism_languages: [jade]
updated: 2026-11-26
weight: -3
tier: t3
last_verified_with: "Pug 3.0.4."
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
<!-- {: data-highlight="doctype html; html(lang='en')"} -->

See: [Doctype](https://pugjs.org/language/doctype.html), [Tags](https://pugjs.org/language/tags.html)

### Elements

```jade
div
  | Just a div

.search
  | A div, with class 'search'

h1 A heading with text

h1= page.title

div.class
div.class1.class2
h1.header
```
<!-- {: data-highlight="h1= page.title; div.class1.class2"} -->

See: [Tags](https://pugjs.org/language/tags.html)

### Attributes

```jade
input(type='text' name='q' autofocus)

- var auth = true
body(class=auth ? 'authed' : 'anon')
```
<!-- {: data-highlight="input(type='text' name='q' autofocus)"} -->

See: [Attributes](https://pugjs.org/language/attributes.html)

### Comments

```jade
// This comment will appear in the HTML

//- This is a silent comment

//-
  Nesting inside a comment creates
  a comment block
```
<!-- {: data-highlight="//-"} -->

See: [Comments](https://pugjs.org/language/comments.html)

### Iteration

```jade
ul
  each user in users
    li= user
```
<!-- {: data-highlight="each user in users"} -->

See: [each](https://pugjs.org/language/iteration.html#each)

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
<!-- {: data-highlight="extends layout.pug; block content"} -->

#### Layout

```jade
//- layout.pug
title
  block title
body
  block content
```

See: [Inheritance](https://pugjs.org/language/inheritance.html)

### Includes (partials)

#### Include

```jade
include ./includes/head.pug
```
<!-- {: data-highlight="include ./includes/head.pug"} -->

#### Filtered include

```jade
include:markdown article.md
```
<!-- {: data-highlight="include:markdown"} -->

See: [Includes](https://pugjs.org/language/includes.html)

### Multiline text

#### Text block

```jade
p.
  This is text that doesn't need to
  be prefixed by pipes.
```
<!-- {: data-highlight="p"} -->

#### Script block

```jade
script.
  // It's great for raw
  // JavaScript and stuff
  alert('hello')
```
<!-- {: data-highlight="script"} -->

See: [Block in a tag](https://pugjs.org/language/plain-text.html#block-in-a-tag)

### Conditionals

```jade
if authenticated
  a(href='/logout') Sign out
else
  a(href='/login') Sign in
```

<!-- {: data-highlight="authenticated"} -->

See: [Conditionals](https://pugjs.org/language/conditionals.html)

## Mixins

<!-- {: .-three-column} -->

### Mixins

#### Definition

```jade
mixin list
  ul
    ···
```
<!-- {: data-highlight="mixin list"} -->

#### Call

```jade
+list
```
<!-- {: data-highlight="+list"} -->

Mixins create reusable code blocks.

See: [Mixins](https://pugjs.org/language/mixins.html)

### Mixin attributes

#### Definition

```jade
mixin pet(name)
  span.pet= name
```
<!-- {: data-highlight="name"} -->

#### Call

```jade
+pet('cat')
```
<!-- {: data-highlight="+pet('cat')"} -->

See: [Mixin attributes](https://pugjs.org/language/mixins.html#mixin-attributes)

### Mixin blocks

#### Definition

```jade
mixin article(title)
  article
    h2.title= title
    block
```
<!-- {: data-highlight="block"} -->

#### Call

```jade
+article('hello there')
  p Content goes here
```
<!-- {: data-highlight="+article('hello there')"} -->

See: [Mixin blocks](https://pugjs.org/language/mixins.html#mixin-blocks)
