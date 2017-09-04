---
title: Slim
category: Ruby libraries
layout: 2017/sheet
prism_languages: [jade]
weight: -1
---

### Example

```jade
doctype html
html
  head
    title Slim Examples
    meta[charset='utf-8']
    meta(name="keywords" content="template language")
    meta name="author" content=author
    meta property='og:image' content=asset_url('foo.png')
    meta property='og:image' content=(path_to_user user)
    meta(
      property='description'
      content='this is the song that never ends')
```

### Attributes

```jade
meta[charset='utf-8']
meta(name="keywords" content="template language")
meta name="author" content=author
```

You can use parentheses, brackets, or none at all.

### Ruby attributes

```jade
a class=[:menu,:highlight]
```

You can use Ruby expressions in attributes.

### Hash attributes

```jade
.card *{'data-url' => place_path(place)}
```

You can destructure Ruby hashes as attributes.

### Inline Ruby

```jade
ruby:
  def foobar
    "hello"
  end

div= foobar
```

### Embedded JavaScript

```jade
javascript:
  alert('Slim supports embedded javascript!')
```

### Comments

```jade
/ Comment
/! HTML comment
```

### Ruby

```jade
== yield
= t('.hello')
- 3.times do |i|
  div
```

### Verbatim text

```jade
div
  | This is text
    it is nice
```

### Inline HTML

```jade
<div class='foo'>
  - if articles.empty?
    | Nothing here
</div>
```

### Inline tags

```jade
ul
  li: a(href='/') Home
```

### References

- <http://slim-lang.com/>
