---
title: How to use Starlight components in MDX
link_title: Starlight MDX components
subtitle: Steps, tabs and trees
category: JavaScript libraries
layout: snippet
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: Using components
    url: https://starlight.astro.build/components/using-components/
  - title: Steps
    url: https://starlight.astro.build/components/steps/
---

## Components
<!-- {: .-snippets} -->

### Rename the page to .mdx
<!-- {: .-snippet} -->

```bash
mv src/content/docs/install.md \
  src/content/docs/install.mdx
```
<!-- {: data-highlight="install.mdx"} -->

**Makes the page accept JSX.** A `.md` file prints component tags literally instead of rendering them; see [using components](https://starlight.astro.build/components/using-components/).

### Import the components
<!-- {: .-snippet} -->

```jsx
import { Steps, Tabs, TabItem } from
  '@astrojs/starlight/components'
```
<!-- {: data-highlight="@astrojs/starlight/components"} -->

**Pulls the built-ins into the page.** Components ship in that package, plus your own `.astro` files; see [using components](https://starlight.astro.build/components/using-components/).

### Number a list with Steps
<!-- {: .-snippet} -->

```jsx
<Steps>

1. Install the package.
2. Restart your shell.

</Steps>
```
<!-- {: data-highlight="<Steps>"} -->

**Renders a styled step list.** Keep the blank lines so the Markdown list is parsed inside the wrapper; see [Steps](https://starlight.astro.build/components/steps/).

### Add tabs
<!-- {: .-snippet} -->

```jsx
<Tabs>
  <TabItem label="React">React</TabItem>
  <TabItem label="Vue">Vue</TabItem>
</Tabs>
```
<!-- {: data-highlight="<Tabs>"} -->

**Shows alternatives in one card.** Add `syncKey` to keep matching tabs in step across the page; see [Tabs](https://starlight.astro.build/components/tabs/).

### Draw a file tree
<!-- {: .-snippet} -->

```jsx
<FileTree>

- src/
  - index.ts
- package.json

</FileTree>
```
<!-- {: data-highlight="<FileTree>"} -->

**Styles a nested list as a tree.** Folders and extensions get icons, and a trailing slash marks a directory; see [FileTree](https://starlight.astro.build/components/file-tree/).
