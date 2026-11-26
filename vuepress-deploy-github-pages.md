---
title: How to deploy VuePress to GitHub Pages
link_title: Deploy VuePress to Pages
subtitle: Publish docs from Actions
category: Devops
layout: snippet
last_verified_with: "VuePress 2.0.0-rc.33, @vuepress/theme-default 2.0.0-rc.142."
updated: 2026-11-27
links:
  - title: VuePress deployment
    url: https://v2.vuepress.vuejs.org/guide/deployment.html#github-pages
  - title: GitHub Pages
    url: https://docs.github.com/en/pages/getting-started-with-github-pages
---

## Publishing to Pages
<!-- {: .-snippets} -->

### Set the base path
<!-- {: .-snippet} -->

```ts
export default defineUserConfig({
  base: '/my-docs/',
})
```
<!-- {: data-highlight="base"} -->

**Serves the site under the repository path.** A project site at `https://user.github.io/my-docs/` needs `base: '/my-docs/'`; a user site or custom domain uses `'/'`. See [base](https://v2.vuepress.vuejs.org/reference/config.html#base).

### Deploy from Actions
<!-- {: .-snippet} -->

```yaml
name: docs
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v6
        with:
          version: 12
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm docs:build
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: docs/.vuepress/dist
      - uses: actions/deploy-pages@v5
```
<!-- {: data-highlight="actions/deploy-pages@v5"} -->

**Publishes on every push to `main`.** Set Settings → Pages → Source to "GitHub Actions" once; the workflow uploads `docs/.vuepress/dist` and deploys it. See [GitHub Pages](https://v2.vuepress.vuejs.org/guide/deployment.html#github-pages).
