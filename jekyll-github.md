---
title: Jekyll for GitHub pages
jekyll_escape: true
layout: 2017/sheet
tags: [WIP]
---

{% raw %}

Jekyll
------
{: .-three-column}

### Jekyll gems

* jekyll-avatar
* jekyll-coffeescript
* jekyll-default-layout
* jekyll-feed
* jekyll-gist
* jekyll-github-metadata
* jekyll-mentions
* jekyll-optional-front-matter
* jekyll-paginate
* jekyll-readme-index
* jekyll-redirect-from
* jekyll-relative-links
* jekyll-sass-converter
* jekyll-seo-tag
* jekyll-sitemap

As of github-pages v156.

jekyll-github-metadata
----------------------

### Configuration

```yaml
gems:
  - jekyll-github-metadata

repository: username/project
```

Put this in your `_config.yml`.
See: [Repository metadata on GitHub pages](https://help.github.com/articles/repository-metadata-on-github-pages/)

### Listing erpos

```html
{% for repository in site.github.public_repositories %}
  <a href='{{ repository.html_url }}'>
    {{ repository.name }}
  </a>
{% endfor %}
```

### Link to repo

```html
<a href='{{ site.github.repository_url }}'>
  {{ site.github.project_title }}
</a>
```

jekyll-gist
-----------

### Configuration

```yaml
gems:
  - jekyll-gist
```

See: [jekyll-gist](https://github.com/jekyll/jekyll-gist)

### Usage

```js
{% gist parkr/c08ee0f2726fd0e3909d %}
```

This places a Gist in your page.

jekyll-mentions
---------------

### Configuration

```yaml
gems:
  - jekyll-mentions
```

See: [jekyll-mentions](https://github.com/jekyll/jekyll-mentions)

### Usage

```js
Hey @rstacruz, what do you think of this?
```

Just mention anyone in any page. Their names will be turned into links.


jekyll-redirect-from
--------------------
{: .-three-column}

### Configuration

```yaml
gems:
    - jekyll-redirect-from
```

See: [jekyll-redirect-from](https://rubygems.org/gems/jekyll-redirect-from)

### Usage

```yaml
---
redirect_from:
  - /foo
---
```

Place on any page.

### Redirecting

```yaml
---
redirect_to:
  - /foo
---
```

Place on any page.
See: [redirect to](https://github.com/jekyll/jekyll-redirect-from#redirect-to)

{% endraw %}

