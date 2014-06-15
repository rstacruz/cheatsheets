---
title: Jekyll
layout: default
jekyll_escape: true
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

## [Front-matter](http://jekyllrb.com/docs/frontmatter/)

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

Configuration
-------------

    source: .
    destination: _site
    exclude: [dir, file, ...]
    include: ['.htaccess']

### Reference

 * [Configuration](http://jekyllrb.com/docs/configuration/)

## [Variables](http://jekyllrb.com/docs/variables/)

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

    {\{ site.static_files }}

### Page

    {\{ page.content }}  - un-rendered content
    {\{ page.title }}
    {\{ page.excerpt }}  - un-rendered excerpt
    {\{ page.url }}
    {\{ page.date }}
    {\{ page.id }}       - unique id for RSS feeds
    {\{ page.categories }}
    {\{ page.tags }}
    {\{ page.path }}
    {\{ post.excerpt | remove: '<p>' | remove: '</p>' }}
    {\{ post.excerpt | strip_html }}

    <!-- blog pagination: -->
    {\{ page.next }}
    {\{ page.previous }}

### [Paginator](http://jekyllrb.com/docs/pagination/)

    {\{ paginator.page }}         - page number
    {\{ paginator.total_posts}}
    {\{ paginator.total_pages}}
    {\{ paginator.per_page }}

    {\% for post in paginator.posts %} ... {\% endfor %}

    {\% if paginator.previous_page %}
      <a href="{\{ paginator.previous_page_path }}">Previous</a>
    {\% else %}
    {\% endif %}

    {\{ paginator.next_page }}     - page number
    {\{ paginator.next_page_path }}
    ...

    {\% if paginator.total_pages > 1 %}
    {\% endif %}

Add this to `_config.yml`:

    paginate: 5
    paginate_path: "blog/:num"

### Code

    {\% highlight ruby linenos %}
    def show
      ...
    end
    {\% endhighlight %}

Markup
------

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

Blogging
--------

    _posts/YEAR-MONTH-DAY-title.md

### Image paths
    
    ![My helpful screenshot]({\{ site.url }}/assets/screenshot.jpg)

### [Drafts](http://jekyllrb.com/docs/drafts/)

    vi _drafts/a-draft-post.md
    jekyll build --drafts

### [Permalinks](http://jekyllrb.com/docs/permalinks/)

    # _config.yml
    permalink: date   # /:categories/:year/:month/:day/:title.html
    permalink: pretty # /:categories/:year/:month/:day/:title/
    permalink: none   # /:categories/:title.html
    permalink: "/:title"

## [Data](http://jekyllrb.com/docs/datafiles/)

    _data/members.yml

    {\% for member in site.data.members %}

Integration
-----------

### Bundler

    # _plugins/bundler.rb
    require "bunder/setup"
    Bundler.require :default

### Compass

  * [Compass](https://gist.github.com/parkr/2874934)
  * [Asset pipeline](https://github.com/matthodan/jekyll-asset-pipeline)

### References

  * http://jekyllrb.com/docs/home/
