---
title: Starlight
subtitle: Documentation theme for Astro
logo: { src: /assets/logos/astro.svg }
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

`editLink.baseUrl` is the project root in the repository: Starlight appends `src/content/docs/…`, so include a subdirectory when the project is not at the repo root. `lastUpdated` reads Git history, so shallow clones lose the dates.

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

Every page under `src/content/docs/reference/` becomes a link and each subfolder becomes a nested group, sorted by filename unless frontmatter sets an order.

See: [Autogenerated links](https://starlight.astro.build/guides/sidebar/#autogenerated-links)

### Order and hide

#### Order

```yaml
---
title: Deploy
sidebar:
  order: 2
---
```
<!-- {: data-highlight="order: 2"} -->

#### Hide

```yaml
---
title: Legacy API
sidebar:
  hidden: true
---
```
<!-- {: data-highlight="hidden: true"} -->

`order` only affects autogenerated groups; lower numbers come first. `hidden` drops the link from autogenerated groups but keeps the URL reachable, and it does not remove an explicit `sidebar` entry.

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

#### Basic

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

````md
```js {2-3} title="src/app.js"
const count = 1
console.log(count)
console.log(count + 1)
```
````
<!-- {: data-highlight="{2-3}"} -->

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
title: Unreleased notes
draft: true
---
```
<!-- {: data-highlight="draft: true"} -->

Drafts render in `dev` but are left out of builds, along with their sidebar and search entries.

See: [draft](https://starlight.astro.build/reference/frontmatter/#draft)

## Theming
<!-- {: .-three-column} -->

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
  --sl-color-accent-low: #0f3f3f;
  --sl-color-accent: #14b8a6;
  --sl-color-accent-high: #a7f3d0;
}

:root[data-theme='light'] {
  --sl-color-accent-low: #ccfbf1;
  --sl-color-accent: #0f766e;
  --sl-color-accent-high: #134e4a;
}
```
<!-- {: data-highlight="--sl-color-accent-low; --sl-color-accent:; --sl-color-accent-high"} -->

Dark mode is the base `:root`; the `[data-theme='light']` block overrides it. `-low` fills backgrounds, `-high` colors links in dark mode, and `-accent` does that in light mode.

See: [Theming](https://starlight.astro.build/guides/css-and-tailwind/#theming)

### Fonts and layout

```css
:root {
  --sl-font: 'Inter', sans-serif;
  --sl-font-mono: 'JetBrains Mono';
  --sl-sidebar-width: 20rem;
  --sl-content-width: 50rem;
}
```
<!-- {: data-highlight="--sl-font:; --sl-font-mono; --sl-sidebar-width"} -->

These properties set body type, code type, sidebar width and content width.

See: [props.css](https://github.com/withastro/starlight/blob/main/packages/starlight/src/style/props.css)

## Internationalization
<!-- {: .-three-column} -->

### Locales

```js
starlight({
  defaultLocale: 'root',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    fr: { label: 'Français' },
  },
})
```
<!-- {: data-highlight="locales:"} -->

Root-locale pages stay in `src/content/docs/`; French pages go in `src/content/docs/fr/`. With a root locale, omit `defaultLocale` or set it to `'root'`.

See: [i18n](https://starlight.astro.build/guides/i18n/)

### UI strings

#### src/content.config.ts

```ts
import { defineCollection } from
  'astro:content'
import { docsLoader, i18nLoader } from
  '@astrojs/starlight/loaders'
import { docsSchema, i18nSchema } from
  '@astrojs/starlight/schema'

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

#### src/content/i18n/fr.json

```json
{
  "search.label": "Rechercher",
  "page.editLink": "Modifier"
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
<!-- {: .-one-column} -->

- [Starlight sidebar order cheatsheet](./starlight-sidebar-order)
- [Starlight hide page cheatsheet](./starlight-hide-page)
- [Starlight theme colors cheatsheet](./starlight-theme-colors)
- [Starlight redirects cheatsheet](./starlight-redirects)
- [Starlight search cheatsheet](./starlight-pagefind-search)
- [Starlight component override cheatsheet](./starlight-override-component)
- [Starlight MDX components cheatsheet](./starlight-mdx-components)
- [Starlight i18n cheatsheet](./starlight-i18n)
- [Vite cheatsheet](./vite)
- [Markdown cheatsheet](./markdown)
- [Astro documentation](https://docs.astro.build)
