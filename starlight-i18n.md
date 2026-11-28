---
title: How to add translations in Starlight
link_title: Starlight i18n
subtitle: Multilingual docs
logo: { src: /assets/logos/astro.svg }
category: JavaScript libraries
layout: snippet
created_at: 2026-11-27
updated: 2026-11-27
last_verified_with: "Starlight 0.43.2, Astro 7.4.13."
links:
  - title: Internationalization
    url: https://starlight.astro.build/guides/i18n/
  - title: Frontmatter reference
    url: https://starlight.astro.build/reference/frontmatter/
---

## Translating
<!-- {: .-snippets} -->

### Configure the locales
<!-- {: .-snippet} -->

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

**Adds a language picker.** With a `root` locale, pages for it stay in `src/content/docs/`; see [i18n](https://starlight.astro.build/guides/i18n/).

### Copy a page into a locale
<!-- {: .-snippet} -->

```bash
mkdir -p src/content/docs/fr
cp src/content/docs/install.md \
  src/content/docs/fr/install.md
```
<!-- {: data-highlight="src/content/docs/fr"} -->

**Serves the page under `/fr/`.** Keep the same filename across locales so they pair up; see [i18n](https://starlight.astro.build/guides/i18n/).

### Translate the UI labels
<!-- {: .-snippet} -->

#### src/content.config.ts

```ts
import { defineCollection } from 'astro:content'
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
<!-- {: data-highlight="i18nLoader()"} -->

#### src/content/i18n/fr.json

```json
{
  "search.label": "Rechercher",
  "page.editLink": "Modifier"
}
```
<!-- {: data-highlight="search.label"} -->

**Localizes Starlight's own strings.** Keys stay in English and known locales are built in; see [translate the UI](https://starlight.astro.build/guides/i18n/#translate-starlights-ui).
