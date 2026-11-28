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

**Pipes apply filters left to right.** See [Filters](https://jinja.palletsprojects.com/en/stable/templates/#filters).

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

**Sorts the list before joining it into a string.** See [join](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.join).

### Default a missing city
<!-- {: .-snippet} -->

```jinja2
{{ city | default("Paris") }}  {# Paris #}
```
<!-- {: data-highlight='default("Paris")'} -->

**Uses the fallback only when `city` is undefined.** See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

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

**Pass `true` to replace `0`, empty strings, and `false` too.** See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

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

**Keeps active users and extracts their names.** See [selectattr](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.selectattr) and [map](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.map).

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

**Emits JSON with HTML-unsafe characters escaped.** See [tojson](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.tojson).
