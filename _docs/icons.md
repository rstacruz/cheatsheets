# Icons

A sheet's homepage mark is its `logo` frontmatter. The schema lives in
[`src/types/SheetFrontmatter.ts`](../src/types/SheetFrontmatter.ts); the
homepage renders the mark under the card's subtitle. This page covers how to
pick a mark and how it is validated.

## Pick a mark

Prefer, in order:

1. **A local SVG image** — the real brand mark, saved under
   `public/assets/logos/`.
2. **A generic glyph** — an `icon-park-outline` icon for a topic with no brand.
3. **An Iconify set icon** — last resort. No t1/t2 sheet currently uses one.

### Images

```yaml
logo: { src: /assets/logos/git.svg }
logo: { src: /assets/logos/codex.svg, mono: true }
```

- Source the mark from the project's site, repository, or press kit. CC0
  sources that usually work:
  - [Simple Icons](https://simpleicons.org/) — `https://cdn.simpleicons.org/<slug>`.
  - [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) for AWS services.
- Save it as `public/assets/logos/<name>.svg`. File names are lowercase and
  hyphenated: `nextjs.svg`, `csharp.svg`, `s3.svg`.
- Keep the `viewBox`, remove scripts and external references, and strip any
  wordmark framing.
- Add `mono: true` when the artwork is fixed dark; it is inverted in dark mode.
- Reuse one file across a family: `git.svg` for `git`, `git-stash`,
  `git-rebase`, and the other `git-*` sheets.

### Glyphs

```yaml
logo: { set: icon-park-outline, name: calendar }
```

- Browse [IconPark](https://icon-sets.iconify.design/icon-park-outline/) or
  query the installed `@iconify-json/icon-park-outline` set.
- Match the topic, not the product: calendar for dates, database for SQL,
  terminal for a CLI, lock for permissions, book for accounting.
- Glyphs inherit the card's text colour. Do not add a colour class.
- Do not force a brand mark onto a topic that has no brand.

### Set icons

`logos`, `simple-icons`, and `devicon` are still valid in the schema, but prefer
an image or a glyph. Use a brand set only when neither exists.

## Squareness

Marks are square, not wordmarks. A mark's `viewBox` aspect ratio must be between
`0.8` and `1.25`.

- Wide logos belong in the sheet body, not on the card.
- App-icon squares, circular marks, and compact glyphs are fine.
- If a mark is wide, find a square variant, crop to the square mark, or use a
  glyph.

## Variety

A mark may appear on at most **3 non-snippet cheatsheets**.

- Keep a brand image on the primary sheet only: `javascript` for `javascript.svg`,
  `rails` for `rails.svg`, `git` for `git.svg`.
- Give related sheets a fitting glyph instead: `js-array`, `git-stash`,
  `rails-models`.
- Snippet pages (`layout: snippet`) are exempt and may reuse the family mark.
- Generic glyphs may serve up to 3 sheets; split a larger family across
  different glyphs.

## Sizes

- Sheet page header: **48px** above the h1.
- Homepage cards: **28px** on both list and featured cards.
- Homepage snippet rows: **20px**.

## Validation

```bash
pnpm vitest run src/lib/sheetValidation/logos.test.ts
```

The check verifies that every declared mark resolves, every file exists and has
a `viewBox`, every `viewBox` is between `0.8` and `1.25`, every t1/t2/t3 sheet
has a mark, every featured sheet has one, and no mark appears on more than 3
non-snippet cheatsheets. `pnpm build` also resolves every mark.

## Examples

| Sheet                | Mark                      |
| -------------------- | ------------------------- |
| `git`                | image `git.svg`           |
| `datetime`           | glyph `calendar`          |
| `intl-numberformat`  | glyph `list-numbers`      |
| `aws-s3`             | image `s3.svg`            |
| `nextjs`             | image `nextjs.svg`        |
