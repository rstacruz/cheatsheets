---
title: How to deploy VuePress to Netlify
link_title: Deploy VuePress to Netlify
subtitle: Build command and output
logo: { src: /assets/logos/vue.svg }
category: Devops
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
updated: 2026-11-28
links:
  - title: VuePress deployment
    url: https://v2.vuepress.vuejs.org/guide/deployment.html#netlify
  - title: Netlify file-based config
    url: https://docs.netlify.com/configure-builds/file-based-configuration/
---

## Deploying to Netlify
<!-- {: .-snippets} -->

### Configure the build
<!-- {: .-snippet} -->

```toml
[build]
  command = "pnpm docs:build"
  publish = "docs/.vuepress/dist"
```
<!-- {: data-highlight="command"} -->

**Builds and publishes the site,** from `netlify.toml`. Keep `base: '/'` in the config; Netlify serves the output at the domain root. See [Netlify deployment](https://v2.vuepress.vuejs.org/guide/deployment.html#netlify).

### Set the Node version
<!-- {: .-snippet} -->

```toml
[build.environment]
  NODE_VERSION = "24"
```
<!-- {: data-highlight="NODE_VERSION"} -->

**Pins a Node version,** new enough for VuePress. VuePress 2 needs Node 22.22 or newer; Netlify's default may lag behind. See [netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/).
