---
title: Meta-tags gem
category: Ruby libraries
weight: -1
updated: 2017-09-08
---

### Titles

```ruby
set_meta_tags title: 'Member Login'
# <title>Some Page Title</title>
```

```ruby
set_meta_tags site: 'Site Title', title: 'Member Login'
# <title>Site Title | Page Title</title>
```

```ruby
set_meta_tags(
  site: 'Site Title',
  title: 'Member Login',
  reverse: true,
  separator: '&middot;'.html_safe
)
# <title>Page Title · Site Title</title>
```

Works in a controller or a view.

### Setting defaults

```
rails generate meta_tags:install
```

This creates `config/initializers/meta_tags.rb` that you can edit.

### Others

```ruby
set_meta_tags site: 'Site name'
set_meta_tags title: 'Title'
set_meta_tags description: "All text about keywords"
```

```ruby
set_meta_tags keywords: %w[abc def ghi]
set_meta_tags canonical: 'http://...'
set_meta_tags icon: 'favicon.ico'
set_meta_tags author: 'http://...'
set_meta_tags alternate: { 'fr' => 'http://...' }
set_meta_tags prev: 'http://...'
set_meta_tags next: 'http://...'
set_meta_tags image_src: 'http://...'
```

```ruby
set_meta_tags noindex: true
set_meta_tags nofollow: true
set_meta_tags follow: true
```

```ruby
set_meta_tags og: { image: ['...'] }
set_meta_tags twitter: { description: '...' }
```
```ruby
set_meta_tags separator: '·'   # Site · Page title
set_meta_tags prefix: ' '      # Around the separator
set_meta_tags suffix: ' '
```

```ruby
set_meta_tags lowercase: true  # Lowercase page title
set_meta_tags reverse: true    # Site name last
```

### In views

```ruby
# Displaying tags
<%= display_meta_tags %>
```

```ruby
# Displaying tags individually
<h1><%= title %></h1>
```

```ruby
# Setting tags
<% title 'Member Login' %>
<% description 'My page' %>
<% keywords '..' %>
```

### Reference

- Accurate as of 2.1.0. See: <https://github.com/kpumuk/meta-tags>
