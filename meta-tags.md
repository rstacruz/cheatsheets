---
title: Meta-tags gem
subtitle: Rails meta tag helper
category: Ruby libraries
weight: -1
updated: 2026-11-18
fragments:
  - "set_meta_tags"
  - "display_meta_tag"
  - "title:"
  - "site:"
  - "description:"
  - "noindex: true"
  - "nofollow: true"
  - "canonical:"
  - "og: {"
  - "twitter: {"
  - "prev:"
  - "next:"
  - "reverse: true"
  - "separator:"
  - "icon:"
  - "alternate:"
keywords:
  - meta tags
  - Rails SEO
  - Open Graph
  - canonical URL
  - robots directives
intro: |
  [MetaTags](https://github.com/kpumuk/meta-tags) sets head metadata in Rails
  apps: titles, descriptions, canonical URLs, robots directives, and social
  tags.
  Set tags with `set_meta_tags` in controllers or views, then render them in
  the layout with `display_meta_tags`.
links:
  - title: MetaTags README
    url: https://github.com/kpumuk/meta-tags
---

## Titles

### Page title

```ruby
set_meta_tags title: 'Member Login'
# <title>Member Login</title>
```

Set it in a controller or view, then render it with `display_meta_tags` in the layout.

See: [Titles](https://github.com/kpumuk/meta-tags#titles)

### Site name

```ruby
set_meta_tags site: 'Site Title', title: 'Member Login'
# <title>Site Title | Member Login</title>
```

The site name is joined to the page title with a separator.

See: [Titles](https://github.com/kpumuk/meta-tags#titles)

### Separator and order

```ruby
set_meta_tags(
  site: 'Site Title',
  title: 'Member Login',
  reverse: true,
  separator: '&middot;'.html_safe
)
# <title>Member Login · Site Title</title>
```

Also use `prefix`, `suffix`, and `lowercase` to tune the rendered title.

See: [Allowed options](https://github.com/kpumuk/meta-tags#allowed-options-for-display_meta_tags-and-set_meta_tags-methods)

### Mirrored values

```ruby
set_meta_tags og: {
  title: :title,
  site_name: :site
}
```

A symbol mirrors another tag: `og:title` becomes the page title, without the site name.

See: [Mirrored values](https://github.com/kpumuk/meta-tags#mirrored-values)

## In views

### Display tags

```erb
<head>
  <%= display_meta_tags site: 'My website' %>
</head>
```

Render tags in the layout, where `display_meta_tags` outputs them.

See: [MetaTags usage](https://github.com/kpumuk/meta-tags#metatags-usage)

### Set tags individually

```erb
<% title 'Member Login' %>
<% description 'Member login page.' %>
<% keywords 'tag1, tag2' %>
```

These helpers set tags in views. `title` also returns the title for headings.

See: [Using MetaTags in view](https://github.com/kpumuk/meta-tags#using-metatags-in-view)

## Setup

### Generate initializer

```bash
rails generate meta_tags:install
```

Creates `config/initializers/meta_tags.rb` for changing gem defaults.

See: [Configuration](https://github.com/kpumuk/meta-tags#configuration)

### Configure defaults

```ruby
MetaTags.configure do |config|
  config.truncate_array_items_at_boundaries = true
end
```

Set global defaults here once, such as array truncation behavior.

See: [Configuration](https://github.com/kpumuk/meta-tags#configuration)

## Metadata

### Description

```ruby
set_meta_tags description: 'This is a sample description'
# <meta name="description" content="This is a sample description">
```

Search engines may use it for snippets, or use visible page text instead.

See: [Description](https://github.com/kpumuk/meta-tags#description)

### Keywords

```ruby
set_meta_tags keywords: %w[keyword1 keyword2 keyword3]
# <meta name="keywords" content="keyword1, keyword2, keyword3">
```

Legacy tag kept for compatibility; Google and Bing ignore it.

See: [Keywords](https://github.com/kpumuk/meta-tags#keywords)

### Canonical URL

```ruby
set_meta_tags canonical: 'http://yoursite.com/canonical/url'
# <link rel="canonical" href="http://yoursite.com/canonical/url">
```

Consolidate duplicate URLs under one preferred address.

See: [Canonical URL](https://github.com/kpumuk/meta-tags#canonical-url)

### Icon

```ruby
set_meta_tags icon: {href: '/favicon.png', type: 'image/png'}
# <link rel="icon" type="image/png" href="/favicon.png">
```

Pass a path for a default icon, or a hash to set `type` and `sizes`.

See: [Icon](https://github.com/kpumuk/meta-tags#icon)

### Alternate links

```ruby
set_meta_tags alternate: {'fr' => 'http://yoursite.fr/page'}
# <link rel="alternate" href="http://yoursite.fr/page" hreflang="fr">
```

Map locale codes to URLs for translated or region-specific pages.

See: [Alternate links](https://github.com/kpumuk/meta-tags#multi-regional-and-multilingual-urls-rss-and-mobile-links)

### Pagination

```ruby
set_meta_tags(
  prev: 'http://yoursite.com/url?page=1',
  next: 'http://yoursite.com/url?page=3'
)
```

Legacy `prev` and `next` hints; Google no longer uses them as an indexing signal.

See: [Pagination links](https://github.com/kpumuk/meta-tags#pagination-links)

## Robots

### Indexing directives

```ruby
set_meta_tags noindex: true, follow: true
# <meta name="robots" content="noindex, follow">
```

Combine `noindex`, `nofollow`, and `follow` as needed; `follow` cancels `nofollow`.

See: [Noindex](https://github.com/kpumuk/meta-tags#noindex)

### Custom directives

```ruby
set_meta_tags robots: {
  'max-snippet' => -1,
  'max-video-preview' => -1
}
```

Use `robots:` or `googlebot:` hashes for directives beyond the basic helpers.

See: [Robots](https://github.com/kpumuk/meta-tags#robots)

## Social tags

### Open Graph

```ruby
set_meta_tags og: {
  title: 'The Rock',
  type: 'video.movie',
  image: 'http://ia.media-imdb.com/rock.jpg'
}
```

Nested hashes map to `og:*` properties; arrays emit repeated tags.

See: [Open Graph](https://github.com/kpumuk/meta-tags#open-graph)

### Twitter cards

```ruby
set_meta_tags twitter: {
  card: 'summary',
  site: '@username'
}
```

X cards render from `twitter:`; Open Graph fields can serve as fallbacks.

See: [Twitter cards](https://github.com/kpumuk/meta-tags#twitter-cards)
