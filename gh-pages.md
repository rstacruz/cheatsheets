---
title: GitHub Pages
subtitle: Static site hosting
category: Hidden
# Duplicates deployment details now covered by /jekyll-github and the upstream docs.
tags: [Archived]
archived: |
  Archived at maintainer request. Deployment details now live in
  [Jekyll for GitHub Pages](./jekyll-github) and the
  [GitHub Pages documentation](https://docs.github.com/en/pages).
last_verified_with: "GitHub Pages docs, actions/deploy-pages v4."
updated: 2026-11-24
intro: |
  GitHub Pages static hosting: custom domains, DNS records, and deployment workflows.
links:
  - title: GitHub Pages documentation
    url: https://docs.github.com/en/pages
  - title: Managing a custom domain
    url: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
  - title: Configuring a publishing source
    url: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
---

## Custom domains

### Enable the domain

```sh
echo "example.com" > CNAME
```

Enter the domain under **Settings → Pages → Custom domain**. Saving commits this `CNAME` file when you publish from a branch; a Pages workflow ignores it.

See: [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

### Point DNS at GitHub

| Type | Host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `<user>.github.io` |
| --- | --- | --- |
| `ALIAS` | `@` | `<user>.github.io` |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| --- | --- | --- |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
<!-- {: .-headers} -->

Use `ALIAS` or the `A` records for an apex domain, not both. The `CNAME` target takes no repository name.

See: [Configuring an apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)

### Check the setup

#### Records

```sh
dig example.com +noall +answer -t A
```

#### HTTPS

```sh
curl -sI http://example.com | head -1
```

Tick **Enforce HTTPS** once GitHub issues the certificate, which can take 24 hours after DNS resolves.

See: [Troubleshooting custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## Deploy

### From a branch

Under **Settings → Pages**, set **Source** to *Deploy from a branch* and pick the branch and folder (`/` or `/docs`). Jekyll builds on every push.

See: [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### With a workflow

```yaml
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: _site
      - id: deployment
        uses: actions/deploy-pages@v4
```

Set **Source** to *GitHub Actions* first, and build `_site` before the upload step. The job needs `pages: write` and `id-token: write`.

See: [Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## References
<!-- {: .-one-column} -->

- <https://pages.github.com>
