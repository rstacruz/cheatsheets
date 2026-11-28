---
title: How to handle undefined variables in Jinja
link_title: Jinja undefined variables
subtitle: Defaults and strict errors
logo: { set: icon-park-outline, name: info }
category: Python
layout: snippet
last_verified_with: "Jinja 3.1.6."
updated: 2026-11-28
links:
  - title: Undefined
    url: https://jinja.palletsprojects.com/en/stable/api/#jinja2.Undefined
  - title: StrictUndefined
    url: https://jinja.palletsprojects.com/en/stable/api/#jinja2.StrictUndefined
---

## Missing values
<!-- {: .-snippets} -->

### Fall back to a default
<!-- {: .-snippet} -->

```jinja2
{{ name | default("guest") }}  {# guest #}
```
<!-- {: data-highlight='default("guest")'} -->

**Falls back on undefined,** so `name` becomes `guest`. See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

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

**Covers falsy values,** replacing empty strings, `0`, and `false`. See [default](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.default).

### Check for undefined
<!-- {: .-snippet} -->

```jinja2
{{ foo is defined }} {{ foo is undefined }}
```
<!-- {: data-highlight="is defined; is undefined"} -->

#### Output

```text
False True
```

**Tests for presence,** before reading a missing name. See [Tests](https://jinja.palletsprojects.com/en/stable/templates/#tests).

### Fail on missing values
<!-- {: .-snippet} -->

```python
from jinja2 import Environment, StrictUndefined

env = Environment(undefined=StrictUndefined)
env.from_string("{{ missing }}").render()
# jinja2.exceptions.UndefinedError:
#   'missing' is undefined
```
<!-- {: data-highlight="undefined=StrictUndefined"} -->

**Raises on missing,** instead of rendering an empty string. See [StrictUndefined](https://jinja.palletsprojects.com/en/stable/api/#jinja2.StrictUndefined).

### Keep arithmetic safe
<!-- {: .-snippet} -->

```jinja2
{{ (missing | default(0)) + 1 }}  {# 1 #}
```
<!-- {: data-highlight="(missing | default(0))"} -->

**Defaults before math,** so addition stays safe. See [Undefined](https://jinja.palletsprojects.com/en/stable/api/#jinja2.Undefined).
