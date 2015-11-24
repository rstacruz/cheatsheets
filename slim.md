---
title: Slim
category: Ruby libraries
---

```slim
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

### Ruby attributes

```slim
a class=[:menu,:highlight]
.card *{'data-url' => place_path(place)}
```

### Inline ruby

```slim
ruby:
  def foobar
    "hello"
  end

div= foobar
```

### Embedded js

```slim
javascript:
  alert('Slim supports embedded javascript!')
```

### Comments

```slim
/ Comment
/! HTML comment
```

### Ruby

```slim
== yield
= t('.hello')
- 3.times do |i|
  div
```

### Verbatim text

```slim
div
  | This is text
    it is nice
```

### Inline HTML

```slim
<div class='foo'>
  - if articles.empty?
    | Nothing here
</div>
```

### Inline tags

```slim
ul
  li: a(href='/') Home
```

<http://slim-lang.com/>
