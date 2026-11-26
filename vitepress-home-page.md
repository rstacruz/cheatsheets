---
title: How to build a VitePress home page
link_title: VitePress home page
subtitle: Hero, actions and feature cards
category: JavaScript libraries
layout: snippet
tier: t3
last_verified_with: "VitePress 1.6.4, Node 26.13.1."
updated: 2026-11-27
links:
  - title: Home page
    url: https://vitepress.dev/reference/default-theme-home-page
  - title: Frontmatter config
    url: https://vitepress.dev/reference/frontmatter-config
---

## Home page
<!-- {: .-snippets} -->

### Add the hero
<!-- {: .-snippet} -->

```md
---
layout: home

hero:
  name: Acme
  text: Product documentation
  tagline: Everything you need to ship
  actions:
    - theme: brand
      text: Get started
      link: /guide/install
---
```
<!-- {: data-highlight="layout: home"} -->

**Turns `index.md` into a landing page.** `name` and `text` form the headline, and each action becomes a button. See [home page](https://vitepress.dev/reference/default-theme-home-page).

### Add feature cards
<!-- {: .-snippet} -->

```md
features:
  - title: Fast
    details: Static HTML with client routing
  - title: Typed
    details: Config and theme in TypeScript
  - title: Searchable
    details: Local index, no service
```
<!-- {: data-highlight="features:"} -->

**Renders a card grid below the hero.** Each item takes a `title` and one line of `details`; `icon` accepts an emoji. See [home page features](https://vitepress.dev/reference/default-theme-home-page#features-section).

### Use a hero image
<!-- {: .-snippet} -->

```md
hero:
  image:
    src: /hero.png
    alt: Acme dashboard
```
<!-- {: data-highlight="image:"} -->

**Shows a screenshot beside the headline.** Files in `docs/public` are served from the site root, so `/hero.png` needs no import. See [hero image](https://vitepress.dev/reference/default-theme-home-page#hero-section).

### Swap the action style
<!-- {: .-snippet} -->

```md
actions:
  - theme: brand
    text: Get started
    link: /guide/install
  - theme: alt
    text: GitHub
    link: https://github.com/acme
```
<!-- {: data-highlight="theme: alt"} -->

**Mixes a primary and secondary button.** `brand` is filled, `alt` is a quieter button; external links work in either. See [hero actions](https://vitepress.dev/reference/default-theme-home-page#hero-section).
