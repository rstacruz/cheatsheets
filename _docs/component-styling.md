# Component styling

Astro components carry their classes in markup. A component does not get its own CSS file. The shape is borrowed from [rstacruz/tilnotes](https://github.com/rstacruz/tilnotes).

## Shape

```astro
---
import cx from 'clsx'

const styles = {
  root: cx('TopNav__root', 'top-nav relative mb-[8px] …'),
  title: cx('TopNav__title', 'flex-auto text-xs …'),
}
---

<nav class={styles.root}>
  <div class={styles.title}>…</div>
</nav>
```

Each `styles` entry starts with a stable `ComponentName__part` hook, as in tilnotes. The hook carries no CSS; it names the rendered part for debugging and tests. Keep existing hooks that code outside the component depends on.

## Rules

1. One `styles` key per rendered part, starting with its BEM-like hook; one class string per concern inside it (`cx('…', '…')` when a variant or media block changes).
2. Component styling uses utilities on the element: no CSS file, no `@apply`, and no `<style>` block except the cases in Where CSS still belongs.
3. A media query becomes an arbitrary variant (`max-[480px]:`, `min-[481px]:`, `min-[769px]:`, `min-[1232px]:`, `max-[1264px]:`); pixel breakpoints stay out of the theme.
4. Conditional colours use `group`/`group-hover:` on a child instead of a descendant selector on the parent.
5. `svg` is `display:block` after preflight, so icons get `[&>svg]:inline-block [&>svg]:align-middle` on their wrapper or `[&_svg]:…` on the part that owns them.
6. Gradients use `bg-linear-[15deg,var(--a),var(--b)]`; gradient→solid hovers add `bg-none` (`hover:bg-*` alone only sets `background-color`, leaving the image on top).
7. Colour utilities live in `@layer utilities`, which outranks `base.css`'s `a`, `a:visited`, and `a:hover` rules, so a `text-*` utility on an anchor pins every link state; add `hover:text-*` only where the colour actually changes.
8. Theme changes never appear in a `styles` map: utilities read semantic roles, and `light-dark()` stays in the token layer.

## Where CSS still belongs

| Place | Holds |
| --- | --- |
| `src/styles/markdown/` | rendered Markdown prose |
| `src/styles/vendor/` | vendor DOM overrides (`autocomplete`, `headline-pub`, `hint.css`) |
| a component `<style is:global>` | keyframes and imports of Markdown or vendor sheets |

## Checking

- `pnpm lint:css:check` gates CSS tokens (and runs in `pnpm run ci`).
- The absence guard in `src/styles/cssLayout.test.ts` fails if a per-component CSS directory returns or an `.astro` file imports one.
- Utilities are checked on the rendered page, not by reading the class string.
