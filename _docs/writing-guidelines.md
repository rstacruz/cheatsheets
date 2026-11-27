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
- **Link title:** optional short title for homepage and other link lists. Falls back to `title`.
- **Last verified with:** required for tiered sheets, optional elsewhere (max 160 chars). Records the versions the examples target. Use `<tool> <version>.`, with several versions separated by commas. No dates or PR numbers; `updated:` already records the edit date. ISO dates like `2026-11` and PR references like `#2383` are rejected.
- **Tier:** `t1` for sheets that move often, `t2` for slower ones, `t3` for best-effort sheets that still get the tiered checks; see [review tiers](tiers.md). Omit it for sheets that need no checks.
- **Layout:** `snippet` uses the two-column snippet cards and drops "cheatsheet" from the H1. See [snippet layout](#snippet-layout).
- **Logo:** optional square mark for homepage cards. Use `{ src }` for an image under `assets/logos/`, `{ set, name }` for a glyph, and see [Icons](icons.md) for sourcing and validation. See also [Logos](#logos).

```yaml
last_verified_with: "Conventional Commits 1.0.0, curl 8.23.0."
last_verified_with: "Ecto 3.14 / Phoenix 1.8, Elixir 1.18.6."
```


### Fragments

Every [T1 and T2 sheet](tiers.md) needs `fragments`: 12–20 short strings shown muted with
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

Untiered and `t3` sheets may omit fragments. `pnpm test` enforces presence and length.

### Logos

Featured sheets need a `logo`; other sheets may add one. It renders under the card's subtitle, and sheets without one get a chevron.

```yaml
logo: { set: logos, name: react }
logo: { set: icon-park-outline, name: layers }
logo: { src: /assets/logos/herdr.svg, mono: true }
```

- Prefer a local image under `public/assets/logos/` over an Iconify set mark.
- Keep the brand image on the primary sheet; related sheets use glyphs. No mark may appear on more than 3 non-snippet cheatsheets; snippets are exempt.
- For non-brand topics, pick a fitting `icon-park-outline` glyph.
- If a set is unavoidable, `set` is `logos`, `simple-icons`, `devicon`, or `icon-park-outline`.
- Prefer square marks; no wordmarks.
- `mono: true` inverts fixed-dark artwork in dark mode.

See [Icons](icons.md) for the full sourcing workflow, squareness rule, and validation command. `pnpm test` checks that marks resolve, files exist, are square, and that every t1/t2 and featured sheet has one.

## Categories

A category is a nav group. Its order in `src/config.ts` is the nav order; `Others` stays last.

- **Sizes:** every listed category except `Others` holds 3-16 non-snippet sheets; `Others` holds at most 12. Hidden, deprecated, and archived sheets don't count.
- **New sheets:** file under the closest existing category. Don't create a category for one sheet.
- **New categories:** add one only when at least 3 non-snippet sheets share it, in nav order in `src/config.ts`. The donor category must stay at 3 or more.
- **Splitting:** when a category passes 16 non-snippet sheets, split it along a subject line (runtime vs library, language vs tool), not alphabetically. Both sides must stay within 3-16.
- **Merging:** when a category falls below 3 non-snippet sheets, fold it into its closest parent and remove it from `src/config.ts`.
- **Others:** a last resort. If it is full, pick the closest category or split one; don't add a new "Misc".

Run `pnpm vitest run src/lib/categories.test.ts` after moving sheets.

## Snippet layout

See [Snippets](snippets.md) for the format and rules.

Set `layout: snippet` for a microsheet built from one-command cards. Set `title` to an article-style heading; it becomes both the `<title>` and the H1, without a "cheatsheet" suffix. Set `link_title` to the short label used in homepage links. The `intro:` field is ignored; a **Related links** card is generated from `links` at the end of the page. Use exactly one H2 marked `.-snippets`, and mark every H3 `.-snippet`. Each H3 holds one or more code blocks (with optional H4 labels) followed by one explanation paragraph that opens with a bold summary and includes the upstream documentation link.

```yaml
---
title: How to rename a Git branch
link_title: Git rename branch
layout: snippet
links:
  - title: git-branch manual
    url: https://git-scm.com/docs/git-branch
---
```

````md
## Renaming
<!-- {: .-snippets} -->

### Current branch
<!-- {: .-snippet} -->

```bash
git branch -m new-name
```

Renames the checked-out branch; see the [git-branch manual](https://git-scm.com/docs/git-branch).
````

`pnpm test` checks the layout marker, the classes, the code-first body, and the explanation link. Review snippet layouts on the T2 cadence.

Snippet pages are left out of the normal homepage category, featured, and recent lists. They appear in a condensed **Snippets** list at the end of the homepage instead.

## Content organisation

- **Progressive complexity:** Start with basics, move to advanced
- **Logical sections:** Group related functionality together
- **H2 and H3:** Organise documents into H2 and H3 sections
- **Every H2 needs at least two H3s:** one card renders as a stub; a footer that only lists links (`Also see`, `References`) is the exception.
- **No H2 preamble:** start every H2 with an H3; intro text belongs in a card.
- **Most-used first:** order H2s by how often a reader reaches for them; for an interactive tool, keyboard and everyday commands come before reference material.
- **Tables:** keep a card under 20 table rows total; split into more H3s when a reference table grows. See `tables/row-limit`.
- **Unique headings:** no repeated H2/H3 titles in one sheet; anchors collide. See `headings/unique`.

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
  - `<!-- {: .-full-width} -->` - Spans every column of a multi-column H2, for a wide table followed by narrower cards.
  - `<!-- {: .-snippet} -->` - Snippet card; pair with `.-snippets` on its H2. See [snippet layout](#snippet-layout).
- PRE elements can have:
  - `<!-- {: .-setup} -->` - Visually muted section. Used for sections with less importance. Deprecated, use sparingly.
- H2's can have:
  - `<!-- {: .-three-column} -->` - prefer for H2s with 3+ short H3 cards; wrap code rather than fall back to two columns.
  - `<!-- {: .-two-column} -->` - the default (don't add this since it's the default)

## Cross-linking sheets

Sheets can link to related sheets with `.-crosslink`, which renders as a large
block with an arrow. Reserve it for sheets in the same family: an index and its
members, a version and its successor, or a retired sheet and its replacement.
A neighbouring tool or an alternative gets a regular link instead. See
`crosslinks/directly-related` in [Rules](rules.md).

````md
[JavaScript Strings cheatsheet](./js-string)
<!-- {: .-crosslink} -->
````

- Put the link on its own paragraph, with the attribute comment on the next line.
- Link text: the target sheet's title plus "cheatsheet".
- Link with a page-relative path, eg `./js-string`.
- Reserve cross-links for directly related sheets: a sibling version, a successor, or the same family. Two languages from different ecosystems are not related, even when they look alike; leave the other sheet out.

For a neighbouring tool, link it plainly:

````md
- [Fastify cheatsheet](./fastify)
````

A sheet can also act as an **index** for a family of sheets: [javascript.md](/javascript)
links to every core JavaScript sheet, and [phoenix.md](/phoenix) links to the
`phoenix-*` sheets. Name the index after the subject (eg `javascript.md` for the
JavaScript category) so the family has a canonical landing page.

Index sheets should stand on their own as quick references: give each section a
substantial example (at least five use cases per code block) rather than a
sparse two-line snippet. The Arrays section in [javascript.md](/javascript)
shows the shape.


## Writing guidelines

- Aim for brevity
- Prose comes last in a card: no paragraph may be followed by a code block or table. Fold the note into the block, or split the card
- Two code blocks in a card need an H4 between them, so each block has a label; a caption-led block is self-labelled, so it needs no H4
- Table descriptions: keep them short — 8 words max. Prefer parentheticals over separate sentences
- Sentence case headings, never Title Case
- Omit explanations if they are obvious. See `prose/omit-redundant`.
- Omit mechanics (stdout and JSON shapes, exit codes, internal tokens) unless the sheet is about them
- Leave out third-party trivia (eg which desktop owns a key chord); link the upstream docs instead
- Link install and upgrade instructions rather than restating them
- Keep marketing and competitor comparisons out of reference sheets; see `prose/no-marketing`.

### Code spacing

Don't shy from blank lines. Separate setup from use, and put long result comments on their own line. A call and result may share a line when the combined line stays under 40 characters; see `code/space-between-examples`.

```js
const d = dayjs()

d.add(1, 'day').format('YYYY-MM-DD')
// "2014-06-10"

d.format('YYYY-MM-DD')
// "2014-06-09"
```

## Quick starts

- Show the default interactive flow first (keys, TUI). CLI and automation recipes belong in later sections.
- One code block per step, with the explanation after each block.

## Content priorities

1. **Essential first**: Most commonly used 20% of functionality
2. **Progressive disclosure**: Basic → intermediate → advanced
3. **Practical examples**: Real-world use cases over theoretical
4. **Quick reference**: Dense information for experienced developers
5. **Learning path**: Logical progression for newcomers

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

## Rules

Rule slugs, examples, and the automated checks live in [Rules](rules.md).
