---
title: Markdown
seo_title: Markdown cheatsheet — syntax, tables, links
description: "Markdown syntax: headings, lists, tables, links, code and HTML. CommonMark and GFM reference."
subtitle: Plain-text markup format
category: Markup
tier: t2
last_verified_with: "CommonMark 0.31.2, GFM 0.29-gfm."
fragments:
  - "# Heading"
  - "**bold**"
  - "*italic*"
  - "~~strike~~"
  - "`code`"
  - "[text](url)"
  - "![alt](img)"
  - "> A quote"
  - "- First item"
  - "- [ ] Open"
  - "---"
  - "| a | b |"
  - "1. item"
  - "[^1]"
weight: -1
updated: 2026-11-22
keywords:
  - markdown syntax
  - commonmark
  - gfm
  - markdown tables
  - markdown links
intro: |
  [Markdown](https://commonmark.org/) is a plain-text format for structured documents. This reference covers CommonMark and GFM syntax, from headings to tables and footnotes.
links:
  - title: CommonMark specification
    url: https://spec.commonmark.org/0.31.2/
  - title: GitHub Flavored Markdown specification
    url: https://github.github.com/gfm/
---

## Getting started
<!-- {: .-three-column} -->

### Basic example

```markdown
# Title

A paragraph with **bold**, *italic*, and
`code`.

- First item
- Second item

[Link](https://commonmark.org)
```

<!-- {: data-line="3"} -->

See: [Markdown reference](https://commonmark.org/help/)

### Paragraphs

```markdown
First paragraph.

Second paragraph,
still one paragraph.
```

Blank lines separate paragraphs; a single newline stays inside the paragraph.

See: [Paragraphs](https://spec.commonmark.org/0.31.2/#paragraphs)

## Headings
<!-- {: .-three-column} -->

### ATX headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

####### Seven hashes
```
<!-- {: data-highlight="#"} -->

One to six `#`s, then a space or end of line; seven or more stay literal.

See: [ATX headings](https://spec.commonmark.org/0.31.2/#atx-headings)

### Closing hashes

```markdown
## Heading 2 ##
## Heading 2 #######
```

Closing `#`s may be any length when preceded by a space.

See: [ATX headings](https://spec.commonmark.org/0.31.2/#atx-headings)

### Setext headings

```markdown
Heading 1
=========

Heading 2
---------
```
<!-- {: data-highlight="=========; ---------"} -->

Either underline can be any length. It must sit directly under the text; with a blank line between, `---` becomes a thematic break.

See: [Setext headings](https://spec.commonmark.org/0.31.2/#setext-headings)

## Text

<!-- {: .-three-column} -->

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

<!-- {: data-line="1"} -->

Line 1 ends in two spaces. Two or more spaces or a trailing backslash insert a `<br>`; a blank line starts a new paragraph.

See: [Hard line breaks](https://spec.commonmark.org/0.31.2/#hard-line-breaks)

## Lists

<!-- {: .-three-column} -->

### Bullet lists

```markdown
- Item
- Item
  - Nested item
```
<!-- {: data-highlight="- Item"} -->

`-`, `*`, and `+` all work; changing the marker starts a new list. Nested items align to the parent's content column, and blank lines between items make the list loose (each item wrapped in `<p>`).

See: [List items](https://spec.commonmark.org/0.31.2/#list-items)

### Ordered lists

#### Automatic numbering

```markdown
1. First
2. Second
```
<!-- {: data-highlight="1. First"} -->

#### Starting number

```markdown
3. Starts at three
4. Next
```
<!-- {: data-highlight="3. Starts at three"} -->

The first number sets `start`; later numbers are ignored. `1)` also works, and markers take up to nine digits. Changing the delimiter starts a new list.

See: [Lists](https://spec.commonmark.org/0.31.2/#lists)

### Task lists

```markdown
- [ ] Open
- [x] Done
  - [X] Nested done
```
<!-- {: data-highlight="[ ]; [x]"} -->

A GFM extension; the marker must start the item's first paragraph.

See: [Task list items](https://github.github.com/gfm/#task-list-items-extension-)

## Links
<!-- {: .-three-column} -->

### Inline links

```markdown
[text](https://example.com)
[text](https://example.com "Title")
[text](</my file.md>)
```
<!-- {: data-highlight="[text](</my file.md>)"} -->

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
<!-- {: data-highlight="[CommonMark][cm]; [CommonMark][]; [CommonMark]"} -->

Definitions can follow the links but cannot interrupt a paragraph; they are not rendered. `[]` reuses the label; no brackets is the shortcut form.

See: [Link reference definitions](https://spec.commonmark.org/0.31.2/#link-reference-definitions)

### Autolinks

```markdown
<https://example.com>
<me@example.com>

https://example.com
www.example.com
me@example.com
```
<!-- {: data-highlight="<https://example.com>; www.example.com"} -->

Angle forms are CommonMark; bare URLs, `www.` hosts and emails are the GFM extension. Trailing punctuation stays outside the link.

See: [Autolinks](https://spec.commonmark.org/0.31.2/#autolinks), [GFM autolinks](https://github.github.com/gfm/#autolinks-extension-)

### Footnotes

```markdown
Here is a note.[^1]

[^1]: Footnote text.
```
<!-- {: data-highlight="[^1]"} -->

A GitHub extension, absent from GFM 0.29 but rendered by GitHub and devhints. Notes appear at the bottom regardless of source position.

See: [Footnotes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes)

## Images

<!-- {: .-three-column} -->

### Inline images

```markdown
![Alt text](/img/logo.png)
![Alt text](/img/logo.png "Logo")
```
<!-- {: data-highlight="![Alt text](/img/logo.png)"} -->

See: [Images](https://spec.commonmark.org/0.31.2/#images)

### Reference images

```markdown
![Alt text][logo]

[logo]: /img/logo.png "Logo"
```
<!-- {: data-highlight="![Alt text][logo]"} -->

See: [Images](https://spec.commonmark.org/0.31.2/#images), [Link reference definitions](https://spec.commonmark.org/0.31.2/#link-reference-definitions)

### Data URIs

```markdown
![Dot][dot]

[dot]: <data:image/png;base64,...>
```
<!-- {: data-highlight="![Dot][dot]"} -->

Angle brackets are optional; use them when the URI has spaces or unbalanced parentheses.

See: [Data URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data), [Link reference definitions](https://spec.commonmark.org/0.31.2/#link-reference-definitions)

## Code
<!-- {: .-three-column} -->

### Inline code

```markdown
`code`
`` `code` ``
```
<!-- {: data-highlight="`code`"} -->

A code span opens and closes with backtick runs of the same length. When content starts and ends with one space, both are stripped.

See: [Code spans](https://spec.commonmark.org/0.31.2/#code-spans)

### Fenced code

`````markdown
```js
const x = 1
```
`````
<!-- {: data-highlight="js"} -->

By convention the info string's first word is the language; a backtick info string cannot contain backticks.

See: [Fenced code blocks](https://spec.commonmark.org/0.31.2/#fenced-code-blocks)

### Nested code fences

`````markdown
````markdown
```js
const x = 1
```
````
`````
<!-- {: data-highlight="````"} -->

A fence inside another needs a longer outer fence, or tildes. The closing fence must match the opening character and be at least as long.

See: [Creating and highlighting code blocks](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks)

### Indented code

```markdown
    four spaces
    make a code block
```
<!-- {: data-highlight="four spaces"} -->

Four spaces indent a code block in CommonMark.

See: [Indented code blocks](https://spec.commonmark.org/0.31.2/#indented-code-blocks)

## Blocks

<!-- {: .-three-column} -->

### Blockquotes

```markdown
> A quote
> continues here.
>
> > Nested quote
```
<!-- {: data-highlight=">"} -->

`>` may be omitted on lazy paragraph continuation lines. A `>` on the blank line keeps one quote; without it they become two.

See: [Block quotes](https://spec.commonmark.org/0.31.2/#block-quotes)

### Horizontal rules

```markdown
---
***
___
```
<!-- {: data-highlight="---; ***; ___"} -->

Three or more matching `-`, `*`, or `_`, optionally spaced. Directly under text, `---` is a Setext H2 instead.

See: [Thematic breaks](https://spec.commonmark.org/0.31.2/#thematic-breaks)

### HTML

#### Inline HTML

```markdown
Press <kbd>Ctrl</kbd>+<kbd>C</kbd>.
```
<!-- {: data-highlight="<kbd>Ctrl</kbd>"} -->

#### HTML block

```html
<div class="note">
  <p>Raw HTML block.</p>
</div>
```
<!-- {: data-highlight="<div"} -->

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
<!-- {: data-highlight="| ----- | ----- |"} -->

Header and delimiter rows must match in cell count; body rows pad or truncate. Cells hold inline content; escape a pipe as `\|`.

See: [Tables](https://github.github.com/gfm/#tables-extension-)

### Alignment

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| a    | b      | c     |
```
<!-- {: data-highlight=":---; :----:; ----:"} -->

See: [Tables](https://github.github.com/gfm/#tables-extension-)

