---
title: Haml
subtitle: Indentation-based HTML templating
category: Markup
prism_languages: [haml]
last_verified_with: "Haml 7.5.2."
updated: 2026-11-24
---

## Markup

### Doctype

```haml
!!!
```

Emits `<!DOCTYPE html>`; `!!! XML` adds an XML prolog first.

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

### Classes and IDs

```haml
%p.note
%div#hero
%h1.title.big#hero Hello
.note Defaults to a div
```

`.` adds a class and `#` sets an id; a line with no tag name renders a `div`.

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

### Boolean attributes

```haml
%input{ type: "checkbox", checked: true }
%input{ type: "checkbox", checked: false }
%input(type="checkbox" checked)
```

`true` renders the bare attribute and `false` leaves it out.

### Data attributes

```haml
%a{ href: "/posts", data: { author_id: 123 } } Posts
```

Hashes under `data` and `aria` expand to hyphenated attributes, so this renders `data-author-id="123"`.

## Ruby

### Comments

```haml
-# Silent comment
/ Visible comment
```

`-#` drops the line; `/` emits an HTML comment.

### Code and output

```haml
- @items = Item.all
- if @items.any?
  = render @items
- else
  %p No items yet
```

`-` runs Ruby and outputs nothing; `=` also inserts the result.

### Interpolation and escaping

```haml
%p= @user.name
%p Hello #{@user.name}
%p&= @user.bio
%p!= @user.raw_html
```

`&=` always escapes and `!=` never does; plain `=` follows the `:escape_html` option.

### Filters

```haml
:javascript
  console.log("hi")
```

`:javascript` and `:css` wrap the block in a tag; `:plain` and `:escaped` leave it as text.
