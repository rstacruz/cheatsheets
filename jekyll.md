---
title: Jekyll
jekyll_escape: true
---

{% raw %}
### Installation

    $ gem install jekyll

### Directories

    ./
    ├── _config.yml
    │
    ├── _data/
    │   └── ...
    │
    ├── _drafts/
    │   └── ...
    │
    ├── _posts/
    │   └── 2014-01-01-hello.md
    │
    ├── _layouts/
    │   ├── default.html
    │   └── post.html
    │
    ├── _includes/             - partials
    │   ├── header.html
    │   └── footer.html
    │
    └── _site/
        └── ...

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

## [Configuration](http://jekyllrb.com/docs/configuration/)

    source: .
    destination: _site
    exclude: [dir, file, ...]
    include: ['.htaccess']

## [Variables](http://jekyllrb.com/docs/variables/)

    {{ site }}       - from config.yml
    {{ page }}       - from frontmatter, and page-specific info
    {{ content }}    - html content (use in layouts)
    {{ paginator }}  - ...

### Site

    {{ site.time }}                 - current time
    {{ site.pages }}                - list of pages
    {{ site.posts }}                - list of posts
    {{ site.related_posts }}        - list
    {{ site.categories.CATEGORY }}  - list
    {{ site.tags.TAG }}             - list

    {{ site.static_files }}

### Page

    {{ page.content }}  - un-rendered content
    {{ page.title }}
    {{ page.excerpt }}  - un-rendered excerpt
    {{ page.url }}
    {{ page.date }}
    {{ page.id }}       - unique id for RSS feeds
    {{ page.categories }}
    {{ page.tags }}
    {{ page.path }}
    {{ post.excerpt | remove: '<p>' | remove: '</p>' }}
    {{ post.excerpt | strip_html }}

    <!-- blog pagination: -->
    {{ page.next }}
    {{ page.previous }}

### [Paginator](http://jekyllrb.com/docs/pagination/)

    {{ paginator.page }}         - page number
    {{ paginator.total_posts }}
    {{ paginator.total_pages }}
    {{ paginator.per_page }}

    {% for post in paginator.posts %} ... {% endfor %}

    {% if paginator.previous_page %}
      <a href="{{ paginator.previous_page_path }}">Previous</a>
    {% else %}
    {% endif %}

    {{ paginator.next_page }}     - page number
    {{ paginator.next_page_path }}
    ...

    {% if paginator.total_pages > 1 %}
    {% endif %}

Add this to `_config.yml`:

    paginate: 5
    paginate_path: "blog/:num"

### Code

    {% highlight ruby linenos %}
    def show
      ...
    end
    {% endhighlight %}

Markup
------

### Loops

    {% for post in site.posts %}
      <a href="{{ post.url }}">
        <h2>{{ post.title }} &mdash; {{ post.date | date_to_string }}</h2>
      </a>
      {{ post.content }}
    {% endfor %}

### Dates

    {{ page.date | date: "%b %d, %Y" }}

### If

    {% if page.image.feature %}
    {% else if xyz %}
    {% else %}
    {% endif %}

### Includes (partials)

    {% include header.html %}

## [Blogging](http://jekyllrb.com/docs/posts/)

    _posts/YEAR-MONTH-DAY-title.md

### [Image paths](http://jekyllrb.com/docs/posts/#including-images-and-resources)
    
    ![My helpful screenshot]({{ site.url }}/assets/screenshot.jpg)

### [Drafts](http://jekyllrb.com/docs/drafts/)

    vi _drafts/a-draft-post.md
    jekyll build --drafts

### [Excerpts](http://jekyllrb.com/docs/posts/#post-excerpts)

    {{ post.excerpt | remove: '<p>' | remove: '</p>' }}
    {{ post.excerpt | strip_html }}

### Excerpt separator

    ---
    excerpt_separator: <!--more-->
    ---

    Excerpt
    <!--more-->
    Out-of-excerpt

### [Permalinks](http://jekyllrb.com/docs/permalinks/)

    # _config.yml
    permalink: date   # /:categories/:year/:month/:day/:title.html
    permalink: pretty # /:categories/:year/:month/:day/:title/
    permalink: none   # /:categories/:title.html
    permalink: "/:title"

## [Data](http://jekyllrb.com/docs/datafiles/)

    _data/members.yml

    {% for member in site.data.members %}

## [Collections](http://jekyllrb.com/docs/collections/)

```yaml
# _config.yml
collections:
  - authors
```

```yaml
# _/authors/a-n-roquelaire.md
---
name: A. N. Roquelaire
real_name: Anne Rice
---
```

```
{% for author in site.authors %}
```

Helpers and Filters
-------------------

### Dates

     {{ site.time | date_to_xmlschema }}   #=> 2008-11-07T13:07:54-08:00
     {{ site.time | date_to_rfc822 }}      #=> Mon, 07 Nov 2008 13:07:54 -0800
     {{ site.time | date_to_string }}      #=> 07 Nov 2008
     {{ site.time | date_to_long_string }} #=> 07 November 2008
     | date: "%Y %m %d"

### Preprocessors

     | textilize
     | markdownify
     | jsonify
     | sassify
     | scssify

### Array

     site.posts | where:"year","2014"
     site.posts | group_by:"genre"   #=> { name, items }
     site.posts | sort

     | first
     | last
     | join: ","
     | array_to_sentence_string   #=> CSS, JavaScript and HTML

     | map: "post"   # works like 'pluck'
     | size

### [String filters](http://docs.shopify.com/themes/liquid-documentation/filters)

     | default: "xxx"

     | upcase
     | downcase

     | remove: "<p>"
     | replace: "super", "mega"
     | remove_first: "<p>"
     | replace_first: "super", "mega"

     | truncate: 5
     | truncatewords: 20

     | prepend: "Mr. "
     | append: " Sr."

     | camelize
     | capitalize
     | pluralize
     | strip_html
     | strip_newlines
     | newline_to_br

     | split: ','

     | escape
     | escape_once

     | slice: -3, 3

### String filters, Jekyll-only

     | number_of_words
     | slugify

     | xml_escape    #=> CDATA
     | cgi_escape    #=> foo%2Cbar
     | uri_escape    #=> foo,%20bar

### Numbers

     | minus: 2
     | plus: 1
     | time: 4
     | divided_by: 3
     | modulo: 2
     
Comments
--------

    {% comment %}
    {% endcomment %}

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
  * http://jekyllrb.com/docs/templates/
  * http://docs.shopify.com/themes/liquid-basics/output
  * http://docs.shopify.com/themes/liquid-basics/logic
  * https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
  * http://docs.shopify.com/themes/liquid-documentation/filters
{% endraw %}
