---
title: How to override a Starlight component
link_title: Starlight component override
subtitle: Replace built-in UI
logo: { src: /assets/logos/astro.svg }
category: JavaScript libraries
layout: snippet
updated: 2026-11-28
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: Overriding components
    url: https://starlight.astro.build/guides/overriding-components/
  - title: Overrides reference
    url: https://starlight.astro.build/reference/overrides/
---

## Overriding
<!-- {: .-snippets} -->

### Point Starlight at your component
<!-- {: .-snippet} -->

```js
starlight({
  components: {
    SocialIcons: './src/components/Social.astro',
  },
})
```
<!-- {: data-highlight="components:"} -->

**Swaps a component,** a built-in one for yours. The key is the override name, not the default file's path; See [overrides](https://starlight.astro.build/guides/overriding-components/).

### Wrap the default component
<!-- {: .-snippet} -->

```jsx
---
import Default from
'@astrojs/starlight/components/SocialIcons.astro'
---

<a href="mailto:docs@example.com">Email</a>
<Default><slot /></Default>
```
<!-- {: data-highlight="<Default>"} -->

**Keeps the built-in UI,** and adds to it. Import the original and render `<slot />` so children survive; See [reuse a component](https://starlight.astro.build/guides/overriding-components/#reuse-a-built-in-component).

### Read the page data
<!-- {: .-snippet} -->

```jsx
---
const { entry } = Astro.locals.starlightRoute
---

<h1 id="_top">{entry.data.title}</h1>
```
<!-- {: data-highlight="Astro.locals.starlightRoute"} -->

**Gives overrides the current page.** `entry.data` holds frontmatter and `id` holds the route; see [route data](https://starlight.astro.build/guides/route-data/).
