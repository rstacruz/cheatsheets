# Developer notes

## Starting a local instance

This starts Jekyll and Webpack.

```
yarn install
bundle install
env PORT=4001 yarn run dev
```

## CSS classes

See <https://devhints.io/cheatsheet-styles> for a reference on styling.

## JavaScript

When updating JavaScript, be sure webpack is running (`yarn run dev` takes care of this).

This auto-updates `/assets/packed/` with sources in `_js/`.

## JavaScript tests

There are also automated tests:

```
yarn run test --watch
```

## Frontmatter

Each sheet supports these metadata:

```yml
---
title: React.js
layout: 2017/sheet   # 'default' | '2017/sheet'

# Optional:
category: React
updated: 2017-08-30       # To show in the updated list
ads: false                # Add this to disable ads
weight: -5                # lower number = higher in related posts list
deprecated: true          # Don't show in related posts
deprecated_by: /enzyme    # Point to latest version
prism_languages: [vim]    # Extra syntax highlighting
intro: |
  This is some *Markdown* at the beginning of the article.
tags:
  - WIP
  - Featured

# Special pages:
# (don't set these for cheatsheets)
type: home                # home | article | error
og_type: website          # opengraph type
---
```

## Prism languages

For supported prism languages:

- <https://github.com/PrismJS/prism/tree/gh-pages/components>

## Setting up redirects

This example sets up a redirect from `es2015` to `es6`:

```yml
# /es2015.md
---
title: ES2015
category: Hidden
redirect_to: /es6
---
```

## Localizations

See `_data/content.yml` for chrome strings.

## Forking

So you want to fork this repo? Sure, here's what you need to know to whitelabel this:

- It's all GitHub pages, so the branch has to be `gh-pages`.
- All other GitHub pages gotchas apply (CNAME, etc).
- Edit everything in `_data/` - this holds all 'config' for the site: ad IDs, strings, etc.
- Edit `_config.yml` as well, lots of things may not apply to you.

## CloudFlare purging

The site devhints.io is backed by CloudFlare. Updates will take 2 days to propagate to the website by default. To make sure recent changes will propagate, use this helper script. It will give instructions on how manual selective cache purging can be done.

```bash
./_support/cf-purge.sh
```
