---
title: How to choose between Jinja include and import
link_title: Jinja include vs import
subtitle: Compose templates and macros
logo: { set: icon-park-outline, name: connection }
category: Python
layout: snippet
last_verified_with: "Jinja 3.1.6."
updated: 2026-11-28
links:
  - title: Include
    url: https://jinja.palletsprojects.com/en/stable/templates/#include
  - title: Import
    url: https://jinja.palletsprojects.com/en/stable/templates/#import
---

## Composition
<!-- {: .-snippets} -->

### Include a template
<!-- {: .-snippet} -->

#### header.html

```html
<header>{{ title }}</header>
```

#### page.html

```jinja2
{% include "header.html" %}
```
<!-- {: data-highlight='{% include "header.html" %}'} -->

**Use include to render.** Markup renders in place with the caller's context. See [Include](https://jinja.palletsprojects.com/en/stable/templates/#include).

### Import macros
<!-- {: .-snippet} -->

#### forms.html

```jinja2
{% macro input(name) %}
  <input name="{{ name }}">
{% endmacro %}
```

#### page.html

```jinja2
{% import "forms.html" as forms %}

{{ forms.input("email") }}
```
<!-- {: data-highlight='{% import "forms.html" as forms %}'} -->

**Use import for macros.** Load them under a namespace. See [Import](https://jinja.palletsprojects.com/en/stable/templates/#import).

### Import selected macros
<!-- {: .-snippet} -->

```jinja2
{% from "forms.html" import input as field %}

{{ field("email") }}
```
<!-- {: data-highlight='{% from "forms.html" import input as field %}'} -->

**Imports one macro.** It takes the name `field`. See [Import](https://jinja.palletsprojects.com/en/stable/templates/#import).

### Control the context
<!-- {: .-snippet} -->

#### Include without context

```jinja2
{% include "header.html" without context %}
```
<!-- {: data-highlight="without context"} -->

#### Import with context

```jinja2
{% import "forms.html" as forms with context %}
```
<!-- {: data-highlight="with context"} -->

**Controls context.** Includes can hide variables; imports can share them. See [Import with context](https://jinja.palletsprojects.com/en/stable/templates/#import-context-behavior).

### Ignore a missing template
<!-- {: .-snippet} -->

```jinja2
{% include "optional.html" ignore missing %}
```
<!-- {: data-highlight="ignore missing"} -->

**Skips absent templates.** Nothing renders when the file is missing. See [Include](https://jinja.palletsprojects.com/en/stable/templates/#include).
