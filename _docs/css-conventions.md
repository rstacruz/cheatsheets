# CSS conventions

How to reach for a colour, a font size, or a radius. The decision behind these
rules is [ADR 002](adrs/adr-002-design-tokens-and-tailwind.md).

## Token tiers

| Tier | Lives in | Use in |
| --- | --- | --- |
| Primitives (`--color-mildindigo-600`) | `src/styles/tailwind.css` | Token files only |
| Semantic roles (`--background`, `--primary`, `--text-base`) | `src/styles/tokens.css`, `src/styles/font-scale.css` | Component and Markdown CSS |
| Tailwind aliases (`--color-primary`, `--text-base`) | `src/styles/tailwind.css` | Utilities and `@apply` |

Components ask for the role, never the ramp step: `var(--primary)`, not
`var(--color-mildindigo-600)`.

## Choosing a form

| Situation | Form |
| --- | --- |
| New or touched markup | Utility classes: `bg-card`, `text-muted-foreground`, `rounded-lg` |
| Colour, radius, or shadow in CSS | `@apply text-muted-foreground;` |
| Token is an operand (`calc()`, gradient, custom property) | `var(--token)` |
| Font size only, keeping the current line-height | `font-size: var(--text-sm);` |

`@apply text-*` also applies the paired line-height. Use it when the whole type
style should come along; use `font-size: var(--text-*)` when only the size
should change.

`@apply` is the preferred bridge for theme values: it keeps the declaration
bound to the Tailwind theme, so a token change propagates. Reach for raw
`var()` only when `@apply` cannot express the declaration or hides the intent.

Arbitrary values are for layout one-offs that have no token: `mt-[30svh]`. Do not
add arbitrary colours, font sizes, radii, or shadows.

## `@reference`

A standalone CSS file that uses `@apply` starts with:

```css
@reference '/src/styles/tailwind.css';
```

The build fails without it. One line per file, above the first rule.

## Layers

Tailwind declares `theme, base, components, utilities`. Styles land in layers so
utilities can override them:

- `src/styles/base.css` wraps its contents in `@layer base { … }`.
- Each file in `src/styles/components/` and `src/styles/markdown/` wraps its
  contents in `@layer components { … }`. The `<style is:global>` blocks import
  them plainly: a `layer()` import of a file that uses `@reference` fails the
  build (`@source` cannot be nested).
- Unlayered CSS beats every utility. Do not add it.

## Stylelint

```sh
pnpm lint:css:check   # report violations; runs in pnpm ci
pnpm lint:css         # fix what can be fixed automatically
```

Rule of thumb: raw values fail. Hex colours, `rgb()`, `hsl()`, named colours,
unknown custom properties, and a token from the wrong family (a `--radius-*` in
`color`) are CI errors. Only `tokens.css` and `tailwind.css` hold raw values.

Shorthand declarations can trip the allowed-list. Tune
`declaration-property-custom-property-allowed-list` for that property family;
never add a global disable.

## Touch it, rename it

When you edit a file that still uses a legacy name or a raw value, migrate that
file in the same change. Do not add a new use of a legacy name, an alias, or a
`!important` override to win the cascade.
