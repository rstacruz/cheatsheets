# ADR 002 — Design tokens and Tailwind

- **Status:** Accepted — 2026-11-23

## Context

The stylesheet predates Tailwind. It grew two token vocabularies (`--base-a` next to Tailwind's `--color-mildindigo-*`), duplicate values under different names, a private `--fs-*` type scale, and raw colours. Nothing said which names to use, and nothing enforced the rule.

Tailwind v4 is the build engine, so the design system can live in its theme instead of a parallel set of variables. One constraint shapes the split: sheet bodies render from Markdown and cannot carry utility classes, so `src/styles/markdown/` must stay plain CSS.

## Decision

1. **Semantic tokens are the component API.** Generic UI roles use shadcn's names (`background`, `foreground`, `card`, `muted`, `border`, `ring`, `primary`); devhints-specific roles stay local (`heading`, `link`, `highlight`, `syntax-*`). The `mildindigo` ramp is the brand primitive. Components ask for a role, never a ramp step or a raw value.
2. **One vocabulary; no aliases.** Legacy names are deleted in the same change that introduces the roles. An alias window would make "which name?" permanent.
3. **Tailwind is the bridge, not the source of truth.** Semantic variables live in `:root`; `@theme inline` maps them to utilities (`bg-card`, `text-muted-foreground`); `@theme static` keeps primitives and scales readable from plain CSS. Utilities are the default for new and touched markup; plain CSS remains for Markdown, pseudo-elements, and structural rules. The end state is an Astro component styled with utilities and no matching CSS file: no per-component CSS directory remains, rendered Markdown prose stays in `src/styles/markdown/`, vendor overrides live in `src/styles/vendor/`, and `<style>` blocks hold keyframes only. See [component styling](../component-styling.md) for the convention.
4. **One type scale, in Tailwind's namespace.** `--text-*` holds the fluid steps as `clamp()` with explicit line-height ratios. There is no second scale.
5. **`@apply` is encouraged inside CSS** for theme-driven declarations. Use `var(--token)` when the token is an operand or when `@apply` hides the intent, and `font-size: var(--text-*)` when only the size should change, because `text-*` also applies its line-height. A file using `@apply` starts with `@reference '/src/styles/tailwind.css';`.
6. **Component CSS is layered.** `base.css` sits in `@layer base`; component and Markdown CSS sit in `@layer components`, so utilities can override them without `!important`. Documented exceptions are fine when a vendor sheet cannot be layered.
7. **The lint gate states the target, not the current tree.** Stylelint encodes these rules: token families for colour, type, and radius; no unknown tokens; no `!important`. Existing violations live in a committed suppressions file; new code must pass. No hand-rolled validation suite.

## Consequences

- Retheming becomes a token edit; components do not change.
- The rename is a large mechanical diff with no half-migrated state.
- A few utilities change size and leading where the old rem scale disagreed with the new one; review screenshots when touching them.
- Markdown CSS stays plain CSS permanently.
- Dark mode becomes a token-layer change later, not a rewrite.
- Suppressions are debt: fix the old occurrence and shrink the file.

## Alternatives

- **Keep `--base-*` as the brand** — leaves two indigo families and the question "which name?".
- **daisyUI, Primer, or Radix vocabularies** — fewer UI roles, verbose names, or no role vocabulary at all.
- **Keep `--fs-*` beside `--text-*`** — two type scales, two ways to size text.
- **Ban `@apply`** — removes the bridge and forces a rewrite of the CSS that already uses it.
- **Match the lint rules to today's CSS** — that is how the current drift accumulated.
- **Full utility-first rewrite** — high visual risk on tuned CSS; Markdown cannot participate.

## History

- 2026-11-23 — decision recorded. Assessment: rlab `notes/26JDH-devhints/report-2026-1123-css-token-assessment.md`.
- 2026-11-24 — token vocabulary and Stylelint (#2446), cascade layers (#2447).
- 2026-11-24 — component CSS migrated to Tailwind utilities in a single PR; convention recorded in `../component-styling.md`.
