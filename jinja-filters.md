---
title: How to use Jinja filters
link_title: Jinja filters
subtitle: Transform values in templates
logo: { set: icon-park-outline, name: filter }
category: Python
layout: snippet
last_verified_with: "Jinja 3.1.6."
updated: 2026-11-28
links:
  - title: Filters
    url: https://jinja.palletsprojects.com/en/stable/templates/#filters
  - title: Built-in filters
    url: https://jinja.palletsprojects.com/en/stable/templates/#builtin-filters
---

## Filtering values
<!-- {: .-snippets} -->

### Chain filters
<!-- {: .-snippet} -->

```jinja2
{{ "  ada  " | trim | title }}  {# Ada #}
```
<!-- {: data-highlight="trim; title"} -->

**Pipes apply left to right.** `trim` runs before `title`. See [Filters](https://jinja.palletsprojects.com/en/stable/templates/#filters).

### Sort and join
<!-- {: .-snippet} -->

```jinja2
{{ [3, 1, 2] | sort | join(", ") }}
```
<!-- {: data-highlight="sort; join"} -->

#### Output

```text
1, 2, 3
```

**Sorts then joins.** A list becomes `1, 2, 3`. See [join](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.join).

### Default a missing city
<!-- {: .-snippet} -->

```jinja2
{{ city | default("Paris") }}  {# Paris #}
```
<!-- {: data-highlight='default("Paris")'} -->

**Falls back on undefined.** `city` becomes `Paris`. See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

### Default a zero value
<!-- {: .-snippet} -->

#### Setup

```jinja2
{% set count = 0 %}
```

#### Use

```jinja2
{{ count | default("none", true) }}  {# none #}
```
<!-- {: data-highlight='default("none", true)'} -->

**Includes falsy values.** It replaces `0`, `""`, and `false`. See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

### Select and map
<!-- {: .-snippet} -->

```jinja2
{% set users = [
  {"name": "Ada", "active": true},
  {"name": "Bob", "active": false}
] %}

{{ users
  | selectattr("active")
  | map(attribute="name")
  | list }}
```
<!-- {: data-highlight='selectattr("active"); map(attribute="name")'} -->

#### Output

```text
['Ada']
```

**Filters then projects.** Only active users' names remain. See [selectattr](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.selectattr) and [map](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.map).

### Serialize to JSON
<!-- {: .-snippet} -->

```jinja2
{% set data = {"n": 2, "ok": true} %}

{{ data | tojson }}
```
<!-- {: data-highlight="tojson"} -->

#### Output

```text
{"n": 2, "ok": true}
```

**Emits safe JSON.** HTML-unsafe characters are escaped. See [tojson](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.tojson).
