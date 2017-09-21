# Developer notes

## Starting a local instance

This is a mere Jekyll site, and `bundle exec jekyll serve` should be fine. But I suggest you use this instead:

```
make
```

## CSS classes

`h2` supports these:

    {: .-two-column}
    {: .-three-column}
    {: .-wide-second}       # combine with -xxx-column
    {: .-left-reference}

`h3` supports these:

    {: .-prime}             # Highlight the body

`table` supports these:

    {: .-shortcuts}
    {: .-left-align}
    {: .-headers}

`p` supports these:

    {: .-setup}             # Gray background
    {: .-crosslink}         # Link with big arrow

`pre` supports these:

    {: .-setup}             # Gray background
    {: .-box-chars}         # Box-drawing chars

`ul` supports these:

    {: .-also-see}
    {: .-four-column}
    {: .-six-column}

`h3` sections can have:

    pre
    p
    ul
    table
    h4

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
