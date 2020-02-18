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
  body
    .foo This will be a div with the "foo" css class applied to it
    #bar This will be a div with the "bar" id applies to it
    
    p You can use other html tags like this
    span#baz You can also combine them with other formatting. So, this will be a span with the id "baz"
    
    a href="example.com" You can also add attributes after the the tag, like this
    div[
      data-example=true
    ] You can also put the attributes in brackets and even break them onto multiple lines, if you prefer.
    div(data-exampe=true) This also works
    div{data-exampe=true} And so does this
      
    p> This line will have a trailing whitespace at the end
    p> This line will have a leading whitespace at the beginning
    
    .verbatim-text
      | This line will be copied verbatim
      ' This line will be copied verbatim, with a trailing whitespace
      
    / This is a comment and will not be rendered in the output
    /! This will insert an HTML comment
    /[if IE]
      .internet-explorer This will insert an IE conditional comment
    
    .eg You can also use ruby interpolation to insert #{anything_you_want} into a line
      | Unescaped #{{content}} is also possible.
    a href="http://#{url}" You can use interpolation in the attributes, too
      
    = this_will_insert_the_resulting_ruby_code_as_a_string
    
    - if condition
      .eg This will only be rendered if "condition" is true
    - else
      .eg And this will only be rendered if "condition" is false
      
    <div>If you need to, you can render html just like normal, too!</div>
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

### Inline Markdown

```jade
markdown:
  ### On Markdown

  I am *Markdown* _text_!
  {: .classname}
```

Slim can handle your [Markdown](https://daringfireball.net/projects/markdown/syntax) content for longer content blocks or `code`.
Depending on your parser, like [Kramdown](https://kramdown.gettalong.org/quickref.html), other features might work, like assigning attributes or classes.

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
