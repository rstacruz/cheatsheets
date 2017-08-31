:)

---

## Notes

`h2` supports these:

    {: .-two-column}
    {: .-three-column}
    {: .-wide-second}       # combine with -x-column
    {: .-left-reference}

`h3` supports these:

    {: .-prime}

`table` supports these:

    {: .-shortcuts}
    {: .-left-align}
    {: .-headers}

`pre` supports these:

    {: .-setup}
    {: .-box-chars}

`ul` supports these:

    {: .-also-see}
    {: .-four-column}
    {: .-six-column}

Each sheet supports these metadata:

```yml
---
title: React.js
category: React
layout: 2017/sheet   # 'default' | '2017/sheet'

# Optional:
updated: 2017-08-30       # To show in the updated list
ads: false                # Add this to disable ads
weight: -5                # lower number = higher in related posts list
deprecated: true          # Don't show in related posts
prism_languages: [vim]    # Extra syntax highlighting
---
```

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
