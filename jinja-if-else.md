---
title: How to write Jinja if else
link_title: Jinja if else
subtitle: Branch inside templates
logo: { set: icon-park-outline, name: branch }
category: Python
layout: snippet
last_verified_with: "Jinja 3.1.6."
updated: 2026-11-28
links:
  - title: If
    url: https://jinja.palletsprojects.com/en/stable/templates/#if
  - title: Tests
    url: https://jinja.palletsprojects.com/en/stable/templates/#tests
---

## Conditions
<!-- {: .-snippets} -->

### Use if and else
<!-- {: .-snippet} -->

```jinja2
{% set score = 95 %}

{% if score >= 90 %}A{% else %}B{% endif %}
```
<!-- {: data-highlight='{% if score >= 90 %}'} -->

#### Output

```text
A
```

**Renders one of two branches.** See [If](https://jinja.palletsprojects.com/en/stable/templates/#if).

### Add an elif branch
<!-- {: .-snippet} -->

```jinja2
{% set score = 75 %}

{% if score >= 90 %}A
{%- elif score >= 70 %}B
{%- else %}C
{% endif %}
```
<!-- {: data-highlight="elif"} -->

#### Output

```text
B
```

**Chain `elif` blocks to check fallback conditions.** See [Control structures](https://jinja.palletsprojects.com/en/stable/templates/#list-of-control-structures).

### Write an inline conditional
<!-- {: .-snippet} -->

```jinja2
{% set age = 15 %}

{{ "adult" if age >= 18 else "minor" }}
```
<!-- {: data-highlight="if age >= 18 else"} -->

#### Output

```text
minor
```

**Picks a value inside an expression, without tags.** See [Expressions](https://jinja.palletsprojects.com/en/stable/templates/#expressions).

### Combine conditions
<!-- {: .-snippet} -->

```jinja2
{% set v = [1, 2, 3] %}

{% if 2 in v and 3 in v %}both{% endif %}
```
<!-- {: data-highlight="and; in"} -->

#### Output

```text
both
```

**Join tests with `and`, `or`, and `not`.** See [Expressions](https://jinja.palletsprojects.com/en/stable/templates/#expressions).

### Test a value
<!-- {: .-snippet} -->

```jinja2
{{ foo is defined }} {{ foo is undefined }}
```
<!-- {: data-highlight="is defined; is undefined"} -->

#### Output

```text
False True
```

**`is` checks presence and null values.** See [Tests](https://jinja.palletsprojects.com/en/stable/templates/#tests).
