---
title: How to add translations to VitePress
link_title: VitePress translations
subtitle: Locale folders and labels
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-27
links:
  - title: Internationalization
    url: https://vitepress.dev/guide/i18n
  - title: Site config
    url: https://vitepress.dev/reference/site-config
  - title: VitePress cheatsheet
    url: ./vitepress
---

## Translations
<!-- {: .-snippets} -->

### Mirror the source tree
<!-- {: .-snippet} -->

```text
docs/
├─ guide/
│  └─ install.md    # /guide/install
└─ fr/
   └─ guide/
      └─ install.md # /fr/guide/install
```
<!-- {: data-highlight="fr/"} -->

**Puts each language in its own folder.** The root locale stays at `/` and `fr/` pages serve from `/fr/`. See [i18n](https://vitepress.dev/guide/i18n).

### Register the locales
<!-- {: .-snippet} -->

```ts
export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/'
    }
  }
})
```
<!-- {: data-highlight="locales:"} -->

**Adds a language menu to the nav bar.** `label` is the menu text and `link` the locale's first page. See [locales](https://vitepress.dev/guide/i18n).

### Translate theme labels
<!-- {: .-snippet} -->

```ts
locales: {
  fr: {
    label: 'Français',
    themeConfig: {
      outline: {
        label: 'Sur cette page'
      },
      docFooter: {
        prev: 'Précédent',
        next: 'Suivant'
      }
    }
  }
}
```
<!-- {: data-highlight="themeConfig:"} -->

**Overrides default-theme strings per locale.** The merge is shallow, so repeat each whole option object you override. See [locale config](https://vitepress.dev/guide/i18n).
