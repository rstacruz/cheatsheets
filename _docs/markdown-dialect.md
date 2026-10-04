---
title: Markdown dialect
category: Hidden
---

### About
{: .-intro}

Sheets are Markdown with a small kramdown-style dialect: own-line attribute lists, kramdown tables, and fenced code. The renderer is `src/lib/markdown/`, and `src/lib/sheetValidation/` fails CI when a sheet breaks the rules below.

- [Cheatsheet styles](/cheatsheet-styles) _(class catalogue)_
- [Writing guidelines](/_docs/writing-guidelines) _(prose and layout)_

## Frontmatter

| Field | Type | Effect |
| --- | --- | --- |
| `title` | string | Sheet name; falls back to the filename |
| `category` | string | Nav group; `Hidden` unlists the sheet |
| `weight` | number | Sorts higher in the "top" lists |
| `tags` | string[] | `Featured` puts the sheet on the home page |
| `updated` | date | "Last updated" and recent lists |
| --- | --- | --- |
| `intro` | string | Text above the fold; also the meta description |
| `keywords` | string[] | Search terms; meta description fallback |
| `description` | string | Custom meta description (beats `keywords`) |
| `deprecated` | boolean | Notice + unlist; the archive page keeps it |
| `deprecated_by` | string | Path of the newer sheet; also deprecates |

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
- Alignment: `:---` left, `:---:` center, `---:` right.
- Short rows are padded out to the widest row.
- Classes: `.-shortcuts` / `.-shortcuts-right` (key columns), `.-key-values`, `.-css-breakdown`, `.-left-align`, `.-headers`, `.-no-wrap`.

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |

## Lists

- Tight and loose lists follow CommonMark; keep items tight unless a blank line is intended.
- Don't indent wrapped item text; continuation lines start at column 0.
- `.-also-see` lays a link list out as a row; `.-six-column` and `.-four-column` lay items out in columns.

## Whitespace

CI rejects three shapes that only kramdown used to render:

| Shape | Fix |
| --- | --- |
| A single trailing space on a wrapped line | Delete the space |
| An indented continuation line (`  continued`) | Dedent to column 0 |
| A whitespace-only line inside an indented fence | Make the line empty |

Punctuation renders as written: `--`, `...`, `<<` and straight quotes stay as typed.

## Jekyll tags

Liquid is gone, but two legacy tags still expand:

- a `raw` / `endraw` pair strips itself;
- an include tag with a `common/<file>.md` path inlines `_includes/common/<file>.md`, substituting the tag's `title` into the file's `include.title` placeholder.

Everything else (`if`, `{{ … }}`) stays literal text.

## Not supported

- `{::options … /}` — renders as literal text.
- Indented code blocks and headerless tables — rejected by CI.
- `=` (tfoot) and `+` separator rows — no longer special; they become ordinary rows.
- Inline IALs (`* {:.cls} item`) — not applied; use an own-line IAL.
- Tables inside blockquotes or lists — fall back to GFM's table HTML.
