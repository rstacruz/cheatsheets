---
title: Jekyll for GitHub Pages
subtitle: GitHub Pages build settings
category: Markup
updated: 2026-11-22
last_verified_with: "Jekyll 3.10.0 / github-pages 232, Ruby 3.1."
keywords:
  - github-pages gem
  - site.github
  - jekyll-gist
  - jekyll-mentions
tier: t3
intro: |
  GitHub Pages builds Jekyll sites from a branch or GitHub Actions. This reference covers local setup, metadata, and built-in plugins.
links:
  - title: GitHub Pages documentation
    url: https://docs.github.com/en/pages
  - title: Dependency versions
    url: https://pages.github.com/versions/
---

{% raw %}

## Start locally

### Match Pages versions

#### Gemfile

```ruby
source "https://rubygems.org"

gem "github-pages", "~> 232", group: :jekyll_plugins
```

#### Shell

```sh
bundle install
bundle exec jekyll serve
```

The `~> 232` pin is a snapshot; use the version on [Dependency versions](https://pages.github.com/versions/) for new sites. The gem pulls in matching Jekyll and plugin versions.

See: [Dependency versions](https://pages.github.com/versions/)

### Enable extra plugins

```yaml
plugins:
  - jekyll-redirect-from
```

Pages enables its default plugins without a `plugins` entry. Add other supported plugins here; the `github-pages` gem loads them for local builds.

See: [Plugins](https://jekyllrb.com/docs/plugins/)

## Publish

### Branch source

| Site type | Repository | URL |
| --- | --- | --- |
| User | `username.github.io` | `username.github.io` |
| Project | any name | `username.github.io/project` |

<!-- {: .-headers} -->

Set the source to a branch and folder (root or `/docs`) in repository settings. User sites need the `username.github.io` repository name.

See: [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### Actions workflow

```yaml
name: Deploy Jekyll
on:
  push:
    branches: [master]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/configure-pages@v5
      - uses: actions/jekyll-build-pages@v1
      - uses: actions/upload-pages-artifact@v4
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Choose **GitHub Actions** as the source. The `pages: write` and `id-token: write` permissions let the deploy job publish the artifact.

See: [Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Repository metadata

### Configure

```yaml
repository: username/project
```

Pages infers the repository from the site; local builds need `repository` (or `PAGES_REPO_NWO`) set. Values are exposed under `site.github`.

See: [Using site.github](https://jekyll.github.io/github-metadata/site.github/)

### Link the repository

#### Template

```liquid
<a href="{{ site.github.repository_url }}">
  {{ site.github.project_title }}
</a>
```

#### Output

```html
<a href="https://github.com/rstacruz/cheatsheets">
  cheatsheets
</a>
```

Built from a local build with `repository: rstacruz/cheatsheets`.

See: [Using site.github](https://jekyll.github.io/github-metadata/site.github/)

### List public repositories

```liquid
{% for repository in site.github.public_repositories %}
  * [{{ repository.name }}]({{ repository.html_url }})
{% endfor %}
```

Local builds need `JEKYLL_GITHUB_TOKEN` for reliable results; Pages supplies authentication.

See: [Using site.github](https://jekyll.github.io/github-metadata/site.github/)

## Gists and mentions

### Gist

```liquid
{% gist parkr/c08ee0f2726fd0e3909d %}
```

#### Script URL

```html
https://gist.github.com/parkr/c08ee0f2726fd0e3909d.js
```

#### One file

```liquid
{% gist c08ee0f2726fd0e3909d test.md %}
```

A filename embeds just that file from the Gist.

See: [jekyll-gist](https://github.com/jekyll/jekyll-gist)

### Mention

```markdown
Hey @rsc, what do you think of this?
```

#### Output

```html
<a href="https://github.com/rsc" class="user-mention">@rsc</a>
```

Mentions link to GitHub by default; set `jekyll-mentions.base_url` to use another site. They do not notify anyone.

See: [jekyll-mentions](https://github.com/jekyll/jekyll-mentions)

## Redirects

### From an old URL

```yaml
---
redirect_from:
  - /old-home/
---
```

A trailing slash generates `_site/old-home/index.html`, which redirects to the page's URL.

See: [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from)

### To another site

```yaml
---
redirect_to: https://example.com
---
```

#### Output

```html
<meta http-equiv="refresh" content="0; url=https://example.com">
```

Both keys can hold a single string instead of a list. The plugin also writes `_site/redirects.json`; set `json: false` under `redirect_from` in `_config.yml` to skip it.

See: [redirect_to](https://github.com/jekyll/jekyll-redirect-from#redirect-to)

## Project URLs

### Set the base path

```yaml
url: https://username.github.io
baseurl: /project
```

Project sites live under a path; user sites use an empty `baseurl`.

See: [Configuration options](https://jekyllrb.com/docs/configuration/)

### Resolve paths in templates

#### Template

```liquid
<link
  href="{{ '/assets/style.css' | relative_url }}"
  rel="stylesheet"
>
```

#### Output

```html
<link href="/project/assets/style.css" rel="stylesheet">
```

The filter prefixes `baseurl` to root-relative paths.

See: [relative_url](https://jekyllrb.com/docs/liquid/filters/#relative_url)

{% endraw %}
