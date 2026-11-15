# ADR 001 — Attribute comments for block attributes

- **Status:** Accepted — 2026-11-06

## Context

Sheets attach layout classes and data attributes to the block above them:
`.-three-column` on an H2, `.-shortcuts` on a table, `data-line` on a fence.
The syntax comes from kramdown's inline attribute list, `{: .-class}`, inherited
with the rest of the kramdown dialect (`_docs/markdown-dialect.md`). Three costs:

- **Not CommonMark.** GitHub renders `{: .-two-column}` as a paragraph of
  visible text.
- **Formatters move it.** Both Prettier and oxfmt insert a blank line after a
  block, which detaches the list; oxfmt additionally folds a table's list into a
  table row. `.oxfmtrc.json` ignores `*.md` today, so this blocks enabling
  Markdown formatting rather than anything live.
- **It costs a parser.** `remark-attribute-list` 0.4.0 is a small package with
  its own syntax and node types, kept only for this.

## Decision

Attributes live in an HTML comment directly below their block:

```md
### Setting default props
<!-- {: .-prime} -->
```

- An HTML comment is a CommonMark HTML block (type 2): invisible on GitHub,
  preserved by formatters, ignored by linters.
- One comment per block; blank lines before it are allowed, so a formatter
  inserting one changes nothing.
- The parser stays narrow — `.class`, `.a.b`, `key="value"` — because that is
  all the sheets use.
- Both syntaxes coexist during the rollout (#2318 adds, #2319 migrates, #2320
  deletes the parser).

## Consequences

- Rendered HTML is unchanged: #2318 proves it on `herdr.md`, #2319 compares
  every changed file.
- No new dependency (#2320 removes one), and GitHub shows no stray text.
- After #2320 a stray `{:` renders literally, so a guard for legacy lists lands
  there.

## History

- 2012-03-16 — repo starts on Proton, its own generator (`Protonfile`, Rack/Haml).
- 2013-10-14 — 85c46a392 "Jekyllization." moves the site to Jekyll.
- 2014-06-14 — 1b5eac2ce adds `_config.yml` with `markdown: kramdown`.
- 2024-03-28 — #2130 rewrote the site to Astro 4, still rendering through Ruby
  kramdown.
- 2026-10-04 — #2247 replaced Ruby kramdown with an in-process remark/rehype
  pipeline, keeping own-line lists via `remark-attribute-list`.
- 2026-11-03 — #2283 replaced ESLint 8 and Prettier with oxlint and oxfmt;
  `*.md` stays out of both formatters.
- 2026-11-06 — #2318 adds comment attributes, #2319 migrates the corpus, #2320
  removes the legacy parser.

## Alternatives

- **Keep the list and patch the formatter.** Formatter plugins per tool, and
  GitHub still shows the text.
- **Attributes in the fence info string** (```` ```ruby {: .-setup} ````). Breaks
  on the 222 language-less fences and ignores headings, tables and lists.
- **MDX or GFM custom blocks.** New syntax and tooling for one attribute per
  block.
