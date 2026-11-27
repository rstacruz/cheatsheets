---
title: Textile
subtitle: Lightweight markup language
logo: { set: icon-park-outline, name: format }
category: Markup
intro: |
  Textile is a lightweight markup language for formatting web text.
links:
  - title: Textile documentation
    url: https://textile-lang.com/
  - title: Phrase modifiers
    url: https://textile-lang.com/category/phrase-modifiers/
  - title: Links
    url: https://textile-lang.com/doc/links
tier: t3
last_verified_with: "Textile 4.1.6."
updated: 2026-11-26
weight: -1
---

## Reference

<!-- {: .-three-column} -->

### Inlines

| Code | Description |
| --- | --- |
| `_em_` | Emphasis |
| `*strong*` | Strong |
| `**bold**` | Bold |
| `__italics__` | Italics |
| `@code@` | Code |
| `??citation??` | Citation |
| --- | --- |
| `-strikethrough-` | Deleted |
| `+insertion+` | Inserted |
| --- | --- |
| `%span%` | HTML tag |
| `%{color:red}formatting%` | CSS styles |

See: [Phrase modifiers](https://textile-lang.com/category/phrase-modifiers/)

### Blocks

```textile
# first-level heading
h1. Header 1
```

```textile
# second-level heading
h2. Header 2
```

```textile
# blockquote
bq. Blockquote
```

```textile
# CSS class
p(classname). Class.
```

```textile
# element id
p(#id). ID.
```

See: [Block modifiers](https://textile-lang.com/category/block-modifiers/)

### Lists

#### Ordered

```textile
# ordered list
```

#### Unordered

```textile
* unordered list
```

See: [Ordered lists](https://textile-lang.com/doc/numbered-ordered-lists),
[Bulleted lists](https://textile-lang.com/doc/bulleted-unordered-lists)

### Links

| Code | Description |
| --- | --- |
| `"Hypertext":index.html` | Link |
| --- | --- |
| `"Text link":link` <br> `[link]http://link.com` | Link via reference |

See: [Links](https://textile-lang.com/doc/links)

### Images

| Code | Description |
| --- | --- |
| `!image.jpg!` | Image |
| `!image.jpg(title text)!` | Alt text |
| `!image.jpg!:link.html` | Linked image |
| `!>right.jpg!` | Right-aligned image |

See: [Images](https://textile-lang.com/doc/images)

### Escaped HTML

```html
<pre>
I am <b>very serious.</b> -- this
will get escaped.
</pre>
```

See: [HTML](https://textile-lang.com/doc/html)

### Line breaks

```textile
Line breaks.
Just break the lines.
```

See: [Paragraphs](https://textile-lang.com/doc/paragraphs)

### Entities

```textile
one(tm), two(R), three(C).
```

See: [Special characters](https://textile-lang.com/doc/special-characters)

### Horizontal line

```textile
---
```

<!-- see: none: no dedicated upstream page for horizontal rules -->

### Footnotes

#### Reference

```textile
Footnotes[1].
```

#### Definition

```textile
fn1. Something.
```

See: [Footnotes](https://textile-lang.com/doc/footnotes)
