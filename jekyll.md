---
title: Jekyll
subtitle: Static site generator
jekyll_escape: true
prism_languages: [bash, yaml, ruby]
category: Markup
updated: 2026-11-22
last_verified_with: "Jekyll 4.4.1, Ruby 3.4"
tier: t3
intro: |
  Jekyll builds static sites from Markdown, HTML, and Liquid templates. This reference covers the CLI, configuration, templating, and blogging.
links:
  - title: Jekyll documentation
    url: https://jekyllrb.com/docs/
  - title: Liquid documentation
    url: https://shopify.github.io/liquid/
---

{% raw %}

## Get started
<!-- {: .-three-column} -->

### Install

```bash
gem install jekyll bundler
```

Ruby 2.7+ is required.
See: [Installation](https://jekyllrb.com/docs/installation/)

### Create a site

```bash
jekyll new myblog
cd myblog
bundle exec jekyll serve
```

Open <http://localhost:4000>. Use `jekyll new --blank` to skip the theme.
See: [Quickstart](https://jekyllrb.com/docs/)

### Commands

#### Live reload

```bash
jekyll serve --livereload
```

#### Daily commands

| Command           | Action                   |
| ----------------- | ------------------------ |
| `jekyll b`        | Build into `_site`       |
| `jekyll s`        | Watch and serve          |
| `jekyll doctor`   | Check configuration      |
| `jekyll clean`    | Remove generated files   |

#### Useful flags

| Flag                | Action               |
| ------------------- | -------------------- |
| `-l, --livereload`  | Reload the browser   |
| `-D, --drafts`      | Include drafts       |
| `--unpublished`     | Include hidden posts |
| `-I, --incremental` | Rebuild changed      |

See: [Command line usage](https://jekyllrb.com/docs/usage/)

## Project structure
<!-- {: .-three-column} -->

### Layout

```
.
├── _config.yml
├── _data/
├── _drafts/
├── _includes/
├── _layouts/
├── _posts/
├── _sass/
├── _plugins/
├── assets/
├── index.html
└── _site/
```

<!-- {: .-box-chars} -->

See: [Directory structure](https://jekyllrb.com/docs/structure/)

### Configuration

#### _config.yml

```yaml
title: My site
url: https://example.com
baseurl: /base
theme: minima
exclude: [Gemfile, vendor]
include: [.htaccess]
```

Jekyll reads `_config.yml` once per build; restart `serve` after edits.
See: [Configuration](https://jekyllrb.com/docs/configuration/)

### Defaults

```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: post
      author: Me
```

More specific scopes win; front matter overrides defaults.
See: [Front matter defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/)

## Front matter
<!-- {: .-three-column} -->

### Basic front matter

```
---
layout: post
title: Hello
---
Hello!
```

<!-- {: data-highlight="layout"} -->

Front matter must be first; empty `---` pairs still enable Liquid.
See: [Front matter](https://jekyllrb.com/docs/front-matter/)

### Post metadata

```yaml
date: 2017-11-07
categories: [html, css]
tags: [intro, web]
permalink: /hello/
published: false
```

Posts also accept `layout: none` to skip a default layout.
See: [Front matter](https://jekyllrb.com/docs/front-matter/)

### Custom variables

```yaml
---
author: Ada
---
By {{ page.author }}
```

Custom keys become `page.<key>` in templates.
See: [Variables](https://jekyllrb.com/docs/variables/)

## Templating

### Output

```html
<h1>{{ page.title }}</h1>
```

Double braces print a value; `|` pipes it through filters.
See: [Liquid](https://jekyllrb.com/docs/liquid/)

### Logic

```html
{% if page.tags contains "intro" %}
  Featured
{% endif %}
```

#### Tags

| Tag                             | Use             |
| ------------------------------- | --------------- |
| `{% assign x = y %}`            | Set a variable  |
| `{% capture x %}…{% endcapture %}` | Capture text  |
| `{% if %}` / `{% unless %}`     | Branch          |
| `{% for x in items %}`          | Loop            |
| `{% case %}`                    | Switch          |
| `{% comment %}`                 | Comment out     |

See: [Liquid tags](https://jekyllrb.com/docs/liquid/tags/)

### Loops

```html
{% for post in site.posts limit: 5 %}
  <a href="{{ post.url }}">
    {{ post.title }}
  </a>
{% endfor %}
```

#### Loop variables

| Variable         | Value             |
| ---------------- | ----------------- |
| `forloop.index`  | 1-based index     |
| `forloop.first`  | First iteration   |
| `forloop.last`   | Last iteration    |

Use `offset:` and `limit:` to slice a collection.
See: [Liquid tags](https://jekyllrb.com/docs/liquid/tags/)

### Includes

#### Include a file

```html
{% include header.html %}
```

#### Pass a parameter

```html
{% include note.html content="Hi" %}
```

Parameters are read as `{{ include.content }}` in `_includes/note.html`.
See: [Includes](https://jekyllrb.com/docs/includes/)

### Links

```html
[Post]({% post_url 2017-11-07-hello %})
[Page]({% link about.md %})
```

Since Jekyll 4, `link` and `post_url` prepend `baseurl`, and the build fails when the target is missing.
See: [Links](https://jekyllrb.com/docs/liquid/tags/#links)

### Comments and raw

```html
{% comment %}Hidden{% endcomment %}
{% raw %}{{ literal }}{% endraw %}
```

Use `raw` to print Liquid syntax; see `render_with_liquid: false` for pages.
See: [Liquid tags](https://jekyllrb.com/docs/liquid/tags/)

## Data and collections
<!-- {: .-three-column} -->

### Site variables

```html
{{ site.title }}
{{ site.posts.size }}
{{ jekyll.environment }}
```

Config keys appear under `site`; `jekyll` exposes build details.
See: [Variables](https://jekyllrb.com/docs/variables/)

### Data files

#### _data/members.yml

```yaml
- name: Ada
```

#### Template

```html
{% for member in site.data.members %}
  {{ member.name }}
{% endfor %}
```

JSON, CSV, and TSV files work too.
See: [Data files](https://jekyllrb.com/docs/datafiles/)

### Collections

#### _config.yml

```yaml
collections:
  authors:
    output: true
```

#### Template

```html
{% for author in site.authors %}
  {{ author.name }}
{% endfor %}
```

Documents live in `_authors/`; `output: true` writes their pages.
See: [Collections](https://jekyllrb.com/docs/collections/)

## Blogging

### Posts

```
_posts/2026-11-22-hello.md
```

The filename sets the date; front matter is required.
See: [Posts](https://jekyllrb.com/docs/posts/)

### Excerpts

```yaml
---
excerpt_separator: <!--more-->
---
```

Or set `excerpt:` in front matter; render it with `post.excerpt`.
See: [Post excerpts](https://jekyllrb.com/docs/posts/#post-excerpts)

### Drafts

```bash
jekyll serve --drafts
```

Drafts live in `_drafts/` with undated names and need `--drafts` to show.
See: [Drafts](https://jekyllrb.com/docs/posts/#drafts)

### Pagination

#### Gemfile

```ruby
gem "jekyll-paginate", group: :jekyll_plugins
```

#### _config.yml

```yaml
plugins: [jekyll-paginate]
paginate: 5
paginate_path: "/blog/page:num/"
```

Use `blog/index.html` (not Markdown) and no front-matter `permalink`.
See: [Pagination](https://jekyllrb.com/docs/pagination/)

### Permalinks

```yaml
permalink: date   # /:categories/:year/:month/:day/:title:output_ext
permalink: pretty # /:categories/:year/:month/:day/:title/
permalink: none   # /:categories/:title:output_ext
```

A post can override this with its own `permalink` in front matter.
See: [Permalinks](https://jekyllrb.com/docs/permalinks/)

### Asset paths

```html
![Screenshot]({{ '/assets/screenshot.jpg' | relative_url }})
```

Root-relative `/assets/...` works too when `baseurl` is empty.
See: [Images and resources](https://jekyllrb.com/docs/posts/#including-images-and-resources)

## Filters

### Dates

```html
{{ page.date | date_to_string }}
```

#### With `date: 2017-11-07` (UTC)

| Filter                  | Output                            |
| ----------------------- | --------------------------------- |
| `date: "%b %d, %Y"`     | `Nov 07, 2017`                    |
| `date_to_string`        | `07 Nov 2017`                     |
| `date_to_long_string`   | `07 November 2017`                |
| `date_to_xmlschema`     | `2017-11-07T00:00:00+00:00`       |
| `date_to_rfc822`        | `Tue, 07 Nov 2017 00:00:00 +0000` |

<!-- {: .-headers} -->

See: [Liquid filters](https://jekyllrb.com/docs/liquid/filters/)

### URLs

```html
{{ '/assets/style.css' | relative_url }}
```

#### With `url: https://example.com` and `baseurl: /base`

| Filter         | Output                                         |
| -------------- | ---------------------------------------------- |
| `relative_url` | `/base/assets/style.css`                       |
| `absolute_url` | `https://example.com/base/assets/style.css`    |

<!-- {: .-headers} -->

See: [Liquid filters](https://jekyllrb.com/docs/liquid/filters/)

### Arrays

```html
{{ site.posts | where: "author", "Ada" | map: "title" }}
```

#### Filters

| Filter                          | Use                     |
| ------------------------------- | ----------------------- |
| `where` / `where_exp`           | Select matching items   |
| `find` / `find_exp`             | First match (4.1)       |
| `group_by` / `group_by_exp`     | Group into `{name, items}` |
| `sort` / `uniq` / `sample`      | Reorder or reduce       |
| `push` / `pop` / `shift`        | Copy and modify         |
| `jsonify`                       | Serialize to JSON       |

See: [Liquid filters](https://jekyllrb.com/docs/liquid/filters/)

### Strings and escaping

```html
{{ page.title | truncatewords: 20 }}
```

#### Liquid

| Filter                         | Use                    |
| ------------------------------ | ---------------------- |
| `default` / `escape`           | Fallback, HTML escape  |
| `truncate` / `truncatewords`   | Cut to length          |
| `strip_html` / `strip_newlines` | Strip markup           |
| `newline_to_br`                | Newlines to `<br />`   |
| `slugify`                      | URL-safe slug          |

#### Jekyll

| Filter                     | Output                        |
| -------------------------- | ----------------------------- |
| `number_of_words`          | `"Hello world!"` → `2`        |
| `cgi_escape`               | `foo, bar; baz?` → `foo%2C+bar%3B+baz%3F` |
| `uri_escape`               | Percent-encode a URI          |
| `normalize_whitespace`     | Collapse whitespace           |
| `array_to_sentence_string` | `foo, bar, and baz`           |

See: [Liquid filters](https://jekyllrb.com/docs/liquid/filters/)

## Extending

### Plugins

#### Gemfile

```ruby
group :jekyll_plugins do
  gem "jekyll-feed"
end
```

#### _config.yml

```yaml
plugins: [jekyll-feed]
```

Gems in the `:jekyll_plugins` group are loaded automatically.
See: [Plugins](https://jekyllrb.com/docs/plugins/)

### GitHub Pages

```ruby
gem "github-pages", group: :jekyll_plugins
```

The gem pins Jekyll 3.10; use GitHub Actions for Jekyll 4 builds.
See: [pages-gem](https://github.com/github/pages-gem)

### Highlighting

```html
{% highlight ruby mark_lines="1 2" %}
def hello
  puts "world"
end
{% endhighlight %}
```

Rouge is the default; `linenos` numbers lines and `mark_lines` highlights them.
See: [Code highlighting](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting)

## Also see
<!-- {: .-one-column} -->

* [Jekyll docs](https://jekyllrb.com/docs/) _jekyllrb.com_
* [Liquid docs](https://shopify.github.io/liquid/) _shopify.github.io_

<!-- {: .-also-see} -->

{% endraw %}
