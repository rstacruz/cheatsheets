---
title: Textile
category: Markup
updated: 2026-11-14
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
h1. Header 1
```

```textile
h2. Header 2
```

```textile
bq. Blockquote
```

```textile
p(classname). Class.
```

```textile
p(#id). ID.
```

See: [Block modifiers](https://textile-lang.com/category/block-modifiers/)

### Lists

```textile
# ordered list
```

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

```textile
Footnotes[1].
```

```textile
fn1. Something.
```

See: [Footnotes](https://textile-lang.com/doc/footnotes)
