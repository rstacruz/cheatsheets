---
title: Slim
subtitle: Ruby template engine
category: Ruby libraries
prism_languages: [jade]
weight: -1
tier: t3
last_verified_with: "Slim 5.2.2."
updated: 2026-11-26
intro: |
  Slim is a lightweight Ruby template engine with indentation-based syntax.
links:
  - title: Slim README
    url: https://github.com/slim-template/slim
---

## Markup

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

See: [Syntax example](https://github.com/slim-template/slim/blob/v5.2.2/README.md#syntax-example)

### Attributes

```jade
meta[charset='utf-8']
meta(name="keywords" content="template language")
meta name="author" content=author
```

You can use parentheses, brackets, or none at all.

See: [Attributes](https://github.com/slim-template/slim/blob/v5.2.2/README.md#attributes)

### Ruby attributes

```jade
a class=[:menu,:highlight]
```

You can use Ruby expressions in attributes.

See: [Ruby attributes](https://github.com/slim-template/slim/blob/v5.2.2/README.md#ruby-attributes)

### Hash attributes

```jade
.card *{'data-url' => place_path(place)}
```

You can destructure Ruby hashes as attributes.

See: [Splat attributes](https://github.com/slim-template/slim/blob/v5.2.2/README.md#splat-attributes-)

## Ruby and embedded engines

### Inline Ruby

```jade
ruby:
  def foobar
    "hello"
  end

div= foobar
```

See: [Embedded engines](https://github.com/slim-template/slim/blob/v5.2.2/README.md#embedded-engines-markdown-)

### Inline Markdown

```jade
markdown:
  ### On Markdown

  I am *Markdown* _text_!
  {: .classname}
```

Slim can handle your [Markdown](https://daringfireball.net/projects/markdown/syntax) content for longer content blocks or `code`.
Depending on your parser, like [Kramdown](https://kramdown.gettalong.org/quickref.html), other features might work, like assigning attributes or classes.

See: [Embedded engines](https://github.com/slim-template/slim/blob/v5.2.2/README.md#embedded-engines-markdown-)

### Embedded JavaScript

```jade
javascript:
  alert('Slim supports embedded javascript!')
```

See: [Embedded engines](https://github.com/slim-template/slim/blob/v5.2.2/README.md#embedded-engines-markdown-)

### Comments

```jade
/ Comment
/! HTML comment
```

See: [Code comments](https://github.com/slim-template/slim/blob/v5.2.2/README.md#code-comment-), [HTML comments](https://github.com/slim-template/slim/blob/v5.2.2/README.md#html-comment-)

### Ruby

```jade
== yield
= t('.hello')
- 3.times do |i|
  div
```

See: [Control code](https://github.com/slim-template/slim/blob/v5.2.2/README.md#control-code--), [Output](https://github.com/slim-template/slim/blob/v5.2.2/README.md#output-), [Output without HTML escaping](https://github.com/slim-template/slim/blob/v5.2.2/README.md#output-without-html-escaping-)

## Whitespace and HTML

### Verbatim text

```jade
div
  | This is text
    it is nice
```

See: [Verbatim text](https://github.com/slim-template/slim/blob/v5.2.2/README.md#verbatim-text-)

### Advanced whitespaces

```jade
div
  ' This appends a whitespace
div
  |  This hackily prepends a whitespace
div
  => 'This appends a whitespace'
div
  =< 'This prepends a whitespace'
```

See: [Trailing and leading whitespace](https://github.com/slim-template/slim/blob/v5.2.2/README.md#trailing-and-leading-whitespace--), [Output modifiers](https://github.com/slim-template/slim/blob/v5.2.2/README.md#output-)

### Inline HTML

```jade
<div class='foo'>
  - if articles.empty?
    | Nothing here
</div>
```

See: [Inline HTML](https://github.com/slim-template/slim/blob/v5.2.2/README.md#inline-html-)

### Inline tags

```jade
ul
  li: a(href='/') Home
```

See: [Inline tags](https://github.com/slim-template/slim/blob/v5.2.2/README.md#inline-tags)

### References

- [Slim repository](https://github.com/slim-template/slim)

See: [Slim documentation](https://github.com/slim-template/slim)
