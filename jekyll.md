---
title: Jekyll
jekyll_escape: true
layout: 2017/sheet
prism_languages: [bash, yaml, ruby]
category: Jekyll
updated: 2018-08-25
---

{% raw %}

### Installation

```bash
# Install the gems
gem install jekyll bundler
```

```bash
# Create a new site at `./myblog`
jekyll new myblog
cd myblog
```

```bash
# Optional: if you're targeting github-pages,
# use this Gemfile instead.
cat > Gemfile <<-END
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
END
```

```bash
bundle exec jekyll serve
```

See: [Jekyll quickstart](http://jekyllrb.com/docs/quickstart/)<br>
See: [github/pages-gem](https://github.com/github/pages-gem)

### Directories

```
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
```
{: .-box-chars}

## Front-matter
{: .-three-column}

### Basic frontmatter

```
---
layout: post
title: Hello
---
Hello! this is my post.
```
{: data-line="1,2,3,4"}

Attach metadata to a page by adding them on top of the page, delimited by `---`.
See: [Front-matter](http://jekyllrb.com/docs/frontmatter/)

### Other frontmatter stuff

```yaml
permalink: '/hello'
published: false
category: apple
categories: ['html', 'css']
tags: ['html', 'css']
```

### Configuration

In `_config.yml`:
{: .-setup}

```yaml
source: .
destination: _site
exclude:
- Gemfile
- Gemfile.lock
include: ['.htaccess']
```

All config keys are optional.
See: [Configuration](http://jekyllrb.com/docs/configuration/)

Markup
------
{: .-three-column}

### Page variables

```html
<title>
  {{ page.title }}
</title>
```
{: data-line="2"}


### Filters

```html
<p>
  {{ page.description | truncate_words: 20 }}
</p>
```
{: data-line="2"}

### Loops

```html
{% for post in site.posts %}
  <a href="{{ post.url }}">
    <h2>{{ post.title }}</h2>
    <p>{{ post.date | date_to_string }}</p>
  </a>
{% endfor %}
```
{: data-line="1,6"}

### Dates

```html
{{ page.date | date: "%b %d, %Y" }}
```

### Conditionals

```html
{% if page.image.feature %}
  ...
{% elsif xyz %}
  ...
{% else %}
  ...
{% endif %}
```
{: data-line="1,3,5,7 }

```html
{% if page.category == 'React' %}
{% if page.category == 'React' or page.featured %}
{% if page.tags contains 'Featured' %}
```

### Case

```html
{% case shipping.title %}
  {% when 'international' %}
     Arriving in 2-3 weeks
  {% when 'Domestic' %}
     Arriving in 2-3 days
  {% else %}
     Thank you for your order!
{% endcase %}
```
{: data-line="1,2,4,6,8"}

### Includes (partials)

```
{% include header.html %}
```
{: data-line="1"}

```html
<!-- Including local vars -->
{% include header.html page=page %}
```
{: data-line="2"}

### Comments

```html
{% comment %}
  This is a comment!
{% endcomment %}
```
{: data-line="1,3"}

## Variables

### Top-level variables


| `{{ site }}` | Data from `config.yml` |
| `{{ page }}` | From frontmatter, and page-specific info |
| `{{ content }}` | HTML content (use in layouts) |
| `{{ paginator }}` | Paginator |

See: [Variables](http://jekyllrb.com/docs/variables/)

### Site

```html
{{ site.time }}
```
{: .-setup}

| `site.time` | Current time |
| `site.pages` | List of pages |
| `site.posts` | List of blog posts |
| `site.related_posts` | List of posts related to current |
| `site.categories.CATEGORY` | List |
| `site.tags.TAG` | List |
| `site.static_files` | List |

### Page

```html
{{ page.content }}  - un-rendered content
{{ page.title }}
{{ page.excerpt }}  - un-rendered excerpt
{{ page.url }}
{{ page.date }}
{{ page.id }}       - unique id for RSS feeds
{{ page.categories }}
{{ page.tags }}
{{ page.path }}
{{ page.dir }}
{{ page.excerpt | remove: '<p>' | remove: '</p>' }}
{{ page.excerpt | strip_html }}
```

```html
<!-- blog pagination: -->
{{ page.next }}
{{ page.previous }}
```

Filters
-------
{: .-three-column}

### Dates

```ruby
{{ site.time | date: "%Y %m %d" }}
```
{: .-setup}

| `date_to_xmlschema` | → `2008-11-07T13:07:54-08:00` |
| `date_to_rfc822` | → `Mon, 07 Nov 2008 13:07:54 -0800` |
| `date_to_string` | → `07 Nov 2008` |
| `date_to_long_string` | → `07 November 2008` |
| `date:` _'%Y %m %d'_ | → `2017 Nov  7` |

### Preprocessors


```ruby
{{ page.description | markdownify }}
```
{: .-setup}

| Filter | Description |
| --- | --- |
| `textilize` | Textile |
| `markdownify` | Markdown |
| `jsonify` | JSON |
| `sassify` | Sass |
| `scssify` | SCSS |
| `smartify` | Smartypants |

### Array filters

```ruby
{{ site.pages | where: "year", "2014" }}
```
{: .-setup}

| Filter | Description |
| --- | --- |
| `where:` _"year", "2014"_ | |
| `where_exp:` _"item", "item.year >= 2014"_ | |
| --- | --- |
| `group_by:` _"genre"_   | → `{name, items}` |
| `group_by_exp:` _"item", "item.genre"_   | → `{name, items}` |
| --- | --- |
| `sort` | |
| `sort:` _'author'_ | |
| --- | --- |
| `uniq` | |
| --- | --- |
| `first` | |
| `last` | |
| `join:` _','_ | |
| `array_to_sentence_string` | → `"X, Y and Z"` |
| --- | --- |
| `map:` _'post'_ | Works like 'pluck' |
| --- | --- |
| `size` | |
| `push:` _'xxx'_ | Adds an item |

### String filters

```ruby
{{ page.title | default: "xxx" }}
```
{: .-setup}

| Filter                             | Description |
| ---                                | ---         |
| `default:` _'xxx'_                 |             |
| ---                                | ---         |
| `upcase`                           |             |
| `downcase`                         |             |
| ---                                | ---         |
| `remove:` _'p'_                    |             |
| `replace:` _'super', 'mega'_       |             |
| `remove_first:` _'p'_              |             |
| `replace_first:` _'super', 'mega'_ |             |
| ---                                | ---         |
| `truncate:` _5_                    |             |
| `truncatewords:` _20_              |             |
| ---                                | ---         |
| `prepend:` _'Mr. '_                |             |
| `append:` _'Jr.'_                  |             |
| ---                                | ---         |
| `camelize`                         |             |
| `capitalize`                       |             |
| `strip_html`                       |             |
| `strip_newlines`                   |             |
| `newlines_to_br`                   |             |
| ---                                | ---         |
| `split:` _','_                     |             |
| ---                                | ---         |
| `escape`                           |             |
| `escape_once`                      |             |
| ---                                | ---         |
| `slice:` _-3, 3_                   |             |

See: [String filters](http://docs.shopify.com/themes/liquid-documentation/filters)

### String filters (Jekyll-only)

```ruby
{{ page.excerpt | number_of_words }}
```
{: .-setup}

| Filter | Description |
| --- | --- |
| `number_of_words` | |
| `slugify` | |
| --- | --- |
| `xml_escape` | → `CDATA` |
| `cgi_escape` | → `foo%2Cbar` |
| `uri_escape` | → `foo,%20bar` |

### Numbers

```
{{ site.posts.size | minus: 2 }}
```
{: .-setup}

| Filter | Description |
| --- | --- |
| `minus:` _2_ | |
| `plus:` _2_ | |
| `times:` _2_ | |
| `divided_by:` _2_ | |
| `modulo:` _2_ | |
| --- | --- |
| `ceil` | |
| `floor` | |
| `round` | |

## Paginator

### Paginator setup

Add this to `_config.yml`:
{: .-setup}

```yml
paginate: 5
paginate_path: "blog/:num"
```

See: [Paginator](http://jekyllrb.com/docs/pagination/)

### Numbers

```
{{ paginator.page }}         - page number
{{ paginator.total_posts }}
{{ paginator.total_pages }}
{{ paginator.per_page }}
```

### Iterating through posts

```
{% for post in paginator.posts %} ... {% endfor %}
```

### Previous button

```
{% if paginator.total_pages > 1 %}
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}">Previous</a>
  {% else %}
  {% endif %}
{% endif %}
```

```
{{ paginator.next_page }}     - page number
{{ paginator.next_page_path }}
```

## Blogging

### Paths

    _posts/YEAR-MONTH-DAY-title.md

See: [Blogging](http://jekyllrb.com/docs/posts/)

### Image paths

    ![My helpful screenshot]({{ site.url }}/assets/screenshot.jpg)

See: [Image paths](http://jekyllrb.com/docs/posts/#including-images-and-resources)

### Drafts

    vi _drafts/a-draft-post.md
    jekyll build --drafts

Posts in `_drafts` only show up in development, but not production.
See: [Drafts](http://jekyllrb.com/docs/drafts/)

### Defining excerpts

```
---
title: My blog post
excerpt: This post is about cats
---

Hello, let's talk about cats. (···)
```

Put a key `excerpt` in the frontmatter.
See: [Excerpts](http://jekyllrb.com/docs/posts/#post-excerpts)

### Displaying excerpts

```html
{{ post.excerpt }}
```

```html
{{ post.excerpt | remove: '<p>' | remove: '</p>' }}
{{ post.excerpt | strip_html }}
```

### Excerpt separator

```html
---
excerpt_separator: <!--more-->
---

Excerpt here
<!--more-->
More post body here
```

Alternatively, you can put excerpts inline in your post by defining `excerpt_separator`.

### Permalinks

    # _config.yml
    permalink: date   # /:categories/:year/:month/:day/:title.html
    permalink: pretty # /:categories/:year/:month/:day/:title/
    permalink: none   # /:categories/:title.html
    permalink: "/:title"

See: [Permalinks](http://jekyllrb.com/docs/permalinks/)

## More features

### Data

```
_data/members.yml
```
{: .-setup}

```
{% for member in site.data.members %}
  ...
{% endfor %}
```

See: [Data](http://jekyllrb.com/docs/datafiles/)

### Collections

```yml
# _config.yml
collections:
  - authors
```
{: .-setup}

```yml
# _/authors/a-n-roquelaire.md
---
name: A. N. Roquelaire
real_name: Anne Rice
---
```

```
{% for author in site.authors %}
```

See: [Collections](http://jekyllrb.com/docs/collections/)

### Code highlighter

```html
{% highlight ruby linenos %}
def show
  ...
end
{% endhighlight %}
```

Integration
-----------

### Bundler

In `_plugins/bundler.rb`:
{: .-setup}

```ruby
require "bunder/setup"
Bundler.require :default
```

### Compass

  * [Compass](https://gist.github.com/parkr/2874934)
  * [Asset pipeline](https://github.com/matthodan/jekyll-asset-pipeline)

Also see
--------
{: .-one-column}

* [Jekyll docs](http://jekyllrb.com/docs/home/) _jekyllrb.com_
* [CloudCannon Jekyll cheatsheet](https://learn.cloudcannon.com/jekyll-cheat-sheet/) _cloudcannon.com_
* [Jekyll: templates](http://jekyllrb.com/docs/templates/) _jekyllrb.com_
* [Liquid: output](http://docs.shopify.com/themes/liquid-basics/output) _shopify.com_
* [Liquid: logic](http://docs.shopify.com/themes/liquid-basics/logic) _shopify.com_
* [Liquid: filters](http://docs.shopify.com/themes/liquid-documentation/filters) _shopify.com_
* [Liquid for designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) _github.com/Shopify_
{: .-also-see}

{% endraw %}
