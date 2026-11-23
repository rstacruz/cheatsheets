# ADR 002 — Design tokens and incremental Tailwind adoption

- **Status:** Accepted — 2026-11-23

## Context

The site's CSS grew before Tailwind was in the build. Today it has:

- **46 design tokens** in `src/styles/tokens.css` plus 6 fluid type steps, but two vocabularies: opaque abbreviations (`--base-a`, `--base-mute6`) and Tailwind's `--color-mildindigo-*`.
- **Duplicate values under different names:** `--base-body` / `--body-bg`, `--base-mute` / `--gray-text`, `--area-width` / `--container-content` / `--spacing-content`.
- **Two indigo families:** `--base-a (#745fb5)` and `--color-mildindigo-600 (#6f6bb7)` serve the same role.
- **A type scale outside Tailwind's namespace:** `--fs-n1`…`--fs-8`, expressed with media-query overrides, while markup also uses `text-*` utilities whose rem values resolve against a 14px root.
- **Token escapes:** 8 raw hex values, raw named colours, and 16 `rgb()` literals across component and Markdown CSS (2 more in generated icons).
- **Tailwind barely used:** ~2,900 CSS lines across 43 CSS files; 3 files use `@apply`; 24 Astro components, 15 of which carry global `<style>` blocks with 42 CSS imports.

Two constraints drive this decision:

1. **Markdown HTML cannot carry utility classes.** Sheet content is rendered from Markdown, so `src/styles/markdown/` must stay plain CSS.
2. **Component CSS is unlayered.** Unlayered rules beat Tailwind's `@layer utilities`, so utilities cannot override component styles today.

## Decision

### 1. Vocabulary: shadcn-compatible semantics, plus local roles

Generic UI roles use shadcn's names so pasted Tailwind/shadcn examples work. Devhints-specific roles stay local.

| Current token | New token | Role |
| --- | --- | --- |
| `--base-body` | `--background` | Page background |
| `--base-text` | `--foreground` | Body text |
| `--base-head` | `--heading` | Heading text |
| `--base-panel` | `--card` | White panel |
| `--base-card` | `--secondary` | Card fill |
| `--base-card-hover` | `--accent` | Hover/selected surface |
| `--gray-bg` | `--muted` | Subtle surface |
| `--base-mute`, `--gray-text` | `--muted-foreground` | Secondary text |
| `--line-color` | `--border` | Default border |
| `--dark-line-color` | `--border-strong` | Strong border |
| `--base-a` | `--primary`, `--ring` | Brand purple (`mildindigo-600`) |
| `--base-b` | `--link` | Link blue |
| `--base-c` | `--highlight` | Teal highlight |

`--accent` keeps shadcn's meaning (hover/selected surface), not "brand accent". Teal stays `--highlight`. `--secondary` keeps shadcn's meaning (low-emphasis filled surface), not a second brand colour.

**Canonical purple is the `mildindigo` ramp.** `--primary` and `--ring` use `mildindigo-600`. The legacy `--base-a` purple retires.

### 2. Hard rename: one vocabulary from day one

There is **no coexistence layer and no alias window**. The change lands as one rename PR:

- Delete every legacy token (`--base-*`, `--gray-*`, `--line-color`, `--dark-line-color`, `--body-bg`, `--area-width`, `--shadow2/3/6`, `--fs-*`, `--font-monospace`, `--font-system-*`, `--code-size`, `--code-line-height`).
- Update every reference (about 200 in `src/styles/`).
- Keep only the new names in `tokens.css` and `@theme`.
- Use `--color-mildindigo-*` as primitives, semantic raw variables as the component API, and `--color-*`/`--text-*`/`--radius-*`/`--shadow-*`/`--font-*` for Tailwind utilities.

The full mapping lives in the implementation plan.

### 3. Storage: raw variables plus a Tailwind bridge

- Semantic raw variables live in `:root` in `src/styles/tokens.css` and alias the `mildindigo` primitives where a brand step applies.
- The `mildindigo` palette, fonts, type scale, shadows, and radius use `@theme static` so plain CSS can read them.
- `src/styles/tailwind.css` maps semantic raw variables into Tailwind via `@theme inline`, so `bg-background`, `text-muted-foreground`, `border-border` and `var(--background)` share one value.
- `--content-width` is the raw layout token; `--container-content` is its Tailwind alias.

### 4. Type scale: Tailwind's `--text-*` namespace

The five surviving fluid steps move into `@theme static` as `clamp()` expressions that reproduce the current values; the two-slope `--fs-6` step uses `min()`.

| Current | New | Value |
| --- | --- | --- |
| `--fs-n1` | `--text-xs` | 11px → 12px |
| `--fs-0` | `--text-sm` | 13px → 14px |
| `--fs-1` | `--text-base` | 15px → 16px |
| `--fs-2` | `--text-lg` | 17px → 19px |
| — | `--text-xl` | 20px |
| — | `--text-2xl` | 24px |
| `--fs-6` | `--text-3xl` | 30px → 36px |
| — | `--text-4xl` | 40px |
| — | `--text-5xl` | 42px |
| `--fs-8` | removed with the dead `.main-heading` rules | — |

Line-height pairs are set explicitly on the new scale (`1.5`/`1.6`/`1.4`/`1.3`/`1.2`). Tailwind's defaults are ratios tuned to its own sizes (`--text-3xl--line-height` is `calc(2.25 / 1.875)`), so they would not reproduce the site's heading rhythm; the explicit ratios do. Components that set line-height explicitly keep doing so. The `text-*` utilities become the public type API, and plain CSS uses `var(--text-*)`.

### 5. Migration: incremental Tailwind, but `@apply` is encouraged

- New and touched markup uses utilities for layout, spacing, and typography.
- **`@apply` is the preferred way to apply theme tokens inside CSS.** It guarantees the declaration uses the Tailwind theme rather than a copied value, and it keeps existing component CSS readable.
- Use `var(--token)` when the token is an operand (inside `calc()`, gradients, custom properties, or a declaration `@apply` cannot express). For a font-size-only declaration, use `font-size: var(--text-*)`; `@apply text-*` also applies the paired line-height.
- A standalone CSS file that uses `@apply` must start with `@reference '/src/styles/tailwind.css';`. The build catches a missing reference.
- Plain CSS remains the home for rendered Markdown, pseudo-elements, descendant selectors, and repeated component rules.
- Markdown styles stay plain CSS permanently.

### 6. Cascade: put component CSS in `@layer components`

Each component and Markdown file wraps its own contents in `@layer components { … }` so Tailwind utilities can override them. The one exception is `src/styles/components/autocomplete.css`, which stays unlayered so it can outrank the JS-imported, unlayered `autocompleter/autocomplete.css` vendor sheet. Import-level `layer(components)` is the tidier form, but a `layer()` import of a file that uses `@reference` fails the Tailwind pass (`@source` cannot be nested), so the layer lives in the file. `base.css` is imported as a JS module, so it cannot use `@import … layer()` either; it wraps its contents in `@layer base { … }`. This is a dedicated change with a visual review of the homepage, a sheet, the archive, and 404.

### 7. Enforcement: Stylelint in CI

Stylelint is the deterministic gate. There is no hand-rolled style-validation suite.

- Add `stylelint` and `stylelint-config-recommended` as dev dependencies.
- `stylelint.config.mjs` uses built-in rules:
  - `no-unknown-custom-properties` with top-level `referenceFiles: 'src/styles/*.css'`.
  - `custom-property-pattern` for the agreed namespaces, including `--text-*--line-height`.
  - `color-no-hex`, `color-named`, `function-disallowed-list` (`rgb`, `rgba`, `hsl`, `hsla`) outside token files.
  - `declaration-property-custom-property-allowed-list` so colour, font-size, radius, shadow, and line-height declarations use the matching token family; `box-shadow` also accepts semantic colour tokens for inset borders.
  - `at-rule-no-unknown` with Tailwind's `@theme`, `@apply`, `@reference`, `@source`, `@layer`, `@utility`, `@variant`, `@custom-variant`, `@plugin`, `@config`, and `@tailwind` allowed.
  - `declaration-no-important`.
- Overrides disable colour-value rules in `tokens.css` and `tailwind.css`, which own raw values.
- `icons.generated.css` is ignored.
- A `lint:css:check` script joins `pnpm run ci` through the existing `npm:*:check` glob.

## Consequences

- One token vocabulary from the first merged change. The rename is a large mechanical diff, but there is no half-migrated state and no permanent legacy-name exception.
- Stylelint adds two dev dependencies and a config file, but replaces ad-hoc checks with an established tool and built-in rules.
- `@apply` becomes a first-class form. CSS now depends on the Tailwind theme for colour, type, radius, and shadow. Raw colour literals fail lint, and the token-family rule rejects a `var()` reference outside the declaration's family; raw sizes and radii in files not yet touched are migrated by the touch-it, rename-it rule.
- The type scale becomes a single Tailwind namespace. A few `text-*` utilities change size (`text-sm` 12.25→13–14px, `text-xl` 17.5→20px, `text-2xl` 21→24px, `text-3xl` 26.25→30–36px), and line-heights are now explicit ratios. The migration PR is screenshot-reviewed at 480/768/1280px.
- Raw radii migrate to the scale; 1px/3px collapse to 2px. This is the only intended geometry change in the token migration.
- Brand and grey normalization changes values: `--base-a` → `mildindigo-600`, the gradient → 600→400, `text-zinc-*` → semantic text, and table links `#35a` → `--link`. The migration PR lists these for screenshot review.
- After layering, utilities can override component CSS. A few existing utility/component overlaps may render differently; the layering change is reviewed on its own.
- `@theme inline` is required for the colour bridge; `@theme static` is required for the type scale, radius, shadows, fonts, and `mildindigo` palette.
- Dark mode is still out of scope, but a semantic layer makes it a later switch rather than a rewrite.
- A conventions doc (`_docs/css-conventions.md`) lands with this decision, so contributors can apply the rules before the first rename.

## History

- 2026-11-23 — decision recorded. Assessment: rlab `notes/26JDH-devhints/report-2026-1123-css-token-assessment.md`.

## Alternatives

- **Coexistence with `--base-*` aliases.** Lower initial diff, but leaves two vocabularies and a permanent migration tail. Rejected in favour of the hard rename.
- **daisyUI vocabulary** (`base-100`, `primary-content`). Simpler, but no `card`/`popover`/`input` roles and a weaker fit for docs chrome.
- **Primer-style property prefixes** (`fgColor-muted`, `bgColor-subtle`). Unambiguous, but verbose and uncommon in Tailwind examples.
- **Radix 12-step scales only.** Good colour control, but no UI-role vocabulary; overkill for 52 tokens.
- **Keep `--base-a` as the brand purple.** Keeps a second indigo family and leaves the `mildindigo` ramp as decoration.
- **Keep `--fs-*` alongside `--text-*`.** Two type scales and two ways to size text.
- **Ban `@apply`.** It removes the easiest bridge between Tailwind classes and the existing CSS, and forces a rewrite of the three files that already use it.
- **Hand-rolled Vitest style validation.** More code to own, a second baseline format, and no editor integration. Rejected for Stylelint.
- **Full utility-first rewrite.** High visual-regression risk on 2,083 lines of tuned component CSS; Markdown CSS cannot participate anyway.
