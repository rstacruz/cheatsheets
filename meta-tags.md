---
title: Meta-tags
category: Ruby libraries
---

### Titles

```rb
set_meta_tags title: 'Member Login'
# <title>Some Page Title</title>
set_meta_tags site: 'Site Title', title: 'Member Login'
# <title>Site Title | Page Title</title>
set_meta_tags site: 'Site Title', title: 'Member Login', reverse: true
# <title>Page Title | Site Title</title>
```

### Others

```rb
set_meta_tags description: "All text about keywords, other keywords"
set_meta_tags keywords: %w[abc def ghi]
set_meta_tags noindex: true
set_meta_tags nofollow: true
set_meta_tags canonical: 'http://...'
set_meta_tags icon: 'favicon.ico'
set_meta_tags author: 'http://...'
set_meta_tags alternate: { 'fr' => 'http://...' }
set_meta_tags prev: 'http://...'
set_meta_tags next: 'http://...'
set_meta_tags og: { image: ['...'] }
```

### In views

```rb
<%= display_meta_tags %>
```

```rb
<% title 'Member Login' %>
<% description 'My page' %>
<% keywords '..' %>

<h1><%= title %></h1>
```

### Reference

Accurate as of 2.1.0. See <https://github.com/kpumuk/meta-tags>.
