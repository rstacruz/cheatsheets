---
title: Haml
category: Markup
layout: 2017/sheet
prism_languages: [haml]
---

### Doctype

```haml
!!! 5
```

### Tags

```haml
%html
  %head
    %title
  %body
    %h1 Hello World
    %br/
```

### Classes and ID's

```haml
%p.class-example
.no-tag-defaults-to-div
%div#butItCanBeIncluded
```

### Inline Attributes

Either hash syntax works

```haml
%meta{ name: "viewport", content: "width=device-width, initial-scale=1.0" }
%input{ :type => "text", :required => true }
```

### Ruby

```haml
-# This is a comment
-# Anything starting with a hyphen signals to Haml that Ruby is coming
- @arr = [1, 2, 3]
- @str = "test"
-# Equal signals output
= render partial: "shared/header"
= yield
= link_to page_url
```
