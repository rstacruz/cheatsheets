---
title: Jekyll
layout: default
---

### Installation

    $ gem install jekyll

### Directories

    _config.yml

    _drafts/

    _includes/
      header.html
      footer.html

    _layouts/
      default.html

    _posts/
      2013-09-02-hello.md

    _site/
      ...

Frontmatter
-----------

    ---
    layout: post
    title: Hello
    ---

### Other frontmatter stuff

    permalink: '/hello'
    published: false
    category: apple
    categories: ['html', 'css']
    tags: ['html', 'css']

### Reference

 * [Front-matter](http://jekyllrb.com/docs/frontmatter/)

Configuration
-------------

    source: .
    destination: _site
    exclude: [dir, file, ...]
    include: ['.htaccess']

### Reference

 * [Configuration](http://jekyllrb.com/docs/configuration/)

Variables
---------

    {\{ site }}       - from config.yml
    {\{ page }}       - from frontmatter, and page-specific info
    {\{ content }}    - html content (use in layouts)
    {\{ paginator }}  - ...

### Site

    {\{ site.time }}                 - current time
    {\{ site.pages }}                - list of pages
    {\{ site.posts }}                - list of posts
    {\{ site.related_posts }}        - list
    {\{ site.categories.CATEGORY }}  - list
    {\{ site.tags.TAG }}             - list

### Page

    {\{ page.content }}  - un-rendered content
    {\{ page.title }}
    {\{ page.excerpt }}  - un-rendered excerpt
    {\{ page.url }}
    {\{ page.date }}
    {\{ page.id }}
    {\{ page.categories }}
    {\{ page.tags }}
    {\{ page.path }}

### Paginator

    {\{ paginator.per_page }}
    {\{ paginator.posts }}
    ...

Sample code
-----------

### Loops

    {\% for post in site.posts %}
      <a href="{{ post.url }}">
        <h2>{\{ post.title }} &mdash; {\{ post.date | date_to_string }}</h2>
      </a>
      {\{ post.content }}
    {\% endfor %}

### Dates

    {\{ page.date | date: "%b %d, %Y" }}

### If

    {\% if page.image.feature %}
    {\% else %}
    {\% endif %}

### Includes

    {\% include header.html %}

Integration
-----------

### Bundler

    # _plugins/bundler.rb
    require "bunder/setup"
    Bundler.require :default

### Compass

  * [Compass](https://gist.github.com/parkr/2874934)
  * [Asset pipeline](https://github.com/matthodan/jekyll-asset-pipeline)
