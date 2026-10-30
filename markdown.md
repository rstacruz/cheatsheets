---
title: Markdown
category: Markup
tier: t2
weight: -1
updated: 2026-10-31
keywords:
  - markdown syntax
  - commonmark
  - gfm
  - markdown tables
  - markdown links
intro: |
  [Markdown](https://commonmark.org/) is a plain-text format for structured documents. This reference covers CommonMark and GFM syntax, from headings to tables and footnotes.
---

## Getting started

### About
{: .-intro}

[Markdown](https://commonmark.org/) is a plain-text format for structured documents. This reference covers CommonMark and GFM syntax, from headings to tables and footnotes.

- [CommonMark specification](https://spec.commonmark.org/0.31.2/) _(spec.commonmark.org)_
- [GitHub Flavored Markdown specification](https://github.github.com/gfm/) _(github.github.com)_
- [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) _(docs.github.com)_

### Basic example

```markdown
# Title

A paragraph with **bold**, *italic*, and `code`.

- First item
- Second item

[Link](https://commonmark.org)
```
{: data-line="3"}

## Headings

### ATX headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

One to six `#` characters, then a space or end of line. More than six is literal.

```markdown
## Heading 2 ##
```

Closing `#`s are optional, but need a space before them.

### Setext headings

```markdown
Heading 1
=========

Heading 2
---------
```

`=` makes a level 1 heading and `-` a level 2. Either underline can be any length.

Setext headings need no blank line after them, but they cannot interrupt a paragraph above.

A blank line between the text and its underline turns `---` into a thematic break.

## Text
{: .-three-column}

### Emphasis and strikethrough

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~strikethrough~~
```

`_` does not emphasize inside words (`foo_bar_baz`); `*` does (`foo*bar*baz`).

Strikethrough is a GFM extension. One or two tildes strike; three or more stay literal.

### Escaping

```markdown
\*not italic\*
\`not code\`
\# not a heading
```

A backslash escapes any ASCII punctuation character. Before anything else it stays literal.

### Hard line breaks

```markdown
First line  
Second line

Next line\
also breaks
```
{: data-line="1"}

Line 1 ends with two spaces. Two or more spaces or a backslash before the line ending insert a `<br>`.

A blank line starts a new paragraph instead.

## Lists
{: .-three-column}

### Bullet lists

```markdown
- Item
- Item
  - Nested item
```

`-`, `*`, and `+` all work; changing the marker starts a new list. Indent nested items to the parent's content column.

A blank line between items makes the list loose and wraps items in `<p>`.

### Ordered lists

```markdown
1. First
2. Second
```

```markdown
3. Starts at three
4. Next
```

A new list's first number sets its `start`; later numbers are ignored.

`1)` also works. Use one to nine digits; changing the delimiter starts a new list.

### Task lists

```markdown
- [ ] Open
- [x] Done
  - [X] Nested done
```

A GFM extension. `[ ]` is open and `[x]`/`[X]` is done; the marker must start the item's first paragraph.

## Links

### Inline links

```markdown
[text](https://example.com)
[text](https://example.com "Title")
[text](</my file.md>)
```

The title is optional and becomes the `title` attribute. Angle brackets allow spaces in the destination.

### Reference links

```markdown
[CommonMark][cm]
[CommonMark][]
[CommonMark]

[cm]: https://spec.commonmark.org/0.31.2/
[CommonMark]: https://commonmark.org/
```

Definitions may appear before or after their links and are not rendered. `[text][]` reuses the text as the label; `[text]` is the shortcut form.

### Autolinks

```markdown
<https://example.com>
<me@example.com>

https://example.com
www.example.com
me@example.com
```

The angle-bracket forms are CommonMark.

Bare URLs, `www.` hosts, and emails are the GFM autolink extension. Trailing punctuation stays outside the link.

### Footnotes

```markdown
Here is a note.[^1]

[^1]: Footnote text.
```

A GitHub extension, absent from GFM 0.29 but rendered by GitHub and devhints. Notes appear at the bottom regardless of source position.

A two-space line break works inside a note.

## Images
{: .-three-column}

### Inline images

```markdown
![Alt text](/img/logo.png)
![Alt text](/img/logo.png "Logo")
```

Alt text becomes the `alt` attribute; the optional title becomes the `title` attribute.

### Reference images

```markdown
![Alt text][logo]

[logo]: /img/logo.png "Logo"
```

### Data URIs

```markdown
![Dot][dot]

[dot]: <data:image/png;base64,...>
```

Angle brackets are optional; use them when the URI has spaces or parentheses. The payload is truncated here.

The reference form keeps long payloads out of the prose.

## Code
{: .-three-column}

### Inline code

```markdown
`code`
`` `code` ``
```

A code span ends with a backtick run of the same length; one space inside each end is stripped.

### Fenced code

`````markdown
````markdown
```js
const x = 1
```
````
`````

The info string's first word is conventionally the language. A backtick fence's info string cannot contain backticks, so use a tilde fence.

When the sample itself contains a fence, make the outer fence longer.

The closing fence needs the same character and at least the opening length.

### Indented code

```markdown
    four spaces
    make a code block
```

Four spaces indent a code block in CommonMark. Devhints sheets must use fenced blocks instead; CI rejects indented code.

## Blocks
{: .-three-column}

### Blockquotes

```markdown
> A quote
> continues here.
>
> > Nested quote
```

`>` may be omitted on lazy paragraph continuation lines.

A blank line separates two quotes; a bare `>` keeps them as one quote with two paragraphs.

### Horizontal rules

```markdown
---
***
___
```

Three or more matching `-`, `*`, or `_`, optionally spaced. A `---` directly under text is a Setext H2 instead.

Leave a blank line above it to get a rule.

### HTML

```markdown
Press <kbd>Ctrl</kbd>+<kbd>C</kbd>.
```

```html
<div class="note">
  <p>Raw HTML block.</p>
</div>
```

Inline tags pass through. A `<div>` block runs to a blank line and its contents are not parsed as Markdown.

GitHub's GFM renderer filters `<script>`, `<style>`, and similar tags.

## Tables

### Basic table

```markdown
| Name  | Value |
| ----- | ----- |
| Alpha | 1     |
| Beta  | 2     |
```

A header row and delimiter row are required; header and delimiter cell counts must match.

Cells hold inline content only; escape a literal pipe as `\|`.

### Alignment

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| a    | b      | c     |
```

Colons in the delimiter row set left, center, or right alignment.

## Devhints sheets

### Frontmatter

```yaml
---
title: Markdown
category: Markup
updated: 2026-10-31
keywords: [markdown, gfm]
intro: >
  Markdown is a plain-text
  format for structured documents.
---
```

`updated` drives the recent list; `keywords` and `intro` feed search and meta descriptions. `intro` renders above the fold.

### Sheet restrictions

| Rule | Detail |
| --- | --- |
| Fenced code only | Indented code fails CI |
| Table headers | A delimiter row is required |
| Line width | 70 chars, 42 in `.-three-column` |
| Alignment | GFM markers ignored; use `.-left-align` |
| Trailing spaces | Only two-space hard breaks |

See [Markdown dialect](/_docs/markdown-dialect) for attribute lists and table extensions.
