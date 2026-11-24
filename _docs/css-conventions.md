# CSS conventions

How to reach for a colour, a font size, or a radius. The decision behind these
rules is [ADR 002](adrs/adr-002-design-tokens-and-tailwind.md).

## Token tiers

| Tier | Lives in | Use in |
| --- | --- | --- |
| Primitives (`--color-mildindigo-600`) | `src/styles/tailwind.css` | Token files only |
| Semantic roles (`--background`, `--primary`, `--muted-foreground`) | `src/styles/tokens.css` | Component and Markdown CSS |
| Type scale (`--text-base`, `--text-base--line-height`) | `src/styles/font-scale.css` | `font-size` and `text-*` utilities |
| Tailwind colour aliases (`--color-primary`) | `src/styles/tailwind.css` | Utilities and `@apply` |

Components ask for the role, never the ramp step: `var(--primary)`, not
`var(--color-mildindigo-600)`.

## Theming

`tokens.css` owns the theme switch. Each semantic role holds one
`light-dark(light, dark)` pair, and `:root` sets `color-scheme: light dark` so
the OS preference resolves it. An absent `data-theme` means System; `light` or
`dark` on `:root` pins the scheme. The `@theme inline` bridge passes the
resolved value to utilities, so `bg-card` and Markdown's `var(--card)` switch
together.

There are no `dark:` utilities or component theme branches. Components ask for
a role; `light-dark()` stays in the token layer. It needs Chrome 123+, Safari
17.5+, or Firefox 120+.

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
- Each component and Markdown file wraps its own contents in
  `@layer components { … }`. Import-level `layer(components)` is not used: a
  `layer()` import of a file that uses `@reference` fails the build (`@source`
  cannot be nested).
- Unlayered CSS beats every utility. Do not add it, with one exception:
  `src/styles/vendor/autocomplete.css` stays unlayered to outrank the
  unlayered `autocompleter/autocomplete.css` vendor sheet it overrides.
- A component class must not reuse a Tailwind utility name: utilities beat
  components regardless of specificity, so a colliding hook changes layout.
  When the collision comes from markup we do not control, put the counter-rule
  in `@layer utilities`; a components-layer rule cannot win.

## Component styling

Components use Tailwind utilities in markup, with no matching CSS file. Component `<style>` blocks only declare keyframes or import Markdown/vendor sheets. See [component styling](component-styling.md) for the shape and rules.

Rendered Markdown prose lives in `src/styles/markdown/` (`h2`/`h3` sections,
`snippet`, `hint-mark`, typography).

## Stylelint

The config states the target, not today's tree. Existing violations are
baselined in `stylelint-suppressions.json`, so the gate fails only on new ones.

```sh
pnpm lint:css:check   # new violations; runs in pnpm run ci
pnpm lint:css         # apply safe fixes
```

Colour, font family, font size, letter-spacing, and radius must come from a
token; the gate rejects raw values for those families. Raw colour literals are
allowed only in `tokens.css` and `tailwind.css` (`icons.generated.css` is
ignored). `line-height` may stay a unitless number; a `var()` there must be a
`--leading-*` token. Unknown tokens, a token from the wrong family, and
`!important` fail. The namespace pattern also rejects most retired names, but
it cannot know the whole old vocabulary; never reintroduce one. Descending
specificity fails too.

Fix the code when a rule fires. Do not add entries to the suppressions file to
let new code through.

For a genuinely unavoidable exception, disable the rule at that line and say
why:

```css
/* stylelint-disable-next-line <rule> -- why this one must stay */
```

A recorded count is a ceiling, not a live total: the check only compares
against it, so fixing one occurrence does not lower it, and a new one can slip
in under it. Once the check is green, refresh the baseline so the counts match
what is left:

```sh
pnpm lint:css:baseline
```

Adding a rule to the gate uses the same command with `--suppress=<rule>`, which
baselines that rule alone:

```sh
pnpm exec stylelint "src/styles/**/*.css" --suppress=<rule> --suppress-location=stylelint-suppressions.json
```

## Touch it, rename it

When you edit a file that still uses a legacy name or a raw value, migrate that
file in the same change. Do not add a new use of a legacy name, an alias, or a
`!important` override to win the cascade.
