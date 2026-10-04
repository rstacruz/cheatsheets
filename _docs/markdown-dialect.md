---
title: Markdown dialect
category: Hidden
---

### About
{: .-intro}

Sheets are CommonMark plus GFM, with a small kramdown-style layer on top. This page covers that layer, the CI rules, and where the result differs from plain CommonMark.

- [Cheatsheet styles](/cheatsheet-styles) _(class catalogue)_
- [Writing guidelines](/_docs/writing-guidelines) _(prose, layout, frontmatter)_

## Differences from CommonMark

| Area | Plain CommonMark | Here |
| --- | --- | --- |
| Attribute lists | none | own-line `{: … }` applies to the block above |
| Tables | GFM tables only | extra `| --- |` rows split `<tbody>`; short rows padded with `&nbsp;` |
| Table alignment | GFM's `:---` markers | markers are ignored; use `.-left-align` |
| Code | indented code allowed | fences only, enforced by CI |
| Headerless tables | GFM rejects them | rejected by CI too |
| Jekyll tags | literal text | `raw` pairs strip; `common/` includes inline |
| Headings | no ids | slugs are added as `id` attributes |
| GFM extras | none | strikethrough, bare-URL autolinks |

## Sections

An H2 starts a section; an H3 is a card inside it. Both get an id from their text.

- Layout classes go on the H2: `.-three-column`, `.-one-column`, `.-left-reference` (`.-two-column` is the default).
- `.-prime` highlights a single H3, once per sheet at most.
- The first H3 is usually `### About` with `.-intro`.

````md
## Queries
{: .-three-column}

### Basic query

```js
{ status }
```
````

## Attribute lists

An own-line `{: … }` applies to the block directly above it. It has to be the next line; a blank line in between drops it.

````md
### Setting default props
{: .-prime}

| Option | Description |
| --- | --- |
| `a` | First |
{: .-key-values}
````

- Classes are `.name`, ids `#name`, attributes `key="value"`.
- Classes can be joined: `{: .-setup.-box-chars}`.
- Works on headings, paragraphs, lists, tables and code fences.
- A malformed IAL (missing `}` or quote) fails the build.

## Code

Use fenced code blocks; indented code is rejected by CI.

- Put the language on the fence: ` ```ruby `.
- Put IALs after the closing fence: `.-setup` mutes the block, `data-line="1,3-5"` highlights lines, `.-wrap` wraps long lines, `.-box-chars` tightens box drawing.
- Keep code lines at 70 characters or less (42 inside `.-three-column`).

````md
```ruby
puts "hi"
```
{: .-setup data-line="1"}
````

## Tables

Tables use kramdown's dialect, not GFM's.

- A header row plus a `| --- |` separator row is required; headerless tables are rejected by CI.
- Extra `| --- |` rows split the table into more `<tbody>` sections.
- Short rows are padded out to the widest row with `&nbsp;`.
- Alignment markers (`:---`, `:---:`, `---:`) are accepted but ignored.
- Classes: `.-shortcuts` / `.-shortcuts-right` (key columns), `.-key-values`, `.-css-breakdown`, `.-left-align`, `.-headers`, `.-no-wrap`.

````md
| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server |
| --- | --- |
| `pnpm build` | Production build |
````

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server |
| --- | --- |
| `pnpm build` | Production build |

## Lists

- Tight and loose lists follow CommonMark; a blank line between items makes the list loose and wraps items in `<p>`.
- Don't indent wrapped item text; continuation lines start at column 0.
- `.-also-see` lays a link list out as a row; `.-six-column` and `.-four-column` lay items out in columns.

````md
* [Alpha](/alpha)
* [Beta](/beta)
{: .-also-see}
````

## Jekyll tags

Liquid is gone, but two legacy tags still expand:

- a `raw` / `endraw` pair strips itself;
- an include tag with a `common/<file>.md` path inlines `_includes/common/<file>.md`, substituting the tag's `title` into the file's `include.title` placeholder.

They can't be shown here, since writing them literally expands them. Everything else (`if`, `{{ … }}`) stays literal text.

## Not supported

- `{::options … /}` — renders as literal text.
- Indented code blocks and headerless tables — rejected by CI.
- Alignment markers (`:---`) — ignored; see [Tables](#tables).
- `=` (tfoot) and `+` separator rows — no longer special; they become ordinary rows.
- Inline IALs (`* {:.cls} item`) — not applied; use an own-line IAL.
- Tables inside blockquotes or lists — fall back to GFM's table HTML.
