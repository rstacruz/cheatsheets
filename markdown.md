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

One to six `#`s, then a space or end of line; seven or more stay literal.

```markdown
## Heading 2 ##
```

Closing `#`s need a space before them.

See: [ATX headings](https://spec.commonmark.org/0.31.2/#atx-headings)

### Setext headings

```markdown
Heading 1
=========

Heading 2
---------
```

Either underline can be any length. It must sit directly under the text; with a blank line between, `---` becomes a thematic break.

See: [Setext headings](https://spec.commonmark.org/0.31.2/#setext-headings)

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

Strikethrough is a GFM extension; one or two tildes, three or more stay literal.

See: [Emphasis](https://spec.commonmark.org/0.31.2/#emphasis-and-strong-emphasis), [Strikethrough](https://github.github.com/gfm/#strikethrough-extension-)

### Escaping

```markdown
\*not italic\*
\`not code\`
\# not a heading
```

A backslash escapes any ASCII punctuation; before anything else it stays literal.

See: [Backslash escapes](https://spec.commonmark.org/0.31.2/#backslash-escapes)

### Hard line breaks

```markdown
First line  
Second line

Next line\
also breaks
```
{: data-line="1"}

Line 1 ends in two spaces. Two or more spaces or a trailing backslash insert a `<br>`; a blank line starts a new paragraph.

See: [Hard line breaks](https://spec.commonmark.org/0.31.2/#hard-line-breaks)

## Lists
{: .-three-column}

### Bullet lists

```markdown
- Item
- Item
  - Nested item
```

`-`, `*`, and `+` all work; changing the marker starts a new list. Nested items align to the parent's content column, and blank lines between items make the list loose (each item wrapped in `<p>`).

See: [List items](https://spec.commonmark.org/0.31.2/#list-items)

### Ordered lists

```markdown
1. First
2. Second
```

```markdown
3. Starts at three
4. Next
```

The first number sets `start`; later numbers are ignored. `1)` also works; one to nine digits, and changing the delimiter starts a new list.

See: [Lists](https://spec.commonmark.org/0.31.2/#lists)

### Task lists

```markdown
- [ ] Open
- [x] Done
  - [X] Nested done
```

A GFM extension; the marker must start the item's first paragraph.

See: [Task list items](https://github.github.com/gfm/#task-list-items-extension-)

## Links

### Inline links

```markdown
[text](https://example.com)
[text](https://example.com "Title")
[text](</my file.md>)
```

Angle brackets allow spaces in the destination.

See: [Links](https://spec.commonmark.org/0.31.2/#links)

### Reference links

```markdown
[CommonMark][cm]
[CommonMark][]
[CommonMark]

[cm]: https://spec.commonmark.org/0.31.2/
[CommonMark]: https://commonmark.org/
```

Definitions may appear anywhere and are not rendered. `[]` reuses the label; no brackets is the shortcut form.

See: [Link reference definitions](https://spec.commonmark.org/0.31.2/#link-reference-definitions)

### Autolinks

```markdown
<https://example.com>
<me@example.com>

https://example.com
www.example.com
me@example.com
```

Angle forms are CommonMark; bare URLs, `www.` hosts and emails are the GFM extension. Trailing punctuation stays outside the link.

See: [Autolinks](https://spec.commonmark.org/0.31.2/#autolinks), [GFM autolinks](https://github.github.com/gfm/#autolinks-extension-)

### Footnotes

```markdown
Here is a note.[^1]

[^1]: Footnote text.
```

A GitHub extension, absent from GFM 0.29 but rendered by GitHub and devhints. Notes appear at the bottom regardless of source position.

See: [Footnotes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes)

## Images
{: .-three-column}

### Inline images

```markdown
![Alt text](/img/logo.png)
![Alt text](/img/logo.png "Logo")
```

See: [Images](https://spec.commonmark.org/0.31.2/#images)

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

Angle brackets are optional; use them when the URI has spaces or unbalanced parentheses.

## Code
{: .-three-column}

### Inline code

```markdown
`code`
`` `code` ``
```

A code span ends with a backtick run of the same length; one space inside each end is stripped.

See: [Code spans](https://spec.commonmark.org/0.31.2/#code-spans)

### Fenced code

`````markdown
````markdown
```js
const x = 1
```
````
`````

The info string's first word is the language, and a backtick info string cannot hold backticks; use tildes there. The closing fence matches the opening character and at least its length.

See: [Fenced code blocks](https://spec.commonmark.org/0.31.2/#fenced-code-blocks)

### Indented code

```markdown
    four spaces
    make a code block
```

Four spaces indent a code block in CommonMark.

See: [Indented code blocks](https://spec.commonmark.org/0.31.2/#indented-code-blocks)

## Blocks
{: .-three-column}

### Blockquotes

```markdown
> A quote
> continues here.
>
> > Nested quote
```

`>` may be omitted on lazy paragraph continuation lines. A `>` on the blank line keeps one quote; without it they become two.

See: [Block quotes](https://spec.commonmark.org/0.31.2/#block-quotes)

### Horizontal rules

```markdown
---
***
___
```

Three or more matching `-`, `*`, or `_`, optionally spaced. Directly under text, `---` is a Setext H2 instead.

See: [Thematic breaks](https://spec.commonmark.org/0.31.2/#thematic-breaks)

### HTML

```markdown
Press <kbd>Ctrl</kbd>+<kbd>C</kbd>.
```

```html
<div class="note">
  <p>Raw HTML block.</p>
</div>
```

Inline tags pass through. A `<div>` block runs to a blank line and its contents are not parsed as Markdown. GitHub filters `<script>`, `<style>` and similar tags.

See: [Raw HTML](https://spec.commonmark.org/0.31.2/#raw-html), [HTML blocks](https://spec.commonmark.org/0.31.2/#html-blocks)

## Tables

### Basic table

```markdown
| Name  | Value |
| ----- | ----- |
| Alpha | 1     |
| Beta  | 2     |
```

A header and delimiter row are required, with matching cell counts. Cells hold inline content only; escape a literal pipe as `\|`.

See: [Tables](https://github.github.com/gfm/#tables-extension-)

### Alignment

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| a    | b      | c     |
```

