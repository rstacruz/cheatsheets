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

### Supply a default
<!-- {: .-snippet} -->

```jinja2
{{ name | default("guest") }}  {# guest #}
```
<!-- {: data-highlight='default("guest")'} -->

**Uses the fallback only when `name` is undefined.** See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

### Cover falsy values
<!-- {: .-snippet} -->

#### Setup

```jinja2
{% set flag = "" %}
```

#### Use

```jinja2
{{ flag | default("n/a", true) }}  {# n/a #}
```
<!-- {: data-highlight='default("n/a", true)'} -->

**Pass `true` to replace empty strings, `0`, and `false` too.** See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

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
{% set data = {"ok": true, "n": 2} %}

{{ data | tojson }}
```
<!-- {: data-highlight="tojson"} -->

#### Output

```text
{"n": 2, "ok": true}
```

**Emits JSON with HTML-unsafe characters escaped.** See [tojson](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.tojson).
