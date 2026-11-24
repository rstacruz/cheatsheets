---
title: Jinja
subtitle: Python templating engine
category: Python
last_verified_with: "Jinja 3.1.6."
updated: 2026-11-24
---

{% raw %}

## Syntax

### Expressions

```jinja2
- variable x has content: {{ x }}
- expression: {{ x + 1 }}
- escaped for HTML: {{ html | e }}
- default value: {{ missing | default("n/a") }}
```

Undefined values render as an empty string; filters run left to right.

### Control structures

```jinja2
{% for x in range(5) %}
    {% if x % 2 == 0 %}
        {{ x }} is even!
    {% else %}
        {{ x }} is odd!
    {% endif %}
{% endfor %}
```

### Whitespace control

```jinja2
these are
{{ "three" }}
lines.

this is conc
{{- "at" -}}
enated.
```

A `-` on either side of a tag strips the whitespace next to it.

### Special blocks

#### Filter and raw

```jinja2
{% filter e %}{% endraw %}
{ {%- if 0 -%}{%- endif -%} % raw %}
{%- raw -%}
    This is a raw block where {{nothing is evaluated}}
    {% not even this %}
    and <html is escaped> too with "e" filter
{% endraw %}
{ {%- if 0 -%}{%- endif -%} % endraw %}{% raw %}
{% endfilter %}
```

#### Macro

```jinja2
{% macro myfunc(x) %}
    this is a reusable macro, with arguments: {{x}}
{% endmacro %}

{{ myfunc(42) }}
```

#### Comment

```jinja2
{#
this is a comment
#}
```

`{% filter %}` applies a filter to its whole body; `{% raw %}` keeps a region away from the renderer.

### Inheritance

#### shared.html

```html
<html>
  <head>
    <title>{% block title %}{% endblock %}</title>
  </head>
  <body>
    <h1>{{ self.title() }}</h1>
    {% block content %}{% endblock %}
  </body>
</html>
```

#### home.html

```html
{% extends "shared.html" %}
{% block title %}Welcome to my site{% endblock %}
{% block content %}
This is the body
{% endblock %}
```

`self.title()` renders a block a second time; a template cannot define the same block name twice.

## Library

### Render a string

```python
from jinja2 import Template

template = Template("Hello {{ name }}!")
template.render(name="John Doe")
# => 'Hello John Doe!'
```

### Load templates from disk

```python
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader("templates"))
template = env.get_template("page.html")
template.render(name="John Doe")
```

Reach for `Environment` when you need a loader, autoescaping, filters or globals.

{% endraw %}
