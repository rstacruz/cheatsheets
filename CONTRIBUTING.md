# Developer notes

## Runtimes

Requires Node.js and pnpm.

See `.node-version` for the supported Node.js version, and the `packageManager` field in `package.json` for the pnpm version.

The site is built with [Astro](https://astro.build). Markdown is rendered in-process by a [unified](https://unifiedjs.com)/[remark](https://remark.js.org) pipeline (`src/lib/markdown/index.ts`), so no other runtime is needed.

## Starting a local instance

This starts the Astro dev server. This requires recent versions of [Node.js] and [pnpm] installed.

```bash
pnpm install
pnpm dev
```

The dev server runs at <http://localhost:4321>.

[node.js]: https://nodejs.org/en/download/package-manager/
[pnpm]: https://pnpm.io/

## Commands

| Command                | Description                       |
| ---                    | ---                               |
| `pnpm dev`             | Start the dev server              |
| `pnpm build`           | Build the site to `dist/`         |
| `pnpm test`            | Unit tests (Vitest, watch mode)   |
| `pnpm test:playwright` | End-to-end tests (Playwright)     |
| `pnpm ci`              | Run all linters, tests, and build |
| `pnpm format`          | Fix lint and formatting           |
| `pnpm sheets:due`     | List due T1/T2 sheets             |

Run a single unit test with `pnpm vitest run <path>`.

Site code lives in `src/`; cheatsheets are the Markdown files in the repository root.

## CSS classes

See <https://devhints.io/cheatsheet-styles> for a reference on styling.

## Icons

Glyphs come from the [Ionicons] set via `@iconify/utils`:

- **In templates** — `src/components/Icon.astro`: `<Icon name="logo-x" />` renders an inline SVG.
- **In CSS** — the generator emits `--icon-*` custom properties (`src/styles/icons.generated.css`)
  holding data URIs. Use one as a mask so `color` styles the glyph:
  `mask: var(--icon-md-arrow-forward) center / 24px 24px no-repeat`. Where the element paints
  its own background or border, use the `-white` variant as a background image instead — a mask
  clips those.

Both read from the same `@iconify-json/ion` set, but only the CSS side touches the
generated file: `pnpm dev` and `pnpm build` regenerate `src/styles/icons.generated.css`.
Add a CSS-only glyph to `USED` in `scripts/build-icons.mjs`, then run `pnpm icons`;
`pnpm ci` fails if that file is stale.

[ionicons]: https://ionicons.com

## Cheatsheet guidelines

See `_docs/writing-guidelines.md` for content and formatting guidelines,
`_docs/rules.md` for the rule slugs and examples, and `_docs/archiving.md` for
when to archive a sheet.
See `_docs/tiers.md` for what T1 and T2 mean and when a sheet needs a check.

### Verification stamps

`last_verified_at:` records the last upstream check. It is required on T1/T2
sheets and cannot precede `updated`; the due cadences are 14 days (T1) and 42
days (T2). After pulling `origin/master`, run `pnpm sheets:due --tier t1` (or
`t2`) to print a one-sentence summary, a blank line, then TSV rows with the
`slug`, `last_verified_at`, and `age` columns. `--json` prints a pure array and
`--limit N` caps the list. Open PRs labelled `sheet-refresh` are excluded by
default; `--exclude-label` overrides the label. A clean check still needs a
stamp-only PR on T1/T2. See [_docs/tiers.md](_docs/tiers.md).

## Setting up redirects

Redirects are defined in `public/_redirects`, one rule per line:

```
/es2015 /es6 301
```

When you rename or remove a sheet, add a rule from its old URL. CI fails a pull request that deletes a sheet without one (`src/lib/redirects.test.ts`).

The file is copied into the build output, so static hosts that support the `_redirects` format will pick it up.

## Site configuration

Site-wide strings and settings live in `src/config.ts`: title, analytics, Disqus, announcements.

## Forking

It's a static site: `pnpm build` outputs `dist/`, which can be hosted anywhere. For a whitelabel fork, edit `src/config.ts` (title, analytics, Disqus, announcements) and the files in `public/` (`_redirects`, `_headers`).
