# Component styling

Every Astro component carries its own classes in its markup; per-component CSS
files are not added. The shape is borrowed from
[rstacruz/tilnotes](https://github.com/rstacruz/tilnotes).

## Shape

```astro
---
import cx from 'clsx'

const styles = {
  root: 'top-nav relative mb-2 …',
  title: 'flex-auto text-xs …',
}
---

<nav class={styles.root}>
  <div class={styles.title}>…</div>
</nav>
```

## Rules

Rules, applied everywhere:

1. One `styles` key per rendered part; one class string per concern inside it (`cx('…', '…')` when a variant or media block changes).
2. Utilities replace declarations one-to-one. No `@apply`, no `<style>` unless listed in Design → Remaining CSS.
3. A media query becomes an arbitrary variant (`max-[480px]:`, `min-[481px]:`, `min-[769px]:`, `min-[1232px]:`, `max-[1264px]:`); legacy pixel breakpoints are not added to the theme.
4. Conditional colours use `group`/`group-hover:` on a child instead of a descendant selector on the parent.
5. `svg` is `display:block` after preflight, so icons get `[&>svg]:inline-block [&>svg]:align-middle` on their wrapper or `[&_svg]:…` on the part that owns them.
6. Gradients use `bg-linear-[15deg,var(--a),var(--b)]`; gradient→solid hovers add `bg-none` (`hover:bg-*` alone only sets `background-color`, leaving the image on top).
7. Colour utilities live in `@layer utilities`, which outranks `base.css`'s `a`, `a:visited`, and `a:hover` rules, so a `text-*` utility on an anchor pins every link state; add `hover:text-*` only where the colour actually changes.

## Where CSS still belongs

| Place | Holds |
| --- | --- |
| `src/styles/markdown/` | rendered Markdown prose |
| `src/styles/vendor/` | vendor DOM overrides (`autocomplete`, `headline-pub`, `hint.css`) |
| a component `<style is:global>` | keyframes only |

## Checking

- `pnpm lint:css:check` gates CSS tokens (and runs in `pnpm run ci`).
- The absence guard in `src/styles/cssLayout.test.ts` fails if a per-component CSS directory returns or an `.astro` file imports one.
- Verify utilities on the rendered page; a class string in source does not prove the rule reached the element.
