---
title: Haml
subtitle: Indentation-based HTML templating
logo: { src: /assets/logos/haml.svg }
category: Markup
prism_languages: [haml]
last_verified_with: "Haml 7.5.2."
created_at: 2018-12-07
updated: 2026-11-24
tier: t3
intro: |
  Haml templates: indentation-based markup, attributes, Ruby code, and filters.
links:
  - title: Haml reference
    url: https://haml.info/docs/yardoc/file.REFERENCE.html
  - title: Haml website
    url: https://haml.info/
  - title: Haml on GitHub
    url: https://github.com/haml/haml
---

## Markup

<!-- {: .-three-column} -->

### Doctype

```haml
!!!
```

Emits `<!DOCTYPE html>`; `!!! XML` adds an XML prolog first.

See: [Doctype](https://haml.info/docs/yardoc/file.REFERENCE.html#doctype-)

### Tags

```haml
%html
  %head
    %title My page
  %body
    %h1 Hello World
    %br
```

Indent two spaces per level and keep it consistent; void elements like `%br` need no trailing slash.

See: [HTML elements](https://haml.info/docs/yardoc/file.REFERENCE.html#html-elements)

### Classes and IDs

```haml
%p.note
%div#hero
%h1.title.big#hero Hello
.note Defaults to a div
```

`.` adds a class and `#` sets an id; a line with no tag name renders a `div`.

See: [Class and ID attributes](https://haml.info/docs/yardoc/file.REFERENCE.html#class-and-id-attributes)

## Attributes

### Inline attributes

#### Ruby hash

```haml
%meta{
  name: "viewport",
  content: "width=device-width, initial-scale=1" }
```

#### HTML style

```haml
%a(href="/about" title="About") About
```

Both forms are current: the hash evaluates Ruby, parentheses stay close to HTML.

See: [Attributes](https://haml.info/docs/yardoc/file.REFERENCE.html#attributes)

### Boolean attributes

```haml
%input{ type: "checkbox", checked: true }
%input{ type: "checkbox", checked: false }
%input(type="checkbox" checked)
```

`true` renders the bare attribute and `false` leaves it out.

See: [Boolean attributes](https://haml.info/docs/yardoc/file.REFERENCE.html#boolean-attributes)

### Data attributes

```haml
%a{ href: "/posts", data: { author_id: 123 } } Posts
```

Hashes under `data` and `aria` expand to hyphenated attributes, so this renders `data-author-id="123"`.

See: [Data attributes](https://haml.info/docs/yardoc/file.REFERENCE.html#data-attributes)

## Ruby

<!-- {: .-three-column} -->

### Comments

```haml
-# Silent comment
/ Visible comment
```

`-#` drops the line; `/` emits an HTML comment.

See: [Comments](https://haml.info/docs/yardoc/file.REFERENCE.html#comments)

### Code and output

```haml
- @items = Item.all
- if @items.any?
  = render @items
- else
  %p No items yet
```

`-` runs Ruby and outputs nothing; `=` also inserts the result.

See: [Ruby evaluation](https://haml.info/docs/yardoc/file.REFERENCE.html#ruby-evaluation)

### Interpolation and escaping

```haml
%p= @user.name
%p Hello #{@user.name}
%p&= @user.bio
%p!= @user.raw_html
```

`&=` always escapes and `!=` never does; plain `=` follows the `:escape_html` option.

See: [Ruby interpolation](https://haml.info/docs/yardoc/file.REFERENCE.html#ruby-interpolation-)

### Filters

```haml
:javascript
  console.log("hi")
```

`:javascript` and `:css` wrap the block in a tag; `:plain` and `:escaped` leave it as text.

See: [Filters](https://haml.info/docs/yardoc/file.REFERENCE.html#filters)
