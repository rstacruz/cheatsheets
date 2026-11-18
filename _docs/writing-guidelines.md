# Cheatsheet guidelines

## Frontmatter

Fields and their meanings live in [`src/types/SheetFrontmatter.ts`](https://github.com/rstacruz/cheatsheets/blob/master/src/types/SheetFrontmatter.ts), a Zod schema.

```yaml
---
title: React
subtitle: UI library
category: JavaScript libraries
tags: [Featured]
updated: 2024-01-01
---
```

- **Category:** must be one of the values in `src/config.ts` `categories`, or `Hidden` to unlist the sheet. Unknown values silently fall into `Others`; `pnpm test` enforces the list and the [size limits](#categories).
- **Subtitle:** one line shown under the title, at most 5 words. It should read naturally after the title: *Python* is a **readable language for scripting**. Sentence case, no leading article, no trailing period. Prefer a concrete noun over a vague one ("CLI argument parser", not "command line tool"). `pnpm test` enforces presence and the word limit.

### Fragments

Every T1 and T2 sheet needs `fragments`: 12–20 short strings shown muted with
a bottom fade on the sheet's homepage card. They are decoration, not
documentation.

```yaml
fragments:
  - "curl -s"
  - "-X POST"
  - "--compressed"
  - "-H 'X-Foo: bar'"
  - "-d @file"
  - "-F file=@path"
  - "-o file"
  - "-L"
  - "-I"
  - "--http2"
  - "-O"
  - "-u user:pass"
```

- Copy commands, flags, or syntax from the sheet; never add a new command.
- Keep each fragment to 16 characters or fewer. Mid-token clipping is expected.
- The first two or three should identify the tool without the title.
- Mix shapes: commands, flags, values, syntax, codes. Avoid a run of flags.
- Quote every entry: YAML reads `-X`, `#`, `*` and `:` as syntax.
- No sentences, Markdown formatting, or trailing punctuation.
- Keep cards distinct; skip generic `--help`, `install`, `usage`.
- Order for visual rhythm, not importance.

Non-tiered sheets may omit fragments. `pnpm test` enforces presence and length.

## Categories

A category is a nav group. Its order in `src/config.ts` is the nav order; `Others` stays last.

- **Sizes:** every listed category except `Others` holds 3-16 sheets; `Others` holds at most 12. Hidden, deprecated, and archived sheets don't count.
- **New sheets:** file under the closest existing category. Don't create a category for one sheet.
- **New categories:** add one only when at least 3 sheets share it, in nav order in `src/config.ts`. The donor category must stay at 3 or more.
- **Splitting:** when a category passes 16, split it along a subject line (runtime vs library, language vs tool), not alphabetically. Both sides must stay within 3-16.
- **Merging:** when a category falls below 3, fold it into its closest parent and remove it from `src/config.ts`.
- **Others:** a last resort. If it is full, pick the closest category or split one; don't add a new "Misc".

Run `pnpm vitest run src/lib/categories.test.ts` after moving sheets.

## Content organisation

- **Progressive complexity:** Start with basics, move to advanced
- **Logical sections:** Group related functionality together
- **H2 and H3:** Organise documents into H2 and H3 sections
- **Every H2 needs at least two H3s:** one card renders as a stub; a footer that only lists links (`Also see`, `References`) is the exception.
- **No H2 preamble:** start every H2 with an H3; intro text belongs in a card.
- **Most-used first:** order H2s by how often a reader reaches for them; for an interactive tool, keyboard and everyday commands come before reference material.

H2 content length:

- Short H2s: 2-4 H3s (e.g., "Installing", "Getting started")
- Medium H2s: 4-7 H3s (e.g., "Components", "Lifecycle")  
- Long H2s: 7+ H3s (use column layouts)

Prefer splitting an H2 that outgrows 7 H3s into several H2s over growing one
section.

H3 content length:

- Focused: One main concept + examples
- Consistent: Similar depth within each H2
- Self-contained: Each H3 should be understandable independently

## Format

- Documentation is in the format of Markdown with attribute comments (see [Markdown dialect](/_docs/markdown-dialect) for the syntax)
- H3's can have the following class names:
  - `<!-- {: .-prime} -->` - Visually highlighted section. Only use once per document at most.
- PRE elements can have:
  - `<!-- {: .-setup} -->` - Visually muted section. Used for sections with less importance. Deprecated, use sparingly.
- H2's can have:
  - `<!-- {: .-three-column} -->` - use if the H3's are short, and if there are at least 3 H3's in the H2.
  - `<!-- {: .-two-column} -->` - the default (don't add this since it's the default)

## Cross-linking sheets

Sheets can link to related sheets with `.-crosslink`, which renders as a large
block with an arrow:

````md
[JavaScript Strings cheatsheet](./js-string)
<!-- {: .-crosslink} -->
````

- Put the link on its own paragraph, with the attribute comment on the next line.
- Link text: the target sheet's title plus "cheatsheet".
- Link with a page-relative path, eg `./js-string`.

A sheet can also act as an **index** for a family of sheets: [javascript.md](/javascript)
links to every core JavaScript sheet, and [phoenix.md](/phoenix) links to the
`phoenix-*` sheets. Name the index after the subject (eg `javascript.md` for the
JavaScript category) so the family has a canonical landing page.

Index sheets should stand on their own as quick references: give each section a
substantial example (at least five use cases per code block) rather than a
sparse two-line snippet. The Arrays section in [javascript.md](/javascript)
shows the shape.

## Code blocks

- Maximum line width is 70 characters
- In `.-three-column` sections, maximum is 42 characters
- Wrap onto more lines rather than exceed the limit
- Blocks of 5+ lines should add `<!-- {: data-line="…"} -->` after the closing fence to highlight the relevant line(s); see `code/data-line-in-block`
- Show the example before its reference table: code block, then an H4 (eg `#### Options`), then the table
- A table that follows a code block needs an H4 in between, or it reads as part of the block
- One example per code block: start a new fence instead of stacking commented examples
- Split setup from use: build the formatter or value in one block, then call it in a second block, each with its own H4 (eg `#### Formatter`, `#### Output`). A long `const f = (x) => new Thing(x)` one-liner is hard to scan and does not wrap in narrow cards
- Prefer `=> (` … `)` line breaks over one long arrow line, and add `.-wrap` when the remaining lines still overflow

## Writing guidelines

- Aim for brevity
- Prose after the last code block or table in a card: 40 words max; split into another H3 if it needs more
- Prose comes last in a card: no paragraph may be followed by a code block or table. Fold the note into the block, or split the card
- Two code blocks in a card need an H4 between them, so each block has a label; a caption-led block is self-labelled, so it needs no H4
- Table descriptions: keep them short — 8 words max. Prefer parentheticals over separate sentences
- Sentence case headings, never Title Case
- Omit explanations if they are obvious. See `prose/omit-redundant`.
- Omit mechanics (stdout and JSON shapes, exit codes, internal tokens) unless the sheet is about them
- Leave out third-party trivia (eg which desktop owns a key chord); link the upstream docs instead
- Link install and upgrade instructions rather than restating them

## Quick starts

- Show the default interactive flow first (keys, TUI). CLI and automation recipes belong in later sections.
- One code block per step, with the explanation after each block.

## Content priorities

1. **Essential first**: Most commonly used 20% of functionality
2. **Progressive disclosure**: Basic → intermediate → advanced
3. **Practical examples**: Real-world use cases over theoretical
4. **Quick reference**: Dense information for experienced developers
5. **Learning path**: Logical progression for newcomers

## H3 writing guidelines

- End each H3 with a documentation link in its last content block, or add a `See:` line anywhere in the section.
- `See:` must start a line at column 0 and begin a paragraph; `See also:` and mid-paragraph `See:` do not count. The line may be linkless: ``See: `:help motion.txt` ``.
- Only inline links count: `[text](url)`. Autolinks, bare URLs, reference-style links, images, links in code, and absolute `devhints.io` links do not count; links to other sheets do.
- Prefer upstream project docs, specifications, or the project repository.
- Do not link community wikis, Q&A sites, or blog posts unless the upstream project officially endorses them as its documentation (for example, the Arch Wiki).
- If no authoritative page covers the section, a linkless `See:` line is valid; use it instead of linking an unofficial source.
- Only when the section has no authoritative documentation and no useful reference to point at, add `<!-- see: none: short reason -->` at column 0, on its own line.

  ```md
  ### Browser console
  <!-- see: none: browser-only, no upstream docs -->
  ```

- Prefer to write explanations after a pre/table. See `prose/explanations-after-blocks`.
- When an example has multiple files, use H4 as filename markers. See `code/filename-markers`.
- When showing reference information, use tables for quick scanning. See `tables/reference-information`.
- Use inline comments to explain results, equivalents, or provide context. See `code/inline-comments`.

## H4 sub-headings

Use H4s to split an H3 into labelled segments: concept variants ("As UTC time"), topics ("Sessions"), or reference groups ("All options").

Example:

````markdown
### Parsing

#### As local time

```js
const date = new Date(2012, 11, 20, 3, 0, 0)
```

#### As UTC time

```js
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
```
````

- Keep labels short (1-4 words)
- Prefer 2-4 segments per H3

- Multi-file examples use each filename as its H4, one code block per file. See `code/filename-markers`.

## Deprecated sheets

- Outdated versions go to `<name>@<version series>.md` files (eg `phoenix@1.2.md`).
- Set `deprecated: true` to show a deprecation notice and unlist the sheet, exactly like `category: Hidden`.
- Set `deprecated_by: /<newer sheet>` to link the notice to the newer sheet; this alone also marks the sheet deprecated.

## Archived sheets

See [`archiving.md`](archiving.md) for when a sheet is worth archiving.

- Set `archived: <note>` for an obsolete sheet with no newer version. The note renders as Markdown in a notice.
- Archived sheets are unlisted like `category: Hidden` and appear on the [archive page](https://devhints.io/archive).
- `tags: [Archived]` is only a label; set `archived:` to unlist.

## Hidden sheets

- Set `category: Hidden` to keep a sheet off the homepage, the sitemap, the search index, and the related and top lists.
- Hidden sheets stay reachable at their URL and are listed on the [archive page](https://devhints.io/archive), so retire a sheet by hiding it rather than deleting it.
- Deprecated and archived sheets are unlisted the same way and share the archive page.
- Unlisted sheets are excluded from search and marked `noindex, follow`.
- Sheets under `tests/` are left out of the archive page.

## Syntax highlighting

Ensure syntax highlighting languages are part of [PrismJS's supported languages](https://github.com/PrismJS/prism/tree/v1.29.0/components).

- Set `intro` frontmatter. See `frontmatter/introduction`.

- Add `.-headers` when column labels carry meaning. See `tables/headers`.

- Separate tables of 8+ rows with H4 groups or `| --- |` rows. See `tables/separating`.

## Rules

Each rule has a stable slug that reviews and the sheet skill link to.

### tables/cli-options

CLI flags and slash commands get a plain table. `.-shortcuts` is for keypress columns only.

````md
| Flag                   | Description                      |
| ---------------------- | -------------------------------- |
| `-p, --print`          | Print the response and exit      |
| `--output-format json` | `text`, `json`, or `stream-json` |
| `--bare`               | Skip hooks, plugins, and memory  |
````

### tables/shortcut-keys

Keypress columns get `.-shortcuts`. Use `.-shortcuts-right` when the key column is last.

````md
| Shortcut | Description   |
| -------- | ------------- |
| `Ctrl+C` | Interrupt     |
| `Esc`    | Close dialogs |

<!-- {: .-shortcuts} -->
````

### code/wrap-long-lines

Code lines stay under 70 characters. Add `.-wrap` when a line still overflows, and break arrow bodies as `=> (` … `)`.

````js
const fraction = (options) => (
  options.numerator / options.denominator
)
````

### code/data-line-in-block

Every `data-line` reference must fall inside its fenced block; don't point past the last line.

````md
```elixir
a
b
```
<!-- {: data-line="2"} -->
````

### code/split-setup-and-use

Build the value in one pre block and call it in another, each with its own H4 label.

````md
#### Formatter

```js
const format = (value) => value.trim()
```

#### Output

```js
format(' hi ') // 'hi'
```
````

### cards/split-all-options

Split an oversized "All options" card into focused cards like `Style options` and `Digit options`.

### cards/short-trailing-prose

Prose after the last block stays under 40 words; a single sentence usually suffices.

````markdown
### Errors

```js
parse('4.2') // → { ok: true, value: 4.2 }
```

Invalid input returns an error object.
````

### cards/size-limits

Keep a card under four tables and 50 lines; split it before adding another table.

### workflow/verify-output-against-runtime

Run the example, capture its real output, and paste it verbatim. Watch for NBSP and other invisible characters.

### prose/single-line

Keep each paragraph on one line; don't hard-wrap prose across lines.

### prose/explanations-after-blocks

Prefer explanations after a pre or table, not before it.

````markdown
### Setting default props

```jsx
Hello.defaultProps = {
  color: 'blue'
}
```

Default properties are used if no properties are given.

See: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)
````

### code/filename-markers

When an example spans multiple files, use each filename as its H4, one code block per file.

````markdown
### via Data Attributes

#### index.html.erb

```html
<a
  href="#"
  data-reflex="click->CounterReflex#increment"
  data-step="1"
  data-count="<%= @count.to_i %>"
  >Increment <%= @count.to_i %></a
>
```

#### counter_reflex.rb

```ruby
class CounterReflex < StimulusReflex::Reflex
  def increment
    @count = element.dataset[:count].to_i + element.dataset[:step].to_i
  end
end
```

Trigger reflexes without writing any javascript with the `data-reflex` attribute.
````

### tables/reference-information

Use tables for quick scanning when showing reference information.

````markdown
### Primitives

| Sample                  | Type            |
| ---                     | ---             |
| `nil`                   | Nil/null        |
| `true` _/_ `false`      | Boolean         |
| ---                     | ---             |
| `23`                    | Integer         |
| `3.14`                  | Float           |
| ---                     | ---             |
| `"hello"`               | Binary string   |
| `:hello`                | Atom            |

These are the basic data types in Elixir.
````

### code/inline-comments

Use inline comments to explain results, equivalents, or provide context.

````markdown
### Pattern matching

```elixir
user = %{name: "Tom", age: 23}
%{name: username} = user  # → username = "Tom"
```

### Piping

```elixir
source
|> transform(:hello)     # Step 1: transform the data
|> print()               # Step 2: output the result
```

```elixir
# Same as:
print(transform(source, :hello))
```

### Type conversions

```elixir
Integer.parse("34")      # → {34, ""}
Float.parse("34.1")      # → {34.1, ""}
```
````

### frontmatter/introduction

Set `intro` frontmatter; it renders as the first card. Keep paragraphs under 25 words and links to at most four first-party sources.

````yaml
intro: |
  [Claude Code](https://code.claude.com/docs) is Anthropic's AI coding assistant for the terminal. This reference covers the most commonly used commands, flags, and settings.

links:
  - title: Claude Code documentation
    url: https://code.claude.com/docs
  - title: GitHub repository
    url: https://github.com/anthropics/claude-code
````

The card is generated; never write an `### Introduction` card by hand.

### tables/headers

Table headers are hidden by default. Add `.-headers` after the table when the column labels carry meaning.

````md
| Part | Required |
| --- | --- |
| `type` | yes |
| body | no |
<!-- {: .-headers} -->
````

### tables/separating

Separate tables of 8+ rows with H4 groups or `| --- |` rows.

#### H4 groups

````markdown
### Examples

#### Date

| Example                   | Output                 |
| ------------------------- | ---------------------- |
| `YYYY-MM-DD`              | 2014-01-01             |
| `dddd [the] Do [of] MMMM` | Friday the 16th of May |

#### Time

| Example   | Output   |
| --------- | -------- |
| `hh:mm a` | 12:30 pm |
````

#### Separator rows

````markdown
| Example | Output                           |
| ------- | -------------------------------- |
| `LT`    | 8:30 PM                          |
| `LTS`   | 8:30:25 PM                       |
| ---     | ---                              |
| `LL`    | August 2 1985                    |
| `ll`    | Aug 2 1985                       |
| ---     | ---                              |
| `LLLL`  | Thursday, August 2 1985 08:30 PM |
| `llll`  | Thu, Aug 2 1985 08:30 PM         |
````

### prose/omit-redundant

Omit redundant prose. When a note is needed, put it after the code block and keep only what the code does not say.

````md
// Avoid:
```sh
wget --quiet
```

This command runs wget with the quiet option, which suppresses its output.

// Consider:
```sh
wget --quiet
```

--quiet suppresses output
````

### frontmatter/seo-descriptions

Write `keywords` with `intro` for SEO; `description` with `intro` also works. Without either, a description is generated from `intro`.

#### Keywords

````md
keywords: [React.Component, render(), componentDidMount(), props/state]
intro: |
  React is a JavaScript library for building web user interfaces.
````

#### Description

````md
description: One-page reference to React and its API.
intro: |
  React is a JavaScript library for building web user interfaces.
````

#### Intro only

````md
intro: |
  React is a JavaScript library for building web user interfaces.
````

## Checks

Sheet checks live in `src/lib/sheetValidation/`. Run them with:

```bash
pnpm vitest run src/lib/sheetValidation
```

Legacy violations are recorded under `src/lib/sheetValidation/baseline/`, so
only new ones fail. Regenerate the baselines after cleaning sheets up:

```bash
UPDATE_SHEET_BASELINE=1 pnpm vitest run src/lib/sheetValidation
```

Then run `pnpm fmt:format`; oxfmt collapses short baseline arrays to one line.

The `every tiered sheet gives each H3 a link or See` check covers `tier: t1` and `tier: t2` sheets (see [H3 writing guidelines](#h3-writing-guidelines)). The rule is fully enforced; `baseline/seeLinks.json` is empty. H3s from `{% include %}` files are out of scope.

Six shape checks cover every sheet: each H2 needs at least two H3s (`baseline/structure.json`), a table after a code block needs an H4 in between (`baseline/tableIntros.json`), prose after the last block in a card stays under 40 words (`baseline/trailingProse.json`), no paragraph is followed by a block (`baseline/paragraphPlacement.json`), two code blocks need an H4 between them unless caption-led (`baseline/consecutiveBlocks.json`), and a code block holds one commented example (`baseline/multiExampleBlocks.json`).

Three more checks cover tables, cards, and code blocks: `shortcutTables` flags shortcut styling on tables whose key column is not a keypress (`baseline/shortcutTables.json` must stay empty), `cardSize` reports oversized cards (`baseline/cardSize.json` holds tolerated cards), and `dataLine` flags `data-line` values outside their fenced block. Only `cardSize` has a populated baseline; `dataLine` has none.

- Write `keywords` + `intro` for SEO purposes. See `frontmatter/seo-descriptions`.
