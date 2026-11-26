---
title: Starlight
subtitle: Documentation theme for Astro
category: JavaScript libraries
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
tier: t2
fragments:
  - "starlight"
  - "create astro"
  - "--template"
  - "astro.config.mjs"
  - "src/content/docs"
  - "docsLoader()"
  - "docsSchema()"
  - "sidebar:"
  - "autogenerate"
  - "collapsed: true"
  - "customCss"
  - "sl-color-accent"
  - ":::note"
  - "template: splash"
  - "pagefind"
  - "components:"
keywords:
  - starlight astro
  - starlight sidebar
  - astro docs theme
  - starlight custom css
  - astro starlight i18n
intro: |
  [Starlight](https://starlight.astro.build) is Astro's documentation theme: setup, config, sidebar, content, theming and i18n.
links:
  - title: Starlight documentation
    url: https://starlight.astro.build/
  - title: Configuration reference
    url: https://starlight.astro.build/reference/configuration/
  - title: GitHub repository
    url: https://github.com/withastro/starlight
---

## Getting started

### Scaffold

```bash
pnpm create astro --template starlight
```
<!-- {: data-highlight="starlight"} -->

The template adds the Starlight integration, the `docs` content collection, and a starter page.

See: [Getting started](https://starlight.astro.build/getting-started/)

### Scripts

```bash
pnpm dev
pnpm build
pnpm preview
```
<!-- {: data-highlight="pnpm dev"} -->

`dev` serves on port 4321, `build` writes `dist/`, and `preview` serves that build. Add Starlight to an existing Astro project with `pnpm astro add starlight` instead.

See: [Manual setup](https://starlight.astro.build/manual-setup/)

### Project files

| File | Purpose |
| --- | --- |
| `astro.config.mjs` | Starlight options |
| `src/content.config.ts` | `docs` collection |
| `src/content/docs/` | One page per file |
| `src/styles/` | Optional custom CSS |
<!-- {: .-headers} -->

Pages are Markdown or MDX; the file path becomes the URL, so `guides/install.md` serves `/guides/install/`.

See: [Project structure](https://starlight.astro.build/guides/project-structure/)

### Content config

```ts
import { defineCollection } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
}
```
<!-- {: data-highlight="docsLoader()"} -->

Starlight needs a `docs` collection with these exports; the scaffold writes this file.

See: [Content collections](https://starlight.astro.build/manual-setup/#configure-content-collections)

### Add a page

```md
---
title: Install
description: Install the Acme CLI.
---

Run `pnpm add -D acme` in your project.
```

`title` is the only required field. The H1 comes from it, so start body content at H2.

See: [Frontmatter reference](https://starlight.astro.build/reference/frontmatter/)

## Configuration

### Minimal config

```js
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [starlight({ title: 'Acme Docs' })],
})
```
<!-- {: data-highlight="starlight({ title: 'Acme Docs' })"} -->

Everything else is optional; the integration renders the header, sidebar, table of contents and search.

See: [Configuration reference](https://starlight.astro.build/reference/configuration/)

### Site metadata

```js
export default defineConfig({
  site: 'https://docs.example.com',
  integrations: [starlight({ title: 'Acme Docs' })],
})
```
<!-- {: data-highlight="site:"} -->

`site` sets canonical URLs and turns on the sitemap. Set `description` in Starlight options or per page in frontmatter.

See: [site](https://docs.astro.build/en/reference/configuration-reference/#site)

### Header and footer

```js
starlight({
  logo: { src: './src/assets/logo.svg' },
  social: [
    {
      icon: 'github',
      label: 'GitHub',
      href: 'https://github.com/acme',
    },
  ],
  editLink: {
    baseUrl: 'https://github.com/acme/docs/edit/main/',
  },
  lastUpdated: true,
})
```
<!-- {: data-highlight="editLink"} -->

`editLink.baseUrl` is the repository root, not the docs folder: Starlight appends `src/content/docs/…`. `lastUpdated` reads Git history, so shallow clones lose the dates.

See: [Edit links](https://starlight.astro.build/guides/customization/#edit-links)

### Head tags

```js
starlight({
  head: [
    {
      tag: 'script',
      attrs: { src: 'https://cdn.example.com/a.js', defer: true },
    },
  ],
})
```
<!-- {: data-highlight="head:"} -->

Entries become plain HTML tags, unprocessed by Astro. Import local assets by overriding the `Head` component instead.

See: [head](https://starlight.astro.build/reference/configuration/#head)

### Redirects

```js
export default defineConfig({
  redirects: {
    '/install/': '/guides/install/',
  },
  integrations: [starlight({ title: 'Acme Docs' })],
})
```
<!-- {: data-highlight="redirects:"} -->

Astro writes a meta-refresh page for each entry, which works on static hosts without server config.

See: [Redirects](https://docs.astro.build/en/guides/routing/#redirects)

## Sidebar

### Groups and links

```js
starlight({
  sidebar: [
    { label: 'Home', link: '/' },
    {
      label: 'Guides',
      items: ['guides/install', 'guides/deploy'],
    },
    { label: 'GitHub', link: 'https://github.com/acme' },
  ],
})
```
<!-- {: data-highlight="sidebar:"} -->

Strings in `items` are page slugs. Use `link` for external URLs and pages outside `src/content/docs/`.

See: [Sidebar navigation](https://starlight.astro.build/guides/sidebar/)

### Autogenerate

```js
starlight({
  sidebar: [
    {
      label: 'Reference',
      items: [{ autogenerate: { directory: 'reference' } }],
    },
  ],
})
```
<!-- {: data-highlight="autogenerate"} -->

Every page and subfolder under `src/content/docs/reference/` becomes a link, sorted by filename unless frontmatter sets an order.

See: [Autogenerated links](https://starlight.astro.build/guides/sidebar/#autogenerated-links)

### Order and hide

#### Order

```yaml
---
title: Install
sidebar:
  order: 1
---
```
<!-- {: data-highlight="order: 1"} -->

#### Hide

```yaml
---
title: Deprecated API
sidebar:
  hidden: true
---
```
<!-- {: data-highlight="hidden: true"} -->

`order` only affects autogenerated groups; lower numbers come first. `hidden` keeps the URL reachable but drops the link from the sidebar.

See: [Sidebar frontmatter](https://starlight.astro.build/reference/frontmatter/#sidebar)

### Badges

```yaml
---
title: Beta
sidebar:
  badge:
    text: New
    variant: tip
---
```
<!-- {: data-highlight="badge:"} -->

Badges also work on config groups, and `variant` takes `note`, `tip`, `caution`, `danger`, `success` or `default`.

See: [Badges](https://starlight.astro.build/guides/sidebar/#badges)

## Content

### Asides

```md
:::note
The CLI needs Node 22 or newer.
:::
```
<!-- {: data-highlight=":::note"} -->

#### Custom title

```md
:::tip[Did you know?]
Asides accept **Markdown** and code blocks.
:::
```
<!-- {: data-highlight=":::tip[Did you know?]"} -->

Types are `note`, `tip`, `caution` and `danger`. Add an icon with `:::tip{icon="heart"}`.

See: [Asides](https://starlight.astro.build/guides/authoring-content/#asides)

### Code blocks

```js {2-3} title="src/app.js"
const count = 1
console.log(count)
console.log(count + 1)
```

Expressive Code is on by default: `{2-3}` highlights lines, `title="…"` adds a filename, and `sh` fences render as a terminal window.

See: [Code blocks](https://starlight.astro.build/guides/authoring-content/#code-blocks)

### Components

```jsx
import { Steps } from '@astrojs/starlight/components'

<Steps>

1. Run the installer.
2. Restart your shell.

</Steps>
```
<!-- {: data-highlight="<Steps>"} -->

Built-in components need `.mdx` or Markdoc. A `.md` file prints the tags literally, so rename the page first.

See: [Using components](https://starlight.astro.build/components/using-components/)

### Splash page

```yaml
---
title: Acme Docs
template: splash
hero:
  title: Acme Docs
  tagline: Everything you need to run Acme.
  actions:
    - text: Get started
      link: /guides/install/
      icon: right-arrow
---
```
<!-- {: data-highlight="template: splash"} -->

`template: splash` drops both sidebars and widens the page, which suits landing pages and custom 404s.

See: [Hero](https://starlight.astro.build/reference/frontmatter/#hero)

### Draft pages

```yaml
---
title: Next release notes
draft: true
---
```
<!-- {: data-highlight="draft: true"} -->

Drafts build locally but are left out of production builds, along with their sidebar and search entries.

See: [draft](https://starlight.astro.build/reference/frontmatter/#draft)

## Theming

### Custom CSS

#### Config

```js
starlight({
  customCss: ['./src/styles/custom.css'],
})
```
<!-- {: data-highlight="customCss:"} -->

#### CSS

```css
:root {
  --sl-content-width: 50rem;
}
```
<!-- {: data-highlight="--sl-content-width"} -->

Starlight uses cascade layers, so unlayered custom CSS wins over its defaults without `!important`.

See: [Custom CSS](https://starlight.astro.build/guides/css-and-tailwind/#custom-css-styles)

### Accent colors

```css
:root {
  --sl-color-accent-low: #131e4f;
  --sl-color-accent: #3447ff;
  --sl-color-accent-high: #b3c7ff;
}

:root[data-theme='light'] {
  --sl-color-accent-low: #d8ddff;
  --sl-color-accent: #2337ff;
  --sl-color-accent-high: #0d1d66;
}
```
<!-- {: data-highlight="--sl-color-accent"} -->

Dark mode is the base `:root`; override `[data-theme='light']` separately. `-low` fills backgrounds, `-accent` colors links, and `-high` covers hover and emphasis.

See: [Theming](https://starlight.astro.build/guides/css-and-tailwind/#theming)

### Fonts and layout

```css
:root {
  --sl-font: 'Inter', sans-serif;
  --sl-font-mono: 'JetBrains Mono', monospace;
  --sl-sidebar-width: 20rem;
  --sl-content-width: 50rem;
}
```
<!-- {: data-highlight="--sl-font"} -->

Load the font files yourself, for example with `@fontsource-variable/inter` in `customCss`.

See: [props.css](https://github.com/withastro/starlight/blob/main/packages/starlight/style/props.css)

## Internationalization

### Locales

```js
starlight({
  defaultLocale: 'root',
  locales: {
    root: { label: 'English', lang: 'en' },
    fr: { label: 'Français' },
  },
})
```
<!-- {: data-highlight="locales:"} -->

Root-locale pages stay in `src/content/docs/`; French pages go in `src/content/docs/fr/`. With a root locale, `defaultLocale` must be `'root'`.

See: [i18n](https://starlight.astro.build/guides/i18n/)

### UI strings

#### Content config

```ts
import { defineCollection } from 'astro:content'
import { docsLoader, i18nLoader } from
  '@astrojs/starlight/loaders'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
}
```
<!-- {: data-highlight="i18n:"} -->

#### Translation file

```json
{
  "search.label": "Rechercher",
  "tableOfContents.onThisPage": "Sur cette page"
}
```
<!-- {: data-highlight="search.label"} -->

Save strings as `src/content/i18n/<locale>.json`, keeping the keys in English.

See: [Translate the UI](https://starlight.astro.build/guides/i18n/#translate-starlights-ui)

### Fallback content

```text
src/content/docs/
├── guides/install.md
└── fr/guides/install.md
```

Pages without a translation fall back to the default locale and show a notice above the content.

See: [Fallback content](https://starlight.astro.build/guides/i18n/#fallback-content)

## Extending

### Override a component

#### Config

```js
starlight({
  components: {
    SocialIcons: './src/components/SocialIcons.astro',
  },
})
```
<!-- {: data-highlight="components:"} -->

#### Component

```jsx
---
import Default from '@astrojs/starlight/components/SocialIcons.astro'
---

<a href="mailto:docs@example.com">Email</a>
<Default><slot /></Default>
```

Import the default component to wrap it, and keep `<slot />` so children still render.

See: [Overriding components](https://starlight.astro.build/guides/overriding-components/)

### Route data

```jsx
---
const { entry, id } = Astro.locals.starlightRoute
---

<h1 id="_top">{entry.data.title}</h1>
<p>Route: {id || 'home'}</p>
```
<!-- {: data-highlight="Astro.locals.starlightRoute"} -->

Override `PageTitle` or `Footer` and branch on `starlightRoute` to change only some pages.

See: [Route data](https://starlight.astro.build/guides/route-data/)

### Search

```js
starlight({
  pagefind: false,
})
```
<!-- {: data-highlight="pagefind: false"} -->

Starlight indexes the site with Pagefind at build time, so search is missing in `dev` and appears in `preview`. Set `pagefind: false` to remove the UI and index.

See: [Site search](https://starlight.astro.build/guides/site-search/)

## Also see

- [Vite cheatsheet](./vite)
- [Markdown cheatsheet](./markdown)
- [Astro documentation](https://docs.astro.build)
